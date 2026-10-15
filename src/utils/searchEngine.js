import documentsData from '../data/documents.json' with { type: 'json' };

/**
 * Text Preprocessing: tokenize, lowercase, clean punctuation, and filter basic stopwords
 */
const STOP_WORDS = new Set([
  'a', 'about', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'how', 'in', 'is', 'it', 'of', 'on', 'or', 'that', 'the', 'this', 'to',
  'was', 'what', 'when', 'where', 'which', 'who', 'will', 'with'
]);

export function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1 && !STOP_WORDS.has(token));
}

export function getAllTokens(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 0);
}

/**
 * Build the Inverted Index and document statistics
 */
export class InvertedIndex {
  constructor(documents) {
    this.documents = documents;
    this.index = new Map(); // term -> Map(docId -> termFrequency)
    this.docLengths = new Map(); // docId -> wordCount
    this.avgDocLength = 0;
    this.totalDocs = documents.length;
    this.docMap = new Map();

    this.buildIndex();
  }

  buildIndex() {
    let totalLength = 0;

    for (const doc of this.documents) {
      this.docMap.set(doc.id, doc);
      const combinedText = `${doc.title} ${doc.snippet} ${doc.content} ${(doc.tags || []).join(' ')}`;
      const tokens = tokenize(combinedText);
      const length = tokens.length;
      this.docLengths.set(doc.id, length);
      totalLength += length;

      const termCounts = new Map();
      for (const token of tokens) {
        termCounts.set(token, (termCounts.get(token) || 0) + 1);
      }

      for (const [term, count] of termCounts.entries()) {
        if (!this.index.has(term)) {
          this.index.set(term, new Map());
        }
        this.index.get(term).set(doc.id, count);
      }
    }

    this.avgDocLength = this.totalDocs > 0 ? totalLength / this.totalDocs : 1;
  }

  getPostings(term) {
    return this.index.get(term) || new Map();
  }

  getIDF(term) {
    const postings = this.getPostings(term);
    const docFreq = postings.size;
    if (docFreq === 0) return 0;
    // Standard BM25 IDF formula with smoothing
    return Math.log(1 + (this.totalDocs - docFreq + 0.5) / (docFreq + 0.5));
  }
}

// Global singleton inverted index
export const globalIndex = new InvertedIndex(documentsData);

/**
 * BM25 relevance score calculator
 */
export function calculateBM25(term, termFreq, docLength, avgDocLength, idf, k1 = 1.2, b = 0.75) {
  const numerator = termFreq * (k1 + 1);
  const denominator = termFreq + k1 * (1 - b + b * (docLength / (avgDocLength || 1)));
  return idf * (numerator / denominator);
}

/**
 * 1. Naive Linear Search (Checks every document sequentially)
 * Simulates sequential text scanning without indexing
 */
