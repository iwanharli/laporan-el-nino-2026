import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { regionData, type RegionData } from '@/data/reportData';
import ProvinceModal from '@/components/ProvinceModal';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Eye, MapPin } from 'lucide-react';

// Fix Leaflet marker icons for production
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function getRiskColor(level: RegionData['riskLevel']) {
  switch (level) {
    case 'extreme': return '#7f1d1d';
    case 'high': return '#b91c1c';
    case 'medium': return '#f59e0b';
    case 'low': return '#10b981';
    default: return '#6b7280';
  }
}

function getRiskLabel(level: RegionData['riskLevel']) {
  switch (level) {
    case 'extreme': return 'Ekstrem';
    case 'high': return 'Tinggi';
    case 'medium': return 'Sedang';
    case 'low': return 'Rendah';
    default: return 'Tidak Diketahui';
  }
}

function createCustomIcon(level: RegionData['riskLevel']) {
  const color = getRiskColor(level);
  const isExtreme = level === 'extreme';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative flex items-center justify-center">
        ${isExtreme ? `<div class="absolute w-10 h-10 bg-${color === '#7f1d1d' ? 'red-600' : 'amber-500'} rounded-full animate-ping opacity-20"></div>` : ''}
        <div style="
          width: 32px;
          height: 32px;
          background: ${color};
          border: 3px solid white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(45deg);
        ">
          <div style="transform: rotate(-45deg); color: white; font-weight: 900; font-size: 10px;">
            ${level.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

interface MapFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

function MapFilters({ activeFilter, onFilterChange }: MapFilterProps) {
  const filters = [
    { id: 'all', label: 'Semua', color: 'bg-slate-700' },
    { id: 'extreme', label: 'Ekstrem', color: 'bg-red-900' },
    { id: 'high', label: 'Tinggi', color: 'bg-red-600' },
    { id: 'medium', label: 'Sedang', color: 'bg-amber-500' },
    { id: 'low', label: 'Rendah', color: 'bg-emerald-500' },
  ];

  return (
    <div className="flex flex-wrap gap-2 glass-card p-1 rounded-2xl bg-white/20 border-none shadow-none">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => onFilterChange(f.id)}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
            activeFilter === f.id
              ? `${f.color} text-white shadow-xl scale-105`
              : 'bg-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

function MapLegend() {
  const items = [
    { color: '#7f1d1d', label: 'Ekstrem (SPI < -2.0)' },
    { color: '#b91c1c', label: 'Tinggi (SPI -1.5 s/d -2.0)' },
    { color: '#f59e0b', label: 'Sedang (SPI -1.0 s/d -1.5)' },
    { color: '#10b981', label: 'Rendah (SPI > -1.0)' },
  ];

  return (
    <div className="glass-card p-4 rounded-2xl border-none shadow-2xl">
      <p className="text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest">Indeks Risiko</p>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3 mb-2 last:mb-0">
          <div className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: item.color }} />
          <span className="text-xs font-bold text-slate-700">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

interface InteractiveMapProps {
  height?: string;
  showFilters?: boolean;
}

export default function InteractiveMap({ 
  height = '600px', 
  showFilters = true,
}: InteractiveMapProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  const filteredRegions = activeFilter === 'all' 
    ? regionData 
    : regionData.filter(r => r.riskLevel === activeFilter);

  const stats = [
    { label: 'Wilayah Ekstrem', value: regionData.filter(r => r.riskLevel === 'extreme').length, color: 'bg-red-900 shadow-red-900/20' },
    { label: 'Wilayah Tinggi', value: regionData.filter(r => r.riskLevel === 'high').length, color: 'bg-red-600 shadow-red-600/20' },
    { label: 'Wilayah Sedang', value: regionData.filter(r => r.riskLevel === 'medium').length, color: 'bg-amber-500 shadow-amber-500/20' },
    { label: 'Wilayah Rendah', value: regionData.filter(r => r.riskLevel === 'low').length, color: 'bg-emerald-500 shadow-emerald-500/20' },
  ];

  return (
    <>
      <Card className="glass-card border-none overflow-hidden rounded-3xl">
        <CardHeader className="pb-4 pt-6 px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <CardTitle className="text-xl font-black flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-xl">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                Peta Dampak Spasial Indonesia
              </CardTitle>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">
                Real-time Geospatial Intelligence | Apr - Okt 2026
              </p>
            </div>
            {showFilters && (
              <MapFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            <MapContainer
              center={[-2.5489, 118.0149]}
              zoom={5}
              scrollWheelZoom={true}
              style={{ height, width: '100%', filter: 'grayscale(0.2) contrast(1.1)' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {filteredRegions.map((region) => (
                <Marker
                  key={region.id}
                  position={[region.lat, region.lng]}
                  icon={createCustomIcon(region.riskLevel)}
                  eventHandlers={{
                    click: () => setSelectedRegion(region),
                  }}
                >
                  <Popup className="min-w-[320px] premium-popup">
                    <div className="p-2">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-black text-xl tracking-tight text-slate-900">{region.name}</h3>
                        <Badge 
                          className="border-none shadow-lg px-3 py-1 font-black uppercase text-[10px] tracking-widest text-white"
                          style={{ backgroundColor: getRiskColor(region.riskLevel) }}
                        >
                          {getRiskLabel(region.riskLevel)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">SPI Index</p>
                            <p className="font-black text-slate-900 text-lg">{region.spiIndex}</p>
                          </div>
                          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Temperature</p>
                            <p className="font-black text-slate-900 text-lg">{region.temperature}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 px-1">
                          {[
                            { label: 'Defisit Hujan', value: region.rainfallDeficit },
                            { label: 'Durasi Kemarau', value: region.droughtDuration },
                            { label: 'Komoditas', value: region.commodities.join(', ') },
                            { label: 'Populasi', value: region.affectedPopulation },
                            { label: 'Kerugian', value: region.economicLoss, highlight: true },
                          ].map((row) => (
                            <div key={row.label} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0">
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{row.label}</span>
                              <span className={`font-bold ${row.highlight ? 'text-red-600' : 'text-slate-800'}`}>{row.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-5 font-bold shadow-xl"
                        onClick={() => setSelectedRegion(region)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Full Detailed Analysis
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            
            <div className="absolute top-6 left-6 z-[1000] pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 shadow-2xl pointer-events-auto max-w-[280px]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <Eye className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm tracking-tight">Geo-Spatial Intel</h4>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Active Analysis</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Focus Wilayah</p>
                    <p className="text-white font-bold text-sm">{selectedRegion?.name || 'Pilih Wilayah'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">SST</p>
                      <p className="text-blue-400 font-black text-xs">{selectedRegion?.temperature || '-'}</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Risk</p>
                      <p className="text-red-400 font-black text-xs capitalize">{selectedRegion?.riskLevel || '-'}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="absolute bottom-8 right-8 z-[1000]">
              <MapLegend />
            </div>
          </div>

          <motion.div 
            className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/30 backdrop-blur-md"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {stats.map((stat) => (
              <motion.div 
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className={`rounded-2xl p-4 text-center shadow-2xl border border-white/20 ${stat.color} transition-all duration-300 hover:scale-105`}
              >
                <p className="text-3xl font-black">{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>

      <ProvinceModal 
        region={selectedRegion} 
        onClose={() => setSelectedRegion(null)} 
      />
    </>
  );
}
