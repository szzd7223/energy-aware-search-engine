import React from 'react';
import { Sliders, History, BookOpen, Database, Search } from 'lucide-react';

export default function Header({ 
  onOpenSettings, 
  onOpenHistory, 
  onOpenPresentationGuide, 
  historyCount = 0,
  totalDocs = 105 
}) {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-100 font-bold">
            <span className="text-emerald-400 font-mono text-sm">ES</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <span className="font-semibold text-sm tracking-tight text-zinc-100">
              EcoSearch
            </span>
            <span className="text-[11px] font-mono text-zinc-400 border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 rounded">
              v1.0
            </span>
            <span className="text-xs text-zinc-500 hidden md:inline">
              Energy-Aware IR Simulator
            </span>
          </div>
        </div>

        {/* Status / Corpus info */}
        <div className="hidden sm:flex items-center space-x-3 text-xs text-zinc-400">
          <div className="flex items-center space-x-1.5 font-mono text-[11px] bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded">
            <Database className="w-3.5 h-3.5 text-zinc-400" />
            <span>Corpus: {totalDocs} documents</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenPresentationGuide}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition text-xs font-medium"
          >
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span>Presentation Guide</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition text-xs font-medium"
          >
            <History className="w-3.5 h-3.5 text-zinc-400" />
            <span>History</span>
            {historyCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-zinc-800 text-zinc-300 font-mono text-[10px] rounded border border-zinc-700">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenSettings}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition text-xs font-medium"
          >
            <Sliders className="w-3.5 h-3.5 text-zinc-400" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
}
