# EcoSearch — Energy-Aware Search Engine Simulator

> A search engine simulator that finds relevant results while reducing computational effort and estimated energy consumption.

---

## What to Say in Your Presentation

> *"Our project, EcoSearch, demonstrates how search engines can reduce computational effort and estimated energy consumption while providing relevant results. It compares different search algorithms and displays their performance through an interactive dashboard."*

### Key Talking Points:
1. **The Problem:** Modern search engines process billions of queries daily across massive data centers, burning substantial electrical power and generating carbon emissions.
2. **Three Search Paradigms Compared:**
   - **Linear Search:** Exhaustively checks every single document sequentially (O(N) document scans).
   - **Inverted Index Search:** Uses keyword postings lists to find matching documents and scores candidates with BM25.
   - **Energy-Aware Search (EcoSearch):** Prioritizes high-IDF terms, dynamically prunes non-competitive documents using early termination (WAND principles), saving over 90% of energy while delivering the same top relevant results.
3. **Interactive Dashboard:** Live metrics comparing Search Time (ms), Documents Examined, Computational Operations, Estimated Energy (µJ and Joules), and Carbon Footprint (µg CO2e).

---

## Quick Start

### 1. Prerequisites
- Node.js v18+
- npm or yarn

### 2. Run the Development Server
```bash
npm run dev
```
Open **http://localhost:3000** in your browser.

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## How It Works

```
User enters query (e.g., "wireless headphones")
                       |
       +---------------+---------------+
       |                               |
 [Linear Search]              [Energy-Aware]
  Scans all 105                High-IDF first
  documents                    Dynamic WAND prune
       |                               |
       +---------------+---------------+
                       |
       Compute Time, Ops & Energy (Joules)
                       |
      Interactive Recharts & Side-by-Side View
```

### 1. Search Modes
- **Linear Search:** Exhaustive string scan across corpus (105 docs examined, ~19,000 ops, baseline energy).
- **Inverted Index:** Lexicon lookup + BM25 scoring (~19 docs examined, ~650 ops, ~90% energy saved).
- **Energy-Aware Search:** Adaptive candidate pruning & early exit (~10 docs examined, ~390 ops, ~92% energy saved).

### 2. Energy Estimation Model
Energy consumption is modeled using hardware counters inspired by Intel RAPL and Green Software Foundation standards:

- Energy (dynamic) = Operations × E_op
- Energy (runtime) = (Time_ms / 1000) × (TDP_core × 0.15)
- Total Energy (Joules) = Energy (dynamic) + Energy (runtime)
- Carbon Footprint = Total Energy (Joules) × 116.67 µg CO2e

---

## Tech Stack

- **Frontend:** React 18, Vite 5, Tailwind CSS
- **Logic:** JavaScript with BM25 Relevance Scoring and Inverted Index structures
- **Dataset:** Local JSON corpus (`src/data/documents.json`) containing 105 documents across technology, consumer electronics, renewable energy, and green computing
- **Charts:** Recharts (bar charts for Energy, Operations, and Docs Scanned)
- **Icons:** Lucide React
