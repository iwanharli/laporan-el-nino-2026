import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  TableIcon, Search, Download, FileSpreadsheet, Filter, Database, ArrowRight, Activity
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations';
import { 
  regionData, commodityData, karhutlaData, 
  economicImpactData, institutionPredictions,
  riverData, hotspotComparison, losses2015Detail
} from '@/data/reportData';

function exportToCSV(headers: string[], rows: string[][], filename: string) {
  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

export default function DataPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTable, setActiveTable] = useState('crosstab');

  const allTables = {
    crosstab: {
      title: 'Wilayah vs Komoditas',
      description: 'Matriks dampak Godzilla El Niño per wilayah dan komoditas utama',
      headers: ['Wilayah', 'Komoditas Utama', 'Tingkat Risiko', 'SPI', 'Defisit Hujan', 'Suhu', 'Durasi Kemarau', 'Kerugian Estimasi'],
      rows: regionData.map(r => [
        r.name,
        r.commodities.join(', '),
        r.riskLevel,
        r.spiIndex.toString(),
        r.rainfallDeficit,
        r.temperature,
        r.droughtDuration,
        r.economicLoss
      ])
    },
    commodities: {
      title: 'Daftar Komoditas',
      description: 'Data produksi, proyeksi, dan kerugian per komoditas',
      headers: ['Komoditas', 'Wilayah', 'Produksi 2025', 'Proyeksi 2026', 'Penurunan', 'Volume Hilang', 'Dampak Harga', 'Kerugian Ekonomi'],
      rows: commodityData.map(c => [
        c.name,
        c.regions.join(', '),
        c.production2025,
        c.projection2026,
        c.declinePercent,
        c.declineVolume,
        c.priceImpact,
        c.economicLoss
      ])
    },
    karhutla: {
      title: 'Metrik Karhutla',
      description: 'Hotspot, luas terbakar, dan fase puncak per provinsi',
      headers: ['Provinsi', 'Hotspot 2025', 'Hotspot 2026', 'Multiplikator', 'Terbakar 2025', 'Terbakar 2026', 'Lahan Gambut', 'Fase Puncak'],
      rows: karhutlaData.map(k => [
        k.province,
        k.hotspotCount2025.toString(),
        k.hotspotCount2026.toString(),
        `${k.multiplier}x`,
        `${k.burnedArea2025.toLocaleString()} ha`,
        `${k.burnedArea2026.toLocaleString()} ha`,
        `${(k.peatlandArea / 1000000).toFixed(1)} juta ha`,
        k.peakMonth
      ])
    },
    economic: {
      title: 'Kerugian Sektoral',
      description: 'Estimasi kerugian skenario moderat vs ekstrem',
      headers: ['Sektor', 'Moderat (USD)', 'Moderat (IDR)', 'Ekstrem (USD)', 'Ekstrem (IDR)', 'Indikator Kunci'],
      rows: economicImpactData.map(e => [
        e.sector,
        e.moderateLossUSD,
        e.moderateLossIDR,
        e.extremeLossUSD,
        e.extremeLossIDR,
        Object.entries(e.keyMetrics).map(([k, v]) => `${k}: ${v}`).join('; ')
      ])
    },
    historical: {
      title: 'Parameter Historis',
      description: 'Perbandingan 1997, 2015, dan proyeksi 2026',
      headers: ['Parameter', '1997-98', '2015-16', '2023-24', 'Proyeksi 2026 (BRIN)', 'Proyeksi 2026 (BMKG)'],
      rows: [
        ['Anomali SST Niño-3.4', '+2,5°C', '+2,6°C', '+1,8°C', '1,5-2,5°C+', '0,5-1,4°C'],
        ['Durasi Event', '13-14 bulan', '19 bulan', '12-15 bulan', '6-9 bulan', '5-7 bulan'],
        ['Penurunan Curah Hujan', '50-70%', '40-60%', '30-50%', '40-60% (selatan)', '20-40% (nasional)'],
        ['Durasi Kemarau Ekstrem', '8-11 bulan', '6-9 bulan', '4-6 bulan', '140-300 hari', '100-300 hari'],
        ['Luas Karhutla', '9,7 juta ha', '2,6 juta ha', '~1,5 juta ha', '2-5 juta ha', 'Tergantung intensitas'],
        ['Kerugian Ekonomi', '~$4,5 miliar', '$16,1 miliar', '~$3-5 miliar', '$10-25 miliar', '$5-12 miliar'],
      ]
    },
    river: {
      title: 'Navigasi Sungai',
      description: 'Profil hidrologis dan segmen logistik kritis',
      headers: ['Sungai', 'Lokasi', 'Panjang (km)', 'Volume Tahunan', 'Draft Min (m)', 'Penurunan Debit', 'Segmen Kritis', 'Komoditas'],
      rows: riverData.map(r => [
        r.name,
        r.location,
        r.length.toString(),
        r.volumeAnnual,
        r.draftMin.toString(),
        r.projectedDecline,
        r.criticalSegments.join(', '),
        r.commodities.join(', ')
      ])
    },
    hotspot: {
      title: 'Komparasi Hotspot',
      description: 'Data SIPONGI/NASA FIRMS dan KLHK',
      headers: ['Indikator', '2025 (Periode Sama)', '2026 (S/D 14 April)', 'Multiplikator'],
      rows: hotspotComparison.map(h => [
        h.indicator,
        h.year2025,
        h.year2026,
        `${h.multiplier}x`
      ])
    },
    losses2015: {
      title: 'Losses Detail 2015',
      description: 'Rincian kerugian World Bank Event 2015',
      headers: ['Komponen Kerugian', 'Estimasi (USD)', 'Estimasi (IDR)'],
      rows: losses2015Detail.map(l => [
        l.component,
        l.valueUSD,
        l.valueIDR
      ])
    },
    predictions: {
      title: 'Prediksi Institusi',
      description: 'BMKG, BRIN, NOAA, dan WMO Predictions',
      headers: ['Lembaga', 'Prediksi Intensitas', 'Probabilitas', 'Periode Kritis', 'Catatan Kunci'],
      rows: institutionPredictions.map(p => [
        p.institution,
        p.intensity,
        p.probability,
        p.period,
        p.note
      ])
    },
  };

  const currentTable = allTables[activeTable as keyof typeof allTables];

  const filteredRows = useMemo(() => {
    if (!searchTerm) return currentTable.rows;
    const term = searchTerm.toLowerCase();
    return currentTable.rows.filter(row => 
      row.some(cell => String(cell).toLowerCase().includes(term))
    );
  }, [currentTable, searchTerm]);

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
                  className="w-16 h-16 bg-blue-500 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.6)] flex items-center justify-center border-t border-white/30"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Database className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">Data Center</h1>
                  <p className="text-blue-400 font-black tracking-[0.3em] uppercase text-[10px] mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    Interactive Data & Repository v3.0
                  </p>
                </div>
              </div>
              <p className="text-slate-400 text-xl max-w-3xl leading-relaxed font-medium">
                Akses repositori data komprehensif Godzilla El Niño 2026. Analisis perbandingan lintas sektoral, parameter historis, dan ekspor metrik real-time.
              </p>
            </div>
            <div className="hidden xl:flex items-center gap-6">
              <div className="h-16 w-px bg-white/10" />
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Repositories</p>
                <p className="text-3xl font-black text-white">{Object.keys(allTables).length}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Sidebar */}
        <ScrollReveal>
          <div className="w-full xl:w-80 space-y-4 flex-shrink-0">
            <div className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-6 border border-white/40 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-900 rounded-xl">
                  <Filter className="w-4 h-4 text-white" />
                </div>
                <p className="font-black text-slate-800 uppercase tracking-widest text-xs">Dataset Browser</p>
              </div>
              
              <StaggerContainer staggerDelay={0.05} className="space-y-2">
                {Object.entries(allTables).map(([key, table]) => (
                  <StaggerItem key={key}>
                    <button
                      className={`w-full group flex items-center justify-between px-4 py-4 rounded-2xl text-sm transition-all duration-300 border ${
                        activeTable === key 
                          ? 'bg-slate-900 text-white shadow-[0_10px_30px_rgba(15,23,42,0.3)] border-slate-900' 
                          : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-100'
                      }`}
                      onClick={() => { setActiveTable(key); setSearchTerm(''); }}
                    >
                      <div className="flex items-center gap-3">
                        <FileSpreadsheet className={`w-4 h-4 ${activeTable === key ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        <span className="font-black uppercase tracking-tight text-[11px]">{table.title}</span>
                      </div>
                      <ArrowRight className={`w-3 h-3 transition-transform duration-300 ${activeTable === key ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                    </button>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <div className="glass-card p-6 border-none overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
              <Activity className="w-8 h-8 text-blue-500 mb-4" />
              <p className="font-black text-slate-800 text-lg mb-2">Export Data</p>
              <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">Seluruh dataset dapat diekspor ke format CSV untuk analisis offline tingkat lanjut.</p>
              <Button 
                variant="outline" 
                className="w-full rounded-xl font-black text-[10px] uppercase tracking-widest border-slate-200"
                onClick={() => exportToCSV(currentTable.headers, filteredRows, `${activeTable}_data.csv`)}
              >
                <Download className="w-3 h-3 mr-2" /> Download Master
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {/* Table Area */}
        <div className="flex-1 min-w-0">
          <ScrollReveal>
            <Card className="glass-card border-none overflow-hidden">
              <div className="h-2 w-full bg-blue-500" />
              <CardHeader className="p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-black tracking-tight">{currentTable.title}</CardTitle>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{currentTable.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative group">
                      <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        placeholder="Filter Dataset..."
                        className="pl-12 w-full md:w-80 h-12 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all shadow-sm font-bold text-slate-800"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-900 border-none">
                      <TableRow className="hover:bg-slate-900 border-none">
                        {currentTable.headers.map((header, i) => (
                          <TableHead key={i} className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] py-5 px-6 border-none">
                            {header}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRows.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={currentTable.headers.length} className="text-center py-20">
                            <div className="flex flex-col items-center gap-3">
                              <Search className="w-12 h-12 text-slate-200" />
                              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No data records found for "{searchTerm}"</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRows.map((row, i) => (
                          <motion.tr 
                            key={i} 
                            className={`group border-b border-slate-50 hover:bg-slate-50/80 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.01 }}
                          >
                            {row.map((cell, j) => (
                              <TableCell key={j} className="py-5 px-6 whitespace-nowrap">
                                {j === 0 ? (
                                  <span className="font-black text-slate-900">{cell}</span>
                                ) : String(cell).includes('%') || String(cell).includes('Triliun') || String(cell).includes('miliar') || String(cell).includes('ha') ? (
                                  <Badge className="bg-white border-slate-200 text-slate-800 font-black shadow-sm group-hover:bg-blue-50 transition-colors">
                                    {cell}
                                  </Badge>
                                ) : (
                                  <span className="text-slate-500 font-bold text-sm">{cell}</span>
                                )}
                              </TableCell>
                            ))}
                          </motion.tr>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="p-8 bg-slate-50/50 flex justify-between items-center border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{filteredRows.length} RECORDS INDEXED</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="font-black text-[10px] uppercase tracking-widest text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl"
                    onClick={() => exportToCSV(currentTable.headers, filteredRows, `${activeTable}_dataset.csv`)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export to CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

