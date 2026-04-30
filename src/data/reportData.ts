// Data Statis Laporan Godzilla El Niño Indonesia - April 2026

export interface RegionData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  spiIndex: number;
  rainfallDeficit: string;
  temperature: string;
  droughtDuration: string;
  commodities: string[];
  karhutlaRisk: string;
  economicLoss: string;
  affectedPopulation: string;
}

export interface CommodityData {
  name: string;
  regions: string[];
  production2025: string;
  projection2026: string;
  declinePercent: string;
  declineVolume: string;
  priceImpact: string;
  economicLoss: string;
  keyFactors: string[];
}

export interface KarhutlaData {
  province: string;
  hotspotCount2025: number;
  hotspotCount2026: number;
  multiplier: number;
  burnedArea2025: number;
  burnedArea2026: number;
  peatlandArea: number;
  riskPhase: string;
  peakMonth: string;
}

export interface EconomicImpactData {
  sector: string;
  moderateLossUSD: string;
  moderateLossIDR: string;
  extremeLossUSD: string;
  extremeLossIDR: string;
  keyMetrics: Record<string, string>;
}

export interface HistoricalEventData {
  year: string;
  sstAnomaly: string;
  duration: string;
  rainfallDecline: string;
  burnedArea: string;
  economicLoss: string;
  riceDecline: string;
  healthImpact: string;
}

export interface RiverData {
  name: string;
  location: string;
  length: number;
  volumeAnnual: string;
  draftMin: number;
  projectedDecline: string;
  criticalSegments: string[];
  commodities: string[];
}

export interface ScenarioData {
  name: string;
  condition: string;
  rainfallDecline: string;
  droughtDuration: string;
  burnedArea: string;
  economicLoss: string;
  gdpImpact: string;
}

