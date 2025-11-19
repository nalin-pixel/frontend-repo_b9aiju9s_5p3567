import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, NeonText } from './NeonLayout';
import { api, getOrCreateUserId } from '../lib/api';
import { CalendarDays, Flame, Sparkles, NotebookPen, ListChecks } from 'lucide-react';

const Section = ({ title, action, children, theme }) => (
  <GlassCard className="p-5" theme={theme}>
    <div className="flex items-center justify-between mb-3">
      <div className="text-white/80 font-medium">{title}</div>
      {action}
    </div>
    {children}
  </GlassCard>
);

export function Dashboard({ theme }) {
  const userId = getOrCreateUserId();
  const [habits, setHabits] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [mood, setMood] = useState('calm');

  useEffect(() => {
    (async () => {
      try {
        const [h, t] = await Promise.all([
          api(`/habit?user_id=${userId}`),
          api(`/task?user_id=${userId}`),
        ]);
        setHabits(h);
        setTasks(t);
      } catch (e) {}
    })();
  }, []);

  const streak = Math.min(365, habits.reduce((s, h) => s + (h.streak || 0), 0));

  return (
    <div className="grid xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <GlassCard className="p-6" theme={theme}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/60">Discipline score</div>
              <div className="text-3xl font-semibold text-white flex items-center gap-3">
                82 <Flame className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-sm text-white/60 mt-1">Keep the streak alive.</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60">Streak</div>
              <div className="text-3xl font-semibold text-white">{streak}d</div>
            </div>
          </div>
        </GlassCard>

        <Section title="Daily tasks" theme={theme} action={<button className="text-xs text-white/70 hover:text-white">View all</button>}>
          <div className="flex flex-col gap-2">
            {tasks.slice(0,5).map((t, i)=> (
              <div key={i} className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-white/80">
                <div className="flex items-center gap-3"><ListChecks className="w-4 h-4" /> {t.title}</div>
                <div className="text-xs text-white/60">{t.due_date || 'today'}</div>
              </div>
            ))}
            {tasks.length===0 && <div className="text-white/60">No tasks yet.</div>}
          </div>
        </Section>

        <Section title="Quick access" theme={theme}>
          <div className="grid sm:grid-cols-4 gap-3">
            {[
              { label: 'Journal', to: '/journal', icon: NotebookPen },
              { label: 'Routines', to: '/routines', icon: CalendarDays },
              { label: 'Money', to: '/money', icon: Sparkles },
              { label: 'Habits', to: '/habits', icon: ListChecks },
            ].map((b)=> {
              const Icon = b.icon;
              return (
                <div key={b.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/80 flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <div>{b.label}</div>
                </div>
              )
            })}
          </div>
        </Section>
      </div>

      <div className="space-y-6">
        <Section title="Mood" theme={theme}>
          <div className="flex gap-2">
            {["ecstatic","happy","calm","neutral","stressed","sad"].map((m)=> (
              <button key={m} onClick={()=>setMood(m)} className={`px-3 py-2 rounded-xl border ${mood===m?'bg-white/10 text-white border-white/20':'text-white/70 border-white/10 hover:bg-white/5'}`}>{m}</button>
            ))}
          </div>
          <div className="text-sm text-white/60 mt-3">Motivation: <NeonText color={theme.color}>Keep moving, 1% better.</NeonText></div>
        </Section>

        <Section title="Highlights" theme={theme}>
          <div className="text-white/70 text-sm">Fast, minimal and neon. Smooth transitions and blurred glass cards for a futuristic feel.</div>
        </Section>
      </div>
    </div>
  );
}

export function Placeholder({ title, description, theme }) {
  return (
    <GlassCard className="p-8" theme={theme}>
      <div className="text-xl text-white mb-2">{title}</div>
      <div className="text-white/70">{description}</div>
    </GlassCard>
  );
}
