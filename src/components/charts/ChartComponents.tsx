import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = ['#f59e0b', '#dc2626', '#b91c1c', '#7f1d1d', '#3b82f6', '#8b5cf6'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border-none shadow-2xl">
        <p className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-tighter">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
            <span className="text-slate-500 font-medium">{entry.name}:</span>
            <span className="font-black text-slate-900">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ChartGradients = () => (
  <svg width={0} height={0} style={{ position: 'absolute' }}>
    <defs>
      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
      </linearGradient>
      <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
        <stop offset="100%" stopColor="#991b1b" stopOpacity={0.8} />
      </linearGradient>
      <linearGradient id="amberGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
        <stop offset="100%" stopColor="#d97706" stopOpacity={0.8} />
      </linearGradient>
      <linearGradient id="areaBlue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="areaRed" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
        <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);

interface BarChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  title: string;
  color?: string;
  height?: number;
}

export function SimpleBarChart({ data, xKey, yKey, title, color = '#b91c1c', height = 300 }: BarChartProps) {
  return (
    <Card className="glass-card border-none overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartGradients />
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
            <Bar dataKey={yKey} fill={color === '#b91c1c' ? 'url(#redGradient)' : color} radius={[6, 6, 0, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

interface MultiBarChartProps {
  data: any[];
  bars: { key: string; name: string; color: string }[];
  title: string;
  xKey: string;
  height?: number;
}

export function MultiBarChart({ data, bars, title, xKey, height = 300 }: MultiBarChartProps) {
  return (
    <Card className="glass-card border-none overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartGradients />
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
            <Legend wrapperStyle={{ paddingTop: 20, fontSize: 10, fontWeight: 700 }} iconType="circle" />
            {bars.map((bar, i) => (
              <Bar 
                key={bar.key} 
                dataKey={bar.key} 
                name={bar.name} 
                fill={i === 0 ? 'url(#redGradient)' : 'url(#amberGradient)'} 
                radius={[6, 6, 0, 0]} 
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

interface PieChartProps {
  data: any[];
  dataKey: string;
  nameKey: string;
  title: string;
  height?: number;
}

export function SimplePieChart({ data, dataKey, nameKey, title, height = 300 }: PieChartProps) {
  return (
    <Card className="glass-card border-none overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
              label={false}
            >
              {data.map((_entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: 10, fontWeight: 700, paddingTop: 10 }} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

interface LineChartProps {
  data: any[];
  lines: { key: string; name: string; color: string }[];
  xKey: string;
  title: string;
  height?: number;
}

export function SimpleLineChart({ data, lines, xKey, title, height = 300 }: LineChartProps) {
  return (
    <Card className="glass-card border-none overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: 20, fontSize: 10, fontWeight: 700 }} iconType="circle" />
            {lines.map((line) => (
              <Line 
                key={line.key} 
                type="monotone" 
                dataKey={line.key} 
                name={line.name} 
                stroke={line.color} 
                strokeWidth={4}
                dot={{ r: 6, fill: line.color, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

interface RadarChartProps {
  data: any[];
  indicators: { key: string; name: string }[];
  title: string;
  height?: number;
}

export function SimpleRadarChart({ data, indicators, title, height = 300 }: RadarChartProps) {
  return (
    <Card className="glass-card border-none overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
            <PolarRadiusAxis tick={{ fontSize: 9, fill: '#94a3b8' }} />
            {indicators.map((ind, i) => (
              <Radar
                key={ind.key}
                name={ind.name}
                dataKey={ind.key}
                stroke={COLORS[i % COLORS.length]}
                fill={COLORS[i % COLORS.length]}
                fillOpacity={0.4}
                strokeWidth={3}
              />
            ))}
            <Legend wrapperStyle={{ fontSize: 10, fontWeight: 700 }} iconType="circle" />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

interface AreaChartProps {
  data: any[];
  areas: { key: string; name: string; color: string; fillColor: string }[];
  xKey: string;
  title: string;
  height?: number;
}

export function SimpleAreaChart({ data, areas, xKey, title, height = 300 }: AreaChartProps) {
  return (
    <Card className="glass-card border-none overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartGradients />
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: 20, fontSize: 10, fontWeight: 700 }} iconType="circle" />
            {areas.map((area, i) => (
              <Area
                key={area.key}
                type="monotone"
                dataKey={area.key}
                name={area.name}
                stroke={area.color}
                strokeWidth={3}
                fill={i === 0 ? 'url(#areaBlue)' : 'url(#areaRed)'}
                fillOpacity={1}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

