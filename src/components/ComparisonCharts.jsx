import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function ComparisonCharts({ comparison = [] }) {
  const [activeTab, setActiveTab] = useState('energy'); // 'energy' | 'operations' | 'docs'

  if (!comparison || comparison.length === 0) return null;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-zinc-900 border border-zinc-700 p-2.5 rounded shadow-xl text-xs space-y-1 min-w-[170px] font-mono">
          <div className="font-semibold text-zinc-100 border-b border-zinc-800 pb-1">
            {data.mode}
          </div>
          <div className="text-zinc-300 flex justify-between">
            <span>Energy:</span>
            <span className="text-emerald-400 font-semibold">{data.energyMicroJoules?.toLocaleString()} µJ</span>
          </div>
          <div className="text-zinc-300 flex justify-between">
            <span>Operations:</span>
            <span className="text-zinc-200">{data.operations?.toLocaleString()}</span>
          </div>
          <div className="text-zinc-300 flex justify-between">
            <span>Docs Scanned:</span>
            <span className="text-zinc-200">{data.docsExamined}</span>
          </div>
          <div className="text-zinc-300 flex justify-between">
            <span>Latency:</span>
            <span className="text-zinc-200">{data.timeMs} ms</span>
          </div>
          {data.energySavedPercent > 0 && (
            <div className="pt-1 border-t border-zinc-800 text-emerald-400 flex justify-between">
              <span>Saved vs Linear:</span>
              <span>{data.energySavedPercent}%</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const energyAwareEntry = comparison.find(c => c.shortName === 'EcoSearch') || comparison[2];
  const linearEntry = comparison.find(c => c.shortName === 'Linear') || comparison[0];

  return (
    <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-4">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Algorithm Performance Comparison
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Comparative evaluation across linear scan, inverted index, and dynamic candidate pruning
          </p>
        </div>

        {/* View Tabs */}
        <div className="flex items-center space-x-1 p-0.5 bg-zinc-950 rounded border border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab('energy')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
              activeTab === 'energy'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Energy (µJ)
          </button>
          <button
            onClick={() => setActiveTab('operations')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
              activeTab === 'operations'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Operations
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
              activeTab === 'docs'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Docs Scanned
          </button>
        </div>
      </div>

      {/* Main Chart */}
      <div className="h-60 sm:h-64 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={comparison}
            margin={{ top: 10, right: 15, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="2 2" stroke="#27272a" vertical={false} />
            <XAxis 
              dataKey="mode" 
              stroke="#71717a" 
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#27272a' }}
            />
            <YAxis 
              stroke="#71717a" 
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#27272a' }}
              tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {activeTab === 'energy' && (
              <Bar 
                dataKey="energyMicroJoules" 
                name="Energy (µJ)" 
                radius={[4, 4, 0, 0]}
                barSize={40}
              >
                {comparison.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.shortName === 'EcoSearch' ? '#10b981' : entry.shortName === 'Inverted' ? '#3b82f6' : '#71717a'} 
                  />
                ))}
              </Bar>
            )}

            {activeTab === 'operations' && (
              <Bar 
                dataKey="operations" 
                name="Operations" 
                radius={[4, 4, 0, 0]}
                barSize={40}
              >
                {comparison.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.shortName === 'EcoSearch' ? '#10b981' : entry.shortName === 'Inverted' ? '#3b82f6' : '#71717a'} 
                  />
                ))}
              </Bar>
            )}

            {activeTab === 'docs' && (
              <Bar 
                dataKey="docsExamined" 
                name="Documents Examined" 
                radius={[4, 4, 0, 0]}
                barSize={40}
              >
                {comparison.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.shortName === 'EcoSearch' ? '#10b981' : entry.shortName === 'Inverted' ? '#3b82f6' : '#71717a'} 
                  />
                ))}
              </Bar>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-zinc-800 text-xs font-mono">
        <div className="p-2 rounded bg-zinc-950 border border-zinc-800/80 flex items-center justify-between">
          <span className="text-zinc-500">Energy Reduction:</span>
          <span className="text-emerald-400 font-semibold">{energyAwareEntry?.energySavedPercent || 0}%</span>
        </div>
        <div className="p-2 rounded bg-zinc-950 border border-zinc-800/80 flex items-center justify-between">
          <span className="text-zinc-500">Ops Reduction:</span>
          <span className="text-zinc-200">
            {linearEntry && energyAwareEntry 
              ? `${Math.round(((linearEntry.operations - energyAwareEntry.operations) / linearEntry.operations) * 100)}%`
              : '0%'}
          </span>
        </div>
        <div className="p-2 rounded bg-zinc-950 border border-zinc-800/80 flex items-center justify-between">
          <span className="text-zinc-500">Docs Evaluated:</span>
          <span className="text-zinc-200">{energyAwareEntry?.docsExamined} vs {linearEntry?.docsExamined}</span>
        </div>
      </div>
    </div>
  );
}
