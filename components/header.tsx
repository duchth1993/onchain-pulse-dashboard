'use client';

import Image from 'next/image';
import { TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-grid-color bg-gradient-to-r from-background via-background to-background">
      <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 animate-pulse-glow rounded-xl blur opacity-60" />
            <div className="relative bg-gradient-to-br from-primary/20 to-primary/10 p-3 rounded-xl border border-primary/40 flex items-center justify-center w-16 h-16 md:w-14 md:h-14">
              <Image
                src="/onchain-pulse-logo.png"
                alt="Onchain Pulse Logo - Blockchain Heartbeat"
                width={56}
                height={56}
                className="w-full h-full object-contain filter drop-shadow-lg"
                priority
              />
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              <span className="glow-text">Onchain</span>
              <span className="text-foreground ml-2">Pulse</span>
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Real-time Base Analytics</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span>Live Activity</span>
            </div>
            <p className="text-xs text-primary font-mono">Updates in real-time</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">24h Trend</p>
            <p className="text-xs text-primary">↗ +12.4%</p>
          </div>
        </div>
      </div>
    </header>
  );
}
