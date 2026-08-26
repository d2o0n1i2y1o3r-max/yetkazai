'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useStore } from '@/store/useStore';
import { resources } from '@/lib/i18n';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Routes() {
  const { language, routeStops, pickupLocation, setRouteStops, addRouteStop, removeRouteStop, setPickupLocation, clearRoute } = useStore();
  const t = resources[language as keyof typeof resources].translation;
  const [optimized, setOptimized] = useState(false);
  const [timeSaved, setTimeSaved] = useState(0);
  const [newStop, setNewStop] = useState({ address: '', lat: 41.3111, lng: 69.2797 });

  const handleAddStop = () => {
    if (newStop.address) {
      addRouteStop({
        id: Date.now().toString(),
        address: newStop.address,
        lat: newStop.lat + (Math.random() - 0.5) * 0.02,
        lng: newStop.lng + (Math.random() - 0.5) * 0.02
      });
      setNewStop({ address: '', lat: 41.3111, lng: 69.2797 });
    }
  };

  const handleOptimize = () => {
    if (routeStops.length < 2) return;

    const unoptimizedTime = routeStops.length * 15;
    const optimizedTime = Math.round(unoptimizedTime * 0.7);
    setTimeSaved(unoptimizedTime - optimizedTime);

    const optimizedStops = [...routeStops];
    for (let i = 1; i < optimizedStops.length; i++) {
      let minDist = Infinity;
      let minIdx = i;
      for (let j = i; j < optimizedStops.length; j++) {
        const dist = Math.sqrt(
          Math.pow(optimizedStops[i-1].lat - optimizedStops[j].lat, 2) +
          Math.pow(optimizedStops[i-1].lng - optimizedStops[j].lng, 2)
        );
        if (dist < minDist) {
          minDist = dist;
          minIdx = j;
        }
      }
      [optimizedStops[i], optimizedStops[minIdx]] = [optimizedStops[minIdx], optimizedStops[i]];
    }

    setRouteStops(optimizedStops);
    setOptimized(true);
  };

  const handleClear = () => {
    clearRoute();
    setOptimized(false);
    setTimeSaved(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {t.routes.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {t.routes.addStop}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newStop.address}
                onChange={(e) => setNewStop({ ...newStop, address: e.target.value })}
                placeholder="Enter delivery address"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleAddStop}
                disabled={!newStop.address}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add Stop
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Stops ({routeStops.length})
            </h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {routeStops.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No stops added yet
                </p>
              ) : (
                routeStops.map((stop, index) => (
                  <div
                    key={stop.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-gray-900 dark:text-white">{stop.address}</span>
                    </div>
                    <button
                      onClick={() => removeRouteStop(stop.id)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleOptimize}
              disabled={routeStops.length < 2}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {t.routes.optimize}
            </button>
            <button
              onClick={handleClear}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Clear
            </button>
          </div>

          {optimized && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-green-800 dark:text-green-200 font-semibold">
                {t.routes.optimized}: {timeSaved} {t.routes.timeSaved}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="h-[600px] rounded-lg overflow-hidden">
            <Map stops={routeStops} pickup={pickupLocation} optimized={optimized} />
          </div>
        </div>
      </div>
    </div>
  );
}