// Data Wilayah Indonesia - Dampak Spasial
export const regionData: RegionData[] = [
  {
    id: 'jawa-barat',
    name: 'Jawa Barat',
    lat: -6.9147,
    lng: 107.6098,
    riskLevel: 'extreme',
    spiIndex: -2.2,
    rainfallDeficit: '40-60%',
    temperature: '35-38°C',
    droughtDuration: '140-300 hari',
    commodities: ['Padi', 'Jagung', 'Hortikultura'],
    karhutlaRisk: 'Rendah',
    economicLoss: 'Rp 8-15 Triliun',
    affectedPopulation: '48 juta'
  },
  {
    id: 'jawa-tengah',
    name: 'Jawa Tengah',
    lat: -7.7971,
    lng: 110.3688,
    riskLevel: 'extreme',
    spiIndex: -2.1,
    rainfallDeficit: '40-60%',
    temperature: '35-39°C',
    droughtDuration: '140-300 hari',
    commodities: ['Padi', 'Tebu', 'Kedelai'],
    karhutlaRisk: 'Rendah',
    economicLoss: 'Rp 6-12 Triliun',
    affectedPopulation: '37 juta'
  },
  {
    id: 'jawa-timur',
    name: 'Jawa Timur',
    lat: -7.2575,
    lng: 112.7521,
    riskLevel: 'extreme',
    spiIndex: -2.3,
    rainfallDeficit: '50-70%',
    temperature: '36-40°C',
    droughtDuration: '200-300 hari',
    commodities: ['Padi', 'Jagung', 'Tebu'],
    karhutlaRisk: 'Rendah-Sedang',
    economicLoss: 'Rp 7-14 Triliun',
    affectedPopulation: '41 juta'
  },
  {
    id: 'riau',
    name: 'Riau',
    lat: 0.5071,
    lng: 101.4478,
    riskLevel: 'high',
    spiIndex: -1.7,
    rainfallDeficit: '30-50%',
    temperature: '34-37°C',
    droughtDuration: '120-200 hari',
    commodities: ['CPO', 'Karet'],
    karhutlaRisk: 'Ekstrem',
    economicLoss: 'Rp 4-8 Triliun',
    affectedPopulation: '7 juta'
  },
  {
    id: 'jambi',
    name: 'Jambi',
    lat: -1.4852,
    lng: 102.4381,
    riskLevel: 'high',
    spiIndex: -1.6,
    rainfallDeficit: '30-50%',
    temperature: '34-37°C',
    droughtDuration: '120-200 hari',
    commodities: ['CPO', 'Karet'],
    karhutlaRisk: 'Tinggi',
    economicLoss: 'Rp 2-4 Triliun',
    affectedPopulation: '4 juta'
  },
  {
    id: 'sumsel',
    name: 'Sumatera Selatan',
    lat: -3.3194,
    lng: 103.9144,
    riskLevel: 'high',
    spiIndex: -1.8,
    rainfallDeficit: '35-55%',
    temperature: '35-38°C',
    droughtDuration: '150-220 hari',
    commodities: ['Karet', 'CPO', 'Kopi'],
    karhutlaRisk: 'Tinggi',
    economicLoss: 'Rp 3-6 Triliun',
    affectedPopulation: '9 juta'
  },
  {
    id: 'lampung',
    name: 'Lampung',
    lat: -4.5586,
    lng: 105.4068,
    riskLevel: 'high',
    spiIndex: -1.9,
    rainfallDeficit: '35-55%',
    temperature: '35-38°C',
    droughtDuration: '150-220 hari',
    commodities: ['Kopi Robusta', 'Karet', 'Padi'],
    karhutlaRisk: 'Tinggi',
    economicLoss: 'Rp 2-4 Triliun',
    affectedPopulation: '9 juta'
  },
  {
    id: 'kalteng',
    name: 'Kalimantan Tengah',
    lat: -1.6815,
    lng: 113.3824,
    riskLevel: 'extreme',
    spiIndex: -2.0,
    rainfallDeficit: '40-60%',
    temperature: '36-39°C',
    droughtDuration: '150-250 hari',
    commodities: ['CPO', 'Kakao', 'Kayu'],
    karhutlaRisk: 'Ekstrem',
    economicLoss: 'Rp 5-10 Triliun',
    affectedPopulation: '3 juta'
  },
  {
    id: 'kalsel',
    name: 'Kalimantan Selatan',
    lat: -3.0926,
    lng: 115.2838,
    riskLevel: 'high',
    spiIndex: -1.5,
    rainfallDeficit: '30-50%',
    temperature: '35-38°C',
    droughtDuration: '120-200 hari',
    commodities: ['CPO', 'Batu Bara'],
    karhutlaRisk: 'Tinggi',
    economicLoss: 'Rp 4-8 Triliun',
    affectedPopulation: '4 juta'
  },
  {
    id: 'kalbar',
    name: 'Kalimantan Barat',
    lat: -0.2788,
    lng: 111.4753,
    riskLevel: 'high',
    spiIndex: -1.7,
    rainfallDeficit: '35-55%',
    temperature: '35-38°C',
    droughtDuration: '140-220 hari',
    commodities: ['CPO', 'Kakao', 'Kayu'],
    karhutlaRisk: 'Tinggi',
    economicLoss: 'Rp 3-6 Triliun',
    affectedPopulation: '5 juta'
  },
  {
    id: 'sulsel',
    name: 'Sulawesi Selatan',
    lat: -3.6688,
    lng: 119.9741,
    riskLevel: 'high',
    spiIndex: -1.5,
    rainfallDeficit: '25-45%',
    temperature: '34-37°C',
    droughtDuration: '100-180 hari',
    commodities: ['Kakao', 'Tebu', 'Padi'],
    karhutlaRisk: 'Sedang',
    economicLoss: 'Rp 2-4 Triliun',
    affectedPopulation: '9 juta'
  },
  {
    id: 'ntb',
    name: 'Nusa Tenggara Barat',
    lat: -8.6529,
    lng: 117.3616,
    riskLevel: 'extreme',
    spiIndex: -2.4,
    rainfallDeficit: '50-70%',
    temperature: '36-40°C',
    droughtDuration: '200-300 hari',
    commodities: ['Jagung', 'Kedelai', 'Padi'],
    karhutlaRisk: 'Rendah',
    economicLoss: 'Rp 1.5-3 Triliun',
    affectedPopulation: '5 juta'
  },
  {
    id: 'ntt',
    name: 'Nusa Tenggara Timur',
    lat: -8.6574,
    lng: 121.0794,
    riskLevel: 'extreme',
    spiIndex: -2.5,
    rainfallDeficit: '50-70%',
    temperature: '36-40°C',
    droughtDuration: '200-300 hari',
    commodities: ['Jagung', 'Kedelai', 'Kopi'],
    karhutlaRisk: 'Rendah',
    economicLoss: 'Rp 1.5-3 Triliun',
    affectedPopulation: '5 juta'
  },
  {
    id: 'bali',
    name: 'Bali',
    lat: -8.4095,
    lng: 115.1889,
    riskLevel: 'extreme',
    spiIndex: -2.2,
    rainfallDeficit: '45-65%',
    temperature: '35-38°C',
    droughtDuration: '180-280 hari',
    commodities: ['Padi', 'Hortikultura'],
    karhutlaRisk: 'Rendah',
    economicLoss: 'Rp 1-2 Triliun',
    affectedPopulation: '4 juta'
  },
  {
    id: 'sumut',
    name: 'Sumatera Utara',
    lat: 2.1154,
    lng: 99.5451,
    riskLevel: 'medium',
    spiIndex: -1.2,
    rainfallDeficit: '20-35%',
    temperature: '33-36°C',
    droughtDuration: '100-160 hari',
    commodities: ['Kopi Arabika', 'Karet', 'CPO'],
    karhutlaRisk: 'Sedang',
    economicLoss: 'Rp 2-4 Triliun',
    affectedPopulation: '15 juta'
  },
  {
    id: 'sulut',
    name: 'Sulawesi Utara',
    lat: 1.4748,
    lng: 124.8421,
    riskLevel: 'low',
    spiIndex: -0.5,
    rainfallDeficit: '<20% atau surplus',
    temperature: '30-33°C',
    droughtDuration: '<100 hari',
    commodities: ['Kakao', 'Kopi', 'Kelapa'],
    karhutlaRisk: 'Rendah',
    economicLoss: 'Rp 0.5-1 Triliun',
    affectedPopulation: '3 juta'
  },
  {
    id: 'maluku',
    name: 'Maluku',
    lat: -3.2385,
    lng: 130.1453,
    riskLevel: 'low',
    spiIndex: -0.3,
    rainfallDeficit: '<20% atau surplus',
    temperature: '29-32°C',
    droughtDuration: '<80 hari',
    commodities: ['Pala', 'Cengkih', 'Kakao'],
    karhutlaRisk: 'Rendah',
    economicLoss: 'Rp 0.3-0.6 Triliun',
    affectedPopulation: '2 juta'
  },
  {
    id: 'papua',
    name: 'Papua',
    lat: -2.532,
    lng: 140.417,
    riskLevel: 'low',
    spiIndex: -0.4,
    rainfallDeficit: '<20% atau surplus',
    temperature: '28-32°C',
    droughtDuration: '<80 hari',
    commodities: ['Kakao', 'Kelapa Sawit', 'Padi'],
    karhutlaRisk: 'Rendah',
    economicLoss: 'Rp 0.5-1 Triliun',
    affectedPopulation: '4 juta'
  },
];

