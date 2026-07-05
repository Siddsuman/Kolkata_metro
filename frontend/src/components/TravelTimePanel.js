import React from 'react';

export default function TravelTimePanel({ travelTimeMins, segments = [] }) {
  if (typeof travelTimeMins !== 'number') return null;

  const total = segments.reduce((s, seg) => s + (seg.timeMins || 0), 0);

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 p-4">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Travel Time Estimation</h3>
      <div className="mt-2 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 p-3">
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">Total</div>
          <div className="text-lg font-bold text-blue-700 dark:text-blue-300">~{Math.round(travelTimeMins)} min</div>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 p-3">
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">Segments sum</div>
          <div className="text-lg font-bold text-purple-700 dark:text-purple-300">~{Math.round(total)} min</div>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Model (demo): base hop time + interchange buffer (from backend platform interchangeTime).
      </div>
    </div>
  );
}

