'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LOCATIONS, INITIAL_TIRES, TireItem } from '@/data/inventory';
import { 
  MapPin, 
  ShoppingCart, 
  ShieldCheck, 
  Clock, 
  ArrowLeft,
  PhoneCall,
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';

export default function TireDetailClient({ tireId }: { tireId: string }) {
  const [targetId, setTargetId] = useState<string>(tireId);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const match = path.match(/\/tires\/([^\/]+)/);
      if (match && match[1]) {
        setTargetId(match[1]);
      }
    }
  }, []);

  const [tire, setTire] = useState<TireItem>(() => {
    return INITIAL_TIRES.find(t => t.id === tireId) || INITIAL_TIRES[0];
  });

  useEffect(() => {
    try {
      const savedInv = localStorage.getItem('tony_admin_inventory');
      const invList: TireItem[] = savedInv ? JSON.parse(savedInv) : INITIAL_TIRES;
      const found = invList.find(t => t.id === targetId);
      if (found) {
        setTire(found);
      }
    } catch (e) {}
  }, [targetId]);

  useEffect(() => {
    const imgs = (tire.images && tire.images.length > 0 ? tire.images : [tire.image]).filter(Boolean);
    if (imgs[0]) {
      setSelectedImage(imgs[0]);
    }
    const firstStockLoc = Object.keys(tire.stock).find(locId => (tire.stock[locId] || 0) > 0) || 'columbia';
    setSelectedLoc(firstStockLoc);
  }, [tire]);

  const validImages = (tire.images && tire.images.length > 0 ? tire.images : [tire.image]).filter(Boolean);

  // Auto-select the first location that actually has stock available for this tire
  const defaultLoc = Object.keys(tire.stock).find(locId => (tire.stock[locId] || 0) > 0) || 'columbia';
  const [selectedImage, setSelectedImage] = useState<string>(validImages[0] || tire.image || '');
  const [selectedLoc, setSelectedLoc] = useState<string>(defaultLoc);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'locations' | 'pickup'>('specs');
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [paymentSenderRef, setPaymentSenderRef] = useState<string>('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Cash App');
  const [lastOrderDetails, setLastOrderDetails] = useState<{ id: string; lockbox: string; phone: string; total: number; paymentMethod: string; senderRef: string; locationName: string } | null>(null);

  const selectedLocData = LOCATIONS.find(l => l.id === selectedLoc) || LOCATIONS[0];
  const availableStock = tire.stock[selectedLoc] || 0;
  const totalPrice = tire.price * quantity;

  const handleAddToCart = () => {
    if (availableStock <= 0) return;
    setIsCheckoutOpen(true);
  };

  const handleCompleteOrder = () => {
    if (!customerPhone || availableStock <= 0) return;

    // Deduct stock for selected location
    const updatedStock = { ...tire.stock, [selectedLoc]: Math.max(0, availableStock - quantity) };
    const updatedTire = { ...tire, stock: updatedStock };
    setTire(updatedTire);

    // Save updated inventory to localStorage for Admin
    try {
      const savedInvRaw = localStorage.getItem('tony_admin_inventory');
      const allInv: TireItem[] = savedInvRaw ? JSON.parse(savedInvRaw) : INITIAL_TIRES;
      const updatedInvList = allInv.map(t => t.id === tire.id ? updatedTire : t);
      localStorage.setItem('tony_admin_inventory', JSON.stringify(updatedInvList));
    } catch (e) {}

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const lockboxCode = `${Math.floor(1000 + Math.random() * 9000)}`;
    const targetLocName = selectedLocData.name;
    const targetLocType = selectedLocData.type || 'Container';

    const newOrder = {
      id: orderId,
      customerPhone,
      tireSize: tire.size,
      brand: tire.brand,
      quantity,
      totalPrice,
      locationName: `${targetLocName} ${targetLocType}`,
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
      total: totalPrice,
      paymentMethod: selectedPaymentMethod,
      senderRef: paymentSenderRef || customerPhone,
      locationName: `${targetLocName} ${targetLocType}`
    });

    setCheckoutComplete(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 text-white border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-red-600 bg-slate-900 flex items-center justify-center shadow-lg shadow-red-950/60 shrink-0">
              <Image src="/tony_mascot_clean.png" alt="Tony Mascot Logo" width={44} height={44} className="object-cover scale-110" />
            </div>
            <div>
              <h1 className="text-base sm:text-2xl font-black italic tracking-wider uppercase leading-none text-white whitespace-nowrap">
                TONY'S <span className="text-red-500">TIRE BOX</span>
              </h1>
              <p className="hidden md:block text-[9px] text-slate-400 font-semibold tracking-widest uppercase">QUALITY USED TIRES • SELF-SERVE CONTAINERS</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="text-xs font-extrabold text-slate-300 hover:text-white flex items-center gap-1 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Back to</span> Inventory
            </Link>

            <a 
              href="sms:8643955393"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 text-xs sm:text-sm shadow-lg transition shrink-0"
            >
              <PhoneCall className="w-4 h-4 text-yellow-300 shrink-0" />
              <div className="text-left leading-tight hidden sm:block">
                <span className="text-[9px] block text-red-200 uppercase font-semibold">Text "TIRES"</span>
                <span className="font-mono font-black text-xs sm:text-sm">864-395-5393</span>
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-red-600 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/#inventory" className="hover:text-red-600 transition">Tire Inventory</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-extrabold">{tire.size} Used Tire</span>
        </div>
      </div>

      {/* Main Product Container */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-4 left-4 z-10 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-lg uppercase tracking-wider shadow">
                {tire.condition}
              </div>
              <div className="absolute top-4 right-4 z-10 bg-slate-900/90 text-white font-black text-xs px-3 py-1 rounded-lg uppercase tracking-wider backdrop-blur shadow">
                Rim Size: {tire.rimSize}"
              </div>

              <div className="relative h-80 sm:h-96 w-full flex items-center justify-center bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                <img 
                  src={selectedImage || tire.image} 
                  alt={`Tire Size ${tire.size}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/container_fountain_inn.png';
                  }}
                  className="max-h-full max-w-full object-contain p-4 transition-transform hover:scale-105 duration-300"
                />
              </div>

              {/* Thumbnails Gallery Strip */}
              {validImages.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {validImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-slate-50 shrink-0 p-1 transition ${
                        selectedImage === imgUrl ? 'border-red-600 ring-2 ring-red-500/30' : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`Thumbnail ${idx + 1}`} 
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                        className="w-full h-full object-contain" 
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Security & Quality Badges */}
              <div className="mt-6 grid grid-cols-3 gap-3 pt-6 border-t border-slate-100 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <ShieldCheck className="w-5 h-5 text-red-600 mx-auto mb-1" />
                  <span className="text-[11px] font-black text-slate-900 block uppercase">Inspected Quality</span>
                  <span className="text-[10px] text-slate-500 font-medium">{tire.condition}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <Clock className="w-5 h-5 text-red-600 mx-auto mb-1" />
                  <span className="text-[11px] font-black text-slate-900 block uppercase">Same-Day Pickup</span>
                  <span className="text-[10px] text-slate-500 font-medium">8:00 AM - 8:00 PM</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <Lock className="w-5 h-5 text-red-600 mx-auto mb-1" />
                  <span className="text-[11px] font-black text-slate-900 block uppercase">Self-Serve Lockbox</span>
                  <span className="text-[10px] text-slate-500 font-medium">Instant Lock Code</span>
                </div>
              </div>
            </div>

            {/* Information Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md">
              <div className="flex border-b border-slate-200 gap-6">
                <button 
                  onClick={() => setActiveTab('specs')}
                  className={`pb-3 text-xs font-black uppercase transition ${activeTab === 'specs' ? 'text-red-600 border-b-2 border-red-600' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  Tire Specifications
                </button>
                <button 
                  onClick={() => setActiveTab('locations')}
                  className={`pb-3 text-xs font-black uppercase transition ${activeTab === 'locations' ? 'text-red-600 border-b-2 border-red-600' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  All 8 Container Stock
                </button>
                <button 
                  onClick={() => setActiveTab('pickup')}
                  className={`pb-3 text-xs font-black uppercase transition ${activeTab === 'pickup' ? 'text-red-600 border-b-2 border-red-600' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  How Self-Serve Works
                </button>
              </div>

              <div className="pt-4">
                {activeTab === 'specs' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <span className="text-slate-400 block font-semibold">Tire Size</span>
                      <span className="font-extrabold text-slate-900 text-sm">{tire.size}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <span className="text-slate-400 block font-semibold">Rim Diameter</span>
                      <span className="font-extrabold text-slate-900 text-sm">{tire.rimSize} Inches</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <span className="text-slate-400 block font-semibold">Item Type</span>
                      <span className="font-extrabold text-slate-900 text-sm">Quality Used Tire</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <span className="text-slate-400 block font-semibold">Condition Rating</span>
                      <span className="font-extrabold text-emerald-600 text-sm">{tire.condition}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <span className="text-slate-400 block font-semibold">Price Per Tire</span>
                      <span className="font-extrabold text-red-600 text-sm">${tire.price}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <span className="text-slate-400 block font-semibold">Pickup Mode</span>
                      <span className="font-extrabold text-slate-900 text-sm">Self-Serve Container</span>
                    </div>
                  </div>
                )}

                {activeTab === 'locations' && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500 font-medium mb-3">Live real-time inventory count for this tire across all Tony's Tire Box containers:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {LOCATIONS.map(loc => {
                        const count = tire.stock[loc.id] || 0;
                        return (
                          <div 
                            key={loc.id} 
                            onClick={() => setSelectedLoc(loc.id)}
                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${selectedLoc === loc.id ? 'border-red-600 bg-red-50/50' : 'border-slate-200 hover:border-slate-300 bg-slate-50'}`}
                          >
                            <div>
                              <span className="font-extrabold text-slate-900 text-xs block">{loc.name} Hub</span>
                              <span className="text-[10px] text-slate-500 font-medium">{loc.address}</span>
                            </div>
                            <span className={`text-xs font-extrabold px-2.5 py-1 rounded-md ${count > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'}`}>
                              {count > 0 ? `${count} In Stock` : 'Out of Stock'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'pickup' && (
                  <div className="space-y-3 text-xs text-slate-700 font-medium">
                    <div className="flex gap-3 items-start">
                      <span className="bg-red-600 text-white font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0">1</span>
                      <p><strong className="text-slate-900 block">Select Location & Reserve:</strong> Choose your nearest container location and complete your order.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="bg-red-600 text-white font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0">2</span>
                      <p><strong className="text-slate-900 block">Receive Lockbox Combination:</strong> You will instantly receive the access code to unlock your tire container slot.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="bg-red-600 text-white font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0">3</span>
                      <p><strong className="text-slate-900 block">Self-Serve Pickup:</strong> Drive to the container anytime between 8:00 AM - 8:00 PM, enter code, and load your tire.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Order & Pickup Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl relative sticky top-24">
              
              <div className="border-b border-slate-100 pb-5">
                <span className="text-xs font-black text-red-600 tracking-wider uppercase block">TIRE SIZE</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase leading-tight mt-0.5">{tire.size}</h2>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-3xl font-black text-slate-900">${tire.price}</span>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">Starting Price / Tire</span>
                </div>
              </div>

              {/* Location Selector */}
              <div className="py-5 border-b border-slate-100 space-y-3">
                <label className="block text-xs font-black uppercase text-slate-900">Select Location Pickup Hub</label>
                <select
                  value={selectedLoc}
                  onChange={(e) => setSelectedLoc(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-red-600 cursor-pointer"
                >
                  {LOCATIONS.map(loc => {
                    const count = tire.stock[loc.id] || 0;
                    return (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} {loc.type || 'Container'} ({count > 0 ? `${count} available` : 'Out of stock'})
                      </option>
                    );
                  })}
                </select>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-700 font-semibold">
                    <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{selectedLocData.address}</span>
                  </div>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(selectedLocData.address)}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-red-600 font-extrabold hover:underline shrink-0 ml-2"
                  >
                    Map
                  </a>
                </div>
              </div>

              {/* Quantity & Total */}
              <div className="py-5 border-b border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-slate-900">Select Quantity</span>
                  <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 font-black text-slate-700 hover:bg-slate-200 text-sm transition"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 font-extrabold text-slate-900 text-sm bg-white border-x border-slate-200">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(availableStock || 1, quantity + 1))}
                      className="px-3 py-1.5 font-black text-slate-700 hover:bg-slate-200 text-sm transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-slate-900 text-white p-4 rounded-2xl">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Price ({quantity} Tire{quantity > 1 ? 's' : ''})</span>
                    <span className="text-2xl font-black text-red-500">${totalPrice}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Pickup
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={availableStock <= 0}
                  className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition transform active:scale-95 ${
                    availableStock > 0 
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-950/50' 
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" /> 
                  {availableStock > 0 ? `Reserve & Get Pickup Code ($${totalPrice})` : 'Out of Stock at this Hub'}
                </button>

                {isAddedToCart && (
                  <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold text-center animate-fade-in-up">
                    ✓ Reserved! Lockbox code & pickup details will be texted to your phone.
                  </div>
                )}

                <a 
                  href="sms:8643955393"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase transition border border-slate-700"
                >
                  <PhoneCall className="w-4 h-4 text-yellow-400" /> Text "TIRES" to 864-395-5393
                </a>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white border-t border-slate-800 py-8 mt-16">
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

          <div className="text-xs text-slate-500 font-semibold text-center md:text-right">
            © {new Date().getFullYear()} Tony's Tire Box. All rights reserved. Self-Serve Locations 8AM - 8PM.
          </div>
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
                
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-sm">
                      <div>
                        <div className="font-bold text-slate-950">{tire.brand} {tire.size}</div>
                        <div className="text-xs text-slate-500">{selectedLocData.name} {selectedLocData.type || 'Container'} • Qty: {quantity}</div>
                      </div>
                      <span className="font-mono font-black text-red-600">${totalPrice}</span>
                    </div>
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
                      <span className="text-red-600 font-mono text-xl">${totalPrice}</span>
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

    </div>
  );
}
