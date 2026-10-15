import React from 'react';
import { ArrowDownRight } from 'lucide-react';

export default function MetricsCards({ activeMetrics, comparison = [] }) {
  if (!activeMetrics) return null;

  return (
    <div className="space-y-3">
      {/* Overview Banner */}
      <div className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-zinc-100 text-sm">
              {activeMetrics.modeName}
            </span>
            {activeMetrics.energySavedPercent > 0 && (
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/80 flex items-center">
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
                {activeMetrics.energySavedPercent}% Energy Reduction
              </span>
            )}
          </div>
          <p className="text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            {activeMetrics.description}
          </p>
        </div>

        <div className="flex items-center space-x-4 font-mono text-[11px] text-zinc-400 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded">
          <div>
            <span className="text-zinc-500 block text-[10px]">Estimated Carbon</span>
            <span className="text-zinc-200">{activeMetrics.carbonMicroGrams} µg CO₂e</span>
          </div>
          <div className="h-6 w-px bg-zinc-800"></div>
          <div>
            <span className="text-zinc-500 block text-[10px]">LED Runtime Equivalent</span>
            <span className="text-zinc-200">{activeMetrics.ledSecondsEquivalent} ms</span>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* Metric 1: Energy */}
        <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800">
          <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1">
            Energy Consumption
          </div>
          <div className="text-xl font-bold font-mono text-zinc-100 flex items-baseline space-x-1">
            <span>{activeMetrics.energyMicroJoules?.toLocaleString()}</span>
            <span className="text-xs font-normal text-zinc-500">µJ</span>
          </div>
          <div className="mt-2 text-[11px] font-mono text-zinc-400 flex justify-between">
            <span>{activeMetrics.energyJoules} J</span>
            {activeMetrics.energySavedPercent > 0 && (
              <span className="text-emerald-400">-{activeMetrics.energySavedPercent}% vs linear</span>
            )}
          </div>
        </div>

        {/* Metric 2: Documents Examined */}
        <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800">
          <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1">
            Documents Examined
          </div>
          <div className="text-xl font-bold font-mono text-zinc-100 flex items-baseline space-x-1">
            <span>{activeMetrics.docsExamined}</span>
            <span className="text-xs font-normal text-zinc-500">/ {activeMetrics.totalDocs}</span>
          </div>
          <div className="mt-2 text-[11px] font-mono text-zinc-400 flex justify-between">
            <span>
              {activeMetrics.totalDocs > 0 ? ((activeMetrics.docsExamined / activeMetrics.totalDocs) * 100).toFixed(1) : 0}% of corpus
            </span>
            {activeMetrics.docsSkippedPercent > 0 && (
              <span className="text-emerald-400">{activeMetrics.docsSkippedPercent}% skipped</span>
            )}
          </div>
        </div>

        {/* Metric 3: Operations */}
        <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800">
          <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1">
            Operations
          </div>
          <div className="text-xl font-bold font-mono text-zinc-100 flex items-baseline space-x-1">
            <span>{activeMetrics.operations?.toLocaleString()}</span>
            <span className="text-xs font-normal text-zinc-500">ops</span>
          </div>
          <div className="mt-2 text-[11px] font-mono text-zinc-400 flex justify-between">
            <span>Term & score calculations</span>
            {activeMetrics.opsSavedPercent > 0 && (
              <span className="text-emerald-400">{activeMetrics.opsSavedPercent}% fewer</span>
            )}
          </div>
        </div>

        {/* Metric 4: Search Latency */}
        <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800">
          <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1">
            Search Latency
          </div>
          <div className="text-xl font-bold font-mono text-zinc-100 flex items-baseline space-x-1">
            <span>{activeMetrics.timeMs}</span>
            <span className="text-xs font-normal text-zinc-500">ms</span>
          </div>
          <div className="mt-2 text-[11px] font-mono text-zinc-400 flex justify-between">
            <span>Client execution</span>
            <span className="text-zinc-500">Sub-millisecond</span>
          </div>
        </div>
      </div>
    </div>
  );
}
