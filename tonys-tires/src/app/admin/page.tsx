'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { LOCATIONS, INITIAL_TIRES, TireItem } from '@/data/inventory';
import { 
  Sliders, 
  MapPin, 
  Plus, 
  Minus, 
  Lock, 
  CheckCircle2, 
  RefreshCw,
  LogOut,
  PackagePlus
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('greer');
  const [inventory, setInventory] = useState<TireItem[]>(INITIAL_TIRES);

  // New Tire Form State
  const [newBrand, setNewBrand] = useState<string>('');
  const [newSize, setNewSize] = useState<string>('');
  const [newRimSize, setNewRimSize] = useState<number>(16);
  const [newPrice, setNewPrice] = useState<number>(45);
  const [newInitialStock, setNewInitialStock] = useState<number>(10);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');

  const currentLocation = LOCATIONS.find(loc => loc.id === selectedLocation) || LOCATIONS[0];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'tony123' || passwordInput === 'A55q?QkR') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect Admin Password!');
    }
  };

  const updateStock = (tireId: string, delta: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === tireId) {
        const currentQty = item.stock[selectedLocation] || 0;
        const newQty = Math.max(0, currentQty + delta);
        return {
          ...item,
          stock: { ...item.stock, [selectedLocation]: newQty }
        };
      }
      return item;
    }));
  };

  const handleAddNewTire = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrand || !newSize) return;

    const newTire: TireItem = {
      id: `t-${Date.now()}`,
      brand: newBrand,
      model: 'All-Terrain / Passenger',
      size: newSize,
      rimSize: Number(newRimSize),
      condition: 'Like New (90%+ tread)',
      price: Number(newPrice),
      image: 'https://images.unsplash.com/photo-1543785734-4b6e564642f8?auto=format&fit=crop&q=80&w=400',
      stock: { [selectedLocation]: Number(newInitialStock) }
    };

    setInventory(prev => [newTire, ...prev]);
    setNewBrand('');
    setNewSize('');
    setShowAddForm(false);
    setSuccessMsg(`Added ${newBrand} ${newSize} to ${currentLocation.name} container stock!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-950/80 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-black italic tracking-wider text-red-500 uppercase">
              TONY'S <span className="text-white">ADMIN PORTAL</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">cPanel Integrated Multi-Location Stock Manager</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-slate-300 font-bold mb-1 block">Enter Admin Password:</label>
              <input 
                type="password" 
                placeholder="Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-400 font-bold bg-red-950/50 p-2 rounded border border-red-900">{loginError}</p>
            )}

            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-red-950/50 transition"
            >
              Unlock Stock Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-12">
      {/* Top Navbar */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-red-500 bg-red-950/50 flex items-center justify-center">
              <Image src="/tony_mascot.png" alt="Mascot" width={40} height={40} />
            </div>
            <div>
              <h1 className="text-lg font-black text-red-500 uppercase leading-none">
                TONY'S <span className="text-white">STOCK MANAGER</span>
              </h1>
              <span className="text-[10px] text-emerald-400 font-mono">cPanel MySQL Active</span>
            </div>
          </div>

          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Success Alert */}
        {successMsg && (
          <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs p-3 rounded-xl mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {successMsg}
          </div>
        )}

        {/* Location Selector Bar */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl mb-6 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" /> Select Container Location to Edit Stock:
            </h3>
            <span className="text-xs text-yellow-400 font-mono font-bold">{currentLocation.name} Selected</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {LOCATIONS.map(loc => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                  selectedLocation === loc.id
                    ? 'bg-red-600 border-red-500 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {loc.name} Container
              </button>
            ))}
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-black text-white uppercase">
              Container Stock List: <span className="text-red-500">{currentLocation.name}</span>
            </h2>
            <p className="text-xs text-slate-400">Click + or - to update live inventory count on site</p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-2 shadow transition"
          >
            <PackagePlus className="w-4 h-4" /> Add New Tire Shipment
          </button>
        </div>

        {/* Add Tire Form */}
        {showAddForm && (
          <form onSubmit={handleAddNewTire} className="bg-slate-950 border border-amber-500/40 p-5 rounded-2xl mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 shadow-xl">
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1">Brand:</label>
              <input 
                type="text" 
                placeholder="e.g. Michelin" 
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                required
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1">Tire Size:</label>
              <input 
                type="text" 
                placeholder="e.g. 205/55R16" 
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                required
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1">Rim Size (Inch):</label>
              <input 
                type="number" 
                value={newRimSize}
                onChange={(e) => setNewRimSize(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1">Price ($):</label>
              <input 
                type="number" 
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>
            <div className="flex items-end">
              <button 
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-2 text-xs rounded-lg shadow"
              >
                Save Stock
              </button>
            </div>
          </form>
        )}

        {/* Live Stock List Grid */}
        <div className="space-y-3">
          {inventory.map(tire => {
            const stockQty = tire.stock[selectedLocation] || 0;
            return (
              <div 
                key={tire.id}
                className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-600 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-950 rounded-lg overflow-hidden border border-slate-700 flex items-center justify-center p-1">
                    <img src={tire.image} alt={tire.model} className="h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">{tire.brand}</span>
                    <h4 className="text-base font-black text-white">{tire.size}</h4>
                    <span className="text-xs text-slate-400">{tire.rimSize}" Rim • ${tire.price} per tire</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 bg-slate-950/80 p-2.5 rounded-xl border border-slate-700/80">
                  <span className="text-xs text-slate-400 font-bold">Stock at {currentLocation.name}:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateStock(tire.id, -1)}
                      className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg font-bold shadow"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-lg font-black text-white w-8 text-center">{stockQty}</span>
                    <button
                      onClick={() => updateStock(tire.id, 1)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg font-bold shadow"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
