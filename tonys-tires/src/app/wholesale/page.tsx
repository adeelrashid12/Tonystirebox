'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WHOLESALE_RIM_GROUPS, RimGroup } from '@/data/wholesaleSizes';
import { 
  Package, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Minus, 
  CheckCircle2, 
  ArrowLeft, 
  PhoneCall, 
  Send,
  Sparkles,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText,
  X
} from 'lucide-react';

export default function WholesalePage() {
  // Quantities state mapping: { "175/65R14": 10, "275/50R22": 4 }
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  
  // Accordion expanded state mapping: { "group-14": true }
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  
  // Search query for sizes
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Checkout Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  // Form inputs
  const [buyerName, setBuyerName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Expand all groups by default on mount
  useEffect(() => {
    const initialExpanded: Record<string, boolean> = {};
    WHOLESALE_RIM_GROUPS.forEach(group => {
      initialExpanded[group.id] = false;
    });
    // Expand the first two groups by default
    if (WHOLESALE_RIM_GROUPS[0]) initialExpanded[WHOLESALE_RIM_GROUPS[0].id] = true;
    if (WHOLESALE_RIM_GROUPS[1]) initialExpanded[WHOLESALE_RIM_GROUPS[1].id] = true;
    setExpandedGroups(initialExpanded);
  }, []);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    WHOLESALE_RIM_GROUPS.forEach(group => { all[group.id] = true; });
    setExpandedGroups(all);
  };

  const collapseAll = () => {
    const all: Record<string, boolean> = {};
    WHOLESALE_RIM_GROUPS.forEach(group => { all[group.id] = false; });
    setExpandedGroups(all);
  };

  const handleQtyChange = (size: string, val: number) => {
    const newQty = Math.max(0, val);
    setQuantities(prev => {
      const updated = { ...prev };
      if (newQty === 0) {
        delete updated[size];
      } else {
        updated[size] = newQty;
      }
      return updated;
    });
  };

  const resetAllQuantities = () => {
    if (Object.keys(quantities).length === 0) return;
    if (window.confirm('Reset all selected tire quantities to 0?')) {
      setQuantities({});
    }
  };

  // Calculate totals
  const selectedSizesList = Object.entries(quantities).map(([size, qty]) => {
    const group = WHOLESALE_RIM_GROUPS.find(g => g.sizes.includes(size));
    return {
      size,
      qty,
      rimGroup: group ? group.label : 'Wholesale Size'
    };
  });

  const totalSelectedTires = selectedSizesList.reduce((sum, item) => sum + item.qty, 0);
  const totalSelectedSizesCount = selectedSizesList.length;

  const scrollToGroup = (groupId: string) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: true }));
    const el = document.getElementById(groupId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmitWishlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!buyerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (selectedSizesList.length === 0) {
      setErrorMessage('Your wishlist is empty. Please select at least 1 tire size.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/wholesale_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyerName,
          companyName,
          phone,
          email,
          address,
          notes,
          selectedSizes: selectedSizesList
        })
      });

      const data = await res.json();
      if (data.success && data.orderId) {
        setOrderComplete(data.orderId);
        setQuantities({});
      } else {
        setErrorMessage(data.error || 'Failed to submit wishlist. Please try again.');
      }
    } catch (e) {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-600 selection:text-white pb-28">
      
      {/* 1. Header Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 cursor-pointer shrink-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-600 bg-slate-900 flex items-center justify-center shadow-lg">
              <Image src="/tony_mascot_clean.png" alt="Tony Mascot Logo" width={40} height={40} className="object-cover scale-110" />
            </div>
            <div>
              <h1 className="text-lg font-black italic tracking-wider uppercase leading-none text-white">
                TONY'S <span className="text-red-500">TIRE BOX</span>
              </h1>
              <span className="text-[9px] text-red-400 font-extrabold tracking-widest uppercase block mt-0.5">WHOLESALE DIVISION</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-red-500" /> Back to Store
            </Link>
            <a 
              href="sms:8643955393"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 text-xs shadow-lg shadow-red-950/50 transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-yellow-300" />
              <span className="hidden sm:inline font-mono">864-395-5393</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800/80 py-10 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-600/60 px-4 py-1.5 rounded-full text-red-400 font-extrabold text-xs tracking-widest uppercase shadow">
            <Package className="w-4 h-4 text-red-500 animate-pulse" />
            BULK DEALER & WHOLESALE ORDERS
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
            WHOLESALE <span className="text-red-500">WISHLIST</span> TIRE ORDER FORM
          </h1>

          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Select your desired quantities across 14" to 22" passenger & LT tire sizes below. Submit your custom wishlist order directly to get availability & bulk quotes.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> 14" to 22" Sizes Included</span>
            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-400" /> No Dry Rot Guarantee</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-red-500" /> Fast Multi-Hub Fulfillment</span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        
        {/* 3. Search & Filter Bar */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-red-500 absolute left-3.5 top-3.5" />
              <input 
                type="text" 
                placeholder="Search size (e.g. 275/50R22 or 225/65R17)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Expand / Collapse Controls */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button 
                onClick={expandAll}
                className="bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold px-3 py-2 rounded-xl transition"
              >
                Expand All
              </button>
              <button 
                onClick={collapseAll}
                className="bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold px-3 py-2 rounded-xl transition"
              >
                Collapse All
              </button>
              {totalSelectedTires > 0 && (
                <button 
                  onClick={resetAllQuantities}
                  className="bg-red-950/80 hover:bg-red-900 text-red-400 border border-red-800/80 text-xs font-bold px-3 py-2 rounded-xl transition"
                >
                  Reset Quantities
                </button>
              )}
            </div>
          </div>

          {/* Jump Links Bar */}
          <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 text-xs">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 shrink-0 mr-1">Jump to Rim:</span>
            {WHOLESALE_RIM_GROUPS.map(group => {
              const groupSelectedCount = group.sizes.reduce((sum, s) => sum + (quantities[s] || 0), 0);
              return (
                <button
                  key={group.id}
                  onClick={() => scrollToGroup(group.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition shrink-0 whitespace-nowrap flex items-center gap-1 ${
                    groupSelectedCount > 0 
                      ? 'bg-red-600 border-red-500 text-white font-black shadow' 
                      : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  {group.label}
                  {groupSelectedCount > 0 && (
                    <span className="bg-slate-950 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold">
                      {groupSelectedCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Tire Rim Groups Accordion List */}
        <div className="space-y-4">
          {WHOLESALE_RIM_GROUPS.map(group => {
            const filteredSizes = group.sizes.filter(s => 
              searchQuery ? s.toLowerCase().includes(searchQuery.toLowerCase().trim()) : true
            );

            // Hide group if search active and no sizes match
            if (searchQuery && filteredSizes.length === 0) return null;

            const isExpanded = searchQuery ? true : !!expandedGroups[group.id];
            const groupTotalSelected = group.sizes.reduce((sum, s) => sum + (quantities[s] || 0), 0);

            return (
              <div 
                key={group.id} 
                id={group.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full p-4 flex items-center justify-between bg-slate-900 hover:bg-slate-850 transition text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-800/80 text-red-500 font-mono font-black text-xs flex items-center justify-center shadow">
                      {group.label.replace(/[^0-9]/g, '') || 'R'}
                    </span>
                    <div>
                      <h2 className="text-base font-black text-white uppercase tracking-tight flex items-center gap-2">
                        {group.label}
                        {groupTotalSelected > 0 && (
                          <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-mono font-bold">
                            {groupTotalSelected} Selected
                          </span>
                        )}
                      </h2>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {filteredSizes.length} sizes available
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs font-semibold hidden sm:inline">
                      {isExpanded ? 'Collapse' : 'Expand'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-red-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Accordion Body / Sizes Table */}
                {isExpanded && (
                  <div className="border-t border-slate-800/80 p-3 sm:p-4 bg-slate-950/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {filteredSizes.map(size => {
                        const qty = quantities[size] || 0;
                        const isSelected = qty > 0;

                        return (
                          <div 
                            key={size}
                            className={`p-3 rounded-xl border transition flex items-center justify-between gap-2 ${
                              isSelected 
                                ? 'bg-red-950/40 border-red-600/80 shadow-md shadow-red-950/40' 
                                : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div>
                              <span className="text-xs sm:text-sm font-extrabold text-white block font-mono">
                                {size}
                              </span>
                              <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                                {group.label}
                              </span>
                            </div>

                            {/* Qty Controls */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleQtyChange(size, qty - 1)}
                                disabled={qty === 0}
                                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition ${
                                  qty > 0 
                                    ? 'bg-slate-800 text-white hover:bg-red-600' 
                                    : 'bg-slate-950 text-slate-600 cursor-not-allowed border border-slate-800'
                                }`}
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>

                              <input
                                type="number"
                                min="0"
                                value={qty === 0 ? '' : qty}
                                placeholder="0"
                                onChange={(e) => handleQtyChange(size, parseInt(e.target.value || '0', 10))}
                                className={`w-12 h-7 text-center font-mono font-black text-xs rounded-lg border focus:outline-none focus:ring-1 ${
                                  qty > 0
                                    ? 'bg-red-600 text-white border-red-500'
                                    : 'bg-slate-950 text-slate-300 border-slate-800 focus:border-red-500'
                                }`}
                              />

                              <button
                                type="button"
                                onClick={() => handleQtyChange(size, qty + 1)}
                                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center font-bold text-xs transition"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* 5. Floating Bottom Summary Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 p-3 sm:p-4 shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">
              Wholesale Wishlist Summary
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-white font-mono">
                {totalSelectedTires} <span className="text-xs text-red-500 font-sans font-extrabold uppercase">Tires Selected</span>
              </span>
              <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
                ({totalSelectedSizesCount} sizes)
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              if (totalSelectedTires === 0) {
                alert('Please select at least 1 tire size quantity to proceed.');
                return;
              }
              setIsModalOpen(true);
            }}
            disabled={totalSelectedTires === 0}
            className={`px-5 py-3 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl tracking-wider uppercase transition ${
              totalSelectedTires > 0
                ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-red-600/30 cursor-pointer active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" /> Submit Wishlist Order ({totalSelectedTires})
          </button>
        </div>
      </div>

      {/* 6. Checkout / Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-fade-in-up my-8">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {orderComplete ? (
              /* Success View */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-950 border-2 border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                  WISHLIST SUBMITTED!
                </h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  Your Wholesale Wishlist Order <strong className="text-red-500 font-mono">{orderComplete}</strong> has been received by Tony's Tire Box team.
                </p>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-left text-xs space-y-1 text-slate-300 font-mono">
                  <p><span className="text-slate-400">Order ID:</span> {orderComplete}</p>
                  <p><span className="text-slate-400">Buyer Name:</span> {buyerName}</p>
                  <p><span className="text-slate-400">Phone:</span> {phone}</p>
                  <p><span className="text-slate-400">Total Tires Requested:</span> {totalSelectedTires} tires across {totalSelectedSizesCount} sizes</p>
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  Tony will review stock availability and reply to your email/phone with full details!
                </p>
                <button
                  onClick={() => {
                    setOrderComplete(null);
                    setIsModalOpen(false);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs py-3 rounded-xl transition uppercase tracking-wider"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Contact Form View */
              <form onSubmit={handleSubmitWishlist} className="space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <Package className="w-5 h-5 text-red-500" /> Complete Wholesale Wishlist Submission
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    Selected: <strong className="text-white font-mono">{totalSelectedTires} tires</strong> across <strong className="text-white font-mono">{totalSelectedSizesCount} sizes</strong>.
                  </p>
                </div>

                {errorMessage && (
                  <div className="bg-red-950/80 border border-red-800 text-red-300 text-xs p-3 rounded-xl font-bold">
                    {errorMessage}
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-slate-300 mb-1 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-red-500" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Smith"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-slate-300 mb-1 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" /> Company / Business Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Auto Repairs LLC"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase text-slate-300 mb-1 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-red-500" /> Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 864-555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold uppercase text-slate-300 mb-1 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-red-500" /> Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-slate-300 mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> Shipping Destination / Zip Code (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Greenville SC 29611"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-slate-300 mb-1 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-400" /> Additional Notes / Preferred Brands (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Prefer Michelin/Goodyear, need delivery by Friday..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs py-3 rounded-xl shadow-lg shadow-red-600/30 transition uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      'Submitting Wishlist...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Submit Wishlist Order Now
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
