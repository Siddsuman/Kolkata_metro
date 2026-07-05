import React, { useMemo } from 'react';

const STORAGE_KEY = 'metro_recent_searches_v1';

export function loadRecent() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr;
  } catch {
    return [];
  }
}

export function saveRecent(items) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function RecentSearches({ recent, onPick, onClearAll }) {
  const visible = useMemo(() => recent.slice(0, 6), [recent]);

  if (!visible.length) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">Recent Searches</h3>
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-semibold text-blue-700 dark:text-blue-300 hover:underline"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {visible.map((r, idx) => (
          <button
            key={`${r.source}-${r.dest}-${idx}`}
            type="button"
            onClick={() => onPick(r)}
            className="text-left rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 px-3 py-2 hover:bg-white dark:hover:bg-gray-900 transition"
          >
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {r.source} → {r.dest}
            </div>
            {typeof r.travelTimeMins === 'number' && (
              <div className="text-xs text-gray-600 dark:text-gray-300">
                ⏱️ ~{Math.round(r.travelTimeMins)} min • ₹{r.price ?? 0}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

