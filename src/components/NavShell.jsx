import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ListChecks, Clock, NotebookPen, Bot, Calendar, Dumbbell, Wallet, Sparkles, Settings, Smile, Bolt } from 'lucide-react';
import { GlassCard } from './NeonLayout';

const links = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/habits', icon: ListChecks, label: 'Habits' },
  { to: '/routines', icon: Clock, label: 'Routines' },
  { to: '/tasks', icon: Calendar, label: 'Tasks' },
  { to: '/journal', icon: NotebookPen, label: 'Journal' },
  { to: '/mood', icon: Smile, label: 'Mood' },
  { to: '/coach', icon: Bot, label: 'AI Coach' },
  { to: '/money', icon: Wallet, label: 'Money' },
  { to: '/fitness', icon: Dumbbell, label: 'Fitness' },
  { to: '/explore', icon: Sparkles, label: 'Explore' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function NavShell({ children, theme }) {
  const { pathname } = useLocation();
  return (
    <div className="grid grid-rows-[auto,1fr] min-h-[calc(100vh-80px)] gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bolt className="w-6 h-6" style={{ color: theme.color, filter: `drop-shadow(0 0 8px ${theme.color})` }} />
          <span className="text-white/90 font-semibold tracking-tight">UMax • Self Mastery</span>
        </div>
        <div className="text-xs text-white/50">Futuristic, neon, sleek</div>
      </div>

      <div className="grid lg:grid-cols-[260px,1fr] gap-6">
        <GlassCard className="p-3 h-max sticky top-6 hidden lg:block" theme={theme}>
          <nav className="space-y-1">
            {links.map((l) => {
              const active = pathname === l.to;
              const Icon = l.icon;
              return (
                <Link key={l.to} to={l.to} className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${active ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
                  <Icon className="w-5 h-5" />
                  <span>{l.label}</span>
                </Link>
              );
            })}
          </nav>
        </GlassCard>
        <div>
          {children}
        </div>
      </div>

      <div className="fixed bottom-4 left-0 right-0 px-4 lg:hidden">
        <GlassCard className="p-2" theme={theme}>
          <div className="grid grid-cols-5 gap-1">
            {links.slice(0,10).slice(0,5).map((l) => {
              const Icon = l.icon;
              const active = pathname === l.to;
              return (
                <Link key={l.to} to={l.to} className={`flex flex-col items-center gap-1 py-2 rounded-xl ${active ? 'text-white' : 'text-white/70'}`}>
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px]">{l.label}</span>
                </Link>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
