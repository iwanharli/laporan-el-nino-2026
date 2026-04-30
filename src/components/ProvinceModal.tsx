import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Droplets, Thermometer, Flame, Wheat, DollarSign, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SimpleBarChart } from '@/components/charts/ChartComponents';
import { commodityData, type RegionData } from '@/data/reportData';

interface ProvinceModalProps {
  region: RegionData | null;
  onClose: () => void;
}

export default function ProvinceModal({ region, onClose }: ProvinceModalProps) {
  if (!region) return null;

  const riskColors = {
    extreme: 'bg-red-900 text-white',
    high: 'bg-red-600 text-white',
    medium: 'bg-amber-500 text-white',
    low: 'bg-emerald-500 text-white',
  };

  const riskLabels = {
    extreme: 'Ekstrem',
    high: 'Tinggi',
    medium: 'Sedang',
    low: 'Rendah',
  };

  const relatedCommodities = commodityData.filter(c => 
    c.regions.some(r => region.name.toLowerCase().includes(r.toLowerCase()) || r.toLowerCase().includes(region.name.toLowerCase()))
  );

  const commodityChartData = relatedCommodities.map(c => ({
    name: c.name.split(' ')[0],
    decline: parseFloat(c.declinePercent.replace('%', '')),
  }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`p-6 text-white ${riskColors[region.riskLevel]}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5" />
                  <h2 className="text-2xl font-bold">{region.name}</h2>
                </div>
                <Badge className="bg-white/20 text-white border-white/30">
                  Risiko {riskLabels[region.riskLevel]}
                </Badge>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <Droplets className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-xs text-slate-500">Indeks SPI</p>
                  <p className="text-xl font-bold">{region.spiIndex}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <Thermometer className="w-5 h-5 text-red-500 mb-2" />
                  <p className="text-xs text-slate-500">Suhu Maks</p>
                  <p className="text-xl font-bold">{region.temperature}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <TrendingDown className="w-5 h-5 text-amber-600 mb-2" />
                  <p className="text-xs text-slate-500">Defisit Hujan</p>
                  <p className="text-xl font-bold">{region.rainfallDeficit}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <DollarSign className="w-5 h-5 text-emerald-600 mb-2" />
                  <p className="text-xs text-slate-500">Kerugian</p>
                  <p className="text-xl font-bold text-red-600">{region.economicLoss}</p>
                </CardContent>
              </Card>
            </div>

            {/* Drought & Population */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Parameter Kekeringan
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-amber-200 pb-1">
                      <span>Durasi Kemarau</span>
                      <span className="font-semibold">{region.droughtDuration}</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-200 pb-1">
                      <span>Defisit Curah Hujan</span>
                      <span className="font-semibold">{region.rainfallDeficit}</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-200 pb-1">
                      <span>Suhu Maksimum</span>
                      <span className="font-semibold">{region.temperature}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Indeks SPI</span>
                      <span className="font-semibold">{region.spiIndex}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <Flame className="w-4 h-4" />
                    Risiko Karhutla & Populasi
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-red-200 pb-1">
                      <span>Risiko Karhutla</span>
                      <span className="font-semibold">{region.karhutlaRisk}</span>
                    </div>
                    <div className="flex justify-between border-b border-red-200 pb-1">
                      <span>Populasi Terdampak</span>
                      <span className="font-semibold">{region.affectedPopulation}</span>
                    </div>
                    <div className="flex justify-between border-b border-red-200 pb-1">
                      <span>Komoditas Terdampak</span>
                      <span className="font-semibold">{region.commodities.length} jenis</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimasi Kerugian</span>
                      <span className="font-semibold text-red-600">{region.economicLoss}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Commodities */}
            {relatedCommodities.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Wheat className="w-5 h-5 text-amber-600" />
                  Dampak Komoditas
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <SimpleBarChart
                    data={commodityChartData}
                    xKey="name"
                    yKey="decline"
                    title="Penurunan Produksi (%)"
                    color="#dc2626"
                    height={250}
                  />
                  
                  <div className="space-y-3">
                    {relatedCommodities.slice(0, 4).map((commodity, i) => (
                      <motion.div
                        key={commodity.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-50 rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{commodity.name}</span>
                          <Badge variant="destructive" className="text-xs">
                            -{commodity.declinePercent}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500">
                          {commodity.projection2026} (dari {commodity.production2025})
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Items */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-blue-800 mb-3">Rekomendasi Mitigasi</h3>
                <ul className="space-y-2 text-sm">
                  {region.riskLevel === 'extreme' && (
                    <>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Siapkan cadangan air bersih untuk {region.affectedPopulation} jiwa</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Alihkan irigasi ke metode AWD untuk hemat air 20%</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Aktifkan posko darurat kekeringan dan distribusi air</span>
                      </li>
                    </>
                  )}
                  {region.riskLevel === 'high' && (
                    <>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>Perkuat patroli karhutla dan siapkan OMC (Operasi Modifikasi Cuaca)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>Monitoring debit sungai untuk logistik batubara/CPO</span>
                      </li>
                    </>
                  )}
                  {region.riskLevel === 'medium' && (
                    <>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>Intensifikasi penyuluhan adaptasi pertanian untuk petani</span>
                      </li>
                    </>
                  )}
                  {region.riskLevel === 'low' && (
                    <>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Pantau potensi banjir lokal akibat curah hujan di atas normal</span>
                      </li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
