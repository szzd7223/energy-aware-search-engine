import React from 'react';

export default function ResultCard({ item, rank, highlightTerms = [] }) {
  const doc = item.document;
  const score = item.score;

  const highlightText = (text, terms) => {
    if (!text || !terms || terms.length === 0) return text;
    const regex = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} className="bg-zinc-800 text-zinc-100 px-0.5 rounded font-medium">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="p-3 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition space-y-1.5 text-xs">
      {/* Header */}
      <div className="flex items-center justify-between text-[11px]">
        <div className="flex items-center space-x-1.5">
          <span className="font-mono text-zinc-500">
            #{rank}
          </span>
          <span className="text-zinc-400 font-medium px-1.5 py-0.2 rounded bg-zinc-950 border border-zinc-800 text-[10px]">
            {doc.category}
          </span>
        </div>

        <div className="font-mono text-[10px] text-zinc-400 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
          Score: <span className="text-zinc-200">{score}</span>
        </div>
      </div>

      {/* Title */}
      <h4 className="font-semibold text-zinc-200 leading-snug">
        {highlightText(doc.title, highlightTerms)}
      </h4>

      {/* Snippet */}
      <p className="text-zinc-400 leading-relaxed line-clamp-2 text-[11px]">
        {highlightText(doc.snippet || doc.content, highlightTerms)}
      </p>

      {/* Meta Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60 text-[10px] text-zinc-500 font-mono">
        <div className="flex items-center space-x-1.5">
          {(doc.tags || []).slice(0, 2).map((tag, i) => (
            <span key={i} className="text-zinc-500">
              #{tag}
            </span>
          ))}
        </div>
        <span>{doc.readingTime || '3 min'}</span>
      </div>
    </div>
  );
}
