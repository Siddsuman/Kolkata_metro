import React from 'react';

export default function AppCtaSection() {
  return (
    <section className="w-full mt-10">
      <div className="max-w-5xl mx-auto p-4 sm:p-0">
        <div className="rounded-3xl bg-[#106EBE] text-white overflow-hidden border border-white/15">
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/12 border border-white/15">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0FFCBE]" />
                  <span className="text-xs font-semibold">Metro on the go</span>
                </div>

                <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold">Download Metro App Now</h2>
                <p className="mt-2 text-white/80 text-sm sm:text-base">
                  Plan journeys, check fares, and get live updates—fast.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:justify-end gap-3">
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#0FFCBE] text-[#0A2A2A] font-bold uppercase tracking-wide px-5 py-3 text-sm shadow-[0_0_0_1px_rgba(15,255,198,0.35),0_12px_35px_rgba(15,255,198,0.25)] hover:brightness-105 transition"
                >
                  Get the App
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-white font-bold uppercase tracking-wide px-5 py-3 text-sm hover:bg-white/15 transition"
                >
                  Learn More
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

