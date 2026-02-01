'use client';

import React from "react"

import { useState, useEffect } from 'react';
import { Activity, Zap, Users, DollarSign } from 'lucide-react';

interface StatItem {
  label: string;
  value: number | string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

export function PulseStats() {
  const [stats, setStats] = useState<StatItem[]>([
    {
      label: 'Live Transactions',
      value: '12.4K',
      change: '+24% this hour',
      icon: <Zap className="w-5 h-5" />,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      label: 'Active Users',
      value: '3.2K',
      change: '+18% this hour',
      icon: <Users className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Total Volume',
      value: '$3.8M',
      change: '+31% this hour',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      label: 'Network Health',
      value: '99.8%',
      change: 'Optimal',
      icon: <Activity className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500',
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats =>
        prevStats.map(stat => ({
          ...stat,
          value: typeof stat.value === 'string'
            ? stat.value
            : Math.floor(Math.random() * 10000),
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="animate-slide-up group glow-border rounded-lg overflow-hidden bg-secondary/30 p-6 hover:bg-secondary/50 transition-all duration-300"
          style={{ animationDelay: `${index * 75}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10`}>
              <div className="text-primary">{stat.icon}</div>
            </div>
            <div className="text-xs font-mono px-2 py-1 rounded bg-primary/10 text-primary">
              LIVE
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-3xl font-bold text-foreground animate-glow-text">
              {stat.value}
            </p>
            <p className="text-xs text-primary font-medium">{stat.change}</p>
          </div>

          {/* Animated pulse indicator */}
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary font-mono">updating</span>
          </div>
        </div>
      ))}
    </div>
  );
}
