import React from 'react';

function StatusCard({ title, value, tone }) {
  const isOnTime = tone === 'on';
  const bg = isOnTime ? 'bg-emerald-50/70 dark:bg-emerald-400/10' : 'bg-red-50/70 dark:bg-red-400/10';
  const border = isOnTime ? 'border-emerald-200/80 dark:border-emerald-400/20' : 'border-red-200/80 dark:border-red-400/20';
  const text = isOnTime ? 'text-emerald-800 dark:text-emerald-200' : 'text-red-800 dark:text-red-200';

  return (
    <div className={`rounded-3xl border ${border} ${bg} p-4 sm:p-5`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">{title}</div>
          <div className={`mt-2 text-xl font-extrabold ${text}`}>{value}</div>
        </div>
        <div className={`w-12 h-12 rounded-2xl border ${border} flex items-center justify-center ${text} bg-white/60 dark:bg-black/20`}>
          {isOnTime ? '✅' : '⚠️'}
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Demo status UI (wire to backend updates when available).
      </div>
    </div>
  );
}

export default function LiveStatusSection() {
  return (
    <section className="w-full">
      <div className="max-w-5xl mx-auto p-4 sm:p-0">
        <div className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-[#106EBE]">Live Status & Updates</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Stay informed before you travel.</p>
            </div>
            <div className="hidden sm:block text-xs font-semibold uppercase tracking-wide text-[#106EBE]">
              Mint highlight • Clear alerts
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <StatusCard title="On Time" value="Running as scheduled" tone="on" />
            <StatusCard title="Train Delayed" value="Minor delays in peak" tone="delay" />
          </div>
        </div>
      </div>
    </section>
  );
}

