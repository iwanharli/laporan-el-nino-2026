import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Gauge, TrendingDown, Flame, Droplets, DollarSign, 
  Wheat, Factory, AlertTriangle, RotateCcw, Zap, Activity, ShieldAlert, Cpu
} from 'lucide-react';
import { 
  SimpleBarChart, SimpleAreaChart 
} from '@/components/charts/ChartComponents';

interface ScenarioResult {
  label: string;
  rainfallDecline: number;
  droughtDuration: number;
  burnedArea: number;
  economicLoss: number;
  riceDecline: number;
  cpoDecline: number;
  coalDisruption: number;
  healthCases: number;
  ispaCases: number;
}

export default function ScenarioSimulator() {
  const [intensity, setIntensity] = useState([1.2]); // SST anomaly
  const [duration, setDuration] = useState([6]); // months
  const [iodEnabled, setIodEnabled] = useState(true);

  const result: ScenarioResult = useMemo(() => {
    const sst = intensity[0];
    const dur = duration[0];
    const iod = iodEnabled ? 1.3 : 1.0;
    
    return {
      label: sst < 0.8 ? 'Lemah' : sst < 1.4 ? 'Moderat' : sst < 1.9 ? 'Kuat' : 'Ekstrem (Godzilla)',
      rainfallDecline: Math.round((20 + sst * 15 + dur * 2) * iod),
      droughtDuration: Math.round(100 + sst * 60 + dur * 15),
      burnedArea: Math.round((0.5 + sst * 1.2 + dur * 0.15) * iod * 10) / 10,
      economicLoss: Math.round((2 + sst * 4 + dur * 0.8) * iod * 10) / 10,
      riceDecline: Math.round((3 + sst * 3 + dur * 0.3) * iod * 10) / 10,
      cpoDecline: Math.round((0.3 + sst * 0.4) * 10) / 10,
      coalDisruption: Math.round((20 + sst * 15 + dur * 3) * iod),
      healthCases: Math.round((200 + sst * 200 + dur * 30) * iod),
      ispaCases: Math.round((150 + sst * 250 + dur * 40) * iod),
    };
  }, [intensity, duration, iodEnabled]);

  const chartData = [
    { name: 'Padi', decline: result.riceDecline },
    { name: 'CPO', decline: result.cpoDecline * 20 },
    { name: 'Jagung', decline: result.riceDecline * 1.5 },
    { name: 'Kedelai', decline: result.riceDecline * 0.8 },
    { name: 'Karet', decline: result.riceDecline * 1.2 },
  ];

  const economicData = [
    { name: 'Pertanian', value: result.economicLoss * 0.25 },
    { name: 'Karhutla', value: result.economicLoss * 0.30 },
    { name: 'Logistik', value: result.economicLoss * 0.15 },
    { name: 'Kekeringan', value: result.economicLoss * 0.18 },
    { name: 'Kesehatan', value: result.economicLoss * 0.12 },
  ];

  const monthData = Array.from({ length: duration[0] }, (_, i) => ({
    month: ['Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des', 'Jan', 'Feb', 'Mar'][i] || `Bln ${i+1}`,
    hotspot: Math.round(500 + (i + 1) * (intensity[0] * 200 + 100)),
    drought: Math.round(20 + (i + 1) * (intensity[0] * 8)),
  }));

  const getIntensityColor = () => {
    if (result.label.includes('Ekstrem')) return 'from-red-500 to-red-800';
    if (result.label.includes('Kuat')) return 'from-orange-500 to-red-600';
    if (result.label.includes('Moderat')) return 'from-amber-500 to-orange-600';
    return 'from-emerald-500 to-teal-600';
  };

  return (
    <div className="space-y-8 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none -m-8" />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-slate-900 text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.4)] border border-white/5"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(15,23,42,0.8)_100%)]" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-3xl shadow-[0_0_30px_rgba(79,70,229,0.4)] flex items-center justify-center border-t border-white/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Cpu className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">Scenario Engine</h1>
                  <p className="text-blue-400 font-black tracking-[0.3em] uppercase text-[10px] mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    Godzilla El Niño Predictive Simulator
                  </p>
                </div>
              </div>
              <p className="text-slate-400 text-xl max-w-3xl leading-relaxed font-medium">
                Simulasikan variabel termodinamika atmosfer dan interaksi IOD untuk memproyeksikan deviasi curah hujan, 
                risiko kebakaran, dan volatilitas ekonomi nasional.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl text-right">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Processing Mode</p>
              <p className="text-2xl font-black text-white tracking-tighter uppercase italic">Predictive Analytics</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Controls Panel - 4 columns */}
        <div className="xl:col-span-4 space-y-6">
          <Card className="glass-card border-none overflow-hidden rounded-[2.5rem] shadow-2xl sticky top-8">
            <div className={`h-2 w-full bg-gradient-to-r ${getIntensityColor()} transition-colors duration-500`} />
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black tracking-tight flex items-center gap-3 text-slate-900">
                <RotateCcw className="w-6 h-6 text-indigo-600" />
                Simulation Config
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-10">
              {/* SST Anomaly */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SST Anomaly Index</p>
                    <p className="text-xs font-bold text-slate-500">Surface Temperature Dev.</p>
                  </div>
                  <Badge className={`bg-slate-900 text-white font-black px-4 py-1.5 rounded-full border-none`}>
                    +{intensity[0].toFixed(1)}°C
                  </Badge>
                </div>
                <Slider 
                  value={intensity} 
                  onValueChange={setIntensity} 
                  min={0.2} 
                  max={3.0} 
                  step={0.1}
                  className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:border-4 [&_[role=slider]]:border-white [&_[role=slider]]:bg-indigo-600 [&_[role=slider]]:shadow-xl"
                />
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                  <span>Weak (0.2)</span>
                  <span>Extreme (3.0)</span>
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Temporal Duration</p>
                    <p className="text-xs font-bold text-slate-500">Active Cycle Length</p>
                  </div>
                  <Badge className="bg-indigo-600 text-white font-black px-4 py-1.5 rounded-full border-none">
                    {duration[0]} Months
                  </Badge>
                </div>
                <Slider 
                  value={duration} 
                  onValueChange={setDuration} 
                  min={3} 
                  max={12} 
                  step={1}
                  className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:border-4 [&_[role=slider]]:border-white [&_[role=slider]]:bg-indigo-600 [&_[role=slider]]:shadow-xl"
                />
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                  <span>Q3 (3m)</span>
                  <span>Full Year (12m)</span>
                </div>
              </div>

              {/* IOD Toggle */}
              <button
                onClick={() => setIodEnabled(!iodEnabled)}
                className={`w-full group relative overflow-hidden p-6 rounded-[2rem] border-2 transition-all duration-500 ${
                  iodEnabled 
                    ? 'bg-red-50 border-red-200 shadow-[0_15px_30px_rgba(239,68,68,0.1)]' 
                    : 'bg-slate-50 border-slate-100'
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="text-left">
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${iodEnabled ? 'text-red-600' : 'text-slate-400'}`}>
                      Indian Ocean Dipole (IOD+)
                    </p>
                    <p className={`font-black text-lg ${iodEnabled ? 'text-red-900' : 'text-slate-600'}`}>
                      {iodEnabled ? 'Active Convergence' : 'Neutral State'}
                    </p>
                  </div>
                  <div className={`p-3 rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-110 ${
                    iodEnabled ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                    <Zap className="w-5 h-5" />
                  </div>
                </div>
                {iodEnabled && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-red-400/5 blur-xl pointer-events-none"
                  />
                )}
              </button>

              {/* Classification Label */}
              <div className={`p-8 rounded-[2.5rem] border-2 transition-all duration-500 ${
                result.label === 'Ekstrem (Godzilla)' ? 'bg-red-900 border-red-800 text-white shadow-2xl' :
                result.label === 'Kuat' ? 'bg-orange-600 border-orange-500 text-white shadow-xl' :
                result.label === 'Moderat' ? 'bg-amber-500 border-amber-400 text-white shadow-lg' :
                'bg-emerald-600 border-emerald-500 text-white'
              }`}>
                <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.2em] mb-2">Scenario Profile</p>
                <p className="text-2xl font-black tracking-tighter italic uppercase leading-none">
                  {result.label}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">System Ready</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projections Panel - 8 columns */}
        <div className="xl:col-span-8 space-y-8">
          {/* Summary Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {[
                { label: 'Rainfall Deficit', value: `${result.rainfallDecline}%`, icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Drought Duration', value: `${result.droughtDuration} Days`, icon: TrendingDown, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Burned Area Est.', value: `${result.burnedArea}M Ha`, icon: Flame, color: 'text-red-600', bg: 'bg-red-50' },
                { label: 'Economic Loss', value: `$${result.economicLoss}B`, icon: DollarSign, color: 'text-slate-900', bg: 'bg-slate-100' },
                { label: 'Rice Yield Drop', value: `${result.riceDecline}%`, icon: Wheat, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Mining Disruption', value: `${result.coalDisruption}%`, icon: Factory, color: 'text-slate-600', bg: 'bg-slate-100' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label + result.rainfallDecline} // Trigger animation on value change
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`${stat.bg} p-8 rounded-[2.5rem] border border-white/50 shadow-xl relative overflow-hidden group`}
                >
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <stat.icon className="w-20 h-20" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{stat.label}</p>
                    <p className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-card border-none rounded-[2.5rem] p-8 shadow-xl">
              <SimpleBarChart
                data={chartData}
                xKey="name"
                yKey="decline"
                title="Yield Decline Projection (%)"
                color="#ef4444"
                height={300}
              />
            </Card>
            <Card className="glass-card border-none rounded-[2.5rem] p-8 shadow-xl">
              <SimpleAreaChart
                data={monthData}
                areas={[
                  { key: 'hotspot', name: 'Hotspot Index', color: '#ef4444', fillColor: '#fee2e2' },
                  { key: 'drought', name: 'Drought Index', color: '#f59e0b', fillColor: '#fef3c7' },
                ]}
                xKey="month"
                title="Temporal Impact Progression"
                height={300}
              />
            </Card>
          </div>

          {/* Health Alert Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden border border-white/10 shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px]" />
              <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-orange-600/10 rounded-full blur-[80px]" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-red-600 rounded-2xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  <ShieldAlert className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">Public Health Critical Path</h3>
                  <p className="text-slate-400 font-bold text-sm tracking-tight">Predictive respiratory load analysis</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center gap-8 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 group hover:bg-white/10 transition-colors">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Activity className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <p className="text-5xl font-black text-white tracking-tighter mb-1">
                      {Math.round(result.ispaCases / 1000)}K
                    </p>
                    <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em]">Estimated ISPA Cases</p>
                  </div>
                </div>

                <div className="flex items-center gap-8 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 group hover:bg-white/10 transition-colors">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Gauge className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <p className="text-5xl font-black text-white tracking-tighter mb-1">
                      {Math.round(result.healthCases / 1000)}K
                    </p>
                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em]">Total Bio-Haz Load</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-red-950/30 border border-red-500/20 rounded-[2rem]">
                <p className="text-xs text-red-200/60 leading-relaxed italic">
                  *Data reflects cumulative projections based on selected {result.label} intensity profile across a {duration[0]} month active cycle. 
                  Actual medical facility strain may vary by regional topography and intervention speed.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
