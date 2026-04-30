import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Wheat, Leaf, Activity, TrendingDown, Map as MapIcon, Database, Droplets, DollarSign } from 'lucide-react';
import InteractiveMap from '@/components/map/InteractiveMap';
import { SimpleBarChart, SimpleRadarChart } from '@/components/charts/ChartComponents';
import { commodityData, regionData } from '@/data/reportData';
import { motion } from 'framer-motion';

function CommodityCard({ commodity }: { commodity: typeof commodityData[0] }) {
  const declineValue = parseFloat(commodity.declinePercent.replace('%', ''));
  
  return (
    <motion.div whileHover={{ y: -5 }}>
      <Card className="glass-card border-none overflow-hidden group transition-all duration-300">
        <div className={`h-1.5 w-full ${declineValue > 15 ? 'bg-red-600' : declineValue > 10 ? 'bg-orange-500' : 'bg-emerald-500'}`} />
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-black tracking-tight">{commodity.name}</CardTitle>
            <Badge className={`${declineValue > 15 ? 'bg-red-600' : declineValue > 10 ? 'bg-orange-500' : 'bg-emerald-500'} border-none shadow-lg text-white font-black`}>
              -{commodity.declinePercent}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Produksi 2025</p>
              <p className="font-black text-slate-800">{commodity.production2025}</p>
            </div>
            <div className="bg-red-50/50 backdrop-blur-sm rounded-2xl p-3 border border-red-100">
              <p className="text-[10px] font-black text-red-900/40 uppercase tracking-widest mb-1">Proyeksi 2026</p>
              <p className="font-black text-red-600">{commodity.projection2026}</p>
            </div>
          </div>
          
          <div className="space-y-2 px-1">
            {[
              { label: 'Penurunan Volume', value: commodity.declineVolume },
              { label: 'Dampak Harga', value: commodity.priceImpact, color: 'text-orange-600' },
              { label: 'Kerugian Ekonomi', value: commodity.economicLoss, color: 'text-red-600' },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center text-xs border-b border-slate-100 pb-2 last:border-0">
                <span className="font-black text-slate-400 uppercase tracking-widest text-[9px]">{row.label}</span>
                <span className={`font-black ${row.color || 'text-slate-700'}`}>{row.value}</span>
              </div>
            ))}
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Wilayah Utama</p>
            <div className="flex flex-wrap gap-1.5">
              {commodity.regions.map(r => (
                <Badge key={r} variant="outline" className="text-[9px] bg-slate-50/50 border-slate-200 font-bold px-2 py-0.5">{r}</Badge>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/5 rounded-2xl p-3">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Faktor Dominan</p>
            <ul className="space-y-1.5">
              {commodity.keyFactors.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-[10px] font-bold text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function CommoditiesPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const commodityDeclineData = commodityData.map(c => ({
    name: c.name.split(' ')[0],
    decline: parseFloat(c.declinePercent.replace('%', '').replace('-', '')),
  }));

  const commodityRadarData = commodityData.map(c => ({
    name: c.name.split(' ')[0],
    decline: parseFloat(c.declinePercent.replace('%', '').replace('-', '')),
    priceImpact: parseFloat(c.priceImpact.replace('Naik ', '').replace('%', '').split('-')[0]),
    economicImpact: parseFloat(c.economicLoss.replace('Rp ', '').split(' ')[0]),
  }));

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
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-amber-600/30 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(15,23,42,0.8)_100%)]" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-600 rounded-3xl shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center border-t border-white/30"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Wheat className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">Commodity Intel</h1>
                  <p className="text-amber-400 font-black tracking-[0.3em] uppercase text-[10px] mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Agricultural Resilience Analysis 2026
                  </p>
                </div>
              </div>
              <p className="text-slate-400 text-xl max-w-3xl leading-relaxed font-medium">
                Visualisasi dampak multidimensi El Niño terhadap produksi pangan nasional, volatilitas harga, dan ketahanan komoditas perkebunan.
              </p>
            </div>
            <div className="hidden xl:flex items-center gap-4">
              <div className="bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-md">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Impact Factor</p>
                <p className="text-3xl font-black text-red-500 tracking-tighter">-15.4%</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="bg-slate-900/50 backdrop-blur-xl p-1.5 rounded-[2rem] border border-white/5 shadow-2xl">
            {[
              { value: 'overview', icon: Activity, label: 'Ringkasan' },
              { value: 'paddy', icon: Wheat, label: 'Tanaman Pangan' },
              { value: 'plantation', icon: Leaf, label: 'Perkebunan' },
              { value: 'regional', icon: MapIcon, label: 'Peta Wilayah' },
            ].map((tab) => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value} 
                className="rounded-[1.5rem] px-6 py-3 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-[0_10px_25px_rgba(255,255,255,0.2)] transition-all duration-500 text-slate-400 font-bold flex items-center gap-2 border border-transparent data-[state=active]:border-white/20"
              >
                <tab.icon className="w-4 h-4" /> 
                <span className="text-xs uppercase tracking-widest">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-8 outline-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Komoditas', value: commodityData.length, icon: Database, color: 'text-blue-500' },
              { label: 'Penurunan Tertinggi', value: '15-25%', icon: TrendingDown, color: 'text-red-500', sub: 'Kopi & Jagung' },
              { label: 'Wilayah Kritis', value: 'Jawa & NTT', icon: MapIcon, color: 'text-orange-500', sub: 'Kekeringan Ekstrem' },
              { label: 'Total Kerugian', value: 'Rp 56T', icon: DollarSign, color: 'text-red-600', sub: 'Estimasi Makro' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass-card border-none hover:bg-white/60 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-2xl bg-white shadow-xl ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    </div>
                    <p className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.value}</p>
                    {stat.sub && <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{stat.sub}</p>}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SimpleBarChart
              data={commodityDeclineData}
              xKey="name"
              yKey="decline"
              title="Proyeksi Penurunan Produksi Nasional (%)"
              color="#b91c1c"
              height={400}
            />
            <SimpleRadarChart
              data={commodityRadarData}
              indicators={[
                { key: 'decline', name: 'Penurunan (%)' },
                { key: 'priceImpact', name: 'Dampak Harga' },
                { key: 'economicImpact', name: 'Kerugian (Triliun)' },
              ]}
              title="Multidimensional Risk Profile"
              height={400}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commodityData.map(commodity => (
              <CommodityCard key={commodity.name} commodity={commodity} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="paddy" className="space-y-8 outline-none">
          <Card className="glass-card border-none overflow-hidden">
            <div className="h-2 w-full bg-amber-500" />
            <CardHeader className="p-8">
              <CardTitle className="text-3xl font-black tracking-tight flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-2xl">
                  <Wheat className="w-8 h-8 text-amber-600" />
                </div>
                Analisis Ketahanan Pangan Strategis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { 
                    name: 'Padi', 
                    color: 'from-red-50 to-red-100 border-red-200', 
                    text: 'text-red-900',
                    stats: [
                      { label: 'Produksi 2025', value: '60,21 Juta Ton' },
                      { label: 'Proyeksi Drop', value: '5-12%', highlight: true },
                      { label: 'Cadangan Bulog', value: '4.5 Juta Ton' }
                    ],
                    zones: ['Jawa Barat Selatan', 'Jawa Timur Selatan', 'NTT']
                  },
                  { 
                    name: 'Jagung', 
                    color: 'from-amber-50 to-amber-100 border-amber-200', 
                    text: 'text-amber-900',
                    stats: [
                      { label: 'Produksi 2025', value: '16,11 Juta Ton' },
                      { label: 'Proyeksi Drop', value: '15-25%', highlight: true },
                      { label: 'Defisit Air', value: '40-60%' }
                    ],
                    factors: ['Switching Cost', 'Siklus 3 Terganggu']
                  },
                  { 
                    name: 'Kedelai', 
                    color: 'from-orange-50 to-orange-100 border-orange-200', 
                    text: 'text-orange-900',
                    stats: [
                      { label: 'Impor Dependency', value: '>70%' },
                      { label: 'Proyeksi Drop', value: '10-15%', highlight: true },
                      { label: 'Kenaikan Harga', value: '15-25%' }
                    ],
                    factors: ['Input-Cost Shock', 'Pupuk Mahal']
                  },
                ].map((item) => (
                  <div key={item.name} className={`bg-gradient-to-br ${item.color} border rounded-[2rem] p-6 shadow-xl`}>
                    <h3 className={`text-2xl font-black mb-6 ${item.text}`}>{item.name}</h3>
                    <div className="space-y-4 mb-6">
                      {item.stats.map(s => (
                        <div key={s.label} className="flex justify-between items-center text-sm border-b border-white/50 pb-2">
                          <span className="font-bold text-slate-500 uppercase text-[9px] tracking-widest">{s.label}</span>
                          <span className={`font-black ${s.highlight ? 'text-red-600' : 'text-slate-800'}`}>{s.value}</span>
                        </div>
                      ))}
                    </div>
                    {item.zones && (
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Zona Kritis</p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.zones.map(z => <Badge key={z} className="bg-white/80 text-red-900 border-none text-[9px] font-black">{z}</Badge>)}
                        </div>
                      </div>
                    )}
                    {item.factors && (
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Faktor Risiko</p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.factors.map(f => <Badge key={f} className="bg-white/80 text-orange-900 border-none text-[9px] font-black">{f}</Badge>)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="rounded-[2rem] border border-slate-200 overflow-hidden shadow-2xl bg-white">
                <Table>
                  <TableHeader className="bg-slate-900">
                    <TableRow className="hover:bg-slate-900">
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-5 pl-8">Komoditas</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-5">Wilayah Prioritas</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-5">Output 2025</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-5">Target 2026</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-5">Gap (%)</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-5 pr-8">Market Impact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: 'Padi', region: 'Jawa Tengah, Jabar, Jatim', out25: '60.21M GKG', out26: '53-57M', gap: '5-12%', impact: 'Naik 15-25%' },
                      { name: 'Jagung', region: 'Jatim, NTB, NTT', out25: '16.11M Ton', out26: '12-14M', gap: '15-25%', impact: 'Naik 10-20%' },
                      { name: 'Kedelai', region: 'Jatim, NTB, NTT', out25: '~1M Ton', out26: '0.85M', gap: '10-15%', impact: 'Naik 15-25%' },
                    ].map((row) => (
                      <TableRow key={row.name} className="hover:bg-slate-50 transition-colors">
                        <TableCell className="font-black text-slate-900 pl-8 py-5">{row.name}</TableCell>
                        <TableCell className="font-bold text-slate-500 text-xs">{row.region}</TableCell>
                        <TableCell className="font-black text-slate-700">{row.out25}</TableCell>
                        <TableCell className="font-black text-red-600">{row.out26}</TableCell>
                        <TableCell className="font-black text-red-600 underline">{row.gap}</TableCell>
                        <TableCell className="font-black text-orange-600 pr-8">{row.impact}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plantation" className="space-y-8 outline-none">
          <Card className="glass-card border-none overflow-hidden">
            <div className="h-2 w-full bg-emerald-500" />
            <CardHeader className="p-8">
              <CardTitle className="text-3xl font-black tracking-tight flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-2xl">
                  <Leaf className="w-8 h-8 text-emerald-600" />
                </div>
                Dampak Komoditas Perkebunan & Ekspor
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div whileHover={{ scale: 1.01 }} className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-[2.5rem] p-8 shadow-xl">
                  <h3 className="font-black text-emerald-900 text-2xl mb-6 flex items-center gap-3">
                    Kelapa Sawit (CPO)
                    <Badge className="bg-emerald-600 text-white border-none font-black text-[10px]">Export King</Badge>
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/60 p-4 rounded-2xl">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Produksi 2025</p>
                      <p className="text-xl font-black text-slate-800">51.66M Ton</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                      <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-1">Target 2026</p>
                      <p className="text-xl font-black text-red-600">49.5M Ton</p>
                    </div>
                  </div>
                  <div className="bg-white/40 p-5 rounded-[2rem] border border-white/60 space-y-3">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Faktor Penurunan</p>
                    {[
                      { icon: Droplets, text: 'Reduksi Yield (Kekeringan)', val: '-1M Ton' },
                      { icon: Activity, text: 'Efisiensi Pupuk Petani', val: '-1M Ton' },
                      { icon: TrendingDown, text: 'Biological Lag Effect', val: '18 Bulan' },
                    ].map((f, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <f.icon className="w-3 h-3 text-emerald-600" />
                          <span className="font-bold text-slate-600">{f.text}</span>
                        </div>
                        <span className="font-black text-red-600">{f.val}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.01 }} className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-[2.5rem] p-8 shadow-xl">
                  <h3 className="font-black text-amber-900 text-2xl mb-6">Kopi & Kakao</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Kopi Arabika', drop: '10-20%', color: 'bg-orange-500' },
                      { label: 'Kopi Robusta', drop: '15-25%', color: 'bg-red-600' },
                      { label: 'Kakao', drop: '10-18%', color: 'bg-amber-600' },
                    ].map((c) => (
                      <div key={c.label} className="bg-white/60 p-4 rounded-2xl flex justify-between items-center">
                        <span className="font-black text-slate-700">{c.label}</span>
                        <Badge className={`${c.color} text-white border-none font-black shadow-lg`}>Drop {c.drop}</Badge>
                      </div>
                    ))}
                    <div className="p-4 bg-slate-900/5 rounded-2xl">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Regions</p>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">Lampung, Sumatera Selatan, Sulawesi Selatan & Sulteng</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 overflow-hidden shadow-2xl bg-white">
                <Table>
                  <TableHeader className="bg-slate-900">
                    <TableRow className="hover:bg-slate-900">
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-5 pl-8">Komoditas</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-5">Main Regions</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-5">Baseline 2025</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-5">Proyeksi Drop</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-5 pr-8">Dominant Factor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: 'Karet', region: 'Sumsel, Kalbar, Jambi', base: '3M Ton', drop: '10-20%', factor: 'Stres Hidrologis' },
                      { name: 'Kopi Arabika', region: 'Sumut, Jabar, Sulsel', base: '150K Ton', drop: '10-20%', factor: 'Reduced Bean Size' },
                      { name: 'Kopi Robusta', region: 'Lampung, Jateng', base: '700K Ton', drop: '15-25%', factor: 'Heat Stress + Hama' },
                      { name: 'Tebu', region: 'Jatim, NTT, Lampung', base: '2.5M Ton', drop: '12-20%', factor: 'Reduksi Kadar Gula' },
                    ].map((row) => (
                      <TableRow key={row.name} className="hover:bg-slate-50 transition-colors">
                        <TableCell className="font-black text-slate-900 pl-8 py-5">{row.name}</TableCell>
                        <TableCell className="font-bold text-slate-500 text-xs">{row.region}</TableCell>
                        <TableCell className="font-black text-slate-700">{row.base}</TableCell>
                        <TableCell className="font-black text-red-600 underline">{row.drop}</TableCell>
                        <TableCell className="font-bold text-orange-600 pr-8">{row.factor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional" className="space-y-8 outline-none">
          <InteractiveMap height="600px" showFilters={true} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionData.filter(r => r.commodities.length > 0).map(region => (
              <motion.div key={region.id} whileHover={{ y: -5 }}>
                <Card className="glass-card border-none group overflow-hidden">
                  <div className={`h-1.5 w-full ${region.riskLevel === 'extreme' ? 'bg-red-900' : 'bg-red-600'}`} />
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-black tracking-tight">{region.name}</CardTitle>
                      <Badge className={region.riskLevel === 'extreme' ? 'bg-red-900' : region.riskLevel === 'high' ? 'bg-red-600' : 'bg-amber-500'}>
                        {region.riskLevel}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-white/50 p-4 rounded-2xl border border-white/50">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Fokus Komoditas</p>
                      <div className="flex flex-wrap gap-1.5">
                        {region.commodities.map(c => <Badge key={c} variant="outline" className="bg-white border-slate-200 text-slate-700 font-bold">{c}</Badge>)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Defisit Hujan', value: region.rainfallDeficit },
                        { label: 'Suhu Puncak', value: region.temperature },
                        { label: 'Durasi', value: region.droughtDuration },
                        { label: 'Loss Est.', value: region.economicLoss },
                      ].map(s => (
                        <div key={s.label} className="bg-slate-50 p-3 rounded-2xl">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{s.label}</p>
                          <p className="text-xs font-black text-slate-800">{s.value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

