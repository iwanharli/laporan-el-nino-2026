import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, Droplets, Flame, Wheat, DollarSign, Anchor, Eye, Activity
} from 'lucide-react';
import InteractiveMap from '@/components/map/InteractiveMap';
import ProvinceModal from '@/components/ProvinceModal';
import { regionData, riverData } from '@/data/reportData';

export default function MapPage() {
  const [selectedRegion, setSelectedRegion] = useState(regionData[0]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-8 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none -m-8" />
      
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
                  className="w-16 h-16 bg-blue-500 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.6)] flex items-center justify-center border-t border-white/30"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MapPin className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">Command Map</h1>
                  <p className="text-blue-400 font-black tracking-[0.3em] uppercase text-[10px] mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    Geospatial Impact Intelligence v2.0
                  </p>
                </div>
              </div>
              <p className="text-slate-400 text-xl max-w-3xl leading-relaxed font-medium">
                Sistem monitoring pusat kendali untuk visualisasi anomali iklim, kerawanan karhutla, dan proyeksi ekonomi makro regional.
              </p>
            </div>
            <div className="hidden xl:flex items-center gap-4">
              <div className="h-16 w-px bg-white/10" />
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Status</p>
                <p className="text-2xl font-black text-emerald-400">ACTIVE</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="drought" className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="bg-slate-900/50 backdrop-blur-xl p-1.5 rounded-[2rem] border border-white/5 shadow-2xl">
            {[
              { value: 'drought', icon: Droplets, label: 'Kekeringan' },
              { value: 'karhutla', icon: Flame, label: 'Karhutla' },
              { value: 'commodity', icon: Wheat, label: 'Komoditas' },
              { value: 'economic', icon: DollarSign, label: 'Ekonomi' },
              { value: 'river', icon: Anchor, label: 'Sungai' },
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

        <TabsContent value="drought" className="space-y-8 outline-none">
          <InteractiveMap height="700px" showFilters={true} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Zona Ekstrem', regions: 'Jawa Selatan, NTB, NTT, Bali', desc: 'Defisit >60%, suhu >39°C, durasi 200-300 hari', color: 'from-red-950 to-red-900 shadow-red-950/40' },
              { title: 'Zona Tinggi', regions: 'Sumsel, Kalsel, Kalbar, Sulsel', desc: 'Defisit 40-60%, suhu 35-38°C, durasi 150-250 hari', color: 'from-red-900 to-red-700 shadow-red-900/40' },
              { title: 'Zona Sedang', regions: 'Kalteng, Sumut, Aceh, Riau Utara', desc: 'Defisit 20-40%, variabilitas tinggi, durasi 100-180 hari', color: 'from-amber-700 to-amber-500 shadow-amber-700/40' },
              { title: 'Zona Rendah', regions: 'Sulut, Maluku, Halmahera, Papua', desc: 'Defisit <20% atau surplus, risiko banjir lokal', color: 'from-emerald-900 to-emerald-600 shadow-emerald-900/40' },
            ].map((zone) => (
              <motion.div
                key={zone.title}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-gradient-to-br ${zone.color} text-white rounded-[2rem] p-7 shadow-2xl border border-white/10`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  <Activity className="w-5 h-5 text-white/70" />
                </div>
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] mb-3 text-white/60">{zone.title}</h3>
                <p className="text-lg font-black mb-2 tracking-tight">{zone.regions}</p>
                <p className="text-xs opacity-70 leading-relaxed font-semibold">{zone.desc}</p>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="karhutla" className="space-y-6 outline-none">
          <InteractiveMap height="600px" showFilters={false} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { phase: 'Fase 1 (Juni)', provinces: ['Riau'], risk: 'Tinggi', desc: 'Kekeringan awal, lahan gambut kering', color: 'bg-orange-500' },
              { phase: 'Fase 2 (Juli)', provinces: ['Jambi', 'Sumatera Selatan'], risk: 'Tinggi-Ekstrem', desc: 'Ekspansi kekeringan, aktivitas pembukaan lahan', color: 'bg-red-500' },
              { phase: 'Fase 3 (Agustus)', provinces: ['Kalimantan Barat', 'Kalimantan Selatan'], risk: 'Ekstrem', desc: 'Puncak kemarau, bahan bakar maksimal', color: 'bg-red-900' },
            ].map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass-card border-none overflow-hidden group">
                  <div className={`h-1.5 w-full ${phase.color}`} />
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-black">{phase.phase}</CardTitle>
                      <Badge className={`${phase.color} border-none text-white`}>{phase.risk}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base font-bold text-slate-800">{phase.provinces.join(', ')}</p>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">{phase.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="commodity" className="space-y-6 outline-none">
          <InteractiveMap height="600px" showFilters={false} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionData.filter(r => r.commodities.length > 0).map(region => (
              <motion.div
                key={region.id}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => { setSelectedRegion(region); setShowModal(true); }}
              >
                <Card className="glass-card border-none group transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-black">{region.name}</CardTitle>
                      <Badge className={region.riskLevel === 'extreme' ? 'bg-red-900' : region.riskLevel === 'high' ? 'bg-red-600' : 'bg-amber-500'}>
                        {region.riskLevel}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Komoditas Terdampak</p>
                    <div className="flex flex-wrap gap-2">
                      {region.commodities.map(c => (
                        <Badge key={c} variant="outline" className="text-xs bg-slate-50 border-slate-200 font-bold px-3 py-1">{c}</Badge>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-500">Defisit: <span className="text-red-600">{region.rainfallDeficit}</span></span>
                      <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="economic" className="space-y-6 outline-none">
          <InteractiveMap height="600px" showFilters={false} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionData.map(region => (
              <motion.div
                key={region.id}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => { setSelectedRegion(region); setShowModal(true); }}
              >
                <Card className="glass-card border-none group transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-black">{region.name}</CardTitle>
                      <Badge className={region.riskLevel === 'extreme' ? 'bg-red-900' : region.riskLevel === 'high' ? 'bg-red-600' : 'bg-amber-500'}>
                        {region.riskLevel}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-red-50 p-3 rounded-2xl">
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-900/60">Kerugian</span>
                        <span className="font-black text-red-600">{region.economicLoss}</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Populasi</span>
                        <span className="font-bold text-slate-900">{region.affectedPopulation}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="river" className="space-y-6 outline-none">
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="text-xl font-black">Zona Gangguan Transportasi Sungai</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {riverData.map(river => (
                  <Card key={river.name} className="bg-white/50 border-white/20 shadow-none rounded-2xl">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-black text-blue-900">{river.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      {[
                        { label: 'Lokasi', value: river.location },
                        { label: 'Panjang', value: `${river.length} km` },
                        { label: 'Volume', value: river.volumeAnnual },
                        { label: 'Penurunan', value: river.projectedDecline, highlight: true },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between items-center border-b border-slate-100 pb-2 last:border-0">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                          <span className={`font-bold ${item.highlight ? 'text-red-600' : 'text-slate-800'}`}>{item.value}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ProvinceModal 
        region={showModal ? selectedRegion : null}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