// Data Komoditas
export const commodityData: CommodityData[] = [
  {
    name: 'Padi',
    regions: ['Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Sulawesi Selatan', 'NTB'],
    production2025: '60,21 juta ton GKG',
    projection2026: '53-57 juta ton GKG',
    declinePercent: '5-12%',
    declineVolume: '1,5-3,5 juta ton',
    priceImpact: 'Naik 15-25%',
    economicLoss: 'Rp 20-40 Triliun',
    keyFactors: ['Durasi kemarau 140-300 hari', 'Defisit irigasi 30-50%', 'Awal kemarau Mei 2026']
  },
  {
    name: 'CPO (Crude Palm Oil)',
    regions: ['Riau', 'Jambi', 'Sumatera Selatan', 'Kalimantan Tengah', 'Kalimantan Barat'],
    production2025: '51,66 juta ton',
    projection2026: '49,5-50,5 juta ton',
    declinePercent: '2-4%',
    declineVolume: '1-2 juta ton',
    priceImpact: 'Stabil-RM4.500/ton atau naik 10-20%',
    economicLoss: 'Rp 15-25 Triliun',
    keyFactors: ['Kekeringan + kenaikan pupuk 30-50%', 'Biological lag 12-18 bulan', 'Petani kecil kurangi aplikasi pupuk']
  },
  {
    name: 'Jagung',
    regions: ['Jawa Timur', 'NTB', 'NTT', 'Sulawesi Selatan'],
    production2025: '16,11 juta ton',
    projection2026: '12-14 juta ton',
    declinePercent: '15-25%',
    declineVolume: '2,5-4 juta ton',
    priceImpact: 'Naik 10-20%',
    economicLoss: 'Rp 5-10 Triliun',
    keyFactors: ['Ketersediaan air tidak mencukupi', 'Petani beralih dari padi', 'Defisit curah hujan 40-60%']
  },
  {
    name: 'Kedelai',
    regions: ['Jawa Timur', 'NTB', 'NTT', 'Kalimantan'],
    production2025: '~1 juta ton',
    projection2026: '0,85-0,9 juta ton',
    declinePercent: '10-15%',
    declineVolume: '100-150 ribu ton',
    priceImpact: 'Naik 15-25%',
    economicLoss: 'Rp 2-4 Triliun',
    keyFactors: ['Defisit struktural >70% impor', 'Kenaikan harga pupuk', 'Kekeringan ekstrem']
  },
  {
    name: 'Karet',
    regions: ['Sumatera Selatan', 'Kalimantan Barat', 'Jambi'],
    production2025: '~3 juta ton',
    projection2026: '2,4-2,7 juta ton',
    declinePercent: '10-20%',
    declineVolume: '300-600 ribu ton',
    priceImpact: 'Naik 10-15%',
    economicLoss: 'Rp 3-6 Triliun',
    keyFactors: ['Penurunan kualitas getah', 'Kekeringan hidrologis', 'Stres air']
  },
  {
    name: 'Kopi Arabika',
    regions: ['Sumatera Utara', 'Jawa Barat', 'Sulawesi Selatan'],
    production2025: '~150 ribu ton',
    projection2026: '120-135 ribu ton',
    declinePercent: '10-20%',
    declineVolume: '15-30 ribu ton',
    priceImpact: 'Naik 15-25%',
    economicLoss: 'Rp 1-2 Triliun',
    keyFactors: ['Stres air', 'Penurunan bean size', 'Heat stress']
  },
  {
    name: 'Kopi Robusta',
    regions: ['Lampung', 'Jawa Tengah'],
    production2025: '~700 ribu ton',
    projection2026: '525-595 ribu ton',
    declinePercent: '15-25%',
    declineVolume: '100-175 ribu ton',
    priceImpact: 'Naik 20-30%',
    economicLoss: 'Rp 2-4 Triliun',
    keyFactors: ['Heat stress', 'Hama CBB (Coffee Berry Borer)', 'Kekeringan']
  },
  {
    name: 'Kakao',
    regions: ['Sulawesi Tengah', 'Sulawesi Selatan', 'Kalimantan Timur'],
    production2025: '~700 ribu ton',
    projection2026: '575-630 ribu ton',
    declinePercent: '10-18%',
    declineVolume: '70-125 ribu ton',
    priceImpact: 'Naik 10-20%',
    economicLoss: 'Rp 2-4 Triliun',
    keyFactors: ['Variasi curah hujan', 'Penyakit busuk buah', 'Kekeringan moderat']
  },
  {
    name: 'Tebu',
    regions: ['Jawa Timur', 'NTT', 'Lampung'],
    production2025: '~2,5 juta ton',
    projection2026: '2,0-2,2 juta ton',
    declinePercent: '12-20%',
    declineVolume: '300-500 ribu ton',
    priceImpact: 'Naik 15-20%',
    economicLoss: 'Rp 1-2 Triliun',
    keyFactors: ['Penurunan kadar gula', 'Reduksi yield', 'Heat stress']
  },
];

