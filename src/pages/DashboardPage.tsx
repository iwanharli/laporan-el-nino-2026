import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  Thermometer, Droplets, Flame, TrendingDown, AlertTriangle, 
  MapPin, Calendar, Activity, DollarSign, Wheat, Factory,
  Gauge, ArrowRight
} from 'lucide-react';
import InteractiveMap from '@/components/map/InteractiveMap';
import { 
  ScrollReveal, StaggerContainer, StaggerItem, AnimatedCard
} from '@/components/animations';
import { 
  SimpleBarChart, MultiBarChart, SimplePieChart,
  SimpleAreaChart
} from '@/components/charts/ChartComponents';
import { 
  regionData, commodityData, scenarioData, historicalData,
  economicImpactData, institutionPredictions
} from '@/data/reportData';

function StatCard({ icon: Icon, title, value, subtitle, color, delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
    >
      <Card className="glass-card border-none hover:shadow-2xl transition-all duration-500 group overflow-hidden">
        <CardContent className="p-5 relative">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-slate-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10 group-hover:scale-[3]" />
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</p>
              <p className="text-3xl font-black text-slate-900">{value}</p>
              <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
            </div>
            <motion.div 
              className={`p-3 rounded-2xl shadow-lg ${color} text-white`}
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function RiskBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    'Ekstrem': 'bg-red-900 text-white',
    'Tinggi': 'bg-red-600 text-white',
    'Sedang': 'bg-amber-500 text-white',
    'Rendah': 'bg-emerald-500 text-white',
    'low': 'bg-emerald-500 text-white',
    'medium': 'bg-amber-500 text-white',
    'high': 'bg-red-600 text-white',
    'extreme': 'bg-red-900 text-white',
  };
  return <Badge className={colors[level] || 'bg-slate-500 text-white'}>{level}</Badge>;
}

