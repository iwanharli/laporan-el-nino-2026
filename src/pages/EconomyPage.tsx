import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  Factory, Ship, Droplets, TrendingUp, TrendingDown,
  DollarSign, Activity, ShieldAlert, BarChart3, Globe
} from 'lucide-react';
import { SimpleBarChart, MultiBarChart } from '@/components/charts/ChartComponents';
import { 
  coalData, palmOilData, droughtDetailData, economicImpactData, 
  riverData, scenarioData, inflationData
} from '@/data/reportData';
import { motion } from 'framer-motion';

export default function EconomyPage() {
  const [activeScenario, setActiveScenario] = useState('moderat');

  const scenario = scenarioData.find(s => s.name.toLowerCase() === activeScenario) || scenarioData[1];

  const riverDisruptionData = riverData.map(r => ({
    name: r.name.replace('Sungai ', ''),
    'Penurunan Debit (%)': parseFloat(r.projectedDecline.replace('%', '').split('-')[0]),
    'Durasi Gangguan (bulan)': r.criticalSegments.length * 1.5,
  }));

  const economicSectorData = economicImpactData.map(e => ({
    name: e.sector.split(' ')[0],
    'Moderat (miliar USD)': parseFloat(e.moderateLossUSD.replace(',', '.').split('-')[0]),
    'Ekstrem (miliar USD)': parseFloat(e.extremeLossUSD.replace(',', '.').split('-')[0]),
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
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-green-600/30 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(15,23,42,0.8)_100%)]" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-600 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center border-t border-white/30"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <DollarSign className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">Economic Intel</h1>
                  <p className="text-emerald-400 font-black tracking-[0.3em] uppercase text-[10px] mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Macroeconomic Vulnerability Report 2026
                  </p>
                </div>
              </div>
              <p className="text-slate-400 text-xl max-w-3xl leading-relaxed font-medium">
                Sistem analisis dampak El Niño terhadap PDB, ketahanan sektor ekstraktif, dan stabilitas harga komoditas strategis nasional.
              </p>
            </div>
            <div className="hidden xl:flex items-center gap-4">
              <div className="h-16 w-px bg-white/10" />
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Market Status</p>
                <p className="text-2xl font-black text-amber-400 tracking-tighter">VOLATILE</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scenario Selector */}
      <Card className="glass-card border-none overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <CardHeader className="p-8 pb-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-black tracking-tight flex items-center gap-3">
              <div className="p-2 bg-slate-900 rounded-xl">
                <ShieldAlert className="w-4 h-4 text-white" />
              </div>
              Impact Scenario Analysis
            </CardTitle>
            <Badge className="bg-slate-900 text-white border-none font-black text-[10px] uppercase tracking-widest px-4 py-1">Simulated Model v4.1</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <Tabs value={activeScenario} onValueChange={setActiveScenario} className="space-y-8">
            <TabsList className="bg-slate-100 p-1.5 rounded-[1.5rem] border-none shadow-inner grid grid-cols-4 w-full">
              {scenarioData.map(s => (
                <TabsTrigger 
                  key={s.name} 
                  value={s.name.toLowerCase().split(' ')[0]}
                  className="rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg"
                >
                  {s.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Kerugian Ekonomi', value: scenario.economicLoss, color: 'text-red-600', icon: TrendingDown },
                { label: 'Dampak PDB', value: scenario.gdpImpact, color: 'text-slate-900', icon: BarChart3 },
                { label: 'Luas Terbakar', value: scenario.burnedArea, color: 'text-orange-600', icon: Activity },
                { label: 'Durasi Kemarau', value: scenario.droughtDuration, color: 'text-blue-600', icon: Globe },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/50 backdrop-blur-md rounded-[1.5rem] p-6 border border-white shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <item.icon className="w-4 h-4 text-slate-400" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                  </div>
                  <p className={`text-2xl font-black tracking-tighter ${item.color}`}>{item.value}</p>
                </motion.div>
              ))}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <Tabs defaultValue="coal" className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="bg-slate-900/50 backdrop-blur-xl p-1.5 rounded-[2rem] border border-white/5 shadow-2xl">
            {[
              { value: 'coal', icon: Factory, label: 'Batubara' },
              { value: 'palmoil', icon: Ship, label: 'Sawit' },
              { value: 'drought', icon: Droplets, label: 'Kekeringan' },
              { value: 'river', icon: Ship, label: 'Logistik' },
              { value: 'inflation', icon: TrendingUp, label: 'Makro' },
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

        {/* Batubara Tab */}
        <TabsContent value="coal" className="space-y-8 outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Pasar Global', value: coalData.globalMarketShare, sub: 'Seaborne Thermal', color: 'text-blue-600' },
              { label: 'Ekspor Tahunan', value: coalData.annualExport, sub: 'Juta Ton / Tahun', color: 'text-slate-900' },
              { label: 'Kerugian / Bulan', value: coalData.estimatedMonthlyLoss, sub: 'Penerimaan Negara', color: 'text-red-600' },
              { label: 'PLTU Jawa-Bali', value: coalData.pltuJawaBali, sub: 'Ketergantungan Energi', color: 'text-amber-600' },
            ].map((stat) => (
              <Card key={stat.label} className="glass-card border-none hover:bg-white/60 transition-all duration-300">
                <CardContent className="p-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                  <p className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{stat.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-card border-none overflow-hidden">
            <div className="h-2 w-full bg-slate-900" />
            <CardHeader className="p-8">
              <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-4">
                <div className="p-3 bg-slate-100 rounded-2xl">
                  <Factory className="w-8 h-8 text-slate-900" />
                </div>
                Krisis Logistik Batubara: Kalimantan & Sumatera
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 shadow-xl">
                  <h4 className="font-black text-slate-900 text-xl mb-6 flex items-center gap-2">
                    <Ship className="w-5 h-5 text-blue-600" />
                    Indeks Sungai Kritis
                  </h4>
                  <div className="space-y-4">
                    {[
                      { river: 'Mahakam', share: '60-70% Export', drop: '40-60%' },
                      { river: 'Barito', share: '50-80M Ton', drop: 'Extreme' },
                      { river: 'Musi', share: '40-60M Ton', drop: 'Significant' },
                    ].map(r => (
                      <div key={r.river} className="bg-white/60 p-5 rounded-2xl border border-white shadow-sm flex justify-between items-center">
                        <div>
                          <p className="font-black text-slate-800">{r.river}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{r.share}</p>
                        </div>
                        <Badge className="bg-red-600 text-white border-none font-black">{r.drop}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl -mr-16 -mt-16" />
                  <h4 className="font-black text-red-900 text-xl mb-6">Financial Impact Forecast</h4>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-sm border-b border-red-200 pb-3">
                      <span className="font-black text-red-900/40 uppercase text-[10px] tracking-widest">Gangguan 1 Bulan</span>
                      <span className="font-black text-red-600">Rp 6-8 Triliun</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-red-200 pb-3">
                      <span className="font-black text-red-900/40 uppercase text-[10px] tracking-widest">Gangguan 4 Bulan</span>
                      <span className="font-black text-red-600">Rp 18-32 Triliun</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-red-200 pb-3">
                      <span className="font-black text-red-900/40 uppercase text-[10px] tracking-widest">Global Price Spike</span>
                      <span className="font-black text-red-600">10-20%</span>
                    </div>
                    <div className="pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-[10px] font-black text-red-900/40 uppercase">Loss Intensity Index</span>
                        <span className="text-xs font-black text-red-600">85%</span>
                      </div>
                      <Progress value={85} className="h-2 bg-red-200 [&>div]:bg-red-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-2xl bg-white">
                <Table>
                  <TableHeader className="bg-slate-900">
                    <TableRow className="hover:bg-slate-900 border-none">
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-8">Sungai</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-6">Lokasi</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-6 text-right">Length (KM)</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-6">Vol. Annual</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-6 text-right">Debit Drop</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-8">Critical Segments</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {riverData.map((river, i) => (
                      <TableRow key={river.name} className={`hover:bg-slate-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                        <TableCell className="font-black text-slate-900 py-6 px-8">{river.name}</TableCell>
                        <TableCell className="font-bold text-slate-500 py-6 px-6 text-xs">{river.location}</TableCell>
                        <TableCell className="font-black text-slate-700 py-6 px-6 text-right">{river.length.toLocaleString()}</TableCell>
                        <TableCell className="font-black text-slate-700 py-6 px-6">{river.volumeAnnual}</TableCell>
                        <TableCell className="font-black text-red-600 py-6 px-6 text-right underline">{river.projectedDecline}</TableCell>
                        <TableCell className="font-bold text-slate-500 py-6 px-8 text-xs">{river.criticalSegments.join(', ')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="glass-card p-8 border-none overflow-hidden">
            <MultiBarChart
              data={riverDisruptionData}
              bars={[
                { key: 'Penurunan Debit (%)', name: 'Penurunan Debit (%)', color: '#ef4444' },
                { key: 'Durasi Gangguan (bulan)', name: 'Durasi (bulan)', color: '#f59e0b' },
              ]}
              xKey="name"
              title="Proyeksi Gangguan Hidrologis per Daerah Aliran Sungai"
              height={350}
            />
          </div>
        </TabsContent>

        {/* Kekeringan Tab */}
        <TabsContent value="drought" className="space-y-8 outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Penduduk Terdampak', value: droughtDetailData.affectedPopulation, sub: 'Krisis Air Bersih', color: 'text-red-600' },
              { label: 'Defisit Irigasi', value: droughtDetailData.irrigationDeficit, sub: 'Lahan Pertanian', color: 'text-orange-600' },
              { label: 'Reduksi PLTA', value: droughtDetailData.pltaReduction, sub: 'Defisit Listrik 5-10%', color: 'text-amber-600' },
            ].map((stat) => (
              <Card key={stat.label} className="glass-card border-none hover:bg-white/60 transition-all duration-300">
                <CardContent className="p-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                  <p className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{stat.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card border-none overflow-hidden rounded-[2.5rem]">
              <CardHeader className="p-10">
                <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-4 text-slate-900">
                  <div className="p-3 bg-red-100 rounded-2xl">
                    <ShieldAlert className="w-8 h-8 text-red-600" />
                  </div>
                  Pusat Krisis Air Perkotaan
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 pt-0 space-y-6">
                <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100">
                  <p className="text-red-900 font-black text-xl mb-4 leading-tight">15-25 Juta Jiwa Terdampak</p>
                  <p className="text-sm font-medium text-red-800/80 leading-relaxed mb-6">
                    Jabodetabek, Surabaya, Semarang, dan Denpasar menghadapi risiko kritis penurunan debit air baku PDAM dan intrusi air laut.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Jakarta', 'Surabaya', 'Semarang', 'Denpasar', 'Bandung'].map(city => (
                      <Badge key={city} className="bg-red-600 text-white border-none font-black">{city}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none overflow-hidden rounded-[2.5rem]">
              <CardHeader className="p-10">
                <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-4 text-slate-900">
                  <div className="p-3 bg-blue-100 rounded-2xl">
                    <Droplets className="w-8 h-8 text-blue-600" />
                  </div>
                  Analisis Kerugian Hidrologis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 pt-0 space-y-6">
                <div className="space-y-4">
                  {[
                    { label: 'Total Estimasi Kerugian', value: droughtDetailData.totalLoss },
                    { label: 'Biaya Krisis Air Bersih', value: droughtDetailData.waterCrisisCost },
                    { label: 'Rationing Industri', value: droughtDetailData.industrialRationing },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-white shadow-sm">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                      <span className="font-black text-slate-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Logistik Tab */}
        <TabsContent value="river" className="space-y-8 outline-none">
          <Card className="glass-card border-none overflow-hidden rounded-[2.5rem]">
            <div className="h-2 w-full bg-blue-600" />
            <CardHeader className="p-10">
              <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-4 text-slate-900">
                <div className="p-3 bg-blue-100 rounded-2xl">
                  <Ship className="w-8 h-8 text-blue-600" />
                </div>
                Infrastruktur Jalur Logistik Sungai
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 pt-0 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                  <h4 className="font-black text-slate-900 text-xl mb-4">Eskalasi Biaya Logistik</h4>
                  <p className="text-4xl font-black text-red-600 tracking-tighter mb-2">80-150%</p>
                  <p className="text-xs font-bold text-slate-500 leading-relaxed">Peralihan moda transportasi dari sungai (barge) ke darat (trucking) akibat penurunan debit air ekstrem.</p>
                </div>
                <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100">
                  <h4 className="font-black text-blue-900 text-xl mb-4">Volume Terganggu</h4>
                  <p className="text-4xl font-black text-blue-600 tracking-tighter mb-2">40-70M Ton</p>
                  <p className="text-xs font-bold text-slate-500 leading-relaxed">Estimasi volume batubara dan CPO yang tertahan di wilayah hulu sungai-sungai besar Kalimantan.</p>
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-xl bg-white">
                <Table>
                  <TableHeader className="bg-slate-900">
                    <TableRow className="hover:bg-slate-900 border-none">
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-8">Sungai</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-6 text-right">Debit Drop</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-6">Critical Segments</TableHead>
                      <TableHead className="text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 px-8">Komoditas Terdampak</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {riverData.map((river, i) => (
                      <TableRow key={river.name} className={`group hover:bg-slate-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                        <TableCell className="font-black text-slate-900 py-6 px-8">{river.name}</TableCell>
                        <TableCell className="font-black text-red-600 py-6 px-6 text-right">{river.projectedDecline}</TableCell>
                        <TableCell className="font-bold text-slate-500 py-6 px-6 text-xs">{river.criticalSegments.join(', ')}</TableCell>
                        <TableCell className="py-6 px-8 flex gap-2 flex-wrap">
                          {river.commodities.map(c => (
                            <Badge key={c} variant="outline" className="text-[9px] font-black uppercase border-slate-200">{c}</Badge>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Kelapa Sawit Tab */}
        <TabsContent value="palmoil" className="space-y-8 outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Produksi 2025', value: palmOilData.production2025, color: 'text-slate-900' },
              { label: 'Proyeksi 2026', value: palmOilData.production2026, color: 'text-red-600' },
              { label: 'Pangsa Global', value: palmOilData.globalShare, color: 'text-emerald-600' },
              { label: 'Nilai Ekspor', value: palmOilData.exportValue, color: 'text-emerald-600' },
            ].map((stat) => (
              <Card key={stat.label} className="glass-card border-none hover:bg-white/60 transition-all duration-300">
                <CardContent className="p-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                  <p className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-card border-none overflow-hidden">
            <div className="h-2 w-full bg-emerald-600" />
            <CardHeader className="p-8">
              <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-2xl">
                  <Droplets className="w-8 h-8 text-emerald-600" />
                </div>
                Dampak Produksi CPO Nasional 2026
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-emerald-50 border border-emerald-100 rounded-[2.5rem] p-8 shadow-xl">
                  <h4 className="font-black text-emerald-900 text-xl mb-4">Water Stress Impact</h4>
                  <p className="text-2xl font-black text-red-600 mb-2">0.5 - 1.0M Ton</p>
                  <p className="text-xs font-bold text-slate-500 leading-relaxed">Reduksi yield per hektar secara sistemik akibat stres pohon kelapa sawit.</p>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-[2.5rem] p-8 shadow-xl">
                  <h4 className="font-black text-amber-900 text-xl mb-4">Input-Cost Crisis</h4>
                  <p className="text-2xl font-black text-red-600 mb-2">0.5 - 1.0M Ton</p>
                  <p className="text-xs font-bold text-slate-500 leading-relaxed">Petani kecil (37% area) terpaksa mengurangi aplikasi pupuk hingga 50%.</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-xl">
                  <h4 className="font-black text-white text-xl mb-4">Biological Lag</h4>
                  <p className="text-2xl font-black text-amber-400 mb-2">Target 2027</p>
                  <p className="text-xs font-bold text-slate-400 leading-relaxed">Stres 2026 mengakibatkan kolaps hasil pada 2027 (Secondary Economic Shock).</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 flex flex-col lg:flex-row gap-8 items-center">
                <div className="p-5 bg-white rounded-3xl shadow-xl">
                  <Globe className="w-12 h-12 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-2xl mb-3">Paradoks Harga CPO Global</h4>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Penurunan produksi domestik diproyeksikan akan <span className="font-black text-emerald-600 underline">meningkatkan harga ekspor 10-20%</span>. 
                    MPOC memproyeksikan stabilitas harga di angka <span className="font-black text-slate-900">RM 4.500/ton</span> yang didukung oleh tingginya permintaan biodiesel nasional.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Makro Tab (Inflation) */}
        <TabsContent value="inflation" className="space-y-8 outline-none">
          <Card className="glass-card border-none overflow-hidden">
            <div className="h-2 w-full bg-red-600" />
            <CardHeader className="p-8">
              <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-2xl">
                  <TrendingUp className="w-8 h-8 text-red-600" />
                </div>
                Proyeksi Inflasi & Stabilitas Makroekonomi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-6 border-none shadow-xl">
                  <SimpleBarChart
                    data={inflationData.map(d => ({
                      name: d.commodity,
                      increase: parseFloat(d.increase.replace('%', '')),
                    }))}
                    xKey="name"
                    yKey="increase"
                    title="Kenaikan Harga Pangan Strategis (%)"
                    color="#ef4444"
                    height={300}
                  />
                </div>
                <div className="glass-card p-6 border-none shadow-xl">
                  <MultiBarChart
                    data={economicSectorData}
                    bars={[
                      { key: 'Moderat (miliar USD)', name: 'Skenario Moderat', color: '#f59e0b' },
                      { key: 'Ekstrem (miliar USD)', name: 'Skenario Ekstrem', color: '#ef4444' },
                    ]}
                    xKey="name"
                    title="Losses Forecast per Sektor (Miliar USD)"
                    height={300}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Inflasi Pangan', value: '8-12%', target: 'Target BI: 2.5±1%', color: 'bg-red-50 text-red-900 border-red-100' },
                  { label: 'Risiko Kemiskinan', value: '+1-2 Juta', target: 'Orang Miskin Baru', color: 'bg-amber-50 text-amber-900 border-amber-100' },
                  { label: 'Cadangan Beras', value: '4.5M Ton', target: 'Historical High', color: 'bg-blue-50 text-blue-900 border-blue-100' },
                ].map((c) => (
                  <div key={c.label} className={`${c.color} border rounded-3xl p-8 shadow-sm`}>
                    <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em] mb-2">{c.label}</p>
                    <p className="text-4xl font-black tracking-tighter mb-2">{c.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-tight opacity-60">{c.target}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