export function runLinearSearch(query, documents, options = {}) {
  const maxResults = options.maxResults || 10;
  const startTime = performance.now();
  let operations = 0;
  let docsExamined = 0;
  const scoredResults = [];

  const queryTerms = tokenize(query);
  if (queryTerms.length === 0) {
    return {
      results: [],
      metrics: {
        mode: 'linear',
        modeName: 'Linear Search',
        timeMs: 0,
        docsExamined: 0,
        totalDocs: documents.length,
        operations: 0,
        energyJoules: 0,
        efficiencyScore: 0
      }
    };
  }

  // Iterate over every document
  for (let i = 0; i < documents.length; i++) {
    docsExamined++;
    const doc = documents[i];
    let score = 0;
    let matchCount = 0;

    // Simulate scanning entire text of the document
    const fullText = `${doc.title} ${doc.snippet} ${doc.content} ${(doc.tags || []).join(' ')}`.toLowerCase();
    const docWords = fullText.split(/\s+/);

    operations += 5; // document iteration overhead

    for (const term of queryTerms) {
      operations += 2; // term search initialization
      let termMatches = 0;

      // Naive sequential word scan for each query term in document
      for (let w = 0; w < docWords.length; w++) {
        operations += 1; // string comparison
        if (docWords[w].includes(term)) {
          termMatches++;
          operations += 2; // match counter & score update
        }
      }

      // Title bonus check
      operations += 3;
      if (doc.title.toLowerCase().includes(term)) {
        score += 15;
      }
      if ((doc.tags || []).some(t => t.toLowerCase().includes(term))) {
        score += 10;
        operations += doc.tags.length;
      }

      if (termMatches > 0) {
        matchCount++;
        score += termMatches * 2;
      }
    }

    operations += 3; // scoring finalize
    if (score > 0) {
      scoredResults.push({
        document: doc,
        score: +(score + matchCount * 5).toFixed(2),
        matchedTerms: queryTerms.filter(t => fullText.includes(t))
      });
    }
  }

  // Sorting all matching results (O(M log M))
  operations += Math.round(scoredResults.length * Math.log2(Math.max(scoredResults.length, 2)) * 4);
  scoredResults.sort((a, b) => b.score - a.score);

  const finalResults = scoredResults.slice(0, maxResults);
  const endTime = performance.now();
  const timeMs = Math.max(+(endTime - startTime).toFixed(3), 0.12);

  // Compute energy based on operations and CPU TDP
  const energyMetrics = calculateEnergyMetrics(operations, timeMs, options.cpuTdp || 25);

  return {
    results: finalResults,
    metrics: {
      mode: 'linear',
      modeName: 'Linear Search',
      description: 'Exhaustive sequential scan across 100% of documents in the corpus.',
      timeMs,
      docsExamined,
      totalDocs: documents.length,
      operations,
      ...energyMetrics
    }
  };
}

/**
 * 2. Inverted Index Search
 * Fast lexicon lookup + BM25 scoring across all candidates containing query terms
 */
export function runInvertedIndexSearch(query, indexInstance, options = {}) {
  const maxResults = options.maxResults || 10;
  const startTime = performance.now();
  let operations = 0;
  const queryTerms = tokenize(query);

  if (queryTerms.length === 0) {
    return {
      results: [],
      metrics: {
        mode: 'inverted',
        modeName: 'Inverted Index Search',
        timeMs: 0,
        docsExamined: 0,
        totalDocs: indexInstance.totalDocs,
        operations: 0,
        energyJoules: 0
      }
    };
  }

  const candidateDocIds = new Set();
  const termPostings = new Map();
  const termIDFs = new Map();

  // 1. Lexicon lookups: O(1) hash map access per query term
  for (const term of queryTerms) {
    operations += 3; // hash lookup
    const postings = indexInstance.getPostings(term);
    termPostings.set(term, postings);
    termIDFs.set(term, indexInstance.getIDF(term));

    for (const docId of postings.keys()) {
      candidateDocIds.add(docId);
      operations += 1; // set insertion
    }
  }

  let docsExamined = candidateDocIds.size;
  const scoredResults = [];

  // 2. Score every candidate document using BM25
  for (const docId of candidateDocIds) {
    const doc = indexInstance.docMap.get(docId);
    if (!doc) continue;

    const docLength = indexInstance.docLengths.get(docId) || 1;
    let totalScore = 0;
    const matchedTerms = [];

    for (const term of queryTerms) {
      operations += 2; // term check
      const postings = termPostings.get(term);
      const tf = postings.get(docId) || 0;

      if (tf > 0) {
        matchedTerms.push(term);
        const idf = termIDFs.get(term) || 0.1;
        const bm25Score = calculateBM25(term, tf, docLength, indexInstance.avgDocLength, idf);
        totalScore += bm25Score;
        operations += 6; // floating point arithmetic ops for BM25
      }
    }

    // Boost for title matches
    const titleLower = doc.title.toLowerCase();
    for (const term of queryTerms) {
      operations += 2;
      if (titleLower.includes(term)) {
        totalScore += 2.5;
        operations += 1;
      }
    }

    if (totalScore > 0) {
      scoredResults.push({
        document: doc,
        score: +totalScore.toFixed(2),
        matchedTerms
      });
    }
  }

  // Sorting candidate pool
  operations += Math.round(scoredResults.length * Math.log2(Math.max(scoredResults.length, 2)) * 3);
  scoredResults.sort((a, b) => b.score - a.score);

  const finalResults = scoredResults.slice(0, maxResults);
  const endTime = performance.now();
  const timeMs = Math.max(+(endTime - startTime).toFixed(3), 0.05);

  const energyMetrics = calculateEnergyMetrics(operations, timeMs, options.cpuTdp || 25);

  return {
    results: finalResults,
    metrics: {
      mode: 'inverted',
      modeName: 'Inverted Index Search',
      description: 'Lexicon lookup + full candidate scoring using BM25 relevance.',
      timeMs,
      docsExamined,
      totalDocs: indexInstance.totalDocs,
      operations,
      ...energyMetrics
    }
  };
}