// Data Karhutla
export const karhutlaData: KarhutlaData[] = [
  {
    province: 'Riau',
    hotspotCount2025: 250,
    hotspotCount2026: 735,
    multiplier: 2.9,
    burnedArea2025: 5000,
    burnedArea2026: 15000,
    peatlandArea: 2500000,
    riskPhase: 'Fase 1 (Juni)',
    peakMonth: 'Juni-Juli'
  },
  {
    province: 'Jambi',
    hotspotCount2025: 180,
    hotspotCount2026: 520,
    multiplier: 2.9,
    burnedArea2025: 3000,
    burnedArea2026: 12000,
    peatlandArea: 1200000,
    riskPhase: 'Fase 2 (Juli)',
    peakMonth: 'Juli-Agustus'
  },
  {
    province: 'Sumatera Selatan',
    hotspotCount2025: 200,
    hotspotCount2026: 580,
    multiplier: 2.9,
    burnedArea2025: 4000,
    burnedArea2026: 18000,
    peatlandArea: 1800000,
    riskPhase: 'Fase 2 (Juli)',
    peakMonth: 'Juli-Agustus'
  },
  {
    province: 'Kalimantan Barat',
    hotspotCount2025: 150,
    hotspotCount2026: 450,
    multiplier: 3.0,
    burnedArea2025: 3500,
    burnedArea2026: 25000,
    peatlandArea: 3200000,
    riskPhase: 'Fase 3 (Agustus)',
    peakMonth: 'Agustus-September'
  },
  {
    province: 'Kalimantan Selatan',
    hotspotCount2025: 120,
    hotspotCount2026: 380,
    multiplier: 3.2,
    burnedArea2025: 2500,
    burnedArea2026: 18000,
    peatlandArea: 1500000,
    riskPhase: 'Fase 3 (Agustus)',
    peakMonth: 'Agustus-September'
  },
  {
    province: 'Kalimantan Tengah',
    hotspotCount2025: 180,
    hotspotCount2026: 550,
    multiplier: 3.1,
    burnedArea2025: 4000,
    burnedArea2026: 30000,
    peatlandArea: 5300000,
    riskPhase: 'Fase 3 (Agustus)',
    peakMonth: 'Agustus-September'
  },
];

