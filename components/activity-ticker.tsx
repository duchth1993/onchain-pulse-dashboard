'use client';

import React from "react"

import { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface ActivityEvent {
  id: string;
  type: 'trade' | 'user' | 'milestone' | 'volume';
  app: string;
  description: string;
  value?: string;
  icon: string;
  timestamp: number;
}

const generateActivity = (): ActivityEvent[] => {
  const events: ActivityEvent[] = [
    {
      id: '1',
      type: 'trade',
      app: 'RevU',
      description: '$47.2K USDC swap completed',
      value: '+$47.2K',
      icon: '🎯',
      timestamp: Date.now(),
    },
    {
      id: '2',
      type: 'user',
      app: 'Noice',
      description: '234 new users joined',
      value: '+234',
      icon: '🎵',
      timestamp: Date.now() - 5000,
    },
    {
      id: '3',
      type: 'milestone',
      app: 'Farville',
      description: 'Reached $5M transaction volume',
      value: '$5M',
      icon: '🚜',
      timestamp: Date.now() - 10000,
    },
    {
      id: '4',
      type: 'volume',
      app: 'Friend.tech',
      description: 'Peak hour: 1.2K transactions',
      value: '↗ 24%',
      icon: '👥',
      timestamp: Date.now() - 15000,
    },
    {
      id: '5',
      type: 'trade',
      app: 'Pixel Arcade',
      description: '$12.8K game reward pool',
      value: '+$12.8K',
      icon: '🎮',
      timestamp: Date.now() - 20000,
    },
  ];

  return events;
};

export function ActivityTicker() {
  const [activities, setActivities] = useState<ActivityEvent[]>(generateActivity());

  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev => {
        const newActivity: ActivityEvent = {
          id: Date.now().toString(),
          type: ['trade', 'user', 'milestone', 'volume'][Math.floor(Math.random() * 4)] as any,
          app: ['RevU', 'Noice', 'Farville', 'Friend.tech', 'Pixel Arcade'][Math.floor(Math.random() * 5)],
          description: `Activity update at ${new Date().toLocaleTimeString()}`,
          value: `${Math.floor(Math.random() * 500)}K`,
          icon: ['🎯', '🎵', '🚜', '👥', '🎮'][Math.floor(Math.random() * 5)],
          timestamp: Date.now(),
        };
        
        return [newActivity, ...prev].slice(0, 10);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const typeColors: Record<string, string> = {
    trade: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
    user: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    milestone: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
    volume: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  };

  const typeIcons: Record<string, React.ReactNode> = {
    trade: <ArrowRight className="w-4 h-4" />,
    user: <TrendingUp className="w-4 h-4" />,
    milestone: <TrendingUp className="w-4 h-4" />,
    volume: <TrendingUp className="w-4 h-4" />,
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2 glow-text">Live Activity Feed</h2>
        <p className="text-sm text-muted-foreground">Real-time events from Base mini apps</p>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`animate-slide-up group glow-border rounded-lg p-4 bg-gradient-to-r ${typeColors[activity.type]} border transition-all duration-300 hover:bg-opacity-75`}
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="text-xl flex-shrink-0">{activity.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground text-sm">{activity.app}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary/80 capitalize">
                      {activity.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <div className="flex items-center gap-1 text-primary font-semibold text-sm">
                  {typeIcons[activity.type]}
                  <span>{activity.value}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {Math.floor((Date.now() - activity.timestamp) / 1000)}s ago
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg border border-border bg-secondary/20 text-center">
        <p className="text-sm text-muted-foreground">
          Showing <span className="text-primary font-semibold">10</span> recent events
        </p>
      </div>
    </div>
  );
}