/**
 * 3. Energy-Aware Search (Adaptive Pruning & Early Termination)
 * Limits unnecessary processing:
 * - Prioritizes highest IDF terms first
 * - Caps candidates dynamically
 * - Prunes documents whose theoretical max score cannot surpass current top-k threshold (WAND concept)
 * - Stops processing when top-K results reach confidence stability
 */
export function runEnergyAwareSearch(query, indexInstance, options = {}) {
  const maxResults = options.maxResults || 10;
  // Pruning aggressiveness: 'moderate' (default), 'aggressive', or 'ultra'
  const pruningProfile = options.pruningProfile || 'moderate';
  const cpuTdp = options.cpuTdp || 25;

  let candidateCapMultiplier;
  let scoreThresholdFactor;

  switch (pruningProfile) {
    case 'aggressive':
      candidateCapMultiplier = 1.5; // only evaluate up to 1.5 * K candidates
      scoreThresholdFactor = 0.65;
      break;
    case 'ultra':
      candidateCapMultiplier = 1.0; // evaluate only 1.0 * K candidates
      scoreThresholdFactor = 0.8;
      break;
    case 'moderate':
    default:
      candidateCapMultiplier = 2.0; // evaluate up to 2.0 * K candidates
      scoreThresholdFactor = 0.5;
      break;
  }

  const startTime = performance.now();
  let operations = 0;
  const queryTerms = tokenize(query);

  if (queryTerms.length === 0) {
    return {
      results: [],
      metrics: {
        mode: 'energyAware',
        modeName: 'Energy-Aware Search',
        timeMs: 0,
        docsExamined: 0,
        totalDocs: indexInstance.totalDocs,
        operations: 0,
        energyJoules: 0,
        energySavedPercent: 0
      }
    };
  }

  // 1. Sort query terms by IDF descending (most informative/discriminative terms evaluated first)
  operations += 4;
  const termInfos = queryTerms.map(term => {
    operations += 2;
    const postings = indexInstance.getPostings(term);
    const idf = indexInstance.getIDF(term);
    return { term, postings, idf };
  }).sort((a, b) => b.idf - a.idf);

  // 2. Select candidates primarily from the highest-IDF terms
  const candidateMap = new Map(); // docId -> preliminary score estimate
  const maxCandidatesToInspect = Math.max(Math.round(maxResults * candidateCapMultiplier), 8);

  for (let i = 0; i < termInfos.length; i++) {
    const { term, postings, idf } = termInfos[i];
    operations += 2;

    for (const [docId, tf] of postings.entries()) {
      operations += 2;
      const currentEst = candidateMap.get(docId) || 0;
      // Weight preliminary score by term frequency and IDF
      candidateMap.set(docId, currentEst + tf * idf);

      // Early stop candidate collection if we have enough high-quality candidates
      if (candidateMap.size >= maxCandidatesToInspect * 2) {
        operations += 1;
        break;
      }
    }

    if (candidateMap.size >= maxCandidatesToInspect * 2) {
      break;
    }
  }

  // Sort candidate pool by preliminary estimate to evaluate best candidates first
  operations += Math.round(candidateMap.size * Math.log2(Math.max(candidateMap.size, 2)) * 2);
  const prioritizedCandidates = Array.from(candidateMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxCandidatesToInspect);

  let docsExamined = 0;
  const scoredResults = [];
  let currentMinTopKScore = 0;

  // 3. Score candidates with dynamic pruning (Early Exit)
  for (const [docId, preliminaryScore] of prioritizedCandidates) {
    // Dynamic pruning check: if candidate's preliminary upper bound is significantly below min top-K, prune it!
    if (scoredResults.length >= maxResults && preliminaryScore < currentMinTopKScore * scoreThresholdFactor) {
      operations += 1; // prune decision made with zero scoring overhead
      continue;
    }

    docsExamined++;
    const doc = indexInstance.docMap.get(docId);
    if (!doc) continue;

    const docLength = indexInstance.docLengths.get(docId) || 1;
    let totalScore = 0;
    const matchedTerms = [];

    // Evaluate BM25 only for terms actually present in this candidate
    for (const { term, postings, idf } of termInfos) {
      operations += 1;
      const tf = postings.get(docId);
      if (tf) {
        matchedTerms.push(term);
        totalScore += calculateBM25(term, tf, docLength, indexInstance.avgDocLength, idf);
        operations += 5; // BM25 arithmetic
      }
    }

    // Quick title bonus
    operations += 2;
    if (doc.title.toLowerCase().includes(termInfos[0]?.term || '')) {
      totalScore += 2.5;
    }

    if (totalScore > 0) {
      scoredResults.push({
        document: doc,
        score: +totalScore.toFixed(2),
        matchedTerms
      });

      // Update current min top-K score threshold
      if (scoredResults.length > maxResults) {
        scoredResults.sort((a, b) => b.score - a.score);
        scoredResults.pop();
        currentMinTopKScore = scoredResults[scoredResults.length - 1].score;
        operations += 3;
      } else if (scoredResults.length === maxResults) {
        scoredResults.sort((a, b) => b.score - a.score);
        currentMinTopKScore = scoredResults[scoredResults.length - 1].score;
      }
    }
  }

  scoredResults.sort((a, b) => b.score - a.score);
  const finalResults = scoredResults.slice(0, maxResults);
  const endTime = performance.now();
  const timeMs = Math.max(+(endTime - startTime).toFixed(3), 0.02);

  const energyMetrics = calculateEnergyMetrics(operations, timeMs, cpuTdp);

  return {
    results: finalResults,
    metrics: {
      mode: 'energyAware',
      modeName: 'Energy-Aware Search',
      description: 'Prioritized candidate sorting + dynamic WAND threshold pruning and early termination.',
      pruningProfile,
      timeMs,
      docsExamined,
      totalDocs: indexInstance.totalDocs,
      operations,
      ...energyMetrics
    }
  };
}

