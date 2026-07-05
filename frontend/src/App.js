import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import DarkModeToggle from './components/DarkModeToggle';
import StationAutocomplete from './components/StationAutocomplete';
import RecentSearches, { loadRecent, saveRecent } from './components/RecentSearches';

import TravelTimePanel from './components/TravelTimePanel';
import FareCalculator from './components/FareCalculator';
import LiveStatusSection from './components/LiveStatusSection';
import JourneySummaryCard from './components/JourneySummaryCard';
import PopularRoutesSection from './components/PopularRoutesSection';
import Footer from './components/Footer';



function App() {
  const [stations, setStations] = useState([]);

  // Used for UX “redirect” to the route options/route steps area
  const routeStepsRef = useRef(null);

  const [source, setSource] = useState('');

  const [destination, setDestination] = useState('');


  const [route, setRoute] = useState([]);
  const [routeWithLines, setRouteWithLines] = useState([]);
  const [segments, setSegments] = useState([]);

  const [travelTimeMins, setTravelTimeMins] = useState(null);
  const [price, setPrice] = useState(0);

  const [message, setMessage] = useState('');
  const [totalStations, setTotalStations] = useState(0);
  const [lineChanges, setLineChanges] = useState(0);
  const [interchangePoints, setInterchangePoints] = useState([]);

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/lines')
      .then((response) => {
        const allStations = [];
        Object.values(response.data).forEach((line) => {
          allStations.push(...line.stations);
        });
        setStations([...new Set(allStations)].sort((a, b) => a.localeCompare(b)));
      })
      .catch((error) => {
        console.error('Error fetching stations:', error);
      });

    setRecent(loadRecent());
  }, []);

  const canSearch = useMemo(() => {
    return Boolean(source && destination && source !== destination);
  }, [source, destination]);

  const getRoute = async (src, dst) => {
    const res = await fetch(`http://localhost:5000/route?source=${encodeURIComponent(src)}&dest=${encodeURIComponent(dst)}`);
    const data = await res.json();

    setRoute(data.route || []);
    setRouteWithLines(data.routeWithLines || []);
    setSegments(data.segments || []);

    setTravelTimeMins(typeof data.travelTimeMins === 'number' ? data.travelTimeMins : null);
    setPrice(data.price || 0);
    setMessage(data.message || '');

    setTotalStations(data.totalStations || 0);
    setLineChanges(data.lineChanges || 0);
    setInterchangePoints(data.interchangePoints || []);

    return data;
  };

  const scrollToRouteSteps = () => {
    try {
      routeStepsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {
      // ignore
    }
  };

  const handleGetRoute = async () => {
    if (!source || !destination) {
      setMessage('Please select source and destination.');
      return;
    }


    if (source === destination) {
      setMessage('Source and destination cannot be the same.');
      return;
    }

    const data = await getRoute(source, destination);

    // Save recent only when route exists
    if (Array.isArray(data?.route) && data.route.length > 1) {
      const item = {
        source,
        dest: destination,
        price: data.price,
        travelTimeMins: data.travelTimeMins,
        ts: Date.now(),
      };
      const next = [item, ...recent.filter((r) => !(r.source === item.source && r.dest === item.dest))].slice(0, 8);
      setRecent(next);
      saveRecent(next);
    }
  };

  const routeItems = useMemo(() => {
    return routeWithLines.map((item, index) => {
      const isInterchange = interchangePoints.includes(item.station);
      return { item, index, isInterchange };
    });
  }, [routeWithLines, interchangePoints]);

  const getLineColor = (lineName) => {
    if (!lineName) return 'bg-gray-600';
    if (lineName.includes('Blue')) return 'bg-blue-600';
    if (lineName.includes('Green')) return 'bg-green-600';
    if (lineName.includes('Purple')) return 'bg-purple-600';
    if (lineName.includes('Orange')) return 'bg-orange-600';
    if (lineName.includes('Pink')) return 'bg-pink-600';
    if (lineName.includes('Yellow')) return 'bg-yellow-600';
    return 'bg-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900 flex flex-col items-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-4">
            <img
              src="/IMG_20260221_221750.png"
              alt="Kolkata Metro"
              className="w-20 sm:w-24 md:w-28 h-auto rounded-xl shadow-md"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                Kolkata Metro
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Routes • Fare • Timings • Map</p>
            </div>
          </div>
          <DarkModeToggle />
        </div>
      </div>

      {/* Route Finder Section (Top) */}
      <section id="route-finder" className="w-full" ref={routeStepsRef}>
        <div className="max-w-5xl mx-auto mt-4 p-4 sm:p-0">

          <div className="rounded-3xl bg-[#EAF4FF] border border-blue-100 dark:border-blue-950/40 p-4 sm:p-6">

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">



              <div className="lg:col-span-2 space-y-3">
                  <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-[#106EBE]">Metro Route Planner</h2>
                </div>

                <StationAutocomplete
                  id="source"
                  label="From"
                  stations={stations}
                  value={source}
                  onChange={setSource}
                  placeholder="Search source station..."
                />
                <StationAutocomplete
                  id="destination"
                  label="To"
                  stations={stations}
                  value={destination}
                  onChange={setDestination}
                  placeholder="Search destination station..."
                />

                <button
                  type="button"
                  onClick={handleGetRoute}
                  disabled={!canSearch}
                  className={`w-full py-3 rounded-2xl font-bold uppercase tracking-wide transition ${
                    canSearch
                      ? 'bg-[#0FFCBE] hover:brightness-105 text-[#0A2A2A]'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400'
                  }`}
                >
                  Search Route
                </button>

                {message && <p className="text-red-600 dark:text-red-400 text-sm font-semibold">{message}</p>}
              </div>

              <div className="lg:col-span-3 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TravelTimePanel travelTimeMins={travelTimeMins} segments={segments} />
                  <FareCalculator price={price} />
                </div>

                <JourneySummaryCard
                  travelTimeMins={travelTimeMins}
                  price={price}
                  totalStations={totalStations}
                  lineChanges={lineChanges}
                  firstTrain={null}
                  lastTrain={null}
                  nextArrival={null}
                />

              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-1">
                <RecentSearches
                  recent={recent}
                  onPick={async (r) => {
                    setSource(r.source);
                    setDestination(r.dest);
                    setMessage('');
                    await getRoute(r.source, r.dest);
                    scrollToRouteSteps();
                  }}
                  onClearAll={() => {
                    const empty = [];
                    setRecent(empty);
                    saveRecent(empty);
                  }}
                />


                <div className="mt-4">
                  <PopularRoutesSection
                    onPick={async (from, to) => {
                      setSource(from);
                      setDestination(to);
                      setMessage('');
                      await getRoute(from, to);
                      scrollToRouteSteps();
                    }}
                  />

                </div>
              </div>

              <div className="lg:col-span-2">
                {route.length > 0 ? (
                  <div className="space-y-3">
                    {lineChanges > 0 && (
                      <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900/40">
                        <p className="text-sm font-medium text-orange-800 dark:text-orange-200 mb-2">Change at</p>
                        <div className="flex flex-wrap gap-2">
                          {interchangePoints.map((p, idx) => (
                            <span key={`${p}-${idx}`} className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/40 p-4">
                      <h2 className="text-lg font-extrabold text-gray-900 dark:text-gray-100">Route Steps</h2>
                      <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
                        {routeItems.map(({ item, index, isInterchange }) => (
                          <div
                            key={`${item.station}-${index}`}
                            className={`p-3 rounded-2xl ${
                              isInterchange
                                ? 'bg-yellow-50 dark:bg-yellow-500/10 border-l-4 border-yellow-400'
                                : 'bg-gray-50 dark:bg-gray-800/30'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getLineColor(item.line)} text-white`}
                              >
                                {index + 1}
                              </span>
                              <span
                                className={`flex-1 font-medium ${
                                  isInterchange
                                    ? 'text-orange-800 dark:text-orange-200'
                                    : 'text-gray-800 dark:text-gray-100'
                                }`}
                              >
                                {item.station}
                              </span>
                              <span
                                className={`px-2 py-1 text-xs text-white rounded ${getLineColor(item.line)}`}
                              >
                                {(item.line || '').split(' ')[0]}
                              </span>
                            </div>

                            {(index === 0 || isInterchange) && (
                              <div className="mt-2 ml-11 text-xs text-gray-700 dark:text-gray-200 bg-white/60 dark:bg-gray-800/30 p-2 rounded-2xl">
                                <div className="font-semibold text-[#106EBE] dark:text-[#7AB3FF]">
                                  {item.platform || 'Platform 1'}
                                </div>
                                {item.towards && <div>→ towards {item.towards}</div>}
                                {isInterchange && item.interchangeTime > 0 && (
                                  <div className="text-orange-700 dark:text-orange-200 font-semibold">
                                    ⏱️ Interchange: {item.interchangeTime} min
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-8 text-center text-gray-600 dark:text-gray-300">
                    Enter source & destination to see route visualization.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full mt-6">
        <LiveStatusSection />
      </div>

      <div className="w-full mt-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-0">
          <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-gray-950/30 p-4 sm:p-6 backdrop-blur">
            <h2 className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-gray-100">Popular routes</h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">Curated quick picks to start planning</p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <PopularRoutesSection
                onPick={async (from, to) => {
                  setSource(from);
                  setDestination(to);
                  setMessage('');
                  await getRoute(from, to);
                  scrollToRouteSteps();
                }}
              />
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );

}

export default App;

