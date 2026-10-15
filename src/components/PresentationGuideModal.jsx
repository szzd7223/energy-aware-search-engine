import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';

export default function PresentationGuideModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const presentationQuote = `“Our project, EcoSearch, demonstrates how search engines can reduce computational effort and estimated energy consumption while providing relevant results. It compares different search algorithms and displays their performance through an interactive dashboard.”`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(presentationQuote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div 
        className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-2xl max-h-[88vh] overflow-y-auto shadow-2xl flex flex-col text-xs text-zinc-300 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-zinc-900 z-10">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Presentation Guide & Script</h2>
            <p className="text-[11px] text-zinc-500">Key talking points and demonstration sequence</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Key Quote Box */}
          <div className="p-3.5 rounded border border-zinc-700 bg-zinc-950 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="uppercase tracking-wider">Project Statement</span>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-1 text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 rounded border border-zinc-700 transition"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-sm text-zinc-100 italic leading-relaxed font-serif">
              {presentationQuote}
            </p>
          </div>

          {/* Three Search Modes */}
          <div className="space-y-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Algorithm Comparison Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="p-3 rounded border border-zinc-800 bg-zinc-950/60 space-y-1">
                <span className="font-semibold text-zinc-200 block text-xs">1. Linear Search</span>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Performs an exhaustive sequential scan across all documents. Evaluates every word token. Results in high operations and maximum energy draw.
                </p>
              </div>

              <div className="p-3 rounded border border-zinc-800 bg-zinc-950/60 space-y-1">
                <span className="font-semibold text-zinc-200 block text-xs">2. Inverted Index</span>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Performs lexicon lookups to find documents containing query terms, then calculates BM25 scores for all matching candidates.
                </p>
              </div>

              <div className="p-3 rounded border border-zinc-700 bg-zinc-950 space-y-1">
                <span className="font-semibold text-emerald-400 block text-xs">3. Energy-Aware</span>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Sorts terms by IDF and applies dynamic candidate pruning and early termination, reducing operations by over 90% while returning top hits.
                </p>
              </div>
            </div>
          </div>

          {/* Demonstration Sequence */}
          <div className="space-y-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Demonstration Sequence
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 text-zinc-300 leading-relaxed text-[11px]">
              <li>
                Click on the sample query <span className="font-mono text-zinc-200">"wireless headphones"</span>.
              </li>
              <li>
                Highlight the <strong>Side-by-Side Comparison</strong> view to show that all three algorithms return relevant documents.
              </li>
              <li>
                Point to the <strong>Comparison Charts</strong>: show that Linear Search scanned 105 documents (~19,000 operations), while Energy-Aware scanned only 10 candidates (~390 operations), delivering over 90% energy savings.
              </li>
              <li>
                Explain the <strong>Energy Metric</strong>: calculated from CPU instruction cycles, latency, and power rating (TDP), modeled in Joules and carbon equivalent.
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-zinc-800 bg-zinc-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs rounded transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