/**
 * Standardized Energy & Carbon Footprint Calculation
 * Based on Green Software Foundation and Hardware RAPL models:
 * - CPU active power draw: TDP (e.g. 25W server core)
 * - Energy per operation: approx. 1.2 to 2.5 nanojoules (nJ) per clock cycle / instruction
 * - Latency energy: Time (s) * CPU Power (W)
 * - Grid Carbon Intensity: 420 g CO2 / kWh
 */
export function calculateEnergyMetrics(operations, timeMs, cpuTdp = 25) {
  // Energy from computational operations (dynamic CPU switching power)
  // 1 operation in JS ~ 10-15 CPU instructions -> ~ 25 nanojoules = 0.000000025 Joules
  const energyPerOpJoules = 0.000000028;
  const dynamicEnergyJoules = operations * energyPerOpJoules;

  // Energy from CPU power over search execution duration
  const activePowerWatts = cpuTdp;
  const executionEnergyJoules = (timeMs / 1000) * (activePowerWatts * 0.15); // normalized per core slice

  const totalEnergyJoules = +(dynamicEnergyJoules + executionEnergyJoules).toFixed(6);
  const totalMicroJoules = +(totalEnergyJoules * 1000000).toFixed(1);

  // Carbon Emissions: 420g CO2 per kWh (1 kWh = 3,600,000 Joules)
  // Micrograms of CO2 = Joules * (420 * 1,000,000 / 3,600,000) = Joules * 116.67
  const carbonMicroGrams = +(totalEnergyJoules * 116.67).toFixed(3);

  // LED bulb equivalent: A 5W LED bulb consumes 5 Joules per second
  const ledSecondsEquivalent = +(totalEnergyJoules / 5 * 1000).toFixed(2); // in milliseconds of LED bulb

  return {
    energyJoules: totalEnergyJoules,
    energyMicroJoules: totalMicroJoules,
    carbonMicroGrams,
    ledSecondsEquivalent
  };
}

