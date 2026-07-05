import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function StationAutocomplete({
  label,
  stations,
  value,
  onChange,
  placeholder = 'Type station name...',
  id,
}) {
  const [q, setQ] = useState(value || '');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);

  useEffect(() => {
    setQ(value || '');
  }, [value]);

  const filtered = useMemo(() => {
    const query = (q || '').trim().toLowerCase();
    // Show all stations/matches (no hard caps)
    if (!query) return stations;
    return stations.filter((s) => s.toLowerCase().includes(query));

  }, [q, stations]);

  useEffect(() => {
    const onDoc = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const commit = (station) => {
    onChange(station);
    setQ(station);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor={id}>
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            onChange(e.target.value);
            setOpen(true);
            setActiveIndex(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) setOpen(true);
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            }
            if (e.key === 'Enter') {
              e.preventDefault();
              const pick = filtered[activeIndex];
              if (pick) commit(pick);
            }
            if (e.key === 'Escape') {
              setOpen(false);
            }
          }}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0FFCBE] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"

        />

        {open && filtered.length > 0 && (
          <div className="absolute z-20 mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
            {filtered.map((s, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={s}
                  type="button"
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-[#0FFCBE]/10 hover:text-gray-900 dark:hover:text-gray-50 transition ${
                    isActive ? 'bg-[#0FFCBE]/15 text-gray-900 dark:text-gray-50 font-semibold' : ''
                  }`}

                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => commit(s)}
                >
                  {s}
                </button>
              );
            })}
          </div>
        )}

        {q && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              setQ('');
              setOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            aria-label="Clear"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

