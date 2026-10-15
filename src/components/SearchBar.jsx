import React from 'react';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';

export default function SearchBar({
  query,
  setQuery,
  onSearch,
  searchMode,
  setSearchMode,
  sampleQueries = []
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      {/* Input Box */}
      <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1.5 focus-within:border-zinc-600 focus-within:ring-1 focus-within:ring-zinc-600 transition shadow-sm">
        <div className="pl-3 pr-2 text-zinc-500">
          <Search className="w-4 h-4" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter query (e.g., wireless headphones, solar energy, green computing)..."
          className="w-full bg-transparent text-zinc-100 text-sm placeholder-zinc-500 focus:outline-none px-2 py-1.5 font-normal"
        />

        {query && (
          <button
            onClick={() => setQuery('')}
            className="p-1 text-zinc-500 hover:text-zinc-300 rounded hover:bg-zinc-800 transition mr-1"
            title="Clear query"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          onClick={() => onSearch(query)}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs rounded-md transition"
        >
          <span>Search</span>
          <CornerDownLeft className="w-3 h-3 text-zinc-500" />
        </button>
      </div>

      {/* Suggested Queries */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
        <span className="text-[11px] text-zinc-500 font-medium mr-1">
          Sample Queries:
        </span>
        {sampleQueries.map((sq, i) => (
          <button
            key={i}
            onClick={() => {
              setQuery(sq);
              onSearch(sq);
            }}
            className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition font-mono text-[11px]"
          >
            {sq}
          </button>
        ))}
      </div>

      {/* Mode Switcher Segmented Control */}
      <div className="p-1 bg-zinc-900/90 border border-zinc-800 rounded-lg grid grid-cols-2 sm:grid-cols-4 gap-1 text-xs">
        <button
          onClick={() => setSearchMode('all')}
          className={`py-1.5 px-3 rounded-md font-medium transition ${
            searchMode === 'all'
              ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
          }`}
        >
          Compare All 3 Modes
        </button>

        <button
          onClick={() => setSearchMode('energyAware')}
          className={`py-1.5 px-3 rounded-md font-medium transition flex items-center justify-center space-x-1.5 ${
            searchMode === 'energyAware'
              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Energy-Aware</span>
        </button>

        <button
          onClick={() => setSearchMode('inverted')}
          className={`py-1.5 px-3 rounded-md font-medium transition flex items-center justify-center space-x-1.5 ${
            searchMode === 'inverted'
              ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
          <span>Inverted Index</span>
        </button>

        <button
          onClick={() => setSearchMode('linear')}
          className={`py-1.5 px-3 rounded-md font-medium transition flex items-center justify-center space-x-1.5 ${
            searchMode === 'linear'
              ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
          <span>Linear Search</span>
        </button>
      </div>
    </div>
  );
}
