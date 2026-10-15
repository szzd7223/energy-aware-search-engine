import React from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';

export default function SearchHistoryDrawer({
  isOpen,
  onClose,
  history,
  onSelectQuery,
  onClearHistory
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-zinc-900 border-l border-zinc-800 w-full max-w-sm h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3.5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-xs font-semibold text-zinc-100 uppercase tracking-wider">
              Search History
            </h2>
            <span className="text-[10px] font-mono text-zinc-500">
              ({history.length})
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="p-1 rounded text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition"
                title="Clear History"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {history.length === 0 ? (
            <div className="py-16 text-center text-zinc-600 text-xs font-mono">
              No previous searches recorded.
            </div>
          ) : (
            history.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectQuery(item.query, item.mode);
                  onClose();
                }}
                className="p-2.5 rounded border border-zinc-800 hover:border-zinc-700 bg-zinc-950/60 hover:bg-zinc-800/50 transition cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-200 group-hover:text-white transition">
                    "{item.query}"
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {item.timeAgo || 'Recent'}
                  </span>
                </div>

                <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span>{item.modeName}</span>
                  {item.energySavedPercent ? (
                    <span className="text-emerald-400">
                      {item.energySavedPercent}% saved
                    </span>
                  ) : (
                    <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-300 transition" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
