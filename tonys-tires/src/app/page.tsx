'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { LOCATIONS, INITIAL_TIRES, Location, TireItem } from '@/data/inventory';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Zap, 
  Truck, 
  CheckCircle2, 
  QrCode, 
  Smartphone,
  Sliders,
  DollarSign
} from 'lucide-react';

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<string>('greer');
  const [selectedRimSize, setSelectedRimSize] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inventory, setInventory] = useState<TireItem[]>(INITIAL_TIRES);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [cart, setCart] = useState<{ tire: TireItem; locationId: string; qty: number }[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);

  const currentLocation = LOCATIONS.find(loc => loc.id === selectedLocation) || LOCATIONS[0];

  // Stock update handler for Admin mode
  const updateStock = (tireId: string, locationId: string, delta: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === tireId) {
        const currentQty = item.stock[locationId] || 0;
        const newQty = Math.max(0, currentQty + delta);
        return {
          ...item,
          stock: { ...item.stock, [locationId]: newQty }
        };
      }
      return item;
    }));
  };

  // Filter tires based on selected rim size and location query
  const filteredTires = inventory.filter(tire => {
    const matchesRim = selectedRimSize === 'all' || tire.rimSize === Number(selectedRimSize);
    const matchesSearch = tire.size.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tire.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tire.model.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRim && matchesSearch;
  });

  const addToCart = (tire: TireItem) => {
    const available = tire.stock[selectedLocation] || 0;
    if (available <= 0) return;

    setCart(prev => {
      const existing = prev.find(item => item.tire.id === tire.id && item.locationId === selectedLocation);
      if (existing) {
        return prev.map(item => 
          item.tire.id === tire.id && item.locationId === selectedLocation
            ? { ...item, qty: Math.min(available, item.qty + 1) }
            : item
        );
      }
      return [...prev, { tire, locationId: selectedLocation, qty: 1 }];
    });
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + (item.tire.price * item.qty), 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Top Banner / Announcement */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white text-sm font-semibold px-4 py-2 flex flex-wrap justify-between items-center border-b border-red-500/30">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
          <span>Self-Serve Open Daily: 8:00 AM - 8:00 PM</span>
        </div>
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <span>Starting at <strong className="text-yellow-300">$40 per tire</strong></span>
          <span className="hidden md:inline">•</span>
          <a href="sms:8643955393" className="bg-yellow-400 text-slate-950 px-2 py-0.5 rounded font-bold hover:bg-yellow-300 transition">
            Text "TIRES" to 864-395-5393
          </a>
        </div>
      </div>

      {/* Main Header with Mascot Logo */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-red-500 bg-red-950/50 flex items-center justify-center shadow-lg shadow-red-900/40">
              <Image 
                src="/tony_mascot.png" 
                alt="Tony Mascot" 
                width={48} 
                height={48} 
                className="object-cover scale-110"
              />
            </div>
            <div>
              <h1 className="text-2xl font-black italic tracking-wider text-red-500 uppercase leading-none drop-shadow">
                TONY'S <span className="text-white">TIRE BOX</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium tracking-wide">QUALITY USED TIRES • SELF-SERVE CONTAINERS</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="relative bg-red-600 hover:bg-red-500 text-white p-2 sm:px-4 sm:py-2 rounded-lg font-bold flex items-center gap-2 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="bg-yellow-400 text-slate-950 text-xs px-2 py-0.5 rounded-full font-black">
                  {cart.reduce((s, i) => s + i.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-950 via-red-950/20 to-slate-950 py-16 border-b border-red-900/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-bold mb-6 shadow-lg shadow-red-950/60 backdrop-blur">
              <ShieldCheck className="w-4 h-4 text-red-400 animate-pulse" /> 
              <span>300+ Premium Used Tires Live In Stock</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-white leading-none uppercase tracking-tight">
              PICK YOUR TIRES.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 drop-shadow-lg">
                PAY FROM PHONE.
              </span><br />
              DRIVE AWAY TODAY.
            </h2>

            <p className="mt-6 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Self-serve container hubs located across South Carolina & North Carolina. Select your container location below to view real-time inventory on site right now!
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a 
                href="sms:8643955393?body=HI%20Tony%20I%20need%20tire%20pricing%20for%20size:" 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-base px-8 py-4 rounded-xl flex items-center gap-3 shadow-xl shadow-red-900/50 border border-red-400/30 hover:scale-105 transition duration-300"
              >
                <Smartphone className="w-5 h-5 text-yellow-300" /> Text "TIRES" to 864-395-5393
              </a>
            </div>
          </div>

          {/* Location Selector Card */}
          <div className="bg-slate-900/90 border-2 border-red-600/30 rounded-3xl p-6 shadow-2xl shadow-red-950/40 backdrop-blur relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h3 className="text-lg font-black text-white flex items-center gap-2 uppercase tracking-wide">
                <MapPin className="w-5 h-5 text-red-500" />
                Select Container Location
              </h3>
              <span className="text-xs bg-red-950 text-red-400 font-bold px-2.5 py-1 rounded-full border border-red-800/80">
                8 Locations
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Stock is location specific! Select your container location:
            </p>

            <div className="grid grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
              {LOCATIONS.map(loc => {
                const isSelected = selectedLocation === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc.id)}
                    className={`p-3.5 rounded-2xl border text-left transition duration-200 flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-gradient-to-br from-red-600/30 via-red-950/40 to-slate-900 border-red-500 text-white shadow-lg shadow-red-950/50 scale-[1.02]' 
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm">{loc.name}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-red-400" />}
                    </div>
                    <span className="text-[10px] text-slate-400 truncate mt-1">{loc.address}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 p-3.5 bg-slate-950 rounded-2xl border border-red-900/40 text-xs flex justify-between items-center">
              <div>
                <span className="text-slate-400 block text-[10px]">Active Container:</span>
                <strong className="text-white text-sm font-black flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  {currentLocation.name} Container
                </strong>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">Operating Hours:</span>
                <span className="text-yellow-400 font-bold">{currentLocation.hours}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Step Visual Workflow */}
      <section className="py-12 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-red-500 text-xs font-bold uppercase tracking-widest">Self-Serve Process</span>
            <h3 className="text-2xl sm:text-4xl font-black text-white uppercase mt-1">
              HOW IT WORKS — 6 SIMPLE STEPS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'TEXT YOUR SIZE', desc: 'Text your size and how many tires you need to 864-395-5393', icon: Smartphone },
              { step: '02', title: 'COME TO CONTAINER', desc: `Containers at ${LOCATIONS.slice(0, 4).map(l=>l.name).join(', ')} & more!`, icon: MapPin },
              { step: '03', title: 'PICK YOUR TIRES', desc: '15–22 inch tires available. 300+ tires in stock starting at $40', icon: ShieldCheck },
              { step: '04', title: 'PAY FROM PHONE', desc: 'Pay securely contactless via Cash App, Venmo, Zelle or Apple Pay', icon: DollarSign },
              { step: '05', title: 'LOAD UP', desc: 'Load your purchased tires into your vehicle yourself — quick & easy', icon: Truck },
              { step: '06', title: 'GET INSTALLED', desc: 'Take tires to your preferred installer or one of our partner vendors', icon: Zap },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative hover:border-slate-700 transition">
                <div className="text-red-500 font-black text-3xl mb-2 flex items-center justify-between">
                  <span>STEP {item.step}</span>
                  <item.icon className="w-6 h-6 text-slate-500" />
                </div>
                <h4 className="text-lg font-bold text-white uppercase">{item.title}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inventory & Stock Search */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        {/* Admin Mode Alert Header if toggled */}
        {isAdminMode && (
          <div className="bg-amber-500/10 border border-amber-500/40 p-4 rounded-xl mb-6 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h4 className="text-amber-400 font-bold flex items-center gap-2">
                <Sliders className="w-5 h-5" /> Client Live Stock Editor Active
              </h4>
              <p className="text-xs text-slate-300">
                You can directly modify available stock counts for <strong>{currentLocation.name} Container</strong> using the + and - controls on each tire card.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-black text-white uppercase">
              LIVE STOCK AT <span className="text-red-500">{currentLocation.name.toUpperCase()}</span>
            </h3>
            <p className="text-xs text-slate-400">Select rim size or search specific dimensions (e.g. 205/55R16)</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input 
                type="text" 
                placeholder="Search size or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-red-500 w-full"
              />
            </div>

            {/* Rim Filter Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
              {['all', 15, 16, 17, 18, 20, 22].map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedRimSize(size as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    selectedRimSize === size 
                      ? 'bg-red-600 text-white' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {size === 'all' ? 'All Sizes' : `${size}"`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tire Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTires.map(tire => {
            const stockQty = tire.stock[selectedLocation] || 0;
            const isOutOfStock = stockQty === 0;

            return (
              <div 
                key={tire.id}
                className={`bg-slate-800/90 border rounded-2xl overflow-hidden flex flex-col justify-between transition ${
                  isOutOfStock ? 'border-slate-800 opacity-60' : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <div>
                  {/* Card Header image & price badge */}
                  <div className="relative h-44 bg-slate-950 flex items-center justify-center p-4">
                    <img 
                      src={tire.image} 
                      alt={tire.model} 
                      className="h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-base font-black px-3 py-1 rounded-full shadow">
                      ${tire.price}
                    </div>
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-yellow-400 text-xs font-bold px-2.5 py-1 rounded-md border border-slate-700">
                      {tire.rimSize}" Rim
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-xs text-red-400 font-bold uppercase tracking-wider">{tire.brand}</div>
                    <h4 className="text-xl font-black text-white leading-tight mt-0.5">{tire.size}</h4>
                    <p className="text-xs text-slate-400 mt-1">{tire.model}</p>
                    <div className="mt-3 text-xs text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-700/60 inline-block">
                      Condition: <strong>{tire.condition}</strong>
                    </div>

                    {/* Stock Status Badge */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Available at {currentLocation.name}:</span>
                      <span className={`text-sm font-extrabold px-2.5 py-0.5 rounded-full ${
                        stockQty > 5 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                          : stockQty > 0 
                            ? 'bg-amber-950 text-amber-400 border border-amber-800' 
                            : 'bg-red-950 text-red-400 border border-red-800'
                      }`}>
                        {stockQty > 0 ? `${stockQty} In Stock` : 'Out of Stock'}
                      </span>
                    </div>

                    {/* Admin Stock Controls */}
                    {isAdminMode && (
                      <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between bg-amber-950/30 p-2 rounded-lg">
                        <span className="text-xs font-bold text-amber-400">Adjust Stock:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateStock(tire.id, selectedLocation, -1)}
                            className="bg-slate-700 hover:bg-slate-600 text-white p-1 rounded font-bold"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-mono text-sm font-bold text-white px-2">{stockQty}</span>
                          <button
                            onClick={() => updateStock(tire.id, selectedLocation, 1)}
                            className="bg-slate-700 hover:bg-slate-600 text-white p-1 rounded font-bold"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    disabled={isOutOfStock}
                    onClick={() => addToCart(tire)}
                    className={`w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                      isOutOfStock
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/40'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {isOutOfStock ? 'Sold Out at Location' : `Buy Now ($${tire.price})`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cart & Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => { setIsCheckoutOpen(false); setCheckoutComplete(false); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            {!checkoutComplete ? (
              <>
                <h3 className="text-xl font-black text-white uppercase flex items-center gap-2 mb-4">
                  <ShoppingCart className="w-5 h-5 text-red-500" />
                  Self-Serve Checkout Pass
                </h3>

                {cart.length === 0 ? (
                  <p className="text-slate-400 text-sm py-8 text-center">Your cart is currently empty.</p>
                ) : (
                  <div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs mb-4">
                      <span className="text-slate-400">Selected Pickup Container:</span>
                      <strong className="text-yellow-400 block text-sm">{currentLocation.name} Container ({currentLocation.address})</strong>
                    </div>

                    <div className="space-y-3 mb-4">
                      {cart.map((item, i) => (
                        <div key={i} className="flex justify-between items-center bg-slate-800 p-3 rounded-lg text-sm">
                          <div>
                            <div className="font-bold text-white">{item.tire.brand} {item.tire.size}</div>
                            <div className="text-xs text-slate-400">Qty: {item.qty} x ${item.tire.price}</div>
                          </div>
                          <span className="font-mono font-bold text-red-400">${item.tire.price * item.qty}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-800 pt-3 mb-6 flex justify-between items-center font-bold text-lg text-white">
                      <span>Total Amount:</span>
                      <span className="text-yellow-400 font-mono">${totalCartPrice}</span>
                    </div>

                    {/* Instant Payment Buttons */}
                    <div className="space-y-2">
                      <p className="text-xs text-slate-400 mb-2">Select Payment Method (Contactless):</p>
                      <button 
                        onClick={() => setCheckoutComplete(true)}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition"
                      >
                        <DollarSign className="w-5 h-5" /> Pay with Cash App / Venmo / Zelle / Apple Pay
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-950 text-emerald-400 border border-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase">Pickup Pass Generated!</h3>
                <p className="text-xs text-slate-300 mt-2">
                  Show or scan this receipt at the <strong>{currentLocation.name} Container</strong> door to unlock and load your tire.
                </p>

                <div className="my-6 p-4 bg-white text-slate-950 rounded-xl inline-block shadow-lg">
                  <QrCode className="w-32 h-32 mx-auto" />
                  <div className="font-mono text-xs mt-2 font-bold uppercase tracking-wider">TONY-PASS-{Math.floor(100000 + Math.random() * 900000)}</div>
                </div>

                <a 
                  href={`sms:8643955393?body=PAID%20CONFIRMATION:%20${currentLocation.name}%20Container`} 
                  className="block w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl text-center text-sm transition"
                >
                  Text Receipt to 864-395-5393
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-bold text-slate-400">TONY'S TIRE BOX • SELF-SERVE USED TIRES</p>
          <p className="mt-1">Containers located in Greer, Greenville, Aiken, Fountain Inn, Little River, Longs, Columbia & Hickory.</p>
          <p className="mt-3">Call / Text: 864-395-5393 • Open Daily 8 AM - 8 PM</p>
        </div>
      </footer>
    </div>
  );
}
