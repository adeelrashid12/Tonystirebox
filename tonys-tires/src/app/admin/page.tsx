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
  Boxes,
  Trash2,
  Upload,
  Layers,
  Copy,
  TrendingUp,
  UserCheck
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
  paymentMethod?: string;
  status: 'Pending Pickup' | 'Completed' | 'Cancelled';
  createdAt: string;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9821',
    customerPhone: '864-512-9920',
    tireSize: '225/65R17',
    brand: 'Quality Used Tire',
    quantity: 2,
    totalPrice: 90,
    locationName: 'Greer Container',
    lockboxCode: '3941',
    paymentMethod: 'Cash App',
    status: 'Pending Pickup',
    createdAt: 'Today, 08:15 AM'
  },
  {
    id: 'ORD-9818',
    customerPhone: '864-883-1102',
    tireSize: '205/55R16',
    brand: 'Quality Used Tire',
    quantity: 1,
    totalPrice: 45,
    locationName: 'Fountain Inn Container',
    lockboxCode: '7102',
    paymentMethod: 'Venmo',
    status: 'Completed',
    createdAt: 'Yesterday, 04:30 PM'
  },
  {
    id: 'ORD-9814',
    customerPhone: '843-902-4411',
    tireSize: '275/55R20',
    brand: 'Quality Used Tire',
    quantity: 4,
    totalPrice: 250,
    locationName: 'Little River Container',
    lockboxCode: '5519',
    paymentMethod: 'Zelle',
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
  
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedRimFilter, setSelectedRimFilter] = useState<number | 'all'>('all');
  const [showZeroStock, setShowZeroStock] = useState<boolean>(false);
  const [inventory, setInventory] = useState<TireItem[]>(INITIAL_TIRES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'Pending Pickup' | 'Completed' | 'Cancelled'>('all');

  // New Tire Form State
  const [newSize, setNewSize] = useState<string>('');
  const [newRimSize, setNewRimSize] = useState<number>(16);
  const [newPrice, setNewPrice] = useState<number>(45);
  const [newCondition, setNewCondition] = useState<'Good (70%+ tread)' | 'Like New (90%+ tread)'>('Good (70%+ tread)');
  const [newInitialStock, setNewInitialStock] = useState<number>(10);
  const [newTargetLocation, setNewTargetLocation] = useState<string>('greer');
  const [newImagesInput, setNewImagesInput] = useState<string>('');
  
  // Edit Image Modal State
  const [editingImagesTireId, setEditingImagesTireId] = useState<string | null>(null);
  const [editImagesInput, setEditImagesInput] = useState<string>('');

  // Manual Order Form State
  const [showManualOrderForm, setShowManualOrderForm] = useState<boolean>(false);
  const [manualPhone, setManualPhone] = useState<string>('');
  const [manualSize, setManualSize] = useState<string>('225/65R17');
  const [manualQty, setManualQty] = useState<number>(2);
  const [manualPrice, setManualPrice] = useState<number>(90);
  const [manualLocation, setManualLocation] = useState<string>('greer');
  
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');

  // Check login session and load persisted data on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('tony_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    const savedInv = localStorage.getItem('tony_admin_inventory');
    if (savedInv) {
      try {
        const parsed = JSON.parse(savedInv);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setInventory(parsed);
        }
      } catch (e) {}
    }
    const savedOrders = localStorage.getItem('tony_admin_orders');
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
        }
      } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  // Save changes to localStorage
  const saveInventory = (newInv: TireItem[]) => {
    setInventory(newInv);
    try {
      localStorage.setItem('tony_admin_inventory', JSON.stringify(newInv));
    } catch (e) {}
  };

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    try {
      localStorage.setItem('tony_admin_orders', JSON.stringify(newOrders));
    } catch (e) {}
  };

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

  const currentLocationData = LOCATIONS.find(loc => loc.id === selectedLocation);

  // Update stock count for specific location (or active selected location)
  const updateStock = (tireId: string, delta: number, locId?: string) => {
    const targetLoc = locId || (selectedLocation === 'all' ? 'greer' : selectedLocation);
    const updated = inventory.map(item => {
      if (item.id === tireId) {
        const currentQty = item.stock[targetLoc] || 0;
        const newQty = Math.max(0, currentQty + delta);
        return {
          ...item,
          stock: { ...item.stock, [targetLoc]: newQty }
        };
      }
      return item;
    });
    saveInventory(updated);
  };

  // Direct stock override input
  const setDirectStock = (tireId: string, exactQty: number, locId?: string) => {
    const targetLoc = locId || (selectedLocation === 'all' ? 'greer' : selectedLocation);
    const updated = inventory.map(item => {
      if (item.id === tireId) {
        return {
          ...item,
          stock: { ...item.stock, [targetLoc]: Math.max(0, exactQty) }
        };
      }
      return item;
    });
    saveInventory(updated);
  };

  // Update price per tire
  const updatePrice = (tireId: string, newPriceVal: number) => {
    const updated = inventory.map(item => item.id === tireId ? { ...item, price: newPriceVal } : item);
    saveInventory(updated);
  };

  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: 'Pending Pickup' | 'Completed' | 'Cancelled') => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    saveOrders(updated);
    setSuccessMsg(`Order ${orderId} status updated to: ${newStatus}`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // File Upload Handlers for PC Images
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        if (base64Url) {
          setNewImagesInput(prev => prev ? `${prev}\n${base64Url}` : base64Url);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleEditModalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        if (base64Url) {
          setEditImagesInput(prev => prev ? `${prev}\n${base64Url}` : base64Url);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Add New Tire Item
  const handleAddNewTire = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSize) return;

    const parsedImages = newImagesInput
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    const mainImage = parsedImages.length > 0 ? parsedImages[0] : '/container_fountain_inn.png';

    const newTire: TireItem = {
      id: `t-${Date.now()}`,
      brand: 'Quality Used Tire',
      model: newSize,
      size: newSize,
      rimSize: Number(newRimSize),
      condition: newCondition,
      price: Number(newPrice),
      image: mainImage,
      images: parsedImages.length > 0 ? parsedImages : [mainImage],
      stock: { [newTargetLocation]: Number(newInitialStock) }
    };

    const updated = [newTire, ...inventory];
    saveInventory(updated);
    setNewSize('');
    setNewImagesInput('');
    setShowAddForm(false);
    setSuccessMsg(`Added new tire size ${newSize} with ${newInitialStock} stock in ${LOCATIONS.find(l => l.id === newTargetLocation)?.name} Container!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Edit Tire Photos Gallery
  const handleSaveTireImages = (tireId: string) => {
    const parsedImages = editImagesInput
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    if (parsedImages.length === 0) return;

    const updated = inventory.map(item => {
      if (item.id === tireId) {
        return {
          ...item,
          image: parsedImages[0],
          images: parsedImages
        };
      }
      return item;
    });

    saveInventory(updated);
    setEditingImagesTireId(null);
    setEditImagesInput('');
    setSuccessMsg('Product image gallery updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Delete Tire Item
  const handleDeleteTire = (tireId: string, tireSize: string) => {
    if (window.confirm(`Are you sure you want to delete tire size ${tireSize} from inventory?`)) {
      const updated = inventory.filter(t => t.id !== tireId);
      saveInventory(updated);
      setSuccessMsg(`Deleted tire size ${tireSize} from inventory!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  // Create Manual Phone Order
  const handleCreateManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualPhone) return;

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const lockboxCode = `${Math.floor(1000 + Math.random() * 9000)}`;
    const targetLocName = LOCATIONS.find(l => l.id === manualLocation)?.name || 'Greer';

    const newOrder: Order = {
      id: orderId,
      customerPhone: manualPhone,
      tireSize: manualSize,
      brand: 'Quality Used Tire',
      quantity: Number(manualQty),
      totalPrice: Number(manualPrice),
      locationName: `${targetLocName} Container`,
      lockboxCode: lockboxCode,
      status: 'Pending Pickup',
      createdAt: 'Just now'
    };

    saveOrders([newOrder, ...orders]);

    // Deduct stock
    const updatedInv = inventory.map(t => {
      if (t.size === manualSize) {
        const currentStock = t.stock[manualLocation] || 0;
        return {
          ...t,
          stock: { ...t.stock, [manualLocation]: Math.max(0, currentStock - Number(manualQty)) }
        };
      }
      return t;
    });
    saveInventory(updatedInv);

    setShowManualOrderForm(false);
    setManualPhone('');
    setSuccessMsg(`Order ${orderId} created! Assigned Lockbox Code: ${lockboxCode}`);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  // KPI Statistics Calculations
  const totalStockCount = inventory.reduce((total, item) => {
    return total + Object.values(item.stock).reduce((a, b) => a + b, 0);
  }, 0);

  const estimatedInventoryValue = inventory.reduce((total, item) => {
    const itemStockTotal = Object.values(item.stock).reduce((a, b) => a + b, 0);
    return total + (itemStockTotal * item.price);
  }, 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'Pending Pickup').length;

  // Flexible tire size normalization (e.g., 175/65/14, 175 65 14, 1756514, 175/65R14 all match!)
  const normalizeTireSize = (str: string) => {
    if (!str) return '';
    return str.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/r/g, '');
  };

  // Filtering Inventory
  const filteredInventory = inventory.filter(t => {
    const rawSearch = searchFilter.toLowerCase().trim();
    const normalizedSearch = normalizeTireSize(searchFilter);
    const normalizedTireSize = normalizeTireSize(t.size);

    const matchesSearch = 
      !rawSearch ||
      t.size.toLowerCase().includes(rawSearch) || 
      (normalizedSearch.length > 0 && normalizedTireSize.includes(normalizedSearch)) ||
      t.brand.toLowerCase().includes(rawSearch);

    const matchesRim = selectedRimFilter === 'all' || t.rimSize === Number(selectedRimFilter);
    const itemLocStock = selectedLocation === 'all' 
      ? Object.values(t.stock).reduce((a, b) => a + b, 0)
      : (t.stock[selectedLocation] || 0);

    const hasLocStock = showZeroStock ? true : itemLocStock > 0;
    return matchesSearch && matchesRim && hasLocStock;
  });

  // Filter Orders
  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter === 'all') return true;
    return o.status === orderStatusFilter;
  });

  if (!isLoaded) return null;

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-950/80 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-red-950">
              <Lock className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-black italic tracking-wider text-red-500 uppercase">
              TONY'S <span className="text-white">ADMIN PORTAL</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-semibold">Multi-Location Inventory & Lockbox Manager</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-slate-300 font-bold mb-1.5 block">Enter Admin Password:</label>
              <input 
                type="password" 
                placeholder="Password (e.g. tony123)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-400 font-bold bg-red-950/50 p-2.5 rounded-xl border border-red-900">{loginError}</p>
            )}

            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-3.5 rounded-xl shadow-lg shadow-red-950/50 transition uppercase tracking-wider text-xs"
            >
              Unlock Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-16">
      
      {/* Top Header Navbar */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-500 bg-red-950/50 flex items-center justify-center shrink-0 shadow">
              <Image src="/tony_mascot_clean.png" alt="Mascot" width={40} height={40} className="object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-black text-red-500 uppercase leading-none">
                TONY'S <span className="text-white">TIRE BOX ADMIN</span>
              </h1>
              <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live System Active • Changes Auto-Saved
              </span>
            </div>
          </div>

          {/* Navigation Tabs & Logout */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-4 py-2 rounded-lg flex items-center gap-1.5 transition ${activeTab === 'inventory' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                <Boxes className="w-4 h-4" /> Stock Manager ({totalStockCount})
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-lg flex items-center gap-1.5 transition relative ${activeTab === 'orders' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                <ShoppingBag className="w-4 h-4" /> Customer Orders
                {pendingOrdersCount > 0 && (
                  <span className="bg-amber-500 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-black ml-1 shadow">
                    {pendingOrdersCount}
                  </span>
                )}
              </button>
            </div>

            <button 
              onClick={handleLogout}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3.5 py-2 rounded-xl border border-slate-700 flex items-center gap-1.5 transition shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        
        {/* KPI Dashboard Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-1">
              <span>Total Inventory</span>
              <Boxes className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{totalStockCount} <span className="text-xs text-slate-400 font-sans font-normal">Tires</span></div>
            <span className="text-[10px] text-slate-500 font-semibold block mt-1">Across 8 SC & NC Hubs</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-1">
              <span>Inventory Value</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">${estimatedInventoryValue.toLocaleString()}</div>
            <span className="text-[10px] text-slate-500 font-semibold block mt-1">Estimated Retail Value</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-1">
              <span>Pending Pickups</span>
              <ShoppingBag className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{pendingOrdersCount}</div>
            <span className="text-[10px] text-slate-500 font-semibold block mt-1">Lockboxes Active</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-1">
              <span>Active Containers</span>
              <MapPin className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">8 <span className="text-xs text-slate-400 font-sans font-normal">Hubs</span></div>
            <span className="text-[10px] text-slate-500 font-semibold block mt-1">Open 7 Days a Week</span>
          </div>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-xs p-3.5 rounded-2xl flex items-center justify-between shadow-lg animate-fade-in-down">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg('')} className="text-emerald-400 hover:text-white font-black text-sm px-2">✕</button>
          </div>
        )}

        {/* ==================== TAB 1: INVENTORY MANAGEMENT ==================== */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            
            {/* Location Selector Bar */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase text-white flex items-center gap-2 tracking-wider">
                  <MapPin className="w-4 h-4 text-red-500" /> Filter Inventory by Container Location:
                </h3>
                <span className="text-xs text-amber-400 font-mono font-bold bg-amber-950/80 px-3 py-1 rounded-lg border border-amber-800/60">
                  {selectedLocation === 'all' ? 'All Container Hubs' : `${currentLocationData?.name} Container`}
                </span>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setSelectedLocation('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase whitespace-nowrap transition border ${
                    selectedLocation === 'all'
                      ? 'bg-red-600 border-red-500 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  All Hubs ({inventory.length} Sizes)
                </button>

                {LOCATIONS.map(loc => {
                  const locStockCount = inventory.reduce((total, tire) => total + (tire.stock[loc.id] || 0), 0);
                  const isSelected = selectedLocation === loc.id;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition border flex items-center gap-2 ${
                        isSelected
                          ? 'bg-red-600 border-red-500 text-white shadow-lg'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>{loc.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${isSelected ? 'bg-red-800 text-white' : 'bg-slate-800 text-slate-300'}`}>
                        {locStockCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rim Size Filter & Header Bar */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Rim Pills */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-bold uppercase mr-1 text-[11px]">Rim Filter:</span>
                {(['all', 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24] as const).map(rim => (
                  <button
                    key={String(rim)}
                    onClick={() => setSelectedRimFilter(rim)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-xs transition ${
                      selectedRimFilter === rim
                        ? 'bg-amber-500 text-slate-950 font-black shadow'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {rim === 'all' ? 'All Rims' : `${rim}"`}
                  </button>
                ))}
              </div>

              {/* Search, Toggle & Add Shipment */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between">
                <button
                  onClick={() => setShowZeroStock(!showZeroStock)}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 border ${
                    showZeroStock 
                      ? 'bg-amber-950/80 border-amber-600 text-amber-300 shadow' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{showZeroStock ? 'Showing All Catalog Sizes (Inc 0 Stock)' : 'In-Stock Only'}</span>
                </button>

                <div className="relative flex-1 md:w-52">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input 
                    type="text" 
                    placeholder="Search Tire Size (e.g. 225/65R17)..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 placeholder:text-slate-500"
                  />
                </div>

                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-4 py-2 rounded-xl flex items-center gap-2 shadow transition shrink-0 uppercase tracking-wider"
                >
                  <PackagePlus className="w-4 h-4" /> Add Shipment
                </button>
              </div>
            </div>

            {/* Add New Tire Form */}
            {showAddForm && (
              <form onSubmit={handleAddNewTire} className="bg-slate-950 border-2 border-amber-500/50 p-5 rounded-2xl space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-black text-amber-400 uppercase flex items-center gap-2">
                    <PackagePlus className="w-4 h-4" /> Add New Tire Shipment to Container
                  </h4>
                  <button type="button" onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Target Container Hub:</label>
                    <select
                      value={newTargetLocation}
                      onChange={(e) => setNewTargetLocation(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                    >
                      {LOCATIONS.map(loc => (
                        <option key={loc.id} value={loc.id}>{loc.name} Hub</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Tire Size (e.g. 225/65R17):</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 225/65R17" 
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-bold focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Rim Size (Inches):</label>
                    <input 
                      type="number" 
                      value={newRimSize}
                      onChange={(e) => setNewRimSize(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-bold focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Price Per Tire ($):</label>
                    <input 
                      type="number" 
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-bold focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Initial Stock Quantity:</label>
                    <input 
                      type="number" 
                      value={newInitialStock}
                      onChange={(e) => setNewInitialStock(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-emerald-400 font-black focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] text-slate-400 font-bold block uppercase">Product Photos (Upload from PC or paste image URLs):</label>
                    <label className="cursor-pointer bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 transition shadow">
                      <Upload className="w-3.5 h-3.5" /> Upload Photos from PC
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleFileUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Upload files above OR paste image URLs here (1 per line)..."
                    value={newImagesInput}
                    onChange={(e) => setNewImagesInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono placeholder:text-slate-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowAddForm(false)} 
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl uppercase"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-2.5 text-xs rounded-xl shadow-lg uppercase tracking-wider"
                  >
                    Save Stock & Inventory Item
                  </button>
                </div>
              </form>
            )}

            {/* Inventory List Table Grid */}
            <div className="space-y-3">
              {filteredInventory.length === 0 ? (
                <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl text-center space-y-3 shadow-xl">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mx-auto text-red-500">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white uppercase">
                      No Active In-Stock Items in {selectedLocation === 'all' ? 'All Container Hubs' : `${currentLocationData?.name} Container`}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto font-semibold leading-relaxed">
                      This container location currently has 0 available tires in stock for your selected filters. Click <strong className="text-amber-400">[+ Add Shipment]</strong> to stock new tire sizes, or click <strong className="text-amber-400">[Showing All Catalog Sizes]</strong> in the bar above to view all catalog sizes and add stock!
                    </p>
                  </div>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => setShowZeroStock(true)}
                      className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition"
                    >
                      Show All 0-Stock Sizes
                    </button>
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-4 py-2 rounded-xl shadow uppercase tracking-wider"
                    >
                      + Add Shipment
                    </button>
                  </div>
                </div>
              ) :
                filteredInventory.map(tire => {
                const activeLocId = selectedLocation === 'all' ? 'greer' : selectedLocation;
                const stockQty = tire.stock[activeLocId] || 0;
                const totalStockAllHubs = Object.values(tire.stock).reduce((a, b) => a + b, 0);
                const photoCount = tire.images && tire.images.length > 0 ? tire.images.length : 1;

                return (
                  <div 
                    key={tire.id}
                    className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 hover:border-slate-700 transition shadow-xl"
                  >
                    {/* Item Details */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center p-1 shrink-0 relative">
                        <img src={tire.image} alt={tire.size} className="h-full w-full object-contain" />
                        <span className="absolute bottom-0 inset-x-0 bg-slate-950/90 text-[9px] font-black text-amber-400 text-center py-0.5 border-t border-slate-800">
                          {tire.rimSize}" Rim
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xl font-black text-white">{tire.size}</h4>
                          <span className="text-[10px] text-emerald-400 font-extrabold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                            {tire.condition}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-1 text-xs">
                          <span className="text-slate-400 font-semibold">Total Stock Across All Hubs: <strong className="text-white font-mono">{totalStockAllHubs}</strong></span>
                          
                          <button
                            onClick={() => {
                              setEditingImagesTireId(tire.id);
                              setEditImagesInput((tire.images || [tire.image]).join('\n'));
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 transition"
                          >
                            📷 {photoCount} Photo{photoCount > 1 ? 's' : ''} (Edit)
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Stock & Price Controls */}
                    <div className="flex flex-wrap items-center justify-between lg:justify-end w-full lg:w-auto gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                      
                      {/* Location Selector (If 'all' hubs view) */}
                      {selectedLocation === 'all' && (
                        <div className="text-xs">
                          <span className="text-slate-500 font-bold block text-[10px] uppercase mb-0.5">Editing Hub Stock:</span>
                          <select
                            value={activeLocId}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="bg-slate-900 border border-slate-700 text-amber-400 font-bold text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
                          >
                            {LOCATIONS.map(l => (
                              <option key={l.id} value={l.id}>{l.name} ({tire.stock[l.id] || 0})</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Price Editor */}
                      <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 flex items-center gap-1 text-xs">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Price:</span>
                        <div className="flex items-center text-amber-400 font-black font-mono">
                          <span>$</span>
                          <input 
                            type="number"
                            value={tire.price}
                            onChange={(e) => updatePrice(tire.id, Number(e.target.value))}
                            className="w-14 bg-transparent text-amber-400 font-black font-mono text-center focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Stock Quantity Adjuster Buttons */}
                      <div className="bg-slate-900 p-2 rounded-2xl border border-slate-800 flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-bold uppercase pl-1">
                          {selectedLocation === 'all' ? 'Greer Stock:' : `${currentLocationData?.name}:`}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateStock(tire.id, -5, activeLocId)}
                            title="Subtract 5"
                            className="bg-red-950 hover:bg-red-900 text-red-300 px-2 py-1 rounded-lg text-xs font-black transition border border-red-800"
                          >
                            -5
                          </button>
                          <button
                            onClick={() => updateStock(tire.id, -1, activeLocId)}
                            title="Subtract 1"
                            className="bg-red-600 hover:bg-red-500 text-white p-1.5 rounded-lg font-bold transition shadow"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>

                          <input 
                            type="number"
                            value={stockQty}
                            onChange={(e) => setDirectStock(tire.id, Number(e.target.value), activeLocId)}
                            className="w-12 bg-slate-950 text-white font-mono text-center font-black text-base py-1 rounded-lg border border-slate-800 focus:outline-none focus:border-red-500"
                          />

                          <button
                            onClick={() => updateStock(tire.id, 1, activeLocId)}
                            title="Add 1"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white p-1.5 rounded-lg font-bold transition shadow"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => updateStock(tire.id, 5, activeLocId)}
                            title="Add 5"
                            className="bg-emerald-950 hover:bg-emerald-900 text-emerald-300 px-2 py-1 rounded-lg text-xs font-black transition border border-emerald-800"
                          >
                            +5
                          </button>
                        </div>
                      </div>

                      {/* Delete Tire Button */}
                      <button
                        onClick={() => handleDeleteTire(tire.id, tire.size)}
                        title="Delete Product"
                        className="bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 p-2.5 rounded-xl border border-slate-800 hover:border-red-800 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Edit Product Images Modal */}
            {editingImagesTireId && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl relative">
                  <button 
                    onClick={() => setEditingImagesTireId(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-base"
                  >
                    ✕
                  </button>

                  <h3 className="text-lg font-black uppercase text-amber-400 mb-1 flex items-center gap-2">
                    📷 Edit Product Image Gallery
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">Upload photos directly from PC or enter URLs (1 per line).</p>

                  <div className="mb-3 flex justify-end">
                    <label className="cursor-pointer bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow">
                      <Upload className="w-4 h-4" /> Upload Photos from PC
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleEditModalFileUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  <textarea
                    rows={6}
                    value={editImagesInput}
                    onChange={(e) => setEditImagesInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs font-mono text-white mb-4 focus:outline-none focus:border-red-500 placeholder:text-slate-500"
                    placeholder="Upload from PC or paste image URLs..."
                  />

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setEditingImagesTireId(null)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveTireImages(editingImagesTireId)}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl uppercase shadow"
                    >
                      Save Gallery
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 2: ORDERS MANAGEMENT ==================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Header & Actions Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950 border border-slate-800 p-5 rounded-2xl shadow-xl">
              <div>
                <h2 className="text-xl font-black text-white uppercase flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-red-500" /> Customer Orders & Lockbox Code Access
                </h2>
                <p className="text-xs text-slate-400 mt-0.5 font-semibold">
                  Manage customer tire reservations, assigned lockbox codes & pickup status.
                </p>
              </div>

              {/* Order Status Filters & Create Order Button */}
              <div className="flex flex-wrap items-center gap-2">
                {(['all', 'Pending Pickup', 'Completed', 'Cancelled'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setOrderStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      orderStatusFilter === status
                        ? 'bg-red-600 text-white font-black shadow'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {status === 'all' ? 'All Orders' : status}
                  </button>
                ))}

                <button
                  onClick={() => setShowManualOrderForm(!showManualOrderForm)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow uppercase tracking-wider shrink-0"
                >
                  <Plus className="w-4 h-4" /> Add Phone Order
                </button>
              </div>
            </div>

            {/* Manual Phone Order Form */}
            {showManualOrderForm && (
              <form onSubmit={handleCreateManualOrder} className="bg-slate-950 border-2 border-amber-500/50 p-5 rounded-2xl space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-black text-amber-400 uppercase flex items-center gap-2">
                    <UserCheck className="w-4 h-4" /> Log Manual Customer Phone Order
                  </h4>
                  <button type="button" onClick={() => setShowManualOrderForm(false)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Customer Phone:</label>
                    <input 
                      type="text" 
                      placeholder="864-xxx-xxxx" 
                      value={manualPhone}
                      onChange={(e) => setManualPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Tire Size:</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 225/65R17" 
                      value={manualSize}
                      onChange={(e) => setManualSize(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Container Location:</label>
                    <select
                      value={manualLocation}
                      onChange={(e) => setManualLocation(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-amber-400 font-bold"
                    >
                      {LOCATIONS.map(l => (
                        <option key={l.id} value={l.id}>{l.name} Container</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Quantity:</label>
                    <input 
                      type="number" 
                      value={manualQty}
                      onChange={(e) => setManualQty(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Total Price ($):</label>
                    <input 
                      type="number" 
                      value={manualPrice}
                      onChange={(e) => setManualPrice(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-emerald-400 font-black"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowManualOrderForm(false)} className="bg-slate-800 text-slate-300 text-xs font-bold px-4 py-2 rounded-xl">Cancel</button>
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-6 py-2 rounded-xl shadow uppercase tracking-wider">
                    Create Order & Assign Lockbox
                  </button>
                </div>
              </form>
            )}

            {/* Orders List Table Grid */}
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl text-center text-slate-500 font-medium text-xs">
                  No orders found matching status filter "{orderStatusFilter}".
                </div>
              ) : (
                filteredOrders.map(order => (
                  <div key={order.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                    
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-slate-800/80 gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-amber-400 text-sm bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded-lg">
                          {order.id}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">{order.createdAt}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {order.paymentMethod && (
                          <span className={`text-[11px] font-black px-2.5 py-1 rounded-lg uppercase ${
                            order.paymentMethod === 'Cash App' ? 'bg-emerald-950 border border-emerald-500 text-emerald-400' :
                            order.paymentMethod === 'Venmo' ? 'bg-sky-950 border border-sky-500 text-sky-400' :
                            order.paymentMethod === 'Zelle' ? 'bg-purple-950 border border-purple-500 text-purple-400' :
                            order.paymentMethod === 'Apple Pay' ? 'bg-slate-800 border border-slate-600 text-white' :
                            'bg-amber-950 border border-amber-500 text-amber-400'
                          }`}>
                            💳 {order.paymentMethod}
                          </span>
                        )}
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
                        <span className="text-slate-500 font-bold block mb-1 uppercase text-[10px]">Reserved Size & Quantity:</span>
                        <span className="text-white font-extrabold text-sm block">{order.tireSize}</span>
                        <span className="text-amber-400 font-bold">{order.quantity} Tire({order.quantity > 1 ? 's' : ''}) • ${order.totalPrice} Total</span>
                      </div>

                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-500 font-bold block mb-1 uppercase text-[10px]">Pickup Location:</span>
                        <span className="text-white font-extrabold text-sm flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-red-500" /> {order.locationName}
                        </span>
                      </div>

                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 relative group">
                        <span className="text-slate-500 font-bold block mb-1 uppercase text-[10px]">Container Lockbox Code:</span>
                        <div className="flex items-center justify-between bg-emerald-950/60 p-1.5 rounded-lg border border-emerald-800">
                          <span className="text-emerald-400 font-mono font-black text-base tracking-widest pl-2">
                            {order.lockboxCode}
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(order.lockboxCode);
                              setSuccessMsg(`Copied Lockbox Code ${order.lockboxCode} to clipboard!`);
                              setTimeout(() => setSuccessMsg(''), 3000);
                            }}
                            title="Copy Code"
                            className="bg-emerald-900 hover:bg-emerald-800 text-emerald-300 p-1 rounded transition"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Order Status Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center justify-between border-t border-slate-800/80 gap-2">
                      <a 
                        href={`sms:${order.customerPhone.replace(/[^0-9]/g, '')}?body=${encodeURIComponent(`Tony's Tire Box Order ${order.id}: Your lockbox access code for ${order.quantity}x ${order.tireSize} at ${order.locationName} is: ${order.lockboxCode}`)}`}
                        className="text-xs bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-1 transition"
                      >
                        📱 SMS Lockbox Code to Customer
                      </a>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 font-bold mr-1">Update Status:</span>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Completed')}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition shadow"
                        >
                          <Check className="w-3.5 h-3.5" /> Mark Completed
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                          className="bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition border border-slate-800"
                        >
                          <X className="w-3.5 h-3.5" /> Cancel Order
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