export default function DashboardPage() {
  const [activeScenario, setActiveScenario] = useState('moderat');

  const scenario = scenarioData.find(s => s.name.toLowerCase() === activeScenario) || scenarioData[1];

  const regionRiskData = [
    { name: 'Ekstrem', value: regionData.filter(r => r.riskLevel === 'extreme').length },
    { name: 'Tinggi', value: regionData.filter(r => r.riskLevel === 'high').length },
    { name: 'Sedang', value: regionData.filter(r => r.riskLevel === 'medium').length },
    { name: 'Rendah', value: regionData.filter(r => r.riskLevel === 'low').length },
  ];

  const commodityDeclineData = commodityData.map(c => ({
    name: c.name.split(' ')[0],
    decline: parseFloat(c.declinePercent.replace('%', '').replace('-', '')),
  }));

  const historicalComparisonData = historicalData.map(h => ({
    year: h.year,
    'SST Anomali': parseFloat(h.sstAnomaly.replace('+', '').replace('°C', '').replace(',', '.')),
    'Luas Terbakar': parseFloat(h.burnedArea.replace(' juta ha', '').replace(',', '.')),
  }));

  const hotspotData = [
    { month: 'Jan', 2025: 1200, 2026: 3500 },
    { month: 'Feb', 2025: 800, 2026: 5114 },
    { month: 'Mar', 2025: 1500, 2026: 12942 },
    { month: 'Apr', 2025: 600, 2026: 1601 },
    { month: 'Mei (proj)', 2025: 900, 2026: 3000 },
    { month: 'Jun (proj)', 2025: 2500, 2026: 8500 },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl border border-white/10"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-red-600/20 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  className="p-3 bg-amber-400 rounded-2xl shadow-[0_0_20px_rgba(251,191,36,0.5)]"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <AlertTriangle className="w-8 h-8 text-slate-900" />
                </motion.div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight">Godzilla El Niño 2026</h1>
                  <p className="text-amber-400 font-bold tracking-widest uppercase text-xs mt-1">Strategic Impact Report</p>
                </div>
              </div>
              <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                Analisis komprehensif dampak anomali suhu muka laut ekstrem terhadap ketahanan pangan, ekonomi, dan lingkungan Indonesia.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/30">
                  <Activity className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold">Status Siaga</p>
                  <p className="text-sm font-bold text-red-400">Level IV (Ekstrem)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-white/5 text-sm">
            <span className="flex items-center gap-2 text-slate-300 font-medium"><Calendar className="w-4 h-4 text-amber-400" /> Apr - Okt 2026</span>
            <span className="flex items-center gap-2 text-slate-300 font-medium"><MapPin className="w-4 h-4 text-amber-400" /> Seluruh Indonesia</span>
            <span className="flex items-center gap-2 text-slate-300 font-medium"><Activity className="w-4 h-4 text-amber-400" /> Multi-Source Intelligence</span>
          </div>
        </div>
      </motion.div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          icon={Thermometer} 
          title="Anomali SST" 
          value="+1,5-2,5°C" 
          subtitle="Proyeksi BRIN/NOAA" 
          color="bg-red-600"
          delay={0}
        />
        <StatCard 
          icon={Droplets} 
          title="Defisit Curah Hujan" 
          value="40-60%" 
          subtitle="Wilayah Selatan Indonesia" 
          color="bg-blue-600"
          delay={0.1}
        />
        <StatCard 
          icon={Flame} 
          title="Risiko Karhutla" 
          value="2,5-8,0 juta ha" 
          subtitle="Proyeksi luas terbakar" 
          color="bg-orange-600"
          delay={0.2}
        />
        <StatCard 
          icon={TrendingDown} 
          title="Kerugian Ekonomi" 
          value="$9-34 Miliar" 
          subtitle="Skenario moderat-ekstrem" 
          color="bg-slate-700"
          delay={0.3}
        />
      </div>

      {/* Scenario Selector */}
      <ScrollReveal>
        <Card className="glass-card border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Skenario Dampak El Niño 2026
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeScenario} onValueChange={setActiveScenario} className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                {scenarioData.map(s => (
                  <TabsTrigger key={s.name} value={s.name.toLowerCase().split(' ')[0]} className="text-xs">
                    {s.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value={activeScenario}>
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={activeScenario}
                >
                  {[
                    { label: 'Kondisi', value: scenario.condition },
                    { label: 'Penurunan Curah Hujan', value: scenario.rainfallDecline },
                    { label: 'Durasi Kemarau', value: scenario.droughtDuration },
                    { label: 'Luas Terbakar', value: scenario.burnedArea },
                    { label: 'Kerugian Ekonomi', value: scenario.economicLoss, highlight: true },
                  ].map((item, i) => (
                    <motion.div 
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`rounded-lg p-3 ${item.highlight ? 'bg-red-50 border border-red-200' : 'bg-slate-50'}`}
                    >
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className={`text-sm font-semibold mt-1 ${item.highlight ? 'text-red-600' : ''}`}>
                        {item.value}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Simulator CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/simulator">
          <Card className="bg-slate-900 text-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 cursor-pointer group rounded-3xl border-white/5 border overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500/20 rounded-lg">
                    <Gauge className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Coba Simulator Skenario Interaktif</h3>
                    <p className="text-sm text-slate-400">
                      Atur parameter intensitas SST, durasi, dan IOD untuk melihat proyeksi dampak real-time
                    </p>
                  </div>
                </div>
                <motion.div
                  className="p-2 rounded-lg bg-white/10"
                  whileHover={{ x: 5 }}
                >
                  <ArrowRight className="w-5 h-5 group-hover:text-amber-400 transition-colors" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Map */}
      <ScrollReveal>
        <InteractiveMap height="500px" showFilters={true} />
      </ScrollReveal>

      {/* Institution Predictions */}
      <ScrollReveal>
        <Card className="glass-card border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Perbandingan Prediksi Lembaga</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-3 rounded-tl-lg">Lembaga</th>
                    <th className="text-left p-3">Intensitas</th>
                    <th className="text-left p-3">Probabilitas</th>
                    <th className="text-left p-3">Periode Kritis</th>
                    <th className="text-left p-3 rounded-tr-lg">Catatan</th>
                  </tr>
                </thead>
                <tbody>
                  {institutionPredictions.map((pred, i) => (
                    <motion.tr 
                      key={pred.institution} 
                      className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <td className="p-3 font-semibold">{pred.institution}</td>
                      <td className="p-3"><RiskBadge level={pred.intensity} /></td>
                      <td className="p-3">{pred.probability}</td>
                      <td className="p-3">{pred.period}</td>
                      <td className="p-3 text-slate-600">{pred.note}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScrollReveal>
          <SimplePieChart 
            data={regionRiskData}
            dataKey="value"
            nameKey="name"
            title="Distribusi Wilayah Berdasarkan Tingkat Risiko"
          />
        </ScrollReveal>
        <ScrollReveal>
          <SimpleBarChart
            data={commodityDeclineData}
            xKey="name"
            yKey="decline"
            title="Proyeksi Penurunan Produksi per Komoditas (%)"
            color="#b91c1c"
          />
        </ScrollReveal>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScrollReveal>
          <MultiBarChart
            data={historicalComparisonData}
            bars={[
              { key: 'SST Anomali', name: 'SST Anomali (°C)', color: '#dc2626' },
              { key: 'Luas Terbakar', name: 'Luas Terbakar (juta ha)', color: '#f59e0b' },
            ]}
            xKey="year"
            title="Perbandingan Event Historis"
          />
        </ScrollReveal>
        <ScrollReveal>
          <SimpleAreaChart
            data={hotspotData}
            areas={[
              { key: '2025', name: '2025', color: '#6b7280', fillColor: '#9ca3af' },
              { key: '2026', name: '2026', color: '#dc2626', fillColor: '#fca5a5' },
            ]}
            xKey="month"
            title="Tren Hotspot 2025 vs 2026"
          />
        </ScrollReveal>
      </div>

      {/* Economic Impact Summary */}
      <ScrollReveal>
        <Card className="glass-card border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-red-600" />
              Estimasi Kerugian Ekonomi Nasional 2026
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-3 rounded-tl-lg">Sektor</th>
                    <th className="text-right p-3">Moderat (USD)</th>
                    <th className="text-right p-3">Moderat (IDR)</th>
                    <th className="text-right p-3">Ekstrem (USD)</th>
                    <th className="text-right p-3 rounded-tr-lg">Ekstrem (IDR)</th>
                  </tr>
                </thead>
                <tbody>
                  {economicImpactData.map((sector, i) => (
                    <motion.tr 
                      key={sector.sector} 
                      className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <td className="p-3 font-semibold">{sector.sector}</td>
                      <td className="p-3 text-right">{sector.moderateLossUSD}</td>
                      <td className="p-3 text-right">{sector.moderateLossIDR}</td>
                      <td className="p-3 text-right text-red-600 font-semibold">{sector.extremeLossUSD}</td>
                      <td className="p-3 text-right text-red-600 font-semibold">{sector.extremeLossIDR}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Quick Navigation Cards */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { icon: MapPin, label: 'Peta Interaktif', desc: 'Pemetaan spasial dampak', color: 'bg-blue-100 text-blue-700', path: '/peta' },
          { icon: Wheat, label: 'Komoditas', desc: 'Dampak pertanian', color: 'bg-amber-100 text-amber-700', path: '/komoditas' },
          { icon: Flame, label: 'Karhutla', desc: 'Kebakaran hutan', color: 'bg-red-100 text-red-700', path: '/karhutla' },
          { icon: Factory, label: 'Batubara', desc: 'Dampak energi', color: 'bg-slate-100 text-slate-700', path: '/ekonomi' },
          { icon: Droplets, label: 'Kelapa Sawit', desc: 'Produksi CPO', color: 'bg-emerald-100 text-emerald-700', path: '/ekonomi' },
          { icon: Gauge, label: 'Simulator', desc: 'Skenario interaktif', color: 'bg-purple-100 text-purple-700', path: '/simulator' },
        ].map((item) => (
          <StaggerItem key={item.label}>
            <Link to={item.path}>
              <AnimatedCard hoverScale={1.05}>
                <Card className="glass-card border-none cursor-pointer h-full group">
                  <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                    <div className={`p-3 rounded-full ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Footer */}
      <div className="text-center text-sm text-slate-500 py-4 border-t">
        <p>Laporan Dampak Godzilla El Niño Indonesia - April 2026 | Data: BMKG, BRIN, BPS, NOAA, World Bank</p>
        <p className="mt-1">Dibuat untuk keperluan analisis dan mitigasi bencana</p>
      </div>
    </div>
  );
}
