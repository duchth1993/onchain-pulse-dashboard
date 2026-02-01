'use client';

import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

interface VolumeData {
  hour: string;
  total: number;
  revU: number;
  noice: number;
  farville: number;
}

const generateData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = (i * 60).toString().padStart(2, '0');
    return {
      hour: `${Math.floor(i)}h`,
      total: Math.floor(Math.random() * 800000 + 400000),
      revU: Math.floor(Math.random() * 300000 + 80000),
      noice: Math.floor(Math.random() * 200000 + 40000),
      farville: Math.floor(Math.random() * 150000 + 30000),
    };
  });
  return hours;
};

export function VolumeChart() {
  const [data, setData] = useState<VolumeData[]>(generateData());
  const [totalVolume, setTotalVolume] = useState(0);

  useEffect(() => {
    const total = data.reduce((sum, item) => sum + item.total, 0);
    setTotalVolume(total);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        const newHour = {
          hour: '24h',
          total: Math.floor(Math.random() * 800000 + 400000),
          revU: Math.floor(Math.random() * 300000 + 80000),
          noice: Math.floor(Math.random() * 200000 + 40000),
          farville: Math.floor(Math.random() * 150000 + 30000),
        };
        return [...newData, newHour];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-secondary/90 border border-primary/30 rounded p-3 backdrop-blur-sm">
          <p className="text-xs text-muted-foreground font-mono">{payload[0].payload.hour}</p>
          <p className="text-sm font-semibold glow-text">
            ${(payload[0].value / 1000000).toFixed(2)}M
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 glow-text">USDC Volume Trends</h2>
        <p className="text-sm text-muted-foreground">24-hour transaction volume across Base mini apps</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glow-border rounded-lg p-4 bg-secondary/30">
          <p className="text-xs text-muted-foreground mb-2">Total Volume (24h)</p>
          <p className="text-3xl font-bold text-primary">
            ${(totalVolume / 1000000).toFixed(2)}M
          </p>
          <p className="text-xs text-primary mt-1">↗ +18.3%</p>
        </div>
        <div className="glow-border rounded-lg p-4 bg-secondary/30">
          <p className="text-xs text-muted-foreground mb-2">Peak Activity (Hour)</p>
          <p className="text-3xl font-bold text-primary">847K</p>
          <p className="text-xs text-muted-foreground mt-1">transactions/hour</p>
        </div>
        <div className="glow-border rounded-lg p-4 bg-secondary/30">
          <p className="text-xs text-muted-foreground mb-2">Avg Gas Efficiency</p>
          <p className="text-3xl font-bold text-primary">94.2%</p>
          <p className="text-xs text-primary mt-1">optimized</p>
        </div>
      </div>

      <div className="glow-border rounded-lg p-6 bg-secondary/10 overflow-hidden">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(163, 155, 235)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="rgb(163, 155, 235)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(163, 155, 235, 0.1)" />
            <XAxis dataKey="hour" stroke="rgba(255, 255, 255, 0.5)" style={{ fontSize: '12px' }} />
            <YAxis stroke="rgba(255, 255, 255, 0.5)" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="total"
              stroke="rgb(163, 155, 235)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTotal)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: 'RevU', icon: '🎯', volume: '125.6K' },
          { name: 'Noice', icon: '🎵', volume: '87.3K' },
          { name: 'Farville', icon: '🚜', volume: '72.4K' },
        ].map(app => (
          <div key={app.name} className="glow-border rounded-lg p-4 bg-secondary/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{app.icon}</span>
              <p className="font-semibold text-foreground">{app.name}</p>
            </div>
            <p className="text-2xl font-bold text-primary">${app.volume}</p>
            <p className="text-xs text-muted-foreground mt-2">USDC volume (24h)</p>
          </div>
        ))}
      </div>
    </div>
  );
}