// Data Dampak Ekonomi per Sektor
export const economicImpactData: EconomicImpactData[] = [
  {
    sector: 'Pertanian & Perkebunan',
    moderateLossUSD: '2,0-3,5 miliar',
    moderateLossIDR: '32-56 Triliun',
    extremeLossUSD: '4,0-6,0 miliar',
    extremeLossIDR: '64-96 Triliun',
    keyMetrics: {
      'Penurunan Padi': '5-12%',
      'Penurunan CPO': '1-2 juta ton',
      'Penurunan Jagung': '15-25%',
      'Pengangguran Petani': '1-2 juta'
    }
  },
  {
    sector: 'Karhutla',
    moderateLossUSD: '3,0-5,0 miliar',
    moderateLossIDR: '48-80 Triliun',
    extremeLossUSD: '8,0-12,0 miliar',
    extremeLossIDR: '128-192 Triliun',
    keyMetrics: {
      'Luas Terbakar': '2,5-8,0 juta ha',
      'Emisi CO2': '500 juta-1,5 miliar ton',
      'Kasus ISPA': '750rb-1 juta',
      'Biaya Kesehatan': '$2-4 miliar'
    }
  },
  {
    sector: 'Transportasi Sungai & Logistik',
    moderateLossUSD: '1,5-2,5 miliar',
    moderateLossIDR: '24-40 Triliun',
    extremeLossUSD: '3,0-5,0 miliar',
    extremeLossIDR: '48-80 Triliun',
    keyMetrics: {
      'Penurunan Batu Bara': '40-70 juta ton',
      'Eskalasi Biaya': '80-150%',
      'Gangguan PLTU': '60% pasokan Jawa-Bali',
      'Kenaikan Harga Global': '10-20%'
    }
  },
  {
    sector: 'Kekeringan (Air, Energi, Industri)',
    moderateLossUSD: '1,5-2,5 miliar',
    moderateLossIDR: '24-40 Triliun',
    extremeLossUSD: '4,0-6,0 miliar',
    extremeLossIDR: '64-96 Triliun',
    keyMetrics: {
      'Krisis Air': '25-40 juta orang',
      'Penurunan PLTA': '20-40%',
      'Rasioing Industri': '15-30% biaya',
      'Gagal Panen': '4-6 juta ha'
    }
  },
  {
    sector: 'Kesehatan, Pariwisata, Penerbangan',
    moderateLossUSD: '1,0-2,0 miliar',
    moderateLossIDR: '16-32 Triliun',
    extremeLossUSD: '3,0-5,0 miliar',
    extremeLossIDR: '48-80 Triliun',
    keyMetrics: {
      'Kasus ISPA': '750rb-1 juta',
      'Penurunan Wisatawan': '20-40%',
      'Pembatalan Penerbangan': '40-60%',
      'Biaya Kesehatan': '$2-4 miliar'
    }
  },
];

