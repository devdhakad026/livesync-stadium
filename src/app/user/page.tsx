"use client";

import { useStadiumSync } from "@/lib/store";
import { AlertCircle, MapPin, Coffee, Navigation, Clock, Bell, Info } from "lucide-react";
import { useState } from "react";
import { concessionMenu } from "@/lib/mockData";

export default function UserPage() {
  const { state, isClient } = useStadiumSync();
  const [activeTab, setActiveTab] = useState<'map' | 'food'>('map');
  const [orderStatus, setOrderStatus] = useState<null | { id: string, time: number }>(null);

  if (!isClient) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center">Loading...</div>;

  const handleOrder = () => {
    // Mock 5 minute prep time
    setOrderStatus({ id: "ORD-" + Math.floor(Math.random() * 10000), time: Date.now() + 5 * 60000 });
  };

  const getDensityColor = (density: number) => {
    if (density < 40) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    if (density < 75) return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    return "text-rose-400 bg-rose-400/10 border-rose-400/20";
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-neutral-950 pb-20 border-x border-neutral-900 relative shadow-2xl">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-lg text-white">StadiumSync</h1>
            <p className="text-xs text-neutral-400">Holkar Stadium • Sec 110, Row G</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
            <span className="text-sm font-semibold">B-23</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Alerts */}
        {state.activeAlerts.map(alert => (
          <div key={alert.id} className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex gap-3 animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-rose-500 font-semibold text-sm">Live Update</h3>
              <p className="text-rose-200/80 text-sm mt-1">{alert.message}</p>
            </div>
          </div>
        ))}

        {activeTab === 'map' ? (
          <>
            {/* Facilities / Routing */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-400" />
                Smart Routing
              </h2>
              <div className="space-y-3">
                {state.facilities.map(facility => (
                  <div key={facility.id} className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-neutral-200">{facility.name}</h3>
                        <p className="text-xs text-neutral-500 capitalize">{facility.type}</p>
                      </div>
                      {facility.isRecommended && (
                        <span className="px-2 py-1 text-[10px] font-bold tracking-wider uppercase bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/20">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className={`p-2 rounded-lg border flex flex-col gap-1 ${getDensityColor(facility.crowdDensity)}`}>
                        <span className="text-[10px] uppercase font-semibold opacity-80">Crowd</span>
                        <span className="text-lg font-bold">{facility.crowdDensity}%</span>
                      </div>
                      <div className={`p-2 rounded-lg border flex flex-col gap-1 ${getDensityColor(facility.queueMinutes * 5)}`}>
                        <span className="text-[10px] uppercase font-semibold opacity-80">Wait Time</span>
                        <span className="text-lg font-bold">{facility.queueMinutes} min</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Concessions */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-amber-400" />
                Just-In-Time Ordering
              </h2>
              
              {orderStatus ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-emerald-400 font-bold text-lg">Order #{orderStatus.id}</h3>
                    <p className="text-neutral-400 text-sm mt-1">Leave your seat in exactly:</p>
                    <p className="text-3xl font-black text-white mt-2">4 min 32 sec</p>
                  </div>
                  <button onClick={() => setOrderStatus(null)} className="text-sm text-emerald-400 underline mt-4">New Order</button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex gap-3 text-sm text-blue-200">
                    <Info className="w-5 h-5 shrink-0 text-blue-400" />
                    <p>Order now and we'll tell you exactly when to leave your seat to avoid the queue.</p>
                  </div>
                  {concessionMenu.map(item => (
                    <div key={item.id} className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-neutral-200">{item.name}</h3>
                        <p className="text-sm text-neutral-500">${item.price.toFixed(2)}</p>
                      </div>
                      <button onClick={handleOrder} className="px-4 py-2 bg-amber-500 text-black font-semibold rounded-lg text-sm hover:bg-amber-400 transition-colors">
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="absolute bottom-0 w-full bg-neutral-900 border-t border-neutral-800 flex">
        <button 
          onClick={() => setActiveTab('map')}
          className={`flex-1 py-4 flex flex-col items-center gap-1 ${activeTab === 'map' ? 'text-blue-400' : 'text-neutral-500'}`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] font-medium">Map & Routes</span>
        </button>
        <button 
          onClick={() => setActiveTab('food')}
          className={`flex-1 py-4 flex flex-col items-center gap-1 ${activeTab === 'food' ? 'text-amber-400' : 'text-neutral-500'}`}
        >
          <Coffee className="w-5 h-5" />
          <span className="text-[10px] font-medium">Food</span>
        </button>
      </nav>
    </div>
  );
}
