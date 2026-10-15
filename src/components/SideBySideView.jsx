import React from 'react';
import ResultCard from './ResultCard';
import { ArrowDownRight } from 'lucide-react';

export default function SideBySideView({ allResults, queryTerms = [] }) {
  if (!allResults) return null;

  const { linear, inverted, energyAware } = allResults;

  const columns = [
    {
      title: 'Linear Search',
      subtitle: 'Exhaustive sequential scan across all documents',
      metrics: linear.metrics,
      results: linear.results,
      tag: 'Baseline',
      tagClass: 'bg-zinc-800 text-zinc-400 border-zinc-700'
    },
    {
      title: 'Inverted Index',
      subtitle: 'Lexicon lookup with candidate BM25 scoring',
      metrics: inverted.metrics,
      results: inverted.results,
      tag: 'Standard IR',
      tagClass: 'bg-zinc-800 text-blue-400 border-zinc-700'
    },
    {
      title: 'Energy-Aware Search',
      subtitle: 'Adaptive candidate pruning and early termination',
      metrics: energyAware.metrics,
      results: energyAware.results,
      tag: 'Optimized',
      tagClass: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80',
      isOptimized: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {columns.map((col, idx) => (
        <div
          key={idx}
          className={`rounded-lg border bg-zinc-900 flex flex-col overflow-hidden ${
            col.isOptimized ? 'border-zinc-700' : 'border-zinc-800'
          }`}
        >
          {/* Header */}
          <div className="p-3 border-b border-zinc-800 bg-zinc-950/60 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-semibold text-zinc-100">
                  {col.title}
                </h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">{col.subtitle}</p>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${col.tagClass}`}>
                {col.tag}
              </span>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-zinc-800 font-mono text-[11px]">
              <div className="p-1 rounded bg-zinc-900 border border-zinc-800/80 text-center">
                <span className="text-[10px] text-zinc-500 block">Energy</span>
                <span className="text-zinc-200 font-semibold">
                  {col.metrics.energyMicroJoules?.toLocaleString()} µJ
                </span>
              </div>

              <div className="p-1 rounded bg-zinc-900 border border-zinc-800/80 text-center">
                <span className="text-[10px] text-zinc-500 block">Scanned</span>
                <span className="text-zinc-200 font-semibold">
                  {col.metrics.docsExamined}/{col.metrics.totalDocs}
                </span>
              </div>

              <div className="p-1 rounded bg-zinc-900 border border-zinc-800/80 text-center">
                <span className="text-[10px] text-zinc-500 block">Operations</span>
                <span className="text-zinc-200 font-semibold">
                  {col.metrics.operations >= 1000 
                    ? `${(col.metrics.operations / 1000).toFixed(1)}k` 
                    : col.metrics.operations}
                </span>
              </div>
            </div>

            {col.metrics.energySavedPercent > 0 ? (
              <div className="flex items-center justify-center space-x-1 py-0.5 px-1.5 rounded bg-emerald-950/40 border border-emerald-900/60 text-emerald-400 font-mono text-[10px]">
                <ArrowDownRight className="w-3 h-3" />
                <span>{col.metrics.energySavedPercent}% Energy Reduction</span>
              </div>
            ) : (
              <div className="text-center text-[10px] font-mono text-zinc-600 py-0.5">
                Baseline (Maximum Energy)
              </div>
            )}
          </div>

          {/* Results List */}
          <div className="p-2 space-y-2 flex-1 overflow-y-auto max-h-[580px]">
            {col.results.length === 0 ? (
              <div className="text-center py-12 text-zinc-600 text-xs font-mono">
                No matching documents.
              </div>
            ) : (
              col.results.map((item, rIdx) => (
                <ResultCard
                  key={item.document.id}
                  item={item}
                  rank={rIdx + 1}
                  highlightTerms={queryTerms}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