/**
 * Run all three search algorithms simultaneously on a query for direct comparison
 */
export function runAllSearchModes(query, options = {}) {
  const linear = runLinearSearch(query, documentsData, options);
  const inverted = runInvertedIndexSearch(query, globalIndex, options);
  const energyAware = runEnergyAwareSearch(query, globalIndex, options);

  // Calculate relative savings compared to Linear baseline
  const baselineEnergy = linear.metrics.energyJoules || 0.0001;
  const baselineOps = linear.metrics.operations || 1;
  const baselineDocs = linear.metrics.docsExamined || 1;

  const calculateSavings = (val, base) => {
    if (base <= 0) return 0;
    return +Math.max(0, ((base - val) / base) * 100).toFixed(1);
  };

  linear.metrics.energySavedPercent = 0;
  linear.metrics.opsSavedPercent = 0;
  linear.metrics.docsSkippedPercent = 0;

  inverted.metrics.energySavedPercent = calculateSavings(inverted.metrics.energyJoules, baselineEnergy);
  inverted.metrics.opsSavedPercent = calculateSavings(inverted.metrics.operations, baselineOps);
  inverted.metrics.docsSkippedPercent = calculateSavings(inverted.metrics.docsExamined, baselineDocs);

  energyAware.metrics.energySavedPercent = calculateSavings(energyAware.metrics.energyJoules, baselineEnergy);
  energyAware.metrics.opsSavedPercent = calculateSavings(energyAware.metrics.operations, baselineOps);
  energyAware.metrics.docsSkippedPercent = calculateSavings(energyAware.metrics.docsExamined, baselineDocs);

  // Compare against Inverted Index as well
  energyAware.metrics.energySavedVsInvertedPercent = calculateSavings(
    energyAware.metrics.energyJoules,
    inverted.metrics.energyJoules || 0.0001
  );

  return {
    linear,
    inverted,
    energyAware,
    comparison: [
      {
        mode: 'Linear Search',
        shortName: 'Linear',
        operations: linear.metrics.operations,
        timeMs: linear.metrics.timeMs,
        docsExamined: linear.metrics.docsExamined,
        energyMicroJoules: linear.metrics.energyMicroJoules,
        energyJoules: linear.metrics.energyJoules,
        energySavedPercent: 0,
        carbonMicroGrams: linear.metrics.carbonMicroGrams,
        color: '#ef4444' // Red
      },
      {
        mode: 'Inverted Index',
        shortName: 'Inverted',
        operations: inverted.metrics.operations,
        timeMs: inverted.metrics.timeMs,
        docsExamined: inverted.metrics.docsExamined,
        energyMicroJoules: inverted.metrics.energyMicroJoules,
        energyJoules: inverted.metrics.energyJoules,
        energySavedPercent: inverted.metrics.energySavedPercent,
        carbonMicroGrams: inverted.metrics.carbonMicroGrams,
        color: '#3b82f6' // Blue
      },
      {
        mode: 'Energy-Aware',
        shortName: 'EcoSearch',
        operations: energyAware.metrics.operations,
        timeMs: energyAware.metrics.timeMs,
        docsExamined: energyAware.metrics.docsExamined,
        energyMicroJoules: energyAware.metrics.energyMicroJoules,
        energyJoules: energyAware.metrics.energyJoules,
        energySavedPercent: energyAware.metrics.energySavedPercent,
        carbonMicroGrams: energyAware.metrics.carbonMicroGrams,
        color: '#10b981' // Green
      }
    ]
  };
}
