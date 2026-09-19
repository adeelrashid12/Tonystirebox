'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LOCATIONS, INITIAL_TIRES, TireItem } from '@/data/inventory';
import { 
  MapPin, 
  Search, 
  ShoppingCart, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Users, 
  ArrowRight,
  PhoneCall,
  Play,
  CreditCard,
  ChevronRight
} from 'lucide-react';

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedRimSize, setSelectedRimSize] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inventory, setInventory] = useState<TireItem[]>(INITIAL_TIRES);
  const [cart, setCart] = useState<{ tire: TireItem; locationId: string; qty: number }[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [lastOrderDetails, setLastOrderDetails] = useState<{ id: string; lockbox: string; phone: string; total: number } | null>(null);

  // Filter tires based on search & location
  const filteredTires = inventory.filter(tire => {
    const matchesRim = selectedRimSize === 'all' || tire.rimSize === Number(selectedRimSize);
    const matchesSearch = tire.size.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tire.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Check if location has stock if specific location selected
    const hasLocationStock = selectedLocation === 'all' || (tire.stock[selectedLocation] || 0) > 0;
    
    return matchesRim && matchesSearch && hasLocationStock;
  });

  const addToCart = (tire: TireItem, locId?: string) => {
    const targetLoc = locId || (selectedLocation === 'all' ? 'greer' : selectedLocation);
    const available = tire.stock[targetLoc] || 0;
    if (available <= 0) return;

    setCart(prev => {
      const existing = prev.find(item => item.tire.id === tire.id && item.locationId === targetLoc);
      if (existing) {
        return prev.map(item => 
          item.tire.id === tire.id && item.locationId === targetLoc
            ? { ...item, qty: Math.min(available, item.qty + 1) }
            : item
        );
      }
      return [...prev, { tire, locationId: targetLoc, qty: 1 }];
    });
    setIsCheckoutOpen(true);
  };

  const handleCompleteOrder = () => {
    if (!customerPhone || cart.length === 0) return;

    // Deduct stock for each cart item
    setInventory(prev => prev.map(tire => {
      const cartItemsForTire = cart.filter(item => item.tire.id === tire.id);
      if (cartItemsForTire.length === 0) return tire;

      const newStock = { ...tire.stock };
      cartItemsForTire.forEach(item => {
        const currentLocStock = newStock[item.locationId] || 0;
        newStock[item.locationId] = Math.max(0, currentLocStock - item.qty);
      });

      return { ...tire, stock: newStock };
    }));

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const lockboxCode = `${Math.floor(1000 + Math.random() * 9000)}`;

    setLastOrderDetails({
      id: orderId,
      lockbox: lockboxCode,
      phone: customerPhone,
      total: totalCartPrice
    });

    setCheckoutComplete(true);
    setCart([]);
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + (item.tire.price * item.qty), 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      
      {/* Wrapper with Full Bleed Container Photo Background spanning Header & Hero */}
      <div className="relative bg-slate-950 border-b border-slate-800 overflow-hidden">
        {/* Full Bleed Background Container Photo */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-90 scale-105"
          style={{ backgroundImage: "url('/hero_banner.png')" }}
        ></div>
        
        {/* Left Side Soft Shadow Overlay for Text Readability Only */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent"></div>

        {/* 1. Header Navigation Bar (Transparent Overlay) */}
        <header className="relative z-50 text-white border-b border-slate-800/40 bg-slate-950/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
            
            {/* Mascot Avatar Logo */}
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-red-600 bg-slate-900 flex items-center justify-center shadow-lg shadow-red-950/60 shrink-0">
                <Image src="/tony_mascot_clean.png" alt="Tony Mascot Logo" width={44} height={44} className="object-cover scale-110" />
              </div>
              <div>
                <h1 className="text-base sm:text-2xl font-black italic tracking-wider uppercase leading-none text-white whitespace-nowrap">
                  TONY'S <span className="text-red-500">TIRE BOX</span>
                </h1>
                <p className="hidden md:block text-[9px] text-slate-400 font-semibold tracking-widest uppercase">QUALITY USED TIRES • SELF-SERVE CONTAINERS</p>
              </div>
            </div>

            {/* Center Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-slate-300">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-red-500 hover:text-white transition">Home</button>
              <button onClick={() => scrollToSection('find-tires')} className="hover:text-red-400 transition">Find Tires</button>
              <button onClick={() => scrollToSection('locations')} className="hover:text-red-400 transition">Locations</button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-red-400 transition">How It Works</button>
              <button onClick={() => scrollToSection('inventory')} className="hover:text-red-400 transition">Inventory</button>
            </nav>

            {/* Right Text / Call Button & Cart */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <a 
                href="sms:8643955393"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm shadow-lg shadow-red-950/50 transition shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 shrink-0" />
                <div className="text-left leading-tight">
                  <span className="text-[8px] sm:text-[9px] block text-red-200 uppercase font-semibold">Text "TIRES"</span>
                  <span className="font-mono font-black text-xs sm:text-sm">864-395-5393</span>
                </div>
              </a>

              {/* Cart Icon */}
              <button 
                onClick={() => setIsCheckoutOpen(true)}
                className="relative bg-slate-900/80 border border-slate-700 hover:border-red-500 p-2 sm:p-2.5 rounded-lg sm:rounded-xl text-white transition shrink-0"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-slate-200" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] w-4 h-4 sm:w-5 sm:h-5 rounded-full font-black flex items-center justify-center shadow">
                    {cart.reduce((s, i) => s + i.qty, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* 2. Hero Section */}
        <section className="relative z-10 min-h-[460px] flex items-center py-12">
          <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-600/60 px-3.5 py-1.5 rounded-full text-red-400 font-extrabold text-xs tracking-widest uppercase animate-fade-in-down shadow">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                QUALITY USED TIRES • STARTING AT $40
              </div>

              <h2 className="text-4xl sm:text-6xl font-black text-white leading-none uppercase tracking-tight animate-fade-in-up delay-100">
                SELF-SERVE.<br />
                SIMPLE.<br />
                <span className="text-red-600">AFFORDABLE.</span>
              </h2>

              <p className="text-slate-300 text-base sm:text-lg font-medium max-w-xl leading-relaxed animate-fade-in-up delay-200">
                Find your size. Pick your nearest container location. Grab your tires anytime 8 AM - 8 PM.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 animate-fade-in-up delay-300">
                <button 
                  onClick={() => scrollToSection('find-tires')}
                  className="bg-red-600 hover:bg-red-700 text-white font-black text-sm px-7 py-3.5 rounded-xl flex items-center gap-2 shadow-xl shadow-red-950/80 transition uppercase tracking-wide transform hover:scale-105"
                >
                  <Search className="w-4 h-4" /> FIND TIRES NOW
                </button>

                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="bg-slate-900/90 hover:bg-slate-800 border border-slate-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg backdrop-blur transition uppercase tracking-wide transform hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-white" /> HOW IT WORKS
                </button>
              </div>

              {/* Pill Badges Row */}
              <div className="pt-6 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-300 animate-fade-in-up delay-400">
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur">
                  <ShieldCheck className="w-4 h-4 text-red-500" /> Inspected Quality
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur">
                  <MapPin className="w-4 h-4 text-red-500" /> 8 SC & NC Hubs
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur">
                  <Clock className="w-4 h-4 text-red-500" /> Open Daily 8AM - 8PM
                </div>
              </div>
            </div>

            {/* Right Column: Badass Container Billboard Card */}
            <div className="lg:col-span-5 animate-scale-up delay-200">
              <div className="bg-slate-900/90 border-2 border-red-600/40 rounded-3xl p-3 shadow-2xl backdrop-blur-md relative overflow-hidden group hover:border-red-600 transition duration-500">
                <div className="absolute top-5 right-5 z-20 bg-red-600 text-white font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  LIVE CONTAINER HUB
                </div>
                <div className="h-72 sm:h-80 w-full rounded-2xl overflow-hidden relative border border-slate-800">
                  <img 
                    src="/container_fountain_inn.png" 
                    alt="Tony's Tire Box Container" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] text-red-400 font-extrabold uppercase tracking-widest block">SELF-SERVE TIRES</span>
                    <h3 className="text-xl font-black italic uppercase leading-tight">TONY'S TIRE BOX CONTAINERS</h3>
                    <p className="text-[11px] text-slate-300 font-medium mt-0.5">Greer • Greenville • Aiken • Fountain Inn • Little River • Longs • Columbia • Hickory</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* 3. Find Your Tires Search Bar */}
      <section id="find-tires" className="py-10 bg-slate-200 border-b border-slate-300">
        <div className="max-w-7xl mx-auto px-4 animate-scale-up">
          <div className="mb-4">
            <h3 className="text-2xl font-black text-slate-950 uppercase">Find Your Tires</h3>
            <p className="text-xs text-slate-600 font-medium">Search by tire size to see what's available at our locations.</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-slate-300">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Size Search Input */}
              <div className="md:col-span-6 relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                <input 
                  type="text" 
                  placeholder="Enter Tire Size (e.g. 225/65R17 or 205/55R16)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:border-red-600 focus:bg-white transition"
                />
              </div>

              {/* Location Select Dropdown */}
              <div className="md:col-span-4 relative">
                <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-12 pr-8 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:border-red-600 focus:bg-white cursor-pointer appearance-none"
                >
                  <option value="all">All Locations (8 SC & NC Hubs)</option>
                  {LOCATIONS.map(loc => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} Container
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <div className="md:col-span-2">
                <button 
                  onClick={() => scrollToSection('inventory')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition uppercase"
                >
                  Search Tires <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Popular Size Pills */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-bold text-[11px] mr-1">Popular sizes:</span>
              {['225/65R17', '235/60R18', '265/70R17', '275/65R18', '245/45R19', '195/65R15'].map(size => (
                <button
                  key={size}
                  onClick={() => setSearchQuery(size)}
                  className="bg-slate-100 hover:bg-red-100 hover:text-red-700 text-slate-700 px-3 py-1 rounded-lg font-bold border border-slate-200 transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works Section - Full Bleed Background Image */}
      <section id="how-it-works" className="relative py-16 bg-slate-950 text-white border-b border-slate-800 overflow-hidden">
        {/* Section Full Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-right bg-no-repeat opacity-40 scale-105"
          style={{ backgroundImage: "url('/how_it_works_bg.png')" }}
        ></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-red-500 font-extrabold text-xs tracking-widest uppercase block mb-1">SELF-SERVE 8AM-8PM • STARTING AT $40 PER TIRE</span>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">How It Works — 6 Simple Steps</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">Getting your tires is fast, contactless & easy. No appointments needed.</p>
            </div>

            <div className="text-left sm:text-right">
              <h4 className="text-lg font-black italic uppercase text-white leading-tight">
                QUALITY USED TIRES<br />
                <span className="text-red-500">15" TO 22" AVAILABLE</span>
              </h4>
            </div>
          </div>

          {/* 6 Steps Grid Matching Client Flyer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between backdrop-blur-md hover:border-red-600 transition group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-red-500 uppercase tracking-widest bg-red-950/60 px-3 py-1 rounded-md border border-red-900">STEP 01</span>
                  <PhoneCall className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition" />
                </div>
                <h4 className="font-extrabold text-lg text-white uppercase">Text Your Size</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-medium">Text your tire size and how many tires you need to <strong className="text-yellow-400 font-mono">864-395-5393</strong>.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between backdrop-blur-md hover:border-red-600 transition group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-red-500 uppercase tracking-widest bg-red-950/60 px-3 py-1 rounded-md border border-red-900">STEP 02</span>
                  <MapPin className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition" />
                </div>
                <h4 className="font-extrabold text-lg text-white uppercase">Come To Container</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-medium">Drive to your nearest container location (Greer, Greenville, Aiken, Fountain Inn, Little River, Longs, Columbia, Hickory).</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between backdrop-blur-md hover:border-red-600 transition group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-red-500 uppercase tracking-widest bg-red-950/60 px-3 py-1 rounded-md border border-red-900">STEP 03</span>
                  <ShieldCheck className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition" />
                </div>
                <h4 className="font-extrabold text-lg text-white uppercase">Pick Your Tires</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-medium">Choose from 300+ available inspected quality used tires in sizes 15" to 22".</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between backdrop-blur-md hover:border-red-600 transition group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-red-500 uppercase tracking-widest bg-red-950/60 px-3 py-1 rounded-md border border-red-900">STEP 04</span>
                  <CreditCard className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition" />
                </div>
                <h4 className="font-extrabold text-lg text-white uppercase">Pay From Phone</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-medium">Pay securely and contactless right from your phone using Cash App, Venmo, Zelle, or Apple Pay.</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between backdrop-blur-md hover:border-red-600 transition group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-red-500 uppercase tracking-widest bg-red-950/60 px-3 py-1 rounded-md border border-red-900">STEP 05</span>
                  <Zap className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition" />
                </div>
                <h4 className="font-extrabold text-lg text-white uppercase">Load Up & Go</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-medium">Load your purchased tires into your vehicle yourself — quick, easy & hassle-free.</p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between backdrop-blur-md hover:border-red-600 transition group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-red-500 uppercase tracking-widest bg-red-950/60 px-3 py-1 rounded-md border border-red-900">STEP 06</span>
                  <Users className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition" />
                </div>
                <h4 className="font-extrabold text-lg text-white uppercase">Get Them Installed</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-medium">Take your tires to your preferred installer or one of our recommended local vendors.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Featured Inventory Section */}
      <section id="inventory" className="py-14 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-slate-950">Featured Inventory</h3>
            <p className="text-xs text-slate-600 font-semibold mt-1">Here are some of our current tire sizes. Real-time availability across all locations.</p>
          </div>
        </div>

        {/* Inventory Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTires.map(tire => {
            // Get available count for active location or sum
            const activeStockCount = selectedLocation === 'all' 
              ? Object.values(tire.stock).reduce((a, b) => a + b, 0)
              : (tire.stock[selectedLocation] || 0);

            const sampleLocName = selectedLocation === 'all' ? 'Greer / Greenville' : LOCATIONS.find(l=>l.id===selectedLocation)?.name;

            return (
              <div key={tire.id} className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden flex flex-col justify-between hover:shadow-xl transition group">
                <div>
                  <Link href={`/tires/${tire.id}`} className="block">
                    <div className="bg-slate-50 p-4 flex items-center justify-center border-b border-slate-100 relative h-48 overflow-hidden">
                      <img 
                        src={tire.image} 
                        alt={tire.size} 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/real_tire_photo.jpg';
                        }}
                        className="h-full w-full object-cover rounded-xl shadow-inner group-hover:scale-105 transition duration-300" 
                      />
                      <span className="absolute top-3 right-3 bg-red-600 text-white font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                        {tire.brand}
                      </span>
                    </div>

                    <div className="p-5">
                      <h4 className="text-xl font-black text-slate-950 group-hover:text-red-600 transition">{tire.size}</h4>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">{tire.brand} {tire.model}</p>
                      <p className="text-[11px] text-emerald-600 font-bold mt-1">{tire.condition}</p>

                      <div className="mt-3 text-lg font-black text-red-600">
                        ${tire.price} <span className="text-xs text-slate-500 font-normal">each</span>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-600 space-y-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-red-500" /> {sampleLocName}
                        </div>
                        <div className="text-[11px] text-emerald-600 font-bold">
                          {activeStockCount} available
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <Link 
                    href={`/tires/${tire.id}`}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-[11px] py-2.5 rounded-xl uppercase shadow transition text-center flex items-center justify-center"
                  >
                    View Specs
                  </Link>
                  <button 
                    onClick={() => addToCart(tire)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-[11px] py-2.5 rounded-xl uppercase shadow transition"
                  >
                    Reserve Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Our Locations Section */}
      <section id="locations" className="py-14 bg-slate-200 border-t border-slate-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-slate-950">Our Locations</h3>
            <p className="text-xs text-slate-600 font-semibold mt-1">Visit any of our self-serve container locations. Open daily from 8:00 AM - 8:00 PM.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCATIONS.map((loc, i) => (
              <div key={loc.id} className="bg-white rounded-2xl border border-slate-300 overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="h-44 bg-slate-900 relative">
                  <img src={loc.image} alt={`${loc.name} Container`} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase shadow">
                    Container #{i+1}
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="text-lg font-black text-slate-950">{loc.name}</h4>
                  <p className="text-xs text-slate-600 mt-1 font-medium">{loc.address}</p>
                  
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-red-600 hover:text-red-700 mt-4 uppercase"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Get Directions <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Bottom CTA & Footer Banner */}
      <footer className="bg-slate-950 text-white border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-red-600 bg-slate-900 flex items-center justify-center shadow shrink-0">
              <Image src="/tony_mascot_clean.png" alt="Tony Mascot Logo" width={44} height={44} className="object-cover scale-110" />
            </div>
            <div>
              <h4 className="font-black italic uppercase text-lg leading-none">TONY'S <span className="text-red-500">TIRE BOX</span></h4>
              <p className="text-[10px] text-slate-400">QUALITY USED TIRES • SELF-SERVE CONTAINERS</p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <span className="text-xs text-slate-400 block font-semibold">Need Help Finding a Tire?</span>
            <strong className="text-sm text-yellow-400 font-mono">Text "TIRES" to 864-395-5393</strong>
          </div>

          <button 
            onClick={() => scrollToSection('find-tires')}
            className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-6 py-3 rounded-xl uppercase tracking-wider shadow-lg transition"
          >
            Find Tires Now →
          </button>
        </div>
      </footer>

      {/* Cart Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-900 border border-slate-200">
            <button 
              onClick={() => { setIsCheckoutOpen(false); setCheckoutComplete(false); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 text-lg font-bold"
            >
              ✕
            </button>

            {!checkoutComplete ? (
              <>
                <h3 className="text-xl font-black uppercase text-slate-950 mb-4">Self-Serve Container Checkout</h3>
                
                {cart.length === 0 ? (
                  <p className="text-slate-500 text-sm py-6 text-center">Your cart is empty.</p>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {cart.map((item, i) => {
                        const locName = LOCATIONS.find(l => l.id === item.locationId)?.name;
                        return (
                          <div key={i} className="flex justify-between items-center bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-sm">
                            <div>
                              <div className="font-bold text-slate-950">{item.tire.brand} {item.tire.size}</div>
                              <div className="text-xs text-slate-500">{locName} Container • Qty: {item.qty}</div>
                            </div>
                            <span className="font-mono font-black text-red-600">${item.tire.price * item.qty}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-slate-200 space-y-3">
                      <div>
                        <label className="block text-xs font-black uppercase text-slate-700 mb-1">Enter Your Mobile Phone Number (for Lockbox Code SMS):</label>
                        <input 
                          type="tel" 
                          placeholder="e.g. 864-395-5393"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:border-red-600"
                          required
                        />
                      </div>

                      <div className="pt-2 flex justify-between items-center font-black text-lg text-slate-950">
                        <span>Total Amount:</span>
                        <span className="text-red-600 font-mono text-xl">${totalCartPrice}</span>
                      </div>

                      <button 
                        onClick={handleCompleteOrder}
                        disabled={!customerPhone}
                        className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow transition ${
                          customerPhone 
                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                            : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        Confirm Order & Reserve Stock
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 font-black text-2xl shadow">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-slate-950 uppercase">Reservation Confirmed!</h3>
                <p className="text-xs text-slate-600 font-medium">Stock has been reserved and automatically updated in our inventory.</p>

                {lastOrderDetails && (
                  <div className="bg-slate-900 text-white p-4 rounded-2xl text-left text-xs space-y-2 font-mono border border-slate-800">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Order ID:</span>
                      <span className="text-amber-400 font-bold">{lastOrderDetails.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Lockbox Combination:</span>
                      <span className="text-emerald-400 font-black text-base tracking-widest">{lastOrderDetails.lockbox}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Customer Phone:</span>
                      <span className="text-white font-bold">{lastOrderDetails.phone}</span>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <a 
                    href={`sms:8643955393?body=${encodeURIComponent(`Hi Tony, I placed order ${lastOrderDetails?.id || ''} for ${lastOrderDetails?.phone || ''}`)}`}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-xl block text-xs uppercase shadow transition"
                  >
                    Text Order Receipt to 864-395-5393
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
