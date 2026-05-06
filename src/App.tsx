import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Table as TableIcon, 
  BarChart3, 
  Gamepad2, 
  Users, 
  Settings,
  Bell,
  Search,
  Menu
} from 'lucide-react';

function Sidebar() {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Overview', icon: LayoutDashboard },
    { path: '/map', label: 'Interactive Map', icon: Map },
    { path: '/accidents', label: 'Accident Reports', icon: TableIcon },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/gamification', label: 'Gamification', icon: Gamepad2 },
    { path: '/users', label: 'Users', icon: Users },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col h-full">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
          <Map className="text-blue-500" />
          NEXUS<span className="text-blue-500">SAFE</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Command Center</p>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-white' : ''} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link to="/settings" className="flex items-center gap-3 px-3 py-3 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden text-slate-400 hover:text-white">
          <Menu size={24} />
        </button>
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search reports, users, or locations..." 
            className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white border-2 border-slate-800 shadow-sm cursor-pointer">
          AD
        </div>
      </div>
    </header>
  );
}

function KPICard({ title, value, change, trend }: { title: string, value: string | number, change: string, trend: 'up' | 'down' | 'neutral' }) {
  const trendColor = trend === 'up' ? 'text-red-500' : trend === 'down' ? 'text-emerald-500' : 'text-slate-400';
  
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm">
      <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className={`text-sm font-semibold flex items-center ${trendColor}`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '-'} {change}
        </span>
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white shrink-0">Real-Time Overview</h2>
        <p className="text-slate-400">Monitoring city-wide traffic safety and accident reports.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Accidents (24h)" value={142} change="12%" trend="up" />
        <KPICard title="Active Reports" value={28} change="4" trend="up" />
        <KPICard title="High-Risk Zones" value={12} change="2" trend="down" />
        <KPICard title="Active Users" value="8.4k" change="5%" trend="down" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-6 min-h-[400px] flex items-center justify-center">
          <p className="text-slate-500 text-lg flex flex-col items-center gap-3">
            <BarChart3 size={48} className="opacity-50" />
            [Accident Trends Chart Placeholder]
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 min-h-[400px] flex items-center justify-center">
          <p className="text-slate-500 text-lg flex flex-col items-center gap-3">
            <Map size={48} className="opacity-50" />
            [Mini Map Placeholder]
          </p>
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-slate-500">
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p>Module under development.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-slate-950 font-sans text-slate-200 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/map" element={<PlaceholderPage title="Interactive Map Module" />} />
              <Route path="/accidents" element={<PlaceholderPage title="Accident Reports Module" />} />
              <Route path="/analytics" element={<PlaceholderPage title="Data Analytics Module" />} />
              <Route path="/gamification" element={<PlaceholderPage title="Gamification Insights" />} />
              <Route path="/users" element={<PlaceholderPage title="User Management" />} />
              <Route path="*" element={<PlaceholderPage title="Not Found" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
