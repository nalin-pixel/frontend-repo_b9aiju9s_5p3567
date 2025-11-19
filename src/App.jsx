import React, { useEffect, useMemo, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { NeonLayout } from './components/NeonLayout';
import NavShell from './components/NavShell';
import Onboarding from './components/Onboarding';
import { Dashboard, Placeholder } from './components/screens';

const themePresets = {
  blue: '#00E5FF',
  purple: '#A855F7',
  cyan: '#22D3EE',
  pink: '#EC4899',
};

export default function App() {
  const [theme, setTheme] = useState({ color: themePresets.blue, opacity: 0.18, glow: 0.6, font: 'Inter', minimal: false });
  const [onboarded, setOnboarded] = useState(() => !!localStorage.getItem('umax_onboarded'));

  useEffect(() => {
    if (onboarded) localStorage.setItem('umax_onboarded', '1');
  }, [onboarded]);

  const background = (
    <div className="absolute inset-0">
      <div className="absolute inset-x-0 -top-10 h-[420px]">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0f1a] to-[#0b0f1a]" />
    </div>
  );

  return (
    <NeonLayout settings={theme} background={background}
      header={
        <div className="px-4 sm:px-6 lg:px-10 pt-6">
          <div className="flex items-center justify-between">
            <div className="text-white/80 text-sm">Self-Mastery</div>
            <div className="flex items-center gap-3 text-xs text-white/60">
              <div className="hidden sm:block">Futuristic • Neon • Glass</div>
            </div>
          </div>
        </div>
      }
    >
      {!onboarded ? (
        <Onboarding onDone={()=>setOnboarded(true)} setTheme={(t)=> setTheme((s)=> ({ ...s, ...t }))} />
      ) : (
        <NavShell theme={theme}>
          <div className="space-y-6">
            <Dashboard theme={theme} />
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <Placeholder title="Habit Builder" description="Create unlimited habits with icons, glow colors, schedules and analytics." theme={theme} />
              <Placeholder title="Routine Builder" description="Morning, afternoon, night flows with timers and smooth progress." theme={theme} />
              <Placeholder title="Task Manager" description="To-dos, deadlines, pomodoro, drag-and-drop and calendar view." theme={theme} />
              <Placeholder title="AI Coach" description="Responds to your mood, goals and habits; auto plan at 5AM." theme={theme} />
              <Placeholder title="Journal" description="Daily entries with templates and optional lock." theme={theme} />
              <Placeholder title="Mood Tracker" description="Pick mood, add reason and see weekly trends." theme={theme} />
              <Placeholder title="Money Hub" description="Income, savings, goals and money challenges with neon progress." theme={theme} />
              <Placeholder title="Fitness & Glow-Up" description="Track body, skincare, gym routines and weekly checklist." theme={theme} />
              <Placeholder title="Explore Challenges" description="7-day discipline, 30-day glow up, money challenges + AI suggestions." theme={theme} />
              <Placeholder title="Settings" description="Full UI customization, colors, fonts, notifications and backups." theme={theme} />
            </div>
          </div>
        </NavShell>
      )}
    </NeonLayout>
  );
}
