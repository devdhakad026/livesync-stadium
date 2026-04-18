"use client";

import { useStadiumSync } from "@/lib/store";
import { AlertCircle, Zap, Activity, Users, Settings, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AdminPage() {
  const { state, updateState, isClient } = useStadiumSync();
  const [alertText, setAlertText] = useState("");

  if (!isClient) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center">Loading...</div>;

  const handleSpike = (facilityId: string, type: 'rush' | 'clear') => {
    const newState = { ...state };
    const idx = newState.facilities.findIndex(f => f.id === facilityId);
    if (idx !== -1) {
      if (type === 'rush') {
        newState.facilities[idx].crowdDensity = 95;
        newState.facilities[idx].queueMinutes = 25;
        newState.facilities[idx].isRecommended = false;
        
        // Find alternative and recommend it
        const alternatives = newState.facilities.filter(f => f.type === newState.facilities[idx].type && f.id !== facilityId);
        if (alternatives.length > 0) {
          const bestAlt = alternatives.reduce((prev, current) => (prev.crowdDensity < current.crowdDensity) ? prev : current);
          bestAlt.isRecommended = true;
        }
      } else {
        newState.facilities[idx].crowdDensity = 15;
        newState.facilities[idx].queueMinutes = 2;
        newState.facilities[idx].isRecommended = true;
      }
    }
    updateState(newState);
  };

  const broadcastAlert = () => {
    if (!alertText.trim()) return;
    const newState = { ...state };
    newState.activeAlerts.push({
      id: Date.now().toString(),
      message: alertText,
      severity: 'critical',
      isActive: true,
      timestamp: Date.now()
    });
    updateState(newState);
    setAlertText("");
  };

  const clearAlerts = () => {
    const newState = { ...state };
    newState.activeAlerts = [];
    updateState(newState);
  };

  return (
    <div className="min-h-screen bg-neutral-950 p-6 lg:p-12">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Settings className="w-8 h-8 text-emerald-400" />
            Admin Dashboard
          </h1>
          <p className="text-neutral-400 mt-2">Live Control Center • StadiumSync</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-400 text-sm font-semibold">WebSockets Active</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts Control */}
        <section className="lg:col-span-1 space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
              <Zap className="w-5 h-5 text-amber-400" />
              Emergency Broadcast
            </h2>
            <div className="space-y-4">
              <textarea 
                value={alertText}
                onChange={(e) => setAlertText(e.target.value)}
                placeholder="e.g., Gate 1 is closed due to emergency. Please use Gate 2."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-neutral-200 focus:outline-none focus:border-amber-500/50 h-24 resize-none"
              />
              <button 
                onClick={broadcastAlert}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors"
              >
                Push Alert to All Devices
              </button>
            </div>

            {state.activeAlerts.length > 0 && (
              <div className="mt-6 border-t border-neutral-800 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-neutral-400">Active Alerts</h3>
                  <button onClick={clearAlerts} className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Clear All
                  </button>
                </div>
                <div className="space-y-3">
                  {state.activeAlerts.map(alert => (
                    <div key={alert.id} className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-rose-200">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Facilities Control */}
        <section className="lg:col-span-2">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
              <Activity className="w-5 h-5 text-blue-400" />
              Facility Load Simulation
            </h2>
            
            <div className="space-y-6">
              {state.facilities.map(facility => (
                <div key={facility.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                  <div className="md:col-span-4">
                    <h3 className="font-semibold text-neutral-200">{facility.name}</h3>
                    <p className="text-xs text-neutral-500 uppercase">{facility.type}</p>
                  </div>
                  
                  <div className="md:col-span-4 flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-neutral-500">Density</span>
                        <span className={facility.crowdDensity > 80 ? 'text-rose-400' : 'text-neutral-300'}>{facility.crowdDensity}%</span>
                      </div>
                      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${facility.crowdDensity > 80 ? 'bg-rose-500' : facility.crowdDensity > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${facility.crowdDensity}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-4 flex gap-2 justify-end">
                    <button 
                      onClick={() => handleSpike(facility.id, 'rush')}
                      className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <Users className="w-3 h-3" /> Spike
                    </button>
                    <button 
                      onClick={() => handleSpike(facility.id, 'clear')}
                      className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