// Data Historis
export const historicalData: HistoricalEventData[] = [
  {
    year: '1997-98',
    sstAnomaly: '+2,5°C',
    duration: '13-14 bulan',
    rainfallDecline: '50-70%',
    burnedArea: '9,7 juta ha',
    economicLoss: '~$4,5 miliar',
    riceDecline: '6%',
    healthImpact: 'Puluhan ribu ISPA'
  },
  {
    year: '2015-16',
    sstAnomaly: '+2,6°C',
    duration: '19 bulan',
    rainfallDecline: '40-60%',
    burnedArea: '2,6 juta ha',
    economicLoss: '$16,1 miliar',
    riceDecline: '4-5%',
    healthImpact: '500.000 ISPA'
  },
  {
    year: '2023-24',
    sstAnomaly: '+1,8°C',
    duration: '12-15 bulan',
    rainfallDecline: '30-50%',
    burnedArea: '~1,5 juta ha',
    economicLoss: '~$3-5 miliar',
    riceDecline: '17,5%',
    healthImpact: '200.000+ ISPA'
  },
];

// Data Sungai
export const riverData: RiverData[] = [
  {
    name: 'Sungai Mahakam',
    location: 'Kalimantan Timur',
    length: 980,
    volumeAnnual: '150-200 juta ton batu bara',
    draftMin: 2.5,
    projectedDecline: '40-60%',
    criticalSegments: ['Long Bagun-Tering', 'Muara Muntai-Muara Jawa'],
    commodities: ['Batu Bara']
  },
  {
    name: 'Sungai Barito',
    location: 'Kalimantan Tengah/Selatan',
    length: 890,
    volumeAnnual: '50-80 juta ton komoditas',
    draftMin: 2.0,
    projectedDecline: '40-60%',
    criticalSegments: ['Muara Teweh-Banjarmasin'],
    commodities: ['Batu Bara', 'CPO']
  },
  {
    name: 'Sungai Kapuas',
    location: 'Kalimantan Barat',
    length: 1143,
    volumeAnnual: '30-50 juta ton komoditas',
    draftMin: 1.8,
    projectedDecline: '35-50%',
    criticalSegments: ['Putussibau-Sintang'],
    commodities: ['CPO', 'Kayu']
  },
  {
    name: 'Sungai Musi',
    location: 'Sumatera Selatan',
    length: 750,
    volumeAnnual: '40-60 juta ton komoditas',
    draftMin: 2.0,
    projectedDecline: '45-65%',
    criticalSegments: ['Lubuklinggau-Palembang'],
    commodities: ['Batu Bara', 'Karet']
  },
];

