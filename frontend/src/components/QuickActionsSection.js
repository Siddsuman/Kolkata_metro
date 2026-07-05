import React from 'react';

function ActionCard({ title, subtitle, icon }) {
  return (
    <button
      type="button"
      className="group text-left rounded-3xl border border-gray-200 dark:border-gray-800 bg-white p-4 sm:p-5 transition"
      onClick={() => {
        // Intentionally no-op: App.js can wire scroll/navigation later.
      }}
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-2xl bg-[#0FFCBE]/10 border border-[#0FFCBE]/30 flex items-center justify-center transition group-hover:shadow-[0_0_0_5px_rgba(15,255,198,0.18)]">
          <div className="text-[#0FFCBE]">{icon}</div>
        </div>
        <div className="min-w-0">
          <div className="font-bold text-gray-800 dark:text-gray-100">{title}</div>
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-300">{subtitle}</div>
        </div>
      </div>

      <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300 opacity-80 group-hover:opacity-100">
        Explore →
      </div>
    </button>
  );
}

export default function QuickActionsSection() {
  return (
    <section className="w-full">
      <div className="max-w-5xl mx-auto p-4 sm:p-0">
        <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <ActionCard title="Find Route" subtitle="Fast route steps & interchange" icon="🧭" />
          <ActionCard title="Check Fare" subtitle="Estimate fare instantly" icon="₹" />
          <ActionCard title="Metro Map" subtitle="Interactive line visualization" icon="🗺️" />
          <ActionCard title="Station Info" subtitle="Search stations & timings" icon="🏛️" />
        </div>
      </div>
    </section>
  );
}

