import React, { useMemo, useState } from 'react';

const LINE_COLORS = {
  "Blue": "var(--accent-1)",
  "Green": "var(--accent-2)",
  "Purple": "#9333EA",
  "Orange": "#EA580C",
  "Pink": "#EC4899",
  "Yellow": "#EAB308",
};


function getLineKey(lineName) {
  if (!lineName) return null;
  const parts = ["Blue", "Green", "Purple", "Orange", "Pink", "Yellow"];
  return parts.find((p) => lineName.includes(p)) || null;
}

// Simple fixed layout for the demo stations (not geography-accurate).
// Coordinates are tuned to be legible on mobile.
const NODES = {
  // Blue/NS core
  "Dum Dum": { x: 70, y: 70 },
  "Belgachia": { x: 120, y: 90 },
  "Shyambazar": { x: 175, y: 115 },
  "Sovabazar": { x: 220, y: 130 },
  "Girish Park": { x: 270, y: 145 },
  "MG Road": { x: 320, y: 165 },
  "Central": { x: 360, y: 195 },
  "Chandni Chowk": { x: 405, y: 220 },
  "Esplanade": { x: 470, y: 250 },
  "Park Street": { x: 460, y: 200 },
  "Maidan": { x: 430, y: 175 },
  "Rabindra Sadan": { x: 390, y: 255 },
  "Kalighat": { x: 420, y: 305 },
  "Jatin Das Park": { x: 450, y: 335 },
  "Netaji Bhavan": { x: 480, y: 365 },
  "Rabindra Sarobar": { x: 520, y: 345 },
  "Mahanayak Uttam Kumar": { x: 560, y: 315 },
  "Netaji": { x: 595, y: 285 },
  "Masterda Surya Sen": { x: 630, y: 255 },
  "Gitanjali": { x: 665, y: 225 },
  "Kavi Nazrul": { x: 700, y: 205 },
  "Shahid Khudiram": { x: 735, y: 190 },
  "Kavi Subhash": { x: 780, y: 175 },

  // Green/EW (passes through Esplanade)
  "Sealdah": { x: 470, y: 60 },
  "Phoolbagan": { x: 440, y: 95 },
  "Salt Lake Stadium": { x: 410, y: 125 },
  "Bengal Chemical": { x: 380, y: 155 },
  "City Centre 1": { x: 350, y: 185 },
  "Karunamoyee": { x: 330, y: 215 },
  "Central Park": { x: 350, y: 245 },
  "Milon Mela": { x: 380, y: 275 },
  "VIP Bazar": { x: 430, y: 310 },
  "Barun Sengupta": { x: 470, y: 345 },
  "Howrah Maidan": { x: 515, y: 365 },
  "Howrah": { x: 560, y: 390 },
  "Mahakaran": { x: 610, y: 370 },

  // Purple/Joka line
  "Joka": { x: 250, y: 420 },
  "Thakurpukur": { x: 300, y: 390 },
  "Sakherbazar": { x: 340, y: 360 },
  "Behala Chowrasta": { x: 380, y: 330 },
  "Behala Bazar": { x: 410, y: 300 },
  "Taratala": { x: 440, y: 270 },
  "Majerhat": { x: 470, y: 240 },
  "Mominpur": { x: 500, y: 220 },
  "Kidderpore": { x: 535, y: 205 },
  "Victoria": { x: 570, y: 210 },

  // Orange / Airport
  "Barasat": { x: 120, y: 360 },
  "Hridaypur": { x: 185, y: 330 },
  "Madhyamgram": { x: 240, y: 300 },
  "New Barrackpore": { x: 285, y: 275 },
  "Michael Nagar": { x: 335, y: 250 },
  "Biman Bandar": { x: 720, y: 130 },

  // Pink / Baranagar-Barrackpore
  "Baranagar": { x: 780, y: 260 },
  "Noapara": { x: 720, y: 290 },
  "Bonhooghly": { x: 650, y: 310 },
  "Dakshineswar": { x: 590, y: 320 },
  "Khardaha": { x: 530, y: 335 },
  "Titagarh": { x: 470, y: 355 },
  "Barrackpore": { x: 410, y: 375 },

  // Yellow / New Garia-Airport
  "Satyajit Ray": { x: 780, y: 205 },
  "Hiland Park": { x: 750, y: 220 },
  "Ruby": { x: 720, y: 235 },
  "Science City": { x: 650, y: 260 },
  "Salt Lake Bypass": { x: 600, y: 245 },
  "Nicco Park": { x: 560, y: 255 },
  "Beliaghata": { x: 520, y: 270 },
  "Chingrighata": { x: 480, y: 265 },
};

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export default function RouteVisualizer({ segments = [], interchangePoints = [] }) {
  const [animateKey, setAnimateKey] = useState(0);

  const routeEdgeDefs = useMemo(() => {
    return segments.map((seg, idx) => {
      const a = NODES[seg.from];
      const b = NODES[seg.to];
      if (!a || !b) return null;
      const lineKey = getLineKey(seg.line);
      const color = (lineKey && LINE_COLORS[lineKey]) || '#6B7280';
      return {
        idx,
        seg,
        a,
        b,
        color,
        len: dist(a, b),
      };
    }).filter(Boolean);
  }, [segments]);

  const nodesOnRoute = useMemo(() => {
    const set = new Set();
    segments.forEach((s) => {
      if (NODES[s.from]) set.add(s.from);
      if (NODES[s.to]) set.add(s.to);
    });
    return [...set];
  }, [segments]);

  // Route animation: just bump key when segments change.
  React.useEffect(() => {
    setAnimateKey((k) => k + 1);
  }, [segments]);

  return (
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-extrabold text-[#106EBE]">Metro Map</h3>

        <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">
          Highlighting computed route
        </div>
      </div>

      <div className="mt-3">
        <svg
          key={animateKey}
          viewBox="0 0 900 450"
          className="w-full h-auto"
          role="img"
          aria-label="Metro map"
        >
          {/* Background faint nodes/edges */}
          <defs>
            <linearGradient id="routeGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#3B82F6" stopOpacity="0.9" />
              <stop offset="1" stopColor="#9333EA" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Draw nodes */}
          {nodesOnRoute.map((name) => {
            const p = NODES[name];
            const isInterchange = interchangePoints.includes(name);
            if (!p) return null;
            return (
              <g key={name} className="metro-node">
                <circle cx={p.x} cy={p.y} r={isInterchange ? 10 : 7} fill={isInterchange ? '#F59E0B' : 'var(--accent-1)'} opacity={0.18} />
                <circle cx={p.x} cy={p.y} r={isInterchange ? 7 : 5} fill={isInterchange ? '#F59E0B' : 'var(--accent-1)'} />

                <text
                  x={p.x + 9}
                  y={p.y + 4}
                  fontSize="10"
                  fill={"#111827"}
                  opacity={0.85}
                  style={{ userSelect: 'none' }}
                  className="dark:fill-gray-100"
                >
                  {name.split(' ').slice(0, 2).join(' ')}
                </text>

              </g>
            );
          })}

          {/* Route edges with animation */}
          {routeEdgeDefs.map(({ idx, a, b, color, len }) => {
            const dash = Math.max(8, len * 0.25);
            return (
              <g key={idx}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={color}
                  strokeWidth={6}
                  opacity={0.18}
                />
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={color}
                  strokeWidth={3.5}
                  className="metro-edge"
                  strokeDasharray={`${dash} ${len}`}
                  style={{ animation: 'dash 900ms ease-in-out both' }}
                />
              </g>
            );
          })}

          {/* Inline keyframes workaround */}
          <style>{`@keyframes dash{from{stroke-dashoffset:${50};opacity:0.75}to{stroke-dashoffset:0;opacity:1}}`}</style>
        </svg>

        {segments.length === 0 && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Select source & destination to visualize the route.
          </div>
        )}
      </div>
    </div>
  );
}

