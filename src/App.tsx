import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar,
  Legend
} from 'recharts';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Table as TableIcon, 
  BarChart3, 
  Gamepad2, 
  Users, 
  Settings,
  Bell,
  Search,
  Menu,
  X,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Trash2,
  Filter,
  MoreVertical,
  Download
} from 'lucide-react';

const ACCIDENT_DATA = [
  { name: 'السبت', value: 45 },
  { name: 'الأحد', value: 52 },
  { name: 'الاثنين', value: 38 },
  { name: 'الثلاثاء', value: 65 },
  { name: 'الأربعاء', value: 48 },
  { name: 'الخميس', value: 80 },
  { name: 'الجمعة', value: 92 },
];

const TYPE_DATA = [
  { name: 'تصادم', value: 400 },
  { name: 'عطل', value: 300 },
  { name: 'طريق', value: 200 },
  { name: 'أخرى', value: 100 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

function Sidebar() {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'نظرة عامة', icon: LayoutDashboard },
    { path: '/map', label: 'الخريطة التفاعلية', icon: MapIcon },
    { path: '/accidents', label: 'إدارة البلاغات', icon: TableIcon },
    { path: '/analytics', label: 'مركز التحليلات', icon: BarChart3 },
    { path: '/gamification', label: 'نتائج الألعاب', icon: Gamepad2 },
    { path: '/users', label: 'المستخدمين', icon: Users },
  ];

  return (
    <aside className="w-72 bg-slate-900 border-l border-slate-800 hidden md:flex flex-col h-full z-20">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-2">
          <AlertTriangle className="text-blue-500 shrink-0" size={28} />
          الحق<span className="text-blue-500">حادثة</span>
        </h1>
        <p className="text-[10px] text-slate-500 mt-1 font-bold whitespace-nowrap overflow-hidden">مركز إدارة الحوادث المرورية</p>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              <Icon size={22} className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`} />
              <span className="font-bold text-sm tracking-wide">{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="mr-auto w-1.5 h-6 bg-white rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link to="/settings" className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all">
          <Settings size={22} />
          <span className="font-bold text-sm">الإعدادات</span>
        </Link>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="h-20 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
      <div className="flex items-center gap-6 flex-1">
        <button className="md:hidden text-slate-400 hover:text-white transition-colors">
          <Menu size={26} />
        </button>
        <div className="relative max-w-xl w-full hidden md:block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder="ابحث عن تقارير، مستخدمين، أو مواقع حوادث..." 
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-2.5 pr-12 pl-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="hidden lg:block text-left ml-4">
            <p className="text-xs font-bold text-white text-right">أحمد الدوسري</p>
            <p className="text-[10px] text-emerald-500 text-right">مسؤول العمليات</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="h-11 w-11 rounded-xl overflow-hidden border-2 border-slate-700 shadow-xl cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop" 
              alt="Admin" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
        
        <div className="h-10 w-[1px] bg-slate-800 mx-2 hidden sm:block"></div>

        <button className="relative text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg">
          <Bell size={24} />
          <span className="absolute top-1.5 right-1.5 bg-red-500 border-2 border-slate-900 w-3.5 h-3.5 rounded-full flex items-center justify-center">
          </span>
        </button>
      </div>
    </header>
  );
}

function KPICard({ title, value, change, trend, icon: Icon }: { title: string, value: string | number, change: string, trend: 'up' | 'down' | 'neutral', icon: any }) {
  const isPositive = trend === 'up';
  const colorClass = trend === 'up' ? 'text-red-500' : trend === 'down' ? 'text-emerald-400' : 'text-slate-400';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-blue-500/10 transition-colors">
          <Icon className="text-blue-400" size={24} />
        </div>
        <div className={`text-xs font-bold px-2 py-1 rounded bg-slate-800 ${colorClass}`}>
          {isPositive ? '+' : '-'}{change}
        </div>
      </div>
      <h3 className="text-slate-400 text-sm font-bold mb-1">{title}</h3>
      <div className="text-3xl font-black text-white">{value}</div>
    </motion.div>
  );
}

function AccidentReports() {
  const [reports] = useState([
    { id: 'USR-8821', user: 'أحمد م.', type: 'تصادم مركبات', location: 'طريق صلاح سالم', time: '16:45', status: 'جاري البدء', severity: 'عالية' },
    { id: 'USR-7732', user: 'سارة خ.', type: 'عطل فني', location: 'منطقة وسط البلد', time: '16:30', status: 'تم التحقق', severity: 'متوسطة' },
    { id: 'USR-9910', user: 'ياسين ع.', type: 'ضرر في الطريق', location: 'محور 26 يوليو', time: '16:12', status: 'في الانتظار', severity: 'منخفضة' },
    { id: 'USR-5541', user: 'ليلى و.', type: 'توقف مفاجئ', location: 'كوبري أكتوبر', time: '15:55', status: 'تم التحقق', severity: 'عالية' },
    { id: 'USR-2219', user: 'عمر ح.', type: 'حادث دراجة', location: 'المعادي - شارع 9', time: '15:40', status: 'تم الحل', severity: 'متوسطة' },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">إدارة تقارير الحوادث</h2>
          <p className="text-slate-500 mt-1">مراجعة والتحقق من البلاغات الواردة من المستخدمين ميدانياً.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-700 transition-all">
            <Filter size={16} /> تصفية
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
            <Download size={16} /> تصدير التقرير
          </button>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-800">
                <th className="px-6 py-4">معرف المستخدم</th>
                <th className="px-6 py-4">الموقع المختصر</th>
                <th className="px-6 py-4">وقت البلاغ</th>
                <th className="px-6 py-4">نوع الحادث</th>
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4">الخطورة</th>
                <th className="px-6 py-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-bold text-blue-400 border border-slate-700">
                        {report.user.split(' ')[0][0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{report.user}</p>
                        <p className="text-[10px] text-slate-500">{report.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-slate-300">{report.location}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm text-slate-400 font-mono">{report.time}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-bold text-slate-300 border border-slate-700">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        report.status === 'تم التحقق' ? 'bg-emerald-500' : report.status === 'جاري البدء' ? 'bg-blue-500' : 'bg-orange-500 text-orange-500'
                      }`}></div>
                      <span className="text-xs font-bold">{report.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                     <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                       report.severity === 'عالية' ? 'bg-red-500/10 text-red-500' : report.severity === 'متوسطة' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'
                     }`}>
                       {report.severity}
                     </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-lg transition-colors" title="تحقق">
                        <CheckCircle2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors" title="تجاهل">
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-blue-500/10 hover:text-blue-500 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Analytics() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">مركز التحليلات والرسوم البيانية</h2>
        <p className="text-slate-500 mt-1">تحليل البيانات الضخمة لتحديد أنماط الحوادث وتحسين الاستجابة المرورية.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-8 border-r-4 border-blue-500 pr-4">معدل الحوادث الأسبوعي</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ACCIDENT_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-8 border-r-4 border-emerald-500 pr-4">توزيع أنواع البلاغات</h3>
          <div className="h-80 w-full flex items-center">
            <div className="flex-1 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TYPE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {TYPE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-40 space-y-3">
              {TYPE_DATA.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-xs font-bold text-slate-300">{item.name}</span>
                  <span className="text-[10px] text-slate-500 mr-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <h3 className="text-lg font-bold text-white mb-8 border-r-4 border-orange-500 pr-4">أكثر المناطق تسجيلاً للحوادث</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { name: 'صلاح سالم', count: 120 },
              { name: 'كوبري أكتوبر', count: 95 },
              { name: 'محور المشير', count: 88 },
              { name: 'الدائري', count: 150 },
              { name: 'العتبة', count: 45 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Overview() {
  const recentReports = [
    { id: 1, type: 'تصادم مركبات', location: 'طريق صلاح سالم', time: 'منذ 5 دقائق', status: 'جاري البدء', severity: 'عالية' },
    { id: 2, type: 'عطل فني', location: 'منطقة وسط البلد', time: 'منذ 12 دقيقة', status: 'تم التحقق', severity: 'متوسطة' },
    { id: 3, type: 'ضرر في الطريق', location: 'محور 26 يوليو', time: 'منذ 24 دقيقة', status: 'في الانتظار', severity: 'منخفضة' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white shrink-0 tracking-tight">نظرة عامة حية</h2>
          <p className="text-slate-500 mt-2 font-medium">متابعة حالة السلامة المرورية والتقارير الميدانية لمحافظة القاهرة.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3 space-x-reverse">
            {[1, 2, 3, 4].map(i => (
              <img 
                key={i}
                className="w-10 h-10 rounded-full border-4 border-slate-950 object-cover"
                src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=100&h=100`}
                alt="user"
                referrerPolicy="no-referrer"
              />
            ))}
            <div className="w-10 h-10 rounded-full border-4 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
              +12
            </div>
          </div>
          <p className="text-xs text-slate-500 font-bold">مراقبون نشطون الآن</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="إجمالي حوادث اليوم" value={142} change="12%" trend="up" icon={AlertTriangle} />
        <KPICard title="تقارير نشطة حالياً" value={28} change="4" trend="up" icon={Clock} />
        <KPICard title="مناطق عالية الخطورة" value={8} change="2" trend="down" icon={MapIcon} />
        <KPICard title="مستخدمين نشطين" value="12.5k" change="8%" trend="down" icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative min-h-[500px]">
             {/* Map Placeholder with Fake Heatmap Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=1200&auto=format&fit=crop" 
                alt="Heatmap" 
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            </div>
            
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="bg-slate-900/80 backdrop-blur px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-white">البث المباشر للخريطة الحرارية - القاهرة الكبرى</span>
                </div>
                <div className="flex gap-2">
                  <button className="bg-slate-900/80 p-2 rounded-lg text-white border border-white/10 hover:bg-slate-800 transition-colors">
                    <LayoutDashboard size={18} />
                  </button>
                  <button className="bg-slate-900/80 p-2 rounded-lg text-white border border-white/10 hover:bg-slate-800 transition-colors">
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/5 max-w-xs self-end mt-auto">
                <h4 className="text-sm font-bold text-white mb-2 underline decoration-blue-500 underline-offset-4">نقطة ساخنة: كوبري أكتوبر</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">تم رصد تكدس مروري حاد عند مطلع مدينة نصر. يرجى توجيه الدوريات القريبة لتنظيم حركة السير.</p>
                <div className="flex items-center justify-between text-[10px] text-blue-400 font-black">
                  <span>تم الرصد: 16:42</span>
                  <span className="px-2 py-0.5 bg-blue-500/10 rounded">عالية الخطورة</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="text-blue-500" />
                تحليل حوادث الأسبوع
              </h3>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded">مباشر</span>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ACCIDENT_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '10px' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#0f172a' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">آخر التقارير المرصودة</h3>
              <Link to="/accidents" className="text-[10px] text-blue-400 font-black hover:underline">عرض الكل</Link>
            </div>
            <div className="space-y-4">
              {recentReports.map(report => (
                <motion.div 
                  whileHover={{ x: -4 }}
                  key={report.id} 
                  className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl hover:bg-slate-800/80 transition-all flex items-start gap-4"
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    report.severity === 'عالية' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'
                  }`}>
                    {report.severity === 'عالية' ? <AlertTriangle size={20} /> : <Clock size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-white truncate">{report.type}</h4>
                      <span className="text-[10px] text-slate-500 whitespace-nowrap">{report.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <MapIcon size={12} />
                      {report.location}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        {report.status}
                      </span>
                      <button className="mr-auto text-[10px] text-slate-500 hover:text-white font-bold transition-colors">
                        تحقق
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-3xl p-6 relative overflow-hidden group shadow-2xl shadow-blue-500/20">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Gamepad2 size={120} />
            </div>
            <h3 className="text-lg font-black text-white mb-2 relative z-10">تحديثات التلعيب</h3>
            <p className="text-sm text-blue-100 mb-6 relative z-10 opacity-80 font-medium">أفضل 3 لاعبين حصلوا على نقاط سلامة هذا الأسبوع.</p>
            <div className="space-y-4 relative z-10">
              {[
                { name: 'محمد ص.', points: 1250, badge: 'المراقب الذهبي' },
                { name: 'سارة أ.', points: 980, badge: 'مسعف نشط' },
                { name: 'خالد م.', points: 850, badge: 'مواطن صالح' }
              ].map((user, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-sm transition-all hover:bg-white/20">
                  <div className="w-8 h-8 rounded-lg bg-blue-400/30 flex items-center justify-center font-bold text-white text-xs">#{i+1}</div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white">{user.name}</p>
                    <p className="text-[10px] text-blue-200">{user.badge}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-white">{user.points}</p>
                    <p className="text-[8px] text-blue-200 uppercase font-black tracking-widest leading-none">نقطة</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ title, description }: { title: string, description?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full flex flex-col items-center justify-center text-slate-500 bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-800"
    >
      <div className="p-8 bg-slate-800/50 rounded-full mb-6">
        <Settings size={64} className="animate-spin-slow opacity-20" />
      </div>
      <h2 className="text-3xl font-black text-white mb-3 tracking-tight">{title}</h2>
      <p className="text-slate-400 font-medium max-w-md text-center">{description || 'هذا القسم قيد التطوير حالياً ضمن المرحلة القادمة.'}</p>
      <Link to="/" className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">العودة للرئيسية</Link>
    </motion.div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-slate-950 font-sans text-slate-200 overflow-hidden selection:bg-blue-500/30">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <Header />
          <main className="flex-1 overflow-y-auto p-8 lg:p-10 custom-scrollbar">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/map" element={<PlaceholderPage title="الخريطة التفاعلية" description="محاكاة حية لمواقع الحوادث والكاميرات الميدانية بتقنية Heatmap." />} />
                <Route path="/accidents" element={<AccidentReports />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/gamification" element={<PlaceholderPage title="نظام النقاط والتلعيب" description="مراقبة تفاعل المستخدمين مع الألعاب التوعوية ولوحة الصدارة." />} />
                <Route path="/users" element={<PlaceholderPage title="المستخدمين" description="قائمة المستخدمين المسجلين وتقييم دقة بلاغاتهم." />} />
                <Route path="*" element={<PlaceholderPage title="الصفحة غير موجودة" />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </Router>
  );
}
