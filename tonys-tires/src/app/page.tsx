'use client';

import React, { useState, useEffect } from 'react';
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
  const [userDetectedCity, setUserDetectedCity] = useState<string | null>(null);
  const [isGeoDetected, setIsGeoDetected] = useState<boolean>(false);
  const [selectedRimSize, setSelectedRimSize] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inventory, setInventory] = useState<TireItem[]>(INITIAL_TIRES);
  const [cart, setCart] = useState<{ tire: TireItem; locationId: string; qty: number }[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [paymentSenderRef, setPaymentSenderRef] = useState<string>('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Cash App');
  const [lastOrderDetails, setLastOrderDetails] = useState<{ id: string; lockbox: string; phone: string; total: number; paymentMethod: string; senderRef: string } | null>(null);

  // Tire Specs Modal State
  const [selectedTireModal, setSelectedTireModal] = useState<TireItem | null>(null);
  const [selectedModalLoc, setSelectedModalLoc] = useState<string>('greer');
  const [modalQuantity, setModalQuantity] = useState<number>(1);

  // Auto-detect visitor location by IP on client side & Sync Admin Inventory
  useEffect(() => {
    try {
      const savedInv = localStorage.getItem('tony_admin_inventory');
      if (savedInv) {
        const parsed = JSON.parse(savedInv);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setInventory(parsed);
        }
      }

      // Check if URL specifies a tire ID (e.g. /tires/t-1789886897789)
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        const match = path.match(/\/tires\/([^\/]+)/);
        if (match && match[1]) {
          const tireId = match[1];
          const allInv: TireItem[] = savedInv ? JSON.parse(savedInv) : INITIAL_TIRES;
          const found = allInv.find(t => t.id === tireId);
          if (found) {
            setSelectedTireModal(found);
            const firstLoc = Object.keys(found.stock).find(locId => (found.stock[locId] || 0) > 0) || 'greer';
            setSelectedModalLoc(firstLoc);
          }
        }
      }

      const savedLoc = localStorage.getItem('tony_selected_location');
      if (savedLoc) {
        setSelectedLocation(savedLoc);
        return;
      }
    } catch (e) {}

    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (!data || !data.city) return;
        const city = String(data.city).toLowerCase();
        setUserDetectedCity(data.city);

        let matchedHub: string | null = null;
        if (city.includes('greer')) matchedHub = 'greer';
        else if (city.includes('greenville')) matchedHub = 'greenville';
        else if (city.includes('aiken')) matchedHub = 'aiken';
        else if (city.includes('fountain') || city.includes('simpsonville') || city.includes('mauldin')) matchedHub = 'fountain-inn';
        else if (city.includes('little river') || city.includes('myrtle')) matchedHub = 'little-river';
        else if (city.includes('longs')) matchedHub = 'longs';
        else if (city.includes('columbia') || city.includes('lexington')) matchedHub = 'columbia';
        else if (city.includes('hickory')) matchedHub = 'hickory';

        if (matchedHub) {
          setSelectedLocation(matchedHub);
          setIsGeoDetected(true);
        }
      })
      .catch(() => {
        // Fallback silently
      });
  }, []);

  const changeLocation = (locId: string) => {
    setSelectedLocation(locId);
    setIsGeoDetected(false);
    try {
      localStorage.setItem('tony_selected_location', locId);
    } catch (e) {}
  };

  // Flexible tire size normalization (e.g., 175/65/14, 175 65 14, 1756514, 175/65R14 all match!)
  const normalizeTireSize = (str: string) => {
    if (!str) return '';
    return str.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/r/g, '');
  };

  // Filter tires based on search & location
  const filteredTires = inventory.filter(tire => {
    const matchesRim = selectedRimSize === 'all' || tire.rimSize === Number(selectedRimSize);
    
    const rawSearch = searchQuery.toLowerCase().trim();
    const normalizedSearch = normalizeTireSize(searchQuery);
    const normalizedTireSize = normalizeTireSize(tire.size);

    const matchesSearch = 
      !rawSearch ||
      tire.size.toLowerCase().includes(rawSearch) || 
      (normalizedSearch.length > 0 && normalizedTireSize.includes(normalizedSearch)) ||
      tire.brand.toLowerCase().includes(rawSearch);
    
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
    const updatedInventory = inventory.map(tire => {
      const cartItemsForTire = cart.filter(item => item.tire.id === tire.id);
      if (cartItemsForTire.length === 0) return tire;

      const newStock = { ...tire.stock };
      cartItemsForTire.forEach(item => {
        const currentLocStock = newStock[item.locationId] || 0;
        newStock[item.locationId] = Math.max(0, currentLocStock - item.qty);
      });

      return { ...tire, stock: newStock };
    });

    setInventory(updatedInventory);

    // Save updated inventory to localStorage
    try {
      localStorage.setItem('tony_admin_inventory', JSON.stringify(updatedInventory));
    } catch (e) {}

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const lockboxCode = `${Math.floor(1000 + Math.random() * 9000)}`;

    // Create new order record for Admin
    const firstCartItem = cart[0];
    const targetLocName = LOCATIONS.find(l => l.id === firstCartItem.locationId)?.name || 'Greer';

    const newOrder = {
      id: orderId,
      customerPhone,
      tireSize: firstCartItem.tire.size,
      brand: firstCartItem.tire.brand,
      quantity: firstCartItem.qty,
      totalPrice: totalCartPrice,
      locationName: targetLocName,
      lockboxCode,
      paymentMethod: selectedPaymentMethod,
      senderRef: paymentSenderRef || customerPhone,
      status: 'Pending Verification' as const,
      createdAt: 'Just now'
    };

    try {
      const existingOrdersRaw = localStorage.getItem('tony_admin_orders');
      const existingOrders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
      localStorage.setItem('tony_admin_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {}

    setLastOrderDetails({
      id: orderId,
      lockbox: lockboxCode,
      phone: customerPhone,
      total: totalCartPrice,
      paymentMethod: selectedPaymentMethod,
      senderRef: paymentSenderRef || customerPhone
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
      
      {/* Wrapper with Clean Ultra-Modern Dark Theme & Subtle Grid Mesh */}
      <div className="relative bg-slate-950 border-b border-slate-800 overflow-hidden">
        
        {/* Subtle Modern Glow Gradients (No Messy Background Image) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-800/20 rounded-full filter blur-3xl pointer-events-none"></div>
        
        {/* Subtle Tech Grid Pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-15 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#ef4444 0.75px, transparent 0.75px)", backgroundSize: "24px 24px" }}
        ></div>

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

        {/* 2. Hero Section - Refactored to Match Banner Final Screenshot */}
        <section className="relative z-10 min-h-[540px] lg:min-h-[580px] flex items-center bg-slate-950 overflow-hidden">

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-5 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-600/60 px-3.5 py-1.5 rounded-full text-red-400 font-extrabold text-xs tracking-widest uppercase shadow">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                QUALITY USED TIRES • SELF-SERVE • LOW PRICES
              </div>

              <h2 className="text-4xl sm:text-6xl font-black text-white leading-none uppercase tracking-tight">
                USED TIRES.<br />
                <span className="text-red-500">READY WHEN YOU ARE.</span>
              </h2>

              <p className="text-slate-300 text-base sm:text-lg font-medium max-w-xl leading-relaxed">
                Self-serve lockbox access available 7 days a week. Search by size or browse location inventory.
              </p>

              {/* Find Tires Quick Search Bar (1:1 Match with Screenshot 1) */}
              <div className="pt-2">
                <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-slate-200 max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                    
                    {/* Size Search Input */}
                    <div className="md:col-span-5 relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input 
                        type="text" 
                        placeholder="Enter Tire Size (e.g. 225/65R17)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-3 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:border-red-600 focus:bg-white transition placeholder:text-slate-400"
                      />
                    </div>

                    {/* Location Select Dropdown */}
                    <div className="md:col-span-3 relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <select
                        value={selectedLocation}
                        onChange={(e) => changeLocation(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-6 py-3 text-xs sm:text-sm text-slate-900 font-bold focus:outline-none focus:border-red-600 focus:bg-white cursor-pointer appearance-none truncate"
                      >
                        <option value="all">All Locations (8 Hubs)</option>
                        {LOCATIONS.map(loc => (
                          <option key={loc.id} value={loc.id}>
                            {loc.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Search Button */}
                    <div className="md:col-span-4">
                      <button 
                        onClick={() => scrollToSection('inventory')}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition uppercase tracking-wider whitespace-nowrap"
                      >
                        SEARCH TIRES <ArrowRight className="w-4 h-4 shrink-0" />
                      </button>
                    </div>
                  </div>

                  {/* Popular Size Pills */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-slate-500 font-bold text-[10px] mr-1">Popular sizes:</span>
                    {['225/65R17', '235/60R18', '265/70R17', '275/65R18', '245/45R19', '195/65R15'].map(size => (
                      <button
                        key={size}
                        onClick={() => setSearchQuery(size)}
                        className="bg-slate-100 hover:bg-red-100 hover:text-red-700 text-slate-700 px-2.5 py-0.5 rounded-lg text-[11px] font-bold border border-slate-200 transition"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Feature Pill Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur">
                  <span className="text-red-500 font-extrabold">$40+</span> Per Tire
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur">
                  <Clock className="w-4 h-4 text-red-500" /> Open 7 Days
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur">
                  <ShieldCheck className="w-4 h-4 text-red-500" /> Monitored 24/7
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur">
                  <MapPin className="w-4 h-4 text-red-500" /> Multiple Locations
                </div>
              </div>
            </div>

            {/* Right Column: Large Uncropped Container Image Box */}
            <div className="lg:col-span-6 relative mt-6 lg:mt-0">
              <div className="relative w-full rounded-3xl overflow-hidden border-2 border-red-600/80 shadow-2xl bg-slate-950 p-1 group">
                <img 
                  src="/container_hero_raw.jpg" 
                  alt="Tony's Tirebox Self-Serve Container" 
                  className="w-full h-auto block rounded-2xl group-hover:scale-105 transition duration-500" 
                />
              </div>
            </div>

          </div>
        </section>
      </div>



      {/* 4. How It Works Section - Clean White Background matching Screenshot 2 */}
      <section id="how-it-works" className="py-14 bg-slate-100 border-b border-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-red-600 font-extrabold text-xs tracking-widest uppercase block mb-1">SELF-SERVE 8AM-8PM • STARTING AT $40 PER TIRE</span>
              <h3 className="text-3xl sm:text-4xl font-black uppercase text-slate-950 tracking-tight">How It Works — 6 Simple Steps</h3>
              <p className="text-sm text-slate-600 font-semibold mt-1">Getting your tires is fast, contactless & easy. No appointments needed.</p>
            </div>

            <div className="text-left sm:text-right">
              <h4 className="text-lg font-black italic uppercase text-slate-950 leading-tight">
                QUALITY USED TIRES<br />
                <span className="text-red-600">15" TO 22" AVAILABLE</span>
              </h4>
            </div>
          </div>

          {/* 6 Steps Clean Sleek Card Grid (Previous Loved Size) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Step 01 */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-lg flex flex-col justify-between hover:shadow-2xl transition duration-300 group">
              <div>
                <span className="text-red-600 font-black text-2xl uppercase tracking-tight block mb-2">STEP 01</span>
                
                {/* Sleek Uncropped Illustration */}
                <div className="h-44 w-full rounded-2xl overflow-hidden mb-4 bg-white flex items-center justify-center p-1">
                  <img 
                    src="/step_01.jpg" 
                    alt="Step 01 - Text Your Size" 
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-500" 
                  />
                </div>

                <h4 className="font-black text-xl text-slate-950 uppercase tracking-tight leading-snug">
                  TEXT YOUR SIZE AND HOW MANY TO 864-395-5393
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-2">
                  Text your tire size and quantity to our team anytime.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-lg flex flex-col justify-between hover:shadow-2xl transition duration-300 group">
              <div>
                <span className="text-red-600 font-black text-2xl uppercase tracking-tight block mb-2">STEP 02</span>
                
                <div className="h-44 w-full rounded-2xl overflow-hidden mb-4 bg-white flex items-center justify-center p-1">
                  <img 
                    src="/step_02_clean.jpg" 
                    alt="Step 02 - Come To Container" 
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-500" 
                  />
                </div>

                <h4 className="font-black text-xl text-slate-950 uppercase tracking-tight leading-snug">
                  COME TO CONTAINER
                </h4>
                <p className="text-xs text-slate-600 font-bold mt-1">
                  GREER • GREENVILLE • AIKEN • FOUNTAIN INN • LITTLE RIVER • LONGS • COLUMBIA • HICKORY
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-lg flex flex-col justify-between hover:shadow-2xl transition duration-300 group">
              <div>
                <span className="text-red-600 font-black text-2xl uppercase tracking-tight block mb-2">STEP 03</span>
                
                <div className="h-44 w-full rounded-2xl overflow-hidden mb-4 bg-white flex items-center justify-center p-1">
                  <img 
                    src="/step_03.jpg" 
                    alt="Step 03 - Pick Your Tires" 
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-500" 
                  />
                </div>

                <h4 className="font-black text-xl text-slate-950 uppercase tracking-tight leading-snug">
                  PICK YOUR TIRES
                </h4>
                <p className="text-xs text-slate-600 font-bold mt-1">
                  15–22 inch • 300+ tires available
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Quality used tires in sizes 15" to 22"
                </p>
              </div>
            </div>

            {/* Step 04 */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-lg flex flex-col justify-between hover:shadow-2xl transition duration-300 group">
              <div>
                <span className="text-red-600 font-black text-2xl uppercase tracking-tight block mb-2">STEP 04</span>
                
                <div className="h-44 w-full rounded-2xl overflow-hidden mb-4 bg-white flex items-center justify-center p-1">
                  <img 
                    src="/step_04.jpg" 
                    alt="Step 04 - Pay From Phone" 
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-500" 
                  />
                </div>

                <h4 className="font-black text-xl text-slate-950 uppercase tracking-tight leading-snug">
                  PAY FROM PHONE
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Cash App • Venmo • Zelle • Apple Pay
                </p>
                <p className="text-xs text-slate-400 font-normal mt-0.5">
                  Pay securely and contactless right from your phone
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded">Cash App</span>
                  <span className="bg-sky-100 text-sky-800 text-[10px] font-black px-2 py-0.5 rounded">Venmo</span>
                  <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2 py-0.5 rounded">Zelle</span>
                  <span className="bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded">Apple Pay</span>
                </div>
              </div>
            </div>

            {/* Step 05 */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-lg flex flex-col justify-between hover:shadow-2xl transition duration-300 group">
              <div>
                <span className="text-red-600 font-black text-2xl uppercase tracking-tight block mb-2">STEP 05</span>
                
                <div className="h-44 w-full rounded-2xl overflow-hidden mb-4 bg-white flex items-center justify-center p-1">
                  <img 
                    src="/step_05.jpg" 
                    alt="Step 05 - Load Up & Go" 
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-500" 
                  />
                </div>

                <h4 className="font-black text-xl text-slate-950 uppercase tracking-tight leading-snug">
                  LOAD UP & GO
                </h4>
                <p className="text-xs text-slate-600 font-semibold mt-1">
                  Load your purchased tires into your vehicle yourself — quick & easy
                </p>
              </div>
            </div>

            {/* Step 06 */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-lg flex flex-col justify-between hover:shadow-2xl transition duration-300 group">
              <div>
                <span className="text-red-600 font-black text-2xl uppercase tracking-tight block mb-2">STEP 06</span>
                
                <div className="h-44 w-full rounded-2xl overflow-hidden mb-4 bg-white flex items-center justify-center p-1">
                  <img 
                    src="/step_06.jpg" 
                    alt="Step 06 - Get Them Installed" 
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-500" 
                  />
                </div>

                <h4 className="font-black text-xl text-slate-950 uppercase tracking-tight leading-snug">
                  GET THEM INSTALLED
                </h4>
                <p className="text-xs text-slate-600 font-semibold mt-1">
                  Take tires to your preferred installer or one of our vendors
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Featured Inventory Section */}
      <section id="inventory" className="py-14 max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <span className="text-red-600 font-extrabold text-xs tracking-widest uppercase block mb-1">POPULAR SIZES • IN STOCK</span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-slate-950">Featured Inventory</h3>
            <p className="text-xs text-slate-600 font-semibold mt-1">Select a container location below to view real-time available tire inventory.</p>
          </div>

          <Link 
            href="/inventory"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs px-5 py-3 rounded-xl uppercase tracking-wider shadow transition shrink-0"
          >
            Browse All Inventory ({filteredTires.length} sizes) <ArrowRight className="w-4 h-4 text-red-500" />
          </Link>
        </div>

        {/* --- Location Filter Tabs --- */}
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => changeLocation('all')}
              className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
                selectedLocation === 'all'
                  ? 'bg-red-600 text-white shadow-md shadow-red-900/30 ring-2 ring-red-500'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              All Hubs ({inventory.length})
            </button>

            {LOCATIONS.map(loc => {
              const count = inventory.filter(t => (t.stock[loc.id] || 0) > 0).length;
              const isSelected = selectedLocation === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => changeLocation(loc.id)}
                  className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-md shadow-red-900/30 ring-2 ring-red-500'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span>{loc.name}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                    isSelected ? 'bg-red-800 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- Rim Size Filter Pills --- */}
        <div className="mb-6 flex flex-wrap items-center gap-1.5 bg-slate-200/70 p-2 rounded-2xl border border-slate-300">
          <span className="text-[11px] font-extrabold text-slate-700 uppercase px-2">Filter Rim:</span>
          {(['all', 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24] as const).map(rim => {
            const isSelected = selectedRimSize === rim;
            return (
              <button
                key={String(rim)}
                onClick={() => setSelectedRimSize(rim)}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md ring-1 ring-slate-700'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                {rim === 'all' ? 'All Rims' : `${rim}"`}
              </button>
            );
          })}
        </div>

        {/* Selected Location Banner Notification */}
        {selectedLocation !== 'all' && (
          <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-black shadow shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-black text-slate-950 text-sm uppercase">
                    Viewing {LOCATIONS.find(l => l.id === selectedLocation)?.name} {LOCATIONS.find(l => l.id === selectedLocation)?.type || 'Container'} Inventory
                  </h4>
                  {isGeoDetected && userDetectedCity && (
                    <span className="bg-emerald-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow animate-pulse">
                      📍 Auto-Detected Near You ({userDetectedCity})
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  {LOCATIONS.find(l => l.id === selectedLocation)?.address} • Open 8:00 AM - 8:00 PM
                </p>
              </div>
            </div>
            <span className="bg-red-600 text-white font-black text-xs px-3 py-1.5 rounded-xl uppercase self-start sm:self-auto">
              {filteredTires.length} Tire Sizes Available
            </span>
          </div>
        )}

        {/* Inventory Cards Grid (Limit 8 on Homepage) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTires.slice(0, 8).map(tire => {
            // Get available count for active location or sum across all
            const activeStockCount = selectedLocation === 'all' 
              ? Object.values(tire.stock).reduce((a, b) => a + b, 0)
              : (tire.stock[selectedLocation] || 0);

            // Get names of locations that have stock for this tire
            const activeLocationNames = Object.entries(tire.stock)
              .filter(([_, count]) => count > 0)
              .map(([locId]) => LOCATIONS.find(l => l.id === locId)?.name)
              .filter(Boolean);

            const displayLocationText = selectedLocation === 'all' 
              ? (activeLocationNames.slice(0, 2).join(' / ') + (activeLocationNames.length > 2 ? ` +${activeLocationNames.length - 2} more` : ''))
              : LOCATIONS.find(l => l.id === selectedLocation)?.name;

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
                        {tire.rimSize}" Rim
                      </span>
                    </div>

                    <div className="p-5">
                      <h4 className="text-xl font-black text-slate-950 group-hover:text-red-600 transition">{tire.size}</h4>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">Quality Used Tire ({tire.rimSize}" Rim)</p>
                      <p className="text-[11px] text-emerald-600 font-bold mt-1">{tire.condition}</p>

                      <div className="mt-3 text-lg font-black text-red-600">
                        ${tire.price} <span className="text-xs text-slate-500 font-normal">each</span>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-600 space-y-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" /> <span className="truncate">{displayLocationText}</span>
                        </div>
                        <div className="text-[11px] text-emerald-600 font-bold">
                          {activeStockCount} available total
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
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-[11px] py-2.5 rounded-xl uppercase shadow transition cursor-pointer"
                  >
                    Reserve Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Inventory Call To Action Bar */}
        <div className="mt-10 text-center">
          <Link 
            href="/inventory"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-sm px-8 py-4 rounded-2xl uppercase tracking-wider shadow-xl transition transform hover:scale-105"
          >
            View All Inventory Catalog ({filteredTires.length} sizes in stock) <ArrowRight className="w-5 h-5" />
          </Link>
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
                  <img src={loc.image} alt={`${loc.name} ${loc.type || 'Container'}`} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase shadow">
                    {loc.type || 'Container'} #{i+1}
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
                              <div className="text-xs text-slate-500">{locName} • Qty: {item.qty}</div>
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

                      <div>
                        <label className="block text-xs font-black uppercase text-slate-700 mb-1">Your Name / Cashtag (so we can verify your payment):</label>
                        <input 
                          type="text" 
                          placeholder="e.g. $JohnDoe or John Smith"
                          value={paymentSenderRef}
                          onChange={(e) => setPaymentSenderRef(e.target.value)}
                          className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:border-red-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">Select Preferred Payment Method:</label>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {[
                            { name: 'Cash App', color: 'bg-emerald-600 text-white', label: 'Cash App ($)' },
                            { name: 'Venmo', color: 'bg-sky-500 text-white', label: 'Venmo' },
                            { name: 'Zelle', color: 'bg-purple-600 text-white', label: 'Zelle' },
                            { name: 'Apple Pay', color: 'bg-slate-950 text-white', label: 'Apple Pay' },
                            { name: 'Cash (Container Box)', color: 'bg-amber-500 text-slate-950', label: 'Cash at Box' },
                          ].map(pm => {
                            const isSelected = selectedPaymentMethod === pm.name;
                            return (
                              <button
                                type="button"
                                key={pm.name}
                                onClick={() => setSelectedPaymentMethod(pm.name)}
                                className={`py-2 px-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition border flex items-center justify-center gap-1.5 ${
                                  isSelected 
                                    ? `${pm.color} ring-2 ring-red-500 shadow-md border-transparent scale-[1.02]` 
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                <span>{pm.label}</span>
                                {isSelected && <span className="text-[10px]">✓</span>}
                              </button>
                            );
                          })}
                        </div>
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
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-2 font-black text-2xl shadow animate-bounce">
                  ⏳
                </div>
                <h3 className="text-2xl font-black text-slate-950 uppercase">Order Reserved & Submitted!</h3>
                <p className="text-xs text-slate-600 font-semibold">Tire stock is held. Complete your payment below to get lockbox code.</p>

                {lastOrderDetails && (
                  <div className="bg-slate-900 text-white p-4 rounded-2xl text-left text-xs space-y-2 font-mono border border-slate-800">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Order ID:</span>
                      <span className="text-amber-400 font-bold">{lastOrderDetails.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Payment Status:</span>
                      <span className="text-amber-400 font-black animate-pulse">⏳ PENDING VERIFICATION</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Lockbox Combination:</span>
                      <span className="text-emerald-400 font-black text-base tracking-widest">{lastOrderDetails.lockbox}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Customer Phone:</span>
                      <span className="text-white font-bold">{lastOrderDetails.phone}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Payment Method:</span>
                      <span className="text-emerald-400 font-bold">{lastOrderDetails.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Payment Sender Name:</span>
                      <span className="text-amber-300 font-bold">{lastOrderDetails.senderRef}</span>
                    </div>
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-300 p-3 rounded-xl text-left text-xs font-semibold text-amber-950 space-y-1.5 shadow-sm">
                  <div className="font-black uppercase text-[11px] text-amber-900 flex items-center gap-1">
                    💳 Step 2: Send Payment Now ({lastOrderDetails?.paymentMethod}):
                  </div>
                  {lastOrderDetails?.paymentMethod === 'Cash App' && (
                    <p>Send <strong>${lastOrderDetails?.total}</strong> to Cash App tag <strong>$TonyPiwowarski</strong> (Tony Piwowarski).</p>
                  )}
                  {lastOrderDetails?.paymentMethod === 'Venmo' && (
                    <p>Send <strong>${lastOrderDetails?.total}</strong> to Venmo <strong>@Lisa-Piwowarski</strong> (Lisa Piwowarski).</p>
                  )}
                  {lastOrderDetails?.paymentMethod === 'Zelle' && (
                    <p>Send <strong>${lastOrderDetails?.total}</strong> via Zelle to <strong>864-395-5393</strong> or email <strong>hbkncc@yahoo.com</strong>.</p>
                  )}
                  {lastOrderDetails?.paymentMethod === 'Apple Pay' && (
                    <p>Send <strong>${lastOrderDetails?.total}</strong> via Apple Pay to <strong>864-395-5393</strong>.</p>
                  )}
                  {lastOrderDetails?.paymentMethod === 'Cash (Container Box)' && (
                    <p>Deposit <strong>${lastOrderDetails?.total}</strong> cash directly into the secured drop box inside the container.</p>
                  )}
                  <p className="text-[11px] text-slate-600 italic">Once Tony sees your payment, he will verify and text your lockbox code!</p>
                </div>

                <div className="pt-2">
                  <a 
                    href={`sms:8643955393?body=${encodeURIComponent(`Hi Tony, I placed order ${lastOrderDetails?.id || ''} ($${lastOrderDetails?.total || ''}) via ${lastOrderDetails?.paymentMethod || 'App'} from ${lastOrderDetails?.senderRef || ''}. My phone is ${lastOrderDetails?.phone || ''}`)}`}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-xl block text-xs uppercase shadow transition"
                  >
                    Text Payment Confirmation to 864-395-5393
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* WhatsApp Floating Chat Button */}
      <a 
        href="https://wa.me/18643955393?text=Hi%20Tony%27s%20Tire%20Box%2C%20I%20am%20looking%20for%20tires"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:scale-110 transition duration-300 flex items-center justify-center group border-2 border-white/20"
        title="Chat on WhatsApp"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>

    </div>
  );
}
