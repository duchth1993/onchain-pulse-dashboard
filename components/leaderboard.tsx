'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, Zap } from 'lucide-react';

interface MiniApp {
  id: string;
  name: string;
  icon: string;
  txPerHour: number;
  newUsers: number;
  volume: number;
  change: number;
  rank: number;
}

const initialApps: MiniApp[] = [
  {
    id: 'revu',
    name: 'RevU',
    icon: '🎯',
    txPerHour: 2847,
    newUsers: 342,
    volume: 125600,
    change: 24.3,
    rank: 1,
  },
  {
    id: 'noice',
    name: 'Noice',
    icon: '🎵',
    txPerHour: 1923,
    newUsers: 215,
    volume: 87300,
    change: 18.7,
    rank: 2,
  },
  {
    id: 'farville',
    name: 'Farville',
    icon: '🚜',
    txPerHour: 1654,
    newUsers: 189,
    volume: 72400,
    change: 12.1,
    rank: 3,
  },
  {
    id: 'friend',
    name: 'Friend.tech',
    icon: '👥',
    txPerHour: 1432,
    newUsers: 156,
    volume: 64200,
    change: 8.4,
    rank: 4,
  },
  {
    id: 'pixel',
    name: 'Pixel Arcade',
    icon: '🎮',
    txPerHour: 987,
    newUsers: 124,
    volume: 45800,
    change: 5.2,
    rank: 5,
  },
];

export function Leaderboard() {
  const [apps, setApps] = useState<MiniApp[]>(initialApps);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setApps(prevApps =>
        prevApps.map(app => ({
          ...app,
          txPerHour: Math.floor(app.txPerHour + (Math.random() - 0.3) * 100),
          newUsers: Math.floor(app.newUsers + (Math.random() - 0.4) * 20),
          volume: Math.floor(app.volume + (Math.random() - 0.3) * 2000),
          change: parseFloat((app.change + (Math.random() - 0.5) * 2).toFixed(1)),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 glow-text">Trending Mini Apps</h2>
        <p className="text-sm text-muted-foreground">Ranked by transaction volume and user growth</p>
      </div>

      <div className="space-y-3">
        {apps.map((app, index) => (
          <div
            key={app.id}
            className="animate-slide-up group glow-border rounded-lg p-4 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 text-xl font-bold">
                  {app.rank}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{app.icon}</span>
                  <div>
                    <p className="font-semibold text-foreground">{app.name}</p>
                    <p className="text-xs text-muted-foreground">Mini App</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-primary font-mono text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{app.change.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-secondary/30 rounded p-2.5 border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Tx/Hour
                </p>
                <p className="font-mono font-semibold text-primary">{app.txPerHour.toLocaleString()}</p>
              </div>
              <div className="bg-secondary/30 rounded p-2.5 border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  New Users
                </p>
                <p className="font-mono font-semibold text-primary">+{app.newUsers}</p>
              </div>
              <div className="bg-secondary/30 rounded p-2.5 border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">Volume (USDC)</p>
                <p className="font-mono font-semibold text-primary">${(app.volume / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
