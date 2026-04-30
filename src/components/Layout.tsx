import { Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  LayoutDashboard, Map, Wheat, Flame, DollarSign, 
  Database, Menu, AlertTriangle, Gauge
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/peta', label: 'Peta Interaktif', icon: Map },
  { path: '/simulator', label: 'Simulator', icon: Gauge },
  { path: '/komoditas', label: 'Komoditas', icon: Wheat },
  { path: '/karhutla', label: 'Karhutla', icon: Flame },
  { path: '/ekonomi', label: 'Dampak Ekonomi', icon: DollarSign },
  { path: '/data', label: 'Data & Crosstab', icon: Database },
];

function Sidebar({ className }: { className?: string }) {
  const location = useLocation();

  return (
    <div className={`flex flex-col h-full bg-slate-900 text-white ${className}`}>
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          </motion.div>
          <div>
            <h1 className="text-sm font-bold leading-tight">Godzilla El Niño</h1>
            <p className="text-xs text-slate-400">Laporan April 2026</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                isActive 
                  ? 'bg-amber-400 text-slate-900 font-bold shadow-[0_0_20px_rgba(251,191,36,0.3)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-slate-900' : 'text-slate-500'}`} />
              {item.label}
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-slate-900" 
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-3">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">Status El Niño</p>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-amber-400"
            />
            <span className="text-xs font-medium">Netral → El Niño Lemah</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">BMKG: April 2026</p>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">Probabilitas</p>
          <div className="flex items-center justify-between">
            <span className="text-xs">El Niño Kuat</span>
            <span className="text-xs font-bold text-amber-400">25%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '25%' }}
              className="bg-amber-400 h-1.5 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex h-screen premium-gradient">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <div className="fixed inset-y-0 left-0 w-72 p-4">
          <div className="h-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/5">
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div 
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between transition-all ${
          scrollY > 50 ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-slate-900'
        }`}
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-sm text-white">Godzilla El Niño 2026</span>
        </div>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-slate-900">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-4 lg:p-8 pt-20 lg:pt-8 max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
