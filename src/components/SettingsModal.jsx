import React from 'react';
import { X, RotateCcw } from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetSettings
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-lg shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Simulator Settings</h2>
            <p className="text-xs text-zinc-500">Configure parameters for candidate pruning and hardware power rating</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-5 text-xs text-zinc-300 font-sans">
          {/* Top K */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium text-zinc-300">
                Top-K Results: <span className="font-mono text-zinc-100">{settings.maxResults}</span>
              </label>
              <span className="text-[11px] text-zinc-500 font-mono">Default: 10</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20].map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => onUpdateSettings({ maxResults: k })}
                  className={`py-1.5 text-xs font-mono rounded border transition ${
                    settings.maxResults === k
                      ? 'bg-zinc-800 border-zinc-600 text-zinc-100'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {/* Pruning Profile */}
          <div>
            <div className="mb-2">
              <label className="font-medium text-zinc-300">
                Candidate Pruning Aggressiveness
              </label>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'moderate', name: 'Balanced', desc: 'Eval 2xK candidates' },
                { id: 'aggressive', name: 'Aggressive', desc: 'Eval 1.5xK candidates' },
                { id: 'ultra', name: 'Ultra-Eco', desc: 'Eval 1.0xK candidates' }
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onUpdateSettings({ pruningProfile: p.id })}
                  className={`p-2.5 rounded border text-left transition flex flex-col justify-between ${
                    settings.pruningProfile === p.id
                      ? 'bg-zinc-800 border-zinc-600 text-zinc-100'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  <span className="text-xs font-semibold">{p.name}</span>
                  <span className="text-[10px] text-zinc-500 font-mono mt-1">{p.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CPU TDP */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium text-zinc-300">
                Simulated CPU TDP Rating: <span className="font-mono text-zinc-100">{settings.cpuTdp}W</span>
              </label>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { watts: 15, label: '15W' },
                { watts: 25, label: '25W' },
                { watts: 45, label: '45W' },
                { watts: 65, label: '65W' }
              ].map((t) => (
                <button
                  key={t.watts}
                  type="button"
                  onClick={() => onUpdateSettings({ cpuTdp: t.watts })}
                  className={`py-1.5 text-xs font-mono rounded border transition ${
                    settings.cpuTdp === t.watts
                      ? 'bg-zinc-800 border-zinc-600 text-zinc-100'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  {t.watts}W
                </button>
              ))}
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">
              Used in the physical power equation: Energy = Operations × E_op + (Latency × TDP × CoreFactor).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-zinc-800 bg-zinc-950 flex justify-between items-center">
          <button
            onClick={onResetSettings}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded text-zinc-400 hover:text-zinc-200 text-xs font-medium transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs rounded transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