// Data Skenario
export const scenarioData: ScenarioData[] = [
  {
    name: 'Ringan',
    condition: 'El Niño lemah, tanpa IOD+ signifikan',
    rainfallDecline: '20-30%',
    droughtDuration: '100-150 hari',
    burnedArea: '0,5-1,0 juta ha',
    economicLoss: '$2-4 miliar',
    gdpImpact: '0,15-0,3%'
  },
  {
    name: 'Moderat',
    condition: 'El Niño moderat + IOD+ lemah',
    rainfallDecline: '30-50%',
    droughtDuration: '150-200 hari',
    burnedArea: '1,5-2,5 juta ha',
    economicLoss: '$5-10 miliar',
    gdpImpact: '0,35-0,7%'
  },
  {
    name: 'Kuat',
    condition: 'El Niño kuat (1,5-1,9°C) + IOD+ positif',
    rainfallDecline: '40-60%',
    droughtDuration: '200-250 hari',
    burnedArea: '2,5-4,0 juta ha',
    economicLoss: '$8-12 miliar',
    gdpImpact: '0,55-0,85%'
  },
  {
    name: 'Ekstrem (Godzilla)',
    condition: 'El Niño >2,0°C, IOD+ kuat, durasi >9 bulan',
    rainfallDecline: '50-70%',
    droughtDuration: '250-300 hari',
    burnedArea: '4,0-8,0 juta ha',
    economicLoss: '$12-25 miliar',
    gdpImpact: '0,85-1,8%'
  },
];

// Prediksi Lembaga
export const institutionPredictions = [
  { institution: 'BMKG', intensity: 'Lemah-Moderat', probability: '50-80%', period: 'Semester 2 2026', note: 'Kemungkinan kuat <20%; tidak ada indikasi Godzilla' },
  { institution: 'BRIN', intensity: 'Kuat-Godzilla', probability: 'Tidak kuantifikasi', period: 'April-Oktober 2026', note: 'Kombinasi El Niño + IOD+; referensi model JAMSTEC' },
  { institution: 'NOAA CPC', intensity: 'Moderat-Kuat', probability: '61% (Mei-Jul); 25% very strong', period: 'Mei 2026-akhir tahun', note: 'Niño-3.4 ≥+2,0°C memungkinkan' },
  { institution: 'WMO', intensity: 'Moderat-Kuat', probability: 'Keyakinan tinggi', period: 'Pertengahan 2026', note: 'Peringatan potensi penguatan' },
];

// Data Hotspot Comparison
export const hotspotComparison = [
  { indicator: 'Hotspot NASA nationwide', year2025: '~250', year2026: '735', multiplier: 2.9 },
  { indicator: 'Hotspot peatland (Pantau Gambut, Maret)', year2025: '4.500 (est.)', year2026: '12.942', multiplier: 2.9 },
  { indicator: 'Luas terbakar Q1 (KLHK)', year2025: '~10.000 ha', year2026: '42.000 ha', multiplier: 4.2 },
  { indicator: 'Hotspot KLHK (awal April)', year2025: '~600', year2026: '1.601', multiplier: 2.7 },
];

