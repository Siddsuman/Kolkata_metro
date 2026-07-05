import React from 'react';

export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="relative overflow-hidden rounded-3xl border border-blue-200/60 dark:border-blue-200/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#106EBE] via-[#0B74C9] to-[#0FFCBE] opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.28),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.20),transparent_45%)]" />

        <div className="relative p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/14 text-white text-xs font-semibold border border-white/20">
                <span className="w-2.5 h-2.5 rounded-full bg-mint" />
                <span>Fast. Reliable. Easy to navigate.</span>
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight text-white">
                Smart{' '}
                <span className="text-[#0FFCBE]">Metro</span> Travel for a Smarter City
              </h2>

              <p className="mt-3 text-white/80 text-sm sm:text-base max-w-xl">
                Check routes, fares, timings, and travel smarter every day
              </p>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <a
                  href="#route-finder"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#0FFCBE] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#0A2A2A] shadow-[0_0_0_1px_rgba(15,255,198,0.35),0_10px_30px_rgba(15,255,198,0.25)] hover:brightness-105 transition"
                >
                  Plan Your Journey
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <div className="rounded-3xl bg-white/10 border border-white/20 p-4 sm:p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div className="text-white/90">
                      <div className="text-xs font-semibold uppercase tracking-wider text-white/80">Live Journey Preview</div>
                      <div className="mt-1 text-base font-bold">Kolkata Metro</div>
                    </div>
                    <div className="rounded-2xl bg-white/15 border border-white/25 px-3 py-2">
                      <div className="text-xs font-semibold text-white/80">Avg. speed</div>
                      <div className="text-sm font-bold text-white">Fast</div>
                    </div>
                  </div>

                  <div className="mt-5">
                    {/* Simple train illustration */}
                    <svg viewBox="0 0 520 240" className="w-full h-auto" role="img" aria-label="Metro train illustration">
                      <defs>
                        <linearGradient id="trainMint" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0" stopColor="#0FFCBE" stopOpacity="1" />
                          <stop offset="1" stopColor="#8BFFD9" stopOpacity="1" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      <path
                        d="M85 140 C85 115, 105 95, 130 95 H350 C370 95, 388 102, 402 116 L450 130 C470 136, 485 150, 485 170 V178 C485 198, 470 212, 450 212 H115 C95 212, 85 200, 85 182 Z"
                        fill="url(#trainMint)"
                        opacity="0.95"
                        filter="url(#glow)"
                      />
                      <path d="M115 140 H445" stroke="#0A2A2A" strokeOpacity="0.35" strokeWidth="6" strokeLinecap="round" />

                      <g>
                        {[140, 205, 270, 335, 400].map((x, i) => (
                          <g key={i} transform={`translate(${x} 170)`}>
                            <circle r="22" fill="#0A2A2A" opacity="0.35" />
                            <circle r="14" fill="#0A2A2A" opacity="0.55" />
                            <circle r="6" fill="#0FFCBE" opacity="0.9" />
                          </g>
                        ))}
                      </g>

                      {/* Windows */}
                      {[160, 200, 240, 280, 320, 360, 400].map((x, i) => (
                        <rect key={i} x={x} y={115} width={26} height={22} rx={6} fill="#0A2A2A" opacity="0.18" />
                      ))}

                      {/* Track line */}
                      <path d="M70 210 C140 230, 380 230, 480 210" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="6" fill="none" strokeLinecap="round" />

                      {/* Moving accent dots (CSS animation not required; simple static for now) */}
                      <circle cx="110" cy="190" r="6" fill="#0FFCBE" opacity="0.85" />
                      <circle cx="240" cy="198" r="5" fill="#ffffff" opacity="0.6" />
                      <circle cx="370" cy="190" r="6" fill="#0FFCBE" opacity="0.85" />
                    </svg>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[{ t: 'Routes', v: 'Ready' }, { t: 'Fares', v: 'Transparent' }, { t: 'Timings', v: 'On schedule' }].map(
                      (x) => (
                        <div key={x.t} className="rounded-2xl bg-white/10 border border-white/15 p-3">
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-white/70">{x.t}</div>
                          <div className="text-sm font-bold text-white">{x.v}</div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

