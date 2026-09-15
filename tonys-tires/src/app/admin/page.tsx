'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { LOCATIONS, INITIAL_TIRES, TireItem } from '@/data/inventory';
import { 
  Sliders, 
  MapPin, 
  Plus, 
  Minus, 
  Lock, 
  CheckCircle2, 
  LogOut,
  PackagePlus,
  ShoppingBag,
  DollarSign,
  Phone,
  Clock,
  Search,
  Check,
  X,
  Boxes
} from 'lucide-react';

interface Order {
  id: string;
  customerPhone: string;
  tireSize: string;
  brand: string;
  quantity: number;
  totalPrice: number;
  locationName: string;
  lockboxCode: string;
  status: 'Pending Pickup' | 'Completed' | 'Cancelled';
  createdAt: string;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9821',
    customerPhone: '864-512-9920',
    tireSize: '225/65R17',
    brand: 'Michelin',
    quantity: 2,
    totalPrice: 100,
    locationName: 'Greer Container',
    lockboxCode: '3941',
    status: 'Pending Pickup',
    createdAt: 'Today, 08:15 AM'
  },
  {
    id: 'ORD-9818',
    customerPhone: '864-883-1102',
    tireSize: '205/55R16',
    brand: 'Goodyear',
    quantity: 1,
    totalPrice: 45,
    locationName: 'Fountain Inn Container',
    lockboxCode: '7102',
    status: 'Completed',
    createdAt: 'Yesterday, 04:30 PM'
  },
  {
    id: 'ORD-9814',
    customerPhone: '843-902-4411',
    tireSize: '275/55R20',
    brand: 'Pirelli',
    quantity: 4,
    totalPrice: 260,
    locationName: 'Little River Container',
    lockboxCode: '5519',
    status: 'Pending Pickup',
    createdAt: 'Yesterday, 01:10 PM'
  }
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');
  
  const [selectedLocation, setSelectedLocation] = useState<string>('greer');
  const [inventory, setInventory] = useState<TireItem[]>(INITIAL_TIRES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // New Tire Form State
  const [newBrand, setNewBrand] = useState<string>('');
  const [newSize, setNewSize] = useState<string>('');
  const [newRimSize, setNewRimSize] = useState<number>(16);
  const [newPrice, setNewPrice] = useState<number>(45);
  const [newInitialStock, setNewInitialStock] = useState<number>(10);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');

  // Check login session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('tony_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoaded(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin12AB@' || passwordInput === 'tony123') {
      setIsAuthenticated(true);
      localStorage.setItem('tony_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Incorrect Admin Password!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('tony_admin_auth');
  };

  const currentLocation = LOCATIONS.find(loc => loc.id === selectedLocation) || LOCATIONS[0];

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

  const updatePrice = (tireId: string, newPriceVal: number) => {
    setInventory(prev => prev.map(item => item.id === tireId ? { ...item, price: newPriceVal } : item));
  };

  const updateOrderStatus = (orderId: string, newStatus: 'Pending Pickup' | 'Completed' | 'Cancelled') => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    setSuccessMsg(`Order ${orderId} marked as ${newStatus}!`);
    setTimeout(() => setSuccessMsg(''), 3000);
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

  if (!isLoaded) return null;

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
            <p className="text-xs text-slate-400 mt-1">Multi-Location Inventory & Orders Manager</p>
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
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-red-950/50 transition uppercase tracking-wider text-xs"
            >
              Unlock Admin Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredInventory = inventory.filter(t => 
    t.size.toLowerCase().includes(searchFilter.toLowerCase()) || 
    t.brand.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-12">
      
      {/* Top Header Navbar */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-red-500 bg-red-950/50 flex items-center justify-center shrink-0">
              <Image src="/tony_mascot_clean.png" alt="Mascot" width={40} height={40} className="object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-black text-red-500 uppercase leading-none">
                TONY'S <span className="text-white">ADMIN DASHBOARD</span>
              </h1>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">System Active • Session Saved</span>
            </div>
          </div>

          {/* Navigation Tabs & Logout */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition ${activeTab === 'inventory' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                <Boxes className="w-3.5 h-3.5" /> Inventory & Stock
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition relative ${activeTab === 'orders' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                <ShoppingBag className="w-3.5 h-3.5" /> Customer Orders
                <span className="bg-amber-500 text-slate-950 text-[9px] px-1.5 py-0.2 rounded-full font-black ml-1">
                  {orders.filter(o => o.status === 'Pending Pickup').length}
                </span>
              </button>
            </div>

            <button 
              onClick={handleLogout}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-xl border border-slate-700 flex items-center gap-1.5 transition shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Success Alert Banner */}
        {successMsg && (
          <div className="bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-xs p-3.5 rounded-xl mb-6 flex items-center gap-2 shadow-lg animate-fade-in-down">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {successMsg}
          </div>
        )}

        {/* TAB 1: INVENTORY MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            
            {/* Location Selector Bar */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" /> Select Container Location to Edit Stock:
                </h3>
                <span className="text-xs text-yellow-400 font-mono font-bold">{currentLocation.name} Container Selected</span>
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

            {/* Header Actions & Search Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-black text-white uppercase">
                  Container Stock List: <span className="text-red-500">{currentLocation.name}</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Click + or - to update stock, or edit price per tire directly.</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input 
                    type="text" 
                    placeholder="Filter tire size..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-4 py-2 rounded-xl flex items-center gap-2 shadow transition shrink-0"
                >
                  <PackagePlus className="w-4 h-4" /> Add Tire Shipment
                </button>
              </div>
            </div>

            {/* Add Tire Form */}
            {showAddForm && (
              <form onSubmit={handleAddNewTire} className="bg-slate-950 border border-amber-500/40 p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 shadow-xl">
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
              {filteredInventory.map(tire => {
                const stockQty = tire.stock[selectedLocation] || 0;
                return (
                  <div 
                    key={tire.id}
                    className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-600 transition shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-950 rounded-lg overflow-hidden border border-slate-700 flex items-center justify-center p-1 shrink-0">
                        <img src={tire.image} alt={tire.model} className="h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">{tire.brand}</span>
                        <h4 className="text-base font-black text-white">{tire.size}</h4>
                        <span className="text-xs text-slate-400">{tire.rimSize}" Rim • {tire.condition}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                      
                      {/* Price Edit Control */}
                      <div className="flex items-center gap-1 bg-slate-950 p-2 rounded-xl border border-slate-700 text-xs">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                        <input 
                          type="number"
                          value={tire.price}
                          onChange={(e) => updatePrice(tire.id, Number(e.target.value))}
                          className="w-12 bg-transparent text-amber-400 font-black font-mono text-center focus:outline-none"
                        />
                        <span className="text-[10px] text-slate-500 font-bold uppercase">/ tire</span>
                      </div>

                      {/* Stock Quantity Controls */}
                      <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-700/80">
                        <span className="text-xs text-slate-400 font-bold">Stock at {currentLocation.name}:</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateStock(tire.id, -1)}
                            className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg font-bold shadow transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-mono text-lg font-black text-white w-8 text-center">{stockQty}</span>
                          <button
                            onClick={() => updateStock(tire.id, 1)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg font-bold shadow transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-white uppercase">Customer Orders & Lockbox Access</h2>
                <p className="text-xs text-slate-400 mt-0.5">Manage customer tire reservations, assigned lockbox codes & pickup status.</p>
              </div>

              <div className="text-xs bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl font-mono text-amber-400 font-bold">
                Total Orders: {orders.length}
              </div>
            </div>

            {/* Orders Table Grid */}
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                  
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-slate-800/80 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-black text-amber-400 text-sm bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded-lg">
                        {order.id}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">{order.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black px-3 py-1 rounded-lg uppercase ${
                        order.status === 'Pending Pickup' ? 'bg-amber-500/20 border border-amber-500 text-amber-400' :
                        order.status === 'Completed' ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400' :
                        'bg-red-500/20 border border-red-500 text-red-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-500 font-bold block mb-1 uppercase text-[10px]">Customer Phone:</span>
                      <a href={`tel:${order.customerPhone}`} className="text-white font-mono font-black text-sm hover:text-red-400 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-red-500" /> {order.customerPhone}
                      </a>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-500 font-bold block mb-1 uppercase text-[10px]">Reserved Item & Qty:</span>
                      <span className="text-white font-extrabold text-sm block">{order.brand} {order.tireSize}</span>
                      <span className="text-amber-400 font-bold">{order.quantity} Tire({order.quantity > 1 ? 's' : ''}) • ${order.totalPrice} Total</span>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-500 font-bold block mb-1 uppercase text-[10px]">Container Hub:</span>
                      <span className="text-white font-extrabold text-sm flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-500" /> {order.locationName}
                      </span>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-500 font-bold block mb-1 uppercase text-[10px]">Container Lockbox Code:</span>
                      <span className="text-emerald-400 font-mono font-black text-base tracking-widest block bg-emerald-950/60 p-1 rounded text-center border border-emerald-800">
                        {order.lockboxCode}
                      </span>
                    </div>
                  </div>

                  {/* Order Status Action Buttons */}
                  <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800/80">
                    <span className="text-[11px] text-slate-400 font-bold mr-2">Update Status:</span>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Completed')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                    >
                      <Check className="w-3.5 h-3.5" /> Mark Completed
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                      className="bg-slate-800 hover:bg-red-900 text-slate-300 hover:text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                    >
                      <X className="w-3.5 h-3.5" /> Cancel Order
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
