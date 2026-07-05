import React from 'react';

function Stat({ label, value, sub }) {
  return (
    <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-gray-950/30 p-4 backdrop-blur">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
        {label}
      </div>
      <div className="mt-2 text-xl font-extrabold text-gray-900 dark:text-gray-100">
        {value}
      </div>
      {sub ? <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">{sub}</div> : null}
    </div>
  );
}

function Field({ title, value }) {
  return (
    <div className="p-3 rounded-2xl bg-white/50 dark:bg-gray-900/30 border border-gray-200/60 dark:border-gray-800/60">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
        {title}
      </div>
      <div className="mt-1 text-sm font-bold text-gray-900 dark:text-gray-100">{value || '—'}</div>
    </div>
  );
}

export default function JourneySummaryCard({
  travelTimeMins,
  price,
  totalStations,
  lineChanges,
  firstTrain,
  lastTrain,
  nextArrival,
}) {
  const timeLabel = typeof travelTimeMins === 'number' ? `~${Math.round(travelTimeMins)} min` : '—';
  const fareLabel = typeof price === 'number' ? `₹${price}` : '—';

  return (
    <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-gray-950/30 p-4 sm:p-6 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-gray-100">
            Journey Summary
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            Overview of time, fare, stations and service details.
          </p>
        </div>
        <div className="hidden sm:block rounded-2xl bg-blue-500/10 border border-blue-500/20 px-3 py-2 text-xs font-semibold text-blue-700 dark:text-blue-200">
          Public transit style
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat label="Total time" value={timeLabel} sub="Estimated duration" />
        <Stat label="Fare" value={fareLabel} sub="Based on hops" />
        <Stat label="Stations" value={typeof totalStations === 'number' ? totalStations : 0} sub="Stops along the way" />
        <Stat label="Interchanges" value={typeof lineChanges === 'number' ? lineChanges : 0} sub="Line changes" />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field title="First train" value={firstTrain} />
        <Field title="Last train" value={lastTrain} />
        <Field title="Next arrival" value={nextArrival} />
      </div>
    </div>
  );
}

