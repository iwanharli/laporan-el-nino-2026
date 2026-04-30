import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Flame, AlertTriangle, MapPin, Droplets, Activity, ShieldAlert, Zap, Globe } from 'lucide-react';
import InteractiveMap from '@/components/map/InteractiveMap';
import { SimpleBarChart, MultiBarChart, SimpleAreaChart } from '@/components/charts/ChartComponents';
import { karhutlaData, regionData, hotspotComparison, scenarioData } from '@/data/reportData';
import { motion } from 'framer-motion';

export default function KarhutlaPage() {

  const karhutlaRegions = regionData.filter(r => 
    ['Riau', 'Jambi', 'Sumatera Selatan', 'Kalimantan Barat', 'Kalimantan Selatan', 'Kalimantan Tengah'].includes(r.name)
  );

  const hotspotTrendData = [
    { month: 'Jan', 2025: 1200, 2026: 3500 },
    { month: 'Feb', 2025: 800, 2026: 5114 },
    { month: 'Mar', 2025: 1500, 2026: 12942 },
    { month: 'Apr', 2025: 600, 2026: 1601 },
    { month: 'Mei (proj)', 2025: 900, 2026: 3500 },
    { month: 'Jun (proj)', 2025: 2500, 2026: 8500 },
    { month: 'Jul (proj)', 2025: 5000, 2026: 18000 },
    { month: 'Agu (proj)', 2025: 8000, 2026: 35000 },
  ];

  const burnedAreaData = scenarioData.map(s => ({
    name: s.name,
    area: parseFloat(s.burnedArea.replace(' juta ha', '').split('-')[0]),
  }));

  const phaseData = [
    { phase: 'Fase 1 (Juni)', provinces: ['Riau'], risk: 'Tinggi', hotspots: 8500, color: 'from-amber-400 to-amber-600' },
    { phase: 'Fase 2 (Juli)', provinces: ['Jambi', 'Sumatera Selatan'], risk: 'Tinggi-Ekstrem', hotspots: 18000, color: 'from-orange-400 to-orange-600' },
    { phase: 'Fase 3 (Agustus)', provinces: ['Kalimantan Barat', 'Kalimantan Selatan'], risk: 'Ekstrem', hotspots: 35000, color: 'from-red-400 to-red-600' },
  ];

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
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/20 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-600/30 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(15,23,42,0.8)_100%)]" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-3xl shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center justify-center border-t border-white/30"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Flame className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">Wildfire Intel</h1>
                  <p className="text-orange-400 font-black tracking-[0.3em] uppercase text-[10px] mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                    Hotspot & Peatland Risk Monitoring 2026
                  </p>
                </div>
              </div>
              <p className="text-slate-400 text-xl max-w-3xl leading-relaxed font-medium">
                Analisis spasial-temporal penyebaran kebakaran hutan dan lahan. Prediksi fase puncak pada ekosistem gambut kritis nasional.
              </p>
            </div>
            <div className="hidden xl:flex items-center gap-4">
              <div className="h-16 w-px bg-white/10" />
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Alert Level</p>
                <p className="text-2xl font-black text-red-500 tracking-tighter">CRITICAL</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Hotspot April', value: '1.601', sub: '2,7x vs 2025', icon: Flame, color: 'text-red-500' },
          { label: 'Luas Terbakar', value: '42.000 ha', sub: '4,2x vs 2025', icon: MapPin, color: 'text-orange-500' },
          { label: 'Hotspot Gambut', value: '12.942', sub: '2,9x MoM Increase', icon: Droplets, color: 'text-amber-500' },
          { label: 'Proyeksi Luas', value: '2.5-8M ha', sub: 'Skenario Ekstrem', icon: AlertTriangle, color: 'text-red-600' },
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
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{stat.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="bg-slate-900/50 backdrop-blur-xl p-1.5 rounded-[2rem] border border-white/5 shadow-2xl">
            {[
              { value: 'overview', icon: Activity, label: 'Overview' },
              { value: 'phases', icon: Zap, label: 'Fase Puncak' },
              { value: 'comparison', icon: Globe, label: 'Komparasi' },
              { value: 'map', icon: MapPin, label: 'Peta Spasial' },
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-8 border-none">
              <SimpleAreaChart
                data={hotspotTrendData}
                areas={[
                  { key: '2025', name: 'Baseline 2025', color: '#94a3b8', fillColor: '#f1f5f9' },
                  { key: '2026', name: 'Target 2026', color: '#ef4444', fillColor: '#fee2e2' },
                ]}
                xKey="month"
                title="Historical Hotspot Divergence Index"
                height={350}
              />
            </div>
            <div className="glass-card p-8 border-none">
              <SimpleBarChart
                data={burnedAreaData}
                xKey="name"
                yKey="area"
                title="Proyeksi Luas Terbakar per Skenario (Juta Ha)"
                color="#f97316"
                height={350}
              />
            </div>
          </div>

          <Card className="glass-card border-none overflow-hidden">
            <div className="h-2 w-full bg-red-600" />
            <CardHeader className="p-8">
              <CardTitle className="text-2xl font-black tracking-tight">Status Karhutla per Provinsi</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-900 border-none">
                  <TableRow className="hover:bg-slate-900 border-none">
                    <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-8">Provinsi</TableHead>
                    <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-6 text-right">Hotspot 2025</TableHead>
                    <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-6 text-right">Hotspot 2026</TableHead>
                    <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-6 text-right">Multiplier</TableHead>
                    <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-6 text-right">Burned 2025</TableHead>
                    <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-6 text-right">Burned 2026</TableHead>
                    <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-8">Risk Phase</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {karhutlaData.map((prov, i) => (
                    <TableRow key={prov.province} className={`group border-b border-slate-50 hover:bg-slate-50/80 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                      <TableCell className="font-black text-slate-900 py-6 px-8">{prov.province}</TableCell>
                      <TableCell className="text-right font-bold text-slate-400 py-6 px-6">{prov.hotspotCount2025.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-black text-red-600 py-6 px-6">{prov.hotspotCount2026.toLocaleString()}</TableCell>
                      <TableCell className="text-right py-6 px-6">
                        <Badge className="bg-slate-900 text-white border-none font-black">{prov.multiplier}x</Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold text-slate-400 py-6 px-6">{prov.burnedArea2025.toLocaleString()} ha</TableCell>
                      <TableCell className="text-right font-black text-red-600 py-6 px-6 underline">{prov.burnedArea2026.toLocaleString()} ha</TableCell>
                      <TableCell className="py-6 px-8 text-right">
                        <Badge className={prov.riskPhase.includes('Ekstrem') ? 'bg-red-600' : 'bg-orange-500'}>
                          {prov.riskPhase}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Emisi CO₂ Index', value: '1.5B Ton', sub: 'Peak Daily > EU Total', progress: 85, color: 'bg-red-50 text-red-900' },
              { label: 'ISPA Case Projection', value: '1.0M Cases', sub: 'Est. Cost: $4B', progress: 65, color: 'bg-orange-50 text-orange-900' },
              { label: 'Tourism Loss', value: '$1.5B Loss', sub: 'Arrival Drop: 40%', progress: 45, color: 'bg-amber-50 text-amber-900' },
            ].map((item) => (
              <div key={item.label} className={`${item.color} rounded-[2rem] p-8 shadow-xl border border-white/20`}>
                <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em] mb-4">{item.label}</p>
                <p className="text-3xl font-black tracking-tighter mb-2">{item.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-tight opacity-60 mb-6">{item.sub}</p>
                <Progress value={item.progress} className="h-1.5 [&>div]:bg-current opacity-40" />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="phases" className="space-y-8 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {phaseData.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${phase.color} rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity`} />
                <Card className="glass-card border-none relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl">
                  <div className={`h-2 w-full bg-gradient-to-r ${phase.color}`} />
                  <CardHeader className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-black text-slate-900 text-xl">{phase.phase}</h3>
                      <Badge className="bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest">{phase.risk}</Badge>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-slate-50/50 p-6 rounded-2xl border border-white shadow-inner">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Target Provinces</p>
                        <p className="font-black text-slate-800">{phase.provinces.join(', ')}</p>
                      </div>
                      <div className="flex justify-between items-center px-2">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Hotspots</p>
                          <p className="text-2xl font-black text-slate-900 tracking-tighter">{phase.hotspots.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-white rounded-2xl shadow-lg">
                          <Zap className="w-6 h-6 text-amber-500" />
                        </div>
                      </div>
                      <p className="text-xs font-bold text-slate-500 leading-relaxed bg-white/40 p-4 rounded-xl">
                        {i === 0 ? 'Kekeringan awal, penurunan muka air tanah gambut secara sistemik.' : 
                         i === 1 ? 'Ekspansi kekeringan ekstrem, aktivitas antropogenik pembukaan lahan meningkat.' : 
                         'Puncak kemarau panjang, akumulasi biomassa kering mencapai titik jenuh bakar.'}
                      </p>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card border-none overflow-hidden rounded-[2.5rem]">
              <CardHeader className="p-10">
                <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-2xl">
                    <ShieldAlert className="w-8 h-8 text-red-600" />
                  </div>
                  Karakteristik Krisis Gambut
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 pt-0 space-y-6">
                {[
                  { label: 'Zombie Fires Index', sub: 'Api bawah permukaan bertahan berbulan-bulan tanpa oksigen eksternal.', icon: Flame },
                  { label: 'Water Table Depth', sub: 'Kondisi WTD >80 cm memicu pelepasan karbon masif secara vertikal.', icon: Droplets },
                  { label: 'Carbon Storage', sub: 'Lahan gambut menyimpan karbon 20x lebih padat dari tanah mineral.', icon: Activity },
                ].map((item) => (
                  <div key={item.label} className="flex gap-5 p-6 bg-slate-50 rounded-3xl border border-white shadow-sm">
                    <div className="p-3 bg-white rounded-2xl shadow-md shrink-0 h-fit">
                      <item.icon className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 mb-1">{item.label}</p>
                      <p className="text-xs font-bold text-slate-500 leading-relaxed">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="glass-card border-none overflow-hidden rounded-[2.5rem]">
              <CardHeader className="p-10">
                <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-4">
                  <div className="p-3 bg-orange-100 rounded-2xl">
                    <Globe className="w-8 h-8 text-orange-600" />
                  </div>
                  Interaksi Multi-Faktor El Niño
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 pt-0 space-y-6">
                <div className="bg-orange-50 p-8 rounded-[2rem] border border-orange-100">
                  <p className="text-orange-900 font-black text-xl mb-4 leading-tight">Konvergensi IOD+ & El Niño</p>
                  <p className="text-sm font-medium text-orange-800/80 leading-relaxed mb-6">
                    Supresi curah hujan ekstrem yang memperpanjang masa kritis muka air tanah (WTD). 
                    Suhu atmosfer yang lebih tinggi meningkatkan <span className="font-black">evaporative demand</span>, mempercepat pengeringan serasah hutan.
                  </p>
                  <div className="flex gap-4">
                    <Badge className="bg-orange-600 text-white border-none font-black">Wind Velocity +40%</Badge>
                    <Badge className="bg-orange-900 text-white border-none font-black">Humidity Drop -25%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-8 outline-none">
          <div className="rounded-[3rem] overflow-hidden border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.3)] bg-slate-900">
            <InteractiveMap height="600px" showFilters={false} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {karhutlaRegions.map(region => (
              <Card key={region.id} className="glass-card border-none hover:translate-y-[-5px] transition-all duration-300">
                <CardHeader className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-lg font-black tracking-tight">{region.name}</CardTitle>
                    <Badge className="bg-red-600 text-white border-none font-black text-[10px] uppercase">{region.karhutlaRisk}</Badge>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'SPI Index', value: region.spiIndex, color: 'text-orange-600' },
                      { label: 'Rainfall Deficit', value: region.rainfallDeficit, color: 'text-red-600' },
                      { label: 'Drought Duration', value: region.droughtDuration, color: 'text-slate-900' },
                    ].map(stat => (
                      <div key={stat.label} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                        <span className={`font-black ${stat.color}`}>{stat.value}</span>
                      </div>
                    ))}
                    <div className="pt-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Key Commodities</p>
                      <div className="flex flex-wrap gap-2">
                        {region.commodities.map(c => (
                          <Badge key={c} variant="outline" className="text-[9px] font-black uppercase tracking-tighter border-slate-200">{c}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
