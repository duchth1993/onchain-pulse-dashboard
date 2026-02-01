'use client';

import React from "react"

export function PulseAnimation() {
  return (
    <div className="relative">
      {/* Main glow pulse */}
      <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{
        width: '200px',
        height: '200px',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }} />

      {/* Center dot */}
      <div className="absolute w-4 h-4 rounded-full bg-primary" style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }} />

      {/* Rotating rings */}
      {[1, 2, 3].map((ring) => (
        <div
          key={ring}
          className="absolute border border-primary/30 rounded-full"
          style={{
            width: `${80 + ring * 40}px`,
            height: `${80 + ring * 40}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            animation: `spin ${10 + ring * 2}s linear infinite`,
            opacity: 0.5 - ring * 0.1,
          }}
        />
      ))}
    </div>
  );
}

export function StreamingLine() {
  return (
    <svg className="w-full h-12" preserveAspectRatio="none" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(163, 155, 235)" stopOpacity="0" />
          <stop offset="50%" stopColor="rgb(163, 155, 235)" stopOpacity="1" />
          <stop offset="100%" stopColor="rgb(163, 155, 235)" stopOpacity="0" />
        </linearGradient>
        <style>
          {`
            @keyframes streamMove {
              0% {
                dashoffset: 100;
              }
              100% {
                dashoffset: -100;
              }
            }
          `}
        </style>
      </defs>
      <polyline
        points="0,50 25,30 50,70 75,40 100,60"
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        style={{
          animation: 'streamMove 2s linear infinite',
        }}
      />
    </svg>
  );
}

export function GlowCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(45deg, rgba(163, 155, 235, 0.3), rgba(100, 150, 255, 0.3))',
          filter: 'blur(8px)',
        }}
      />
      <div className="relative glow-border rounded-lg p-6">
        {children}
      </div>
    </div>
  );
}

export function AnimatedCounter({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-primary animate-glow-text">
        {value.toLocaleString()}
      </div>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
}
