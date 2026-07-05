import React from 'react';

export default function MetroStatsDashboard({
  routeStats,
  linesCount = 6,
  stationsCount = 0,
}) {
  const {
    totalStations = 0,
    lineChanges = 0,
    price = 0,
    travelTimeMins,
  } = routeStats || {};

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 p-4">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Metro Statistics Dashboard</h3>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 p-3">
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">Lines (demo)</div>
          <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{linesCount}</div>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 p-3">
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">Stations (demo)</div>
          <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{stationsCount}</div>
        </div>

        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 p-3">
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">Stops</div>
          <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{totalStations}</div>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 p-3">
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">Line Changes</div>
          <div className="text-lg font-bold text-orange-700 dark:text-orange-300">{lineChanges}</div>
        </div>

        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 p-3 col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">Fare</div>
              <div className="text-lg font-bold text-green-700 dark:text-green-300">₹{price ?? 0}</div>
            </div>
            {typeof travelTimeMins === 'number' ? (
              <div className="text-right">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">Time</div>
                <div className="text-lg font-bold text-purple-700 dark:text-purple-300">~{Math.round(travelTimeMins)} min</div>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

