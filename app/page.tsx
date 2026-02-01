'use client';

import { Header } from '@/components/header';
import { PulseStats } from '@/components/pulse-stats';
import { Leaderboard } from '@/components/leaderboard';
import { VolumeChart } from '@/components/volume-chart';
import { UserBadges } from '@/components/user-badges';
import { ActivityTicker } from '@/components/activity-ticker';
import { useState } from 'react';

type TabType = 'overview' | 'volume' | 'badges';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(0deg, var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="relative z-10">
        <Header />

        <main className="mx-auto max-w-7xl px-6 py-12">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 border-b border-border pb-4">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'volume', label: 'Volume Analytics' },
              { id: 'badges', label: 'My Badges' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-2 font-medium text-sm transition-all duration-300 rounded-lg ${
                  activeTab === tab.id
                    ? 'text-primary bg-primary/10 border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Sections */}
          {activeTab === 'overview' && (
            <div className="space-y-12 animate-slide-up">
              {/* Live Stats */}
              <section>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  Real-Time Metrics
                </h3>
                <PulseStats />
              </section>

              {/* Grid Layout for Leaderboard and Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Leaderboard />
                </div>
                <div>
                  <ActivityTicker />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'volume' && (
            <div className="animate-slide-up">
              <VolumeChart />
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="animate-slide-up">
              <UserBadges />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-border mt-16 py-8">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-semibold mb-3">Onchain Pulse</h4>
                <p className="text-sm text-muted-foreground">
                  Real-time dashboard for Base mini app activity
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Resources</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><a href="#" className="hover:text-primary transition-colors">Docs</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Stats</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Community</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><a href="https://discord.gg/sdvASeQS" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Discord</a></li>
                  <li><a href="https://x.com/ducpickbigwin" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter</a></li>
                  <li><a href="mailto:duchth1993@gmail.com" className="hover:text-primary transition-colors">Feedback</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Base Mini Apps</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><a href="#" className="hover:text-primary transition-colors">RevU</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Noice</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Farville</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border pt-6 flex items-center justify-between text-sm text-muted-foreground">
              <p>© 2024 Onchain Pulse. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Live on Base
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
