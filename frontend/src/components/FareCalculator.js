import React from 'react';

export default function FareCalculator({ price }) {
  if (typeof price !== 'number') return null;

  return (
    <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 p-4 sm:p-5">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Fare Calculator</h3>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">Estimated Fare</div>
          <div className="mt-1 text-3xl font-extrabold text-[#0FFCBE] drop-shadow-sm">
            ₹{price}
          </div>
        </div>
        <div className="text-right text-xs text-gray-600 dark:text-gray-300">
          Model: ₹5 base + ₹2 per stop hop (demo).
        </div>
      </div>
    </div>
  );
}


