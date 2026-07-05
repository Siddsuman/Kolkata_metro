import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full mt-10">
      <div className="bg-[#071C3A] text-white">
        <div className="max-w-5xl mx-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-lg font-extrabold">Kolkata Metro</div>
              <div className="mt-2 text-sm text-white/70">
                Smart routes, clear fares, and real-time updates (demo UI).
              </div>
            </div>

            <div>
              <div className="text-sm font-bold uppercase tracking-wide text-white/90">Links</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                {['Plan Journey', 'Route Finder', 'Live Status', 'Fare Calculator'].map((x) => (
                  <a
                    key={x}
                    href={x === 'Route Finder' ? '#route-finder' : '#'}
                    className="text-white/80 hover:text-[#0FFCBE] transition"
                  >
                    {x}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-bold uppercase tracking-wide text-white/90">Contact</div>
              <div className="mt-3 text-sm text-white/70">
                Help Desk: <span className="text-white">1800-000-000</span>
                <div className="mt-2">Email: <span className="text-white">support@metro.example</span></div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 text-xs text-white/60 flex flex-col sm:flex-row gap-2 justify-between">
            <div>© {new Date().getFullYear()} Kolkata Metro. All rights reserved.</div>
            <div className="flex gap-3">
              {['Privacy', 'Terms', 'Accessibility'].map((x) => (
                <a key={x} href="#" className="hover:text-[#0FFCBE] transition">
                  {x}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