// Data Kerugian 2015 Detail
export const losses2015Detail = [
  { component: 'Biaya langsung pemadaman', valueUSD: '300 juta', valueIDR: '4,2 Triliun' },
  { component: 'Kerugian produktivitas dari asap', valueUSD: '5,2 miliar', valueIDR: '72,8 Triliun' },
  { component: 'Kerugian sektor pertanian', valueUSD: '3,0 miliar', valueIDR: '42 Triliun' },
  { component: 'Biaya kesehatan (ISPA)', valueUSD: '1,4 miliar', valueIDR: '19,6 Triliun' },
  { component: 'Kerugian pariwisata', valueUSD: '400 juta', valueIDR: '5,6 Triliun' },
  { component: 'Emisi karbon (nilai ekonomi)', valueUSD: '8,8 miliar', valueIDR: '123,2 Triliun' },
  { component: 'Pendidikan (tutup sekolah)', valueUSD: '34 juta', valueIDR: '476 Miliar' },
  { component: 'Manufaktur & Tambang', valueUSD: '610 juta', valueIDR: '8,5 Triliun' },
];

// Data Inflasi
export const inflationData = [
  { commodity: 'Beras', baseline: '100', projected: '115-125', increase: '15-25%' },
  { commodity: 'Cabai & Bawang', baseline: '100', projected: '120-130', increase: '20-30%' },
  { commodity: 'Minyak Goreng', baseline: '100', projected: '110-115', increase: '10-15%' },
  { commodity: 'Gula', baseline: '100', projected: '115-120', increase: '15-20%' },
  { commodity: 'Jagung', baseline: '100', projected: '110-120', increase: '10-20%' },
  { commodity: 'Kedelai', baseline: '100', projected: '115-125', increase: '15-25%' },
  { commodity: 'Daging Ayam', baseline: '100', projected: '110-118', increase: '10-18%' },
  { commodity: 'Telur', baseline: '100', projected: '108-115', increase: '8-15%' },
];

// Data Batu Bara
export const coalData = {
  globalMarketShare: '48%',
  annualExport: '~550 juta ton',
  riverDependence: '60-70%',
  estimatedMonthlyLoss: 'Rp 6-8 Triliun',
  priceIncreaseGlobal: '10-20%',
  pltuJawaBali: '>60%',
  criticalRivers: ['Mahakam', 'Barito', 'Musi'],
  disruptionDuration: '3-5 bulan',
  capacityReduction: '30-50%',
};

// Data Sawit
export const palmOilData = {
  production2025: '51,66 juta ton',
  production2026: '49,5-50,5 juta ton',
  decline: '1-2 juta ton (2-4%)',
  globalShare: '~60%',
  fertilizerIncrease: '30-50%',
  smallholderArea: '37%',
  biologicalLag: '12-18 bulan',
  priceCPO: 'RM 4.500/ton',
  exportValue: '~$25 miliar/tahun',
};

// Data Kekeringan Detail
export const droughtDetailData = {
  affectedPopulation: '25-40 juta orang',
  urbanCrisis: '15-25 juta (Jabodetabek, Surabaya, Semarang, Denpasar)',
  ruralCrisis: '10-15 juta',
  irrigationDeficit: '30-50%',
  pltaReduction: '20-40%',
  electricityDeficit: '5-10%',
  industrialRationing: '15-30% biaya',
  totalLoss: 'Rp 43-85 Triliun',
  waterCrisisCost: 'Rp 5-10 Triliun',
};

// SPI Categories
export const spiCategories = [
  { category: 'Ekstrem', range: '< -2,0', color: '#7f1d1d', description: 'Defisit >60%, suhu >39°C, durasi 200-300 hari' },
  { category: 'Tinggi', range: '-1,5 s/d -2,0', color: '#b91c1c', description: 'Defisit 40-60%, suhu 35-38°C, durasi 150-250 hari' },
  { category: 'Sedang', range: '-1,0 s/d -1,5', color: '#f59e0b', description: 'Defisit 20-40%, variabilitas tinggi, durasi 100-180 hari' },
  { category: 'Rendah', range: '> -1,0', color: '#10b981', description: 'Defisit <20% atau surplus curah hujan' },
];
