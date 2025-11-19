import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const defaultTheme = {
  color: '#00E5FF',
  glow: 0.6,
  opacity: 0.2,
  font: 'Inter',
  minimal: false,
};

export function NeonLayout({ settings = {}, children, header, footer, background }) {
  const theme = { ...defaultTheme, ...settings };
  const glowShadow = useMemo(() => `0 0 24px ${theme.glow * 0.8}rem ${theme.color}33, 0 0 48px ${theme.color}22`, [theme]);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ fontFamily: theme.font }}>
      <div className="absolute inset-0" aria-hidden>
        {background}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0b0f1a] via-[#090b12] to-[#0b0f1a] opacity-90" />
        <div className="pointer-events-none absolute inset-0" style={{
          background: `radial-gradient(1200px 600px at 20% 0%, ${theme.color}11, transparent 60%), radial-gradient(800px 400px at 80% 100%, #7C3AED11, transparent 60%)`
        }} />
      </div>

      <div className="relative z-10">
        {header}
        <main className="px-4 sm:px-6 lg:px-10 py-6">
          {children}
        </main>
        {footer}
      </div>
    </div>
  );
}

export function GlassCard({ children, className = '', theme = defaultTheme, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      className={`rounded-2xl border backdrop-blur-xl ${className}`}
      style={{
        background: `linear-gradient(180deg, rgba(255,255,255,${theme.opacity * 0.18}) 0%, rgba(255,255,255,${theme.opacity * 0.06}) 100%)`,
        borderColor: `${theme.color}44`,
        boxShadow: `0 0 20px ${theme.color}22, inset 0 0 0 1px ${theme.color}22`,
      }}
    >
      {children}
    </motion.div>
  );
}

export function NeonText({ children, color = '#00E5FF' }) {
  return (
    <span className="font-semibold tracking-tight" style={{ color, textShadow: `0 0 8px ${color}aa, 0 0 24px ${color}66` }}>{children}</span>
  );
}
