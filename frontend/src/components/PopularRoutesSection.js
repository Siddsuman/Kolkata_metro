import React from 'react';

const POPULAR = [
  { from: 'Dum Dum', to: 'Kavi Subhash', hint: 'Blue • Interchange' },
  { from: 'Sealdah', to: 'Howrah', hint: 'Green • Direct-ish' },
  { from: 'Joka', to: 'Victoria', hint: 'Purple • Rapid' },
  { from: 'Barasat', to: 'Biman Bandar', hint: 'Orange • Airport link' },
  { from: 'Barrackpore', to: 'Noapara', hint: 'Pink • City access' },
];

export default function PopularRoutesSection({ onPick }) {
  return (
    <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 p-4 sm:p-5 backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-gray-900 dark:text-gray-100">Popular routes</h3>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">Quick picks to plan faster</p>
        </div>
        <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300 text-xs font-semibold">
          Live
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2">
        {POPULAR.slice(0, 4).map((r) => (
          <button
            key={`${r.from}-${r.to}`}
            type="button"
            onClick={() => onPick?.(r.from, r.to)}
            className="text-left rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-gray-950/30 px-3 py-3 hover:mint-glow transition"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
                  {r.from} → {r.to}
                </div>
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">{r.hint}</div>
              </div>
              <div className="shrink-0 w-9 h-9 rounded-2xl bg-[#0FFCBE]/10 border border-[#0FFCBE]/25 flex items-center justify-center text-[#0FFCBE]">
                ↗
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

