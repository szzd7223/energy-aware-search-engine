import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MetricsCards from './components/MetricsCards';
import ComparisonCharts from './components/ComparisonCharts';
import SideBySideView from './components/SideBySideView';
import ResultCard from './components/ResultCard';
import SettingsModal from './components/SettingsModal';
import SearchHistoryDrawer from './components/SearchHistoryDrawer';
import PresentationGuideModal from './components/PresentationGuideModal';

import documentsData from './data/documents.json' with { type: 'json' };
import { 
  globalIndex, 
  runAllSearchModes,
  tokenize 
} from './utils/searchEngine';

const SAMPLE_QUERIES = [
  "wireless headphones",
  "solar energy storage",
  "green computing algorithms",
  "electric vehicle battery",
  "noise cancelling audio",
  "smart home climate control",
  "biodegradable packaging"
];

export default function App() {
  const [query, setQuery] = useState("wireless headphones");
  const [searchMode, setSearchMode] = useState("all"); // 'all' | 'energyAware' | 'inverted' | 'linear'
  
  // Settings
  const [settings, setSettings] = useState({
    maxResults: 10,
    pruningProfile: 'moderate', // 'moderate' | 'aggressive' | 'ultra'
    cpuTdp: 25 // 15, 25, 45, 65 Watts
  });

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Search History
  const [history, setHistory] = useState([
    {
      query: "wireless headphones",
      mode: "all",
      modeName: "All 3 Modes",
      energySavedPercent: 92.1,
      timeAgo: "Recent"
    },
    {
      query: "solar energy storage",
      mode: "energyAware",
      modeName: "Energy-Aware",
      energySavedPercent: 89.4,
      timeAgo: "Recent"
    }
  ]);

  // Execute Search
  const [searchResults, setSearchResults] = useState(null);

  const performSearch = (searchQuery = query) => {
    if (!searchQuery || !searchQuery.trim()) return;

    const trimmed = searchQuery.trim();
    const allResults = runAllSearchModes(trimmed, settings);

    setSearchResults(allResults);

    setHistory(prev => {
      const filtered = prev.filter(h => h.query.toLowerCase() !== trimmed.toLowerCase());
      const newEntry = {
        query: trimmed,
        mode: searchMode,
        modeName: searchMode === 'all' 
          ? 'All Modes' 
          : searchMode === 'energyAware' 
          ? 'Energy-Aware' 
          : searchMode === 'inverted' 
          ? 'Inverted Index' 
          : 'Linear Search',
        energySavedPercent: allResults.energyAware.metrics.energySavedPercent,
        timeAgo: 'Just now'
      };
      return [newEntry, ...filtered].slice(0, 20);
    });
  };

  useEffect(() => {
    performSearch("wireless headphones");
  }, [settings]);

  const queryTerms = useMemo(() => tokenize(query), [query]);

  const activeMetrics = useMemo(() => {
    if (!searchResults) return null;
    if (searchMode === 'linear') return searchResults.linear.metrics;
    if (searchMode === 'inverted') return searchResults.inverted.metrics;
    return searchResults.energyAware.metrics;
  }, [searchResults, searchMode]);

  const singleModeResults = useMemo(() => {
    if (!searchResults) return [];
    if (searchMode === 'linear') return searchResults.linear.results;
    if (searchMode === 'inverted') return searchResults.inverted.results;
    if (searchMode === 'energyAware') return searchResults.energyAware.results;
    return [];
  }, [searchResults, searchMode]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Navbar */}
      <Header
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenPresentationGuide={() => setIsGuideOpen(true)}
        historyCount={history.length}
        totalDocs={documentsData.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Project Statement Ribbon */}
        <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/40 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-zinc-300">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
              Statement
            </span>
            <p className="text-zinc-400 italic">
              "Our project, EcoSearch, demonstrates how search engines can reduce computational effort and estimated energy consumption while providing relevant results."
            </p>
          </div>
          <button
            onClick={() => setIsGuideOpen(true)}
            className="text-zinc-400 hover:text-zinc-100 text-xs font-medium underline underline-offset-2 shrink-0 ml-3 transition"
          >
            Presentation Guide
          </button>
        </div>

        {/* Search Bar Section */}
        <section>
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={performSearch}
            searchMode={searchMode}
            setSearchMode={setSearchMode}
            sampleQueries={SAMPLE_QUERIES}
          />
        </section>

        {/* Metrics Cards */}
        {searchResults && (
          <section>
            <MetricsCards 
              activeMetrics={activeMetrics} 
              comparison={searchResults.comparison}
            />
          </section>
        )}

        {/* Comparison Charts */}
        {searchResults && (
          <section>
            <ComparisonCharts comparison={searchResults.comparison} />
          </section>
        )}

        {/* Search Results */}
        {searchResults && (
          <section className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div>
                <h3 className="text-sm font-semibold text-zinc-100 flex items-center space-x-1.5">
                  <span>Results for</span>
                  <span className="font-mono text-zinc-300">"{query}"</span>
                </h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  {searchMode === 'all' 
                    ? 'Comparing top results from all 3 algorithms'
                    : `Showing results for ${activeMetrics?.modeName}`}
                </p>
              </div>

              {searchMode !== 'all' && (
                <button
                  onClick={() => setSearchMode('all')}
                  className="text-xs font-mono text-zinc-400 hover:text-zinc-200 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 transition"
                >
                  Switch to Side-by-Side
                </button>
              )}
            </div>

            {/* Results Grid / Columns */}
            {searchMode === 'all' ? (
              <SideBySideView 
                allResults={searchResults} 
                queryTerms={queryTerms} 
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {singleModeResults.length === 0 ? (
                  <div className="col-span-2 text-center py-12 text-zinc-600 text-xs font-mono">
                    No matching documents found.
                  </div>
                ) : (
                  singleModeResults.map((item, idx) => (
                    <ResultCard
                      key={item.document.id}
                      item={item}
                      rank={idx + 1}
                      highlightTerms={queryTerms}
                    />
                  ))
                )}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-4 text-center text-[11px] text-zinc-500 font-mono">
        <p>EcoSearch — Energy-Aware Search Engine Simulator</p>
      </footer>

      {/* Modals and Drawers */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newVals) => setSettings(prev => ({ ...prev, ...newVals }))}
        onResetSettings={() => setSettings({ maxResults: 10, pruningProfile: 'moderate', cpuTdp: 25 })}
      />

      <SearchHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectQuery={(pastQuery, pastMode) => {
          setQuery(pastQuery);
          if (pastMode) setSearchMode(pastMode);
          performSearch(pastQuery);
        }}
        onClearHistory={() => setHistory([])}
      />

      <PresentationGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
