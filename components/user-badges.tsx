'use client';

import React from "react"

import { useState, useEffect } from 'react';
import { Award, Zap, TrendingUp, Users, Target, Wallet } from 'lucide-react';

interface UserBadge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  earned: boolean;
  progress: number;
}

const badges: UserBadge[] = [
  {
    id: 'top10-social',
    title: 'Top 10 in Social',
    description: 'Among the top 10 users in social mini apps',
    icon: <Users className="w-6 h-6" />,
    tier: 'gold',
    earned: true,
    progress: 100,
  },
  {
    id: 'defi-explorer',
    title: 'DeFi Explorer',
    description: 'Explored 5+ different mini apps',
    icon: <TrendingUp className="w-6 h-6" />,
    tier: 'silver',
    earned: true,
    progress: 100,
  },
  {
    id: 'volume-master',
    title: 'Volume Master',
    description: 'Generated $50K+ in transaction volume',
    icon: <Wallet className="w-6 h-6" />,
    tier: 'platinum',
    earned: true,
    progress: 100,
  },
  {
    id: 'early-adopter',
    title: 'Early Adopter',
    description: 'Active in first 30 days of mini app launch',
    icon: <Zap className="w-6 h-6" />,
    tier: 'silver',
    earned: true,
    progress: 100,
  },
  {
    id: 'trending-hunter',
    title: 'Trending Hunter',
    description: 'Trade on 3 mini apps before they hit 10K users',
    icon: <Target className="w-6 h-6" />,
    tier: 'gold',
    earned: false,
    progress: 67,
  },
  {
    id: 'power-user',
    title: 'Power User',
    description: 'Complete 100 transactions in a single day',
    icon: <Award className="w-6 h-6" />,
    tier: 'bronze',
    earned: false,
    progress: 42,
  },
];

const tierColors: Record<string, string> = {
  bronze: 'from-amber-900 to-amber-700',
  silver: 'from-slate-400 to-slate-500',
  gold: 'from-yellow-400 to-yellow-500',
  platinum: 'from-primary to-primary/70',
};

const tierGlows: Record<string, string> = {
  bronze: 'shadow-lg shadow-amber-900/50',
  silver: 'shadow-lg shadow-slate-400/50',
  gold: 'shadow-lg shadow-yellow-400/50',
  platinum: 'shadow-lg shadow-primary/50',
};

export function UserBadges() {
  const [displayBadges, setDisplayBadges] = useState(badges);

  useEffect(() => {
    // Animate badge appearance
    const timer = setTimeout(() => {
      setDisplayBadges(badges);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const earnedBadges = displayBadges.filter(b => b.earned);
  const inProgressBadges = displayBadges.filter(b => !b.earned);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2 glow-text">Achievement Badges</h2>
        <p className="text-sm text-muted-foreground">Earn badges by trading and exploring Base mini apps</p>
      </div>

      {/* Earned Badges */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Earned Badges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnedBadges.map((badge, index) => (
            <div
              key={badge.id}
              className="animate-slide-up group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`glow-border rounded-lg p-4 bg-gradient-to-br ${tierColors[badge.tier]} overflow-hidden relative h-full`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-black/20 rounded-lg">
                      <div className="text-primary">{badge.icon}</div>
                    </div>
                    <span className="text-xs font-mono bg-black/30 px-2 py-1 rounded text-primary/80">
                      {badge.tier.toUpperCase()}
                    </span>
                  </div>

                  <p className="font-semibold text-foreground mb-1">{badge.title}</p>
                  <p className="text-sm text-foreground/80 flex-1">{badge.description}</p>

                  <div className="flex items-center gap-2 mt-4">
                    <div className="text-2xl text-foreground">✓</div>
                    <p className="text-xs text-foreground/70">Badge Earned</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* In Progress Badges */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">In Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inProgressBadges.map((badge, index) => (
            <div
              key={badge.id}
              className="animate-slide-up"
              style={{ animationDelay: `${(earnedBadges.length + index) * 100}ms` }}
            >
              <div className="glow-border rounded-lg p-4 bg-secondary/40 border-primary/20">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-muted-foreground">
                    {badge.icon}
                  </div>
                  <span className="text-xs font-mono bg-primary/10 px-2 py-1 rounded text-muted-foreground">
                    {badge.progress}%
                  </span>
                </div>

                <p className="font-semibold text-foreground mb-1">{badge.title}</p>
                <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>

                {/* Progress Bar */}
                <div className="w-full bg-background rounded-full h-2 overflow-hidden border border-primary/20">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>

                <p className="text-xs text-muted-foreground mt-2">
                  {badge.progress}% complete
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div className="glow-border rounded-lg p-4 bg-secondary/30">
          <p className="text-xs text-muted-foreground mb-1">Total Badges</p>
          <p className="text-3xl font-bold text-primary">{earnedBadges.length}</p>
        </div>
        <div className="glow-border rounded-lg p-4 bg-secondary/30">
          <p className="text-xs text-muted-foreground mb-1">Progress</p>
          <p className="text-3xl font-bold text-primary">67%</p>
        </div>
        <div className="glow-border rounded-lg p-4 bg-secondary/30">
          <p className="text-xs text-muted-foreground mb-1">Highest Tier</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-primary bg-clip-text text-transparent">
            Platinum
          </p>
        </div>
        <div className="glow-border rounded-lg p-4 bg-secondary/30">
          <p className="text-xs text-muted-foreground mb-1">Next Badge In</p>
          <p className="text-3xl font-bold text-primary">33%</p>
        </div>
      </div>
    </div>
  );
}
