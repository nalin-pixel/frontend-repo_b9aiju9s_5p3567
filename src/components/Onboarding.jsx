import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { api, getOrCreateUserId } from '../lib/api';
import { GlassCard } from './NeonLayout';
import Spline from '@splinetool/react-spline';

const ageGroups = [
  { key: 'teen', label: 'Teen' },
  { key: 'young_adult', label: 'Young Adult' },
  { key: 'adult', label: 'Adult' },
  { key: 'senior', label: 'Senior' },
];

const themes = [
  { key: 'neon-blue', color: '#00E5FF' },
  { key: 'neon-purple', color: '#A855F7' },
  { key: 'neon-cyan', color: '#22D3EE' },
  { key: 'neon-pink', color: '#EC4899' },
];

export default function Onboarding({ onDone, setTheme }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [goals, setGoals] = useState('Discipline, Health, Wealth');
  const [age, setAge] = useState('adult');
  const [theme, setThemeLocal] = useState(themes[0]);
  const [answers, setAnswers] = useState({});
  const userId = getOrCreateUserId();

  const handleComplete = async () => {
    const selectedGoals = goals.split(',').map(g => g.trim()).filter(Boolean);
    await api('/profile', { method: 'POST', body: JSON.stringify({ user_id: userId, name, age_group: age, goals: selectedGoals, theme: theme.key }) });
    await api('/preferences', { method: 'POST', body: JSON.stringify({ user_id: userId, theme_color: theme.color }) });
    onDone?.();
  };

  const quiz = [
    { q: 'You prefer mornings or nights?', k: 'daypart', a: ['morning', 'night'] },
    { q: 'Choose your focus now', k: 'focus', a: ['Discipline', 'Health', 'Wealth'] },
    { q: 'How do you feel today?', k: 'mood', a: ['calm', 'happy', 'stressed'] },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-center">
      <GlassCard className="p-6 lg:p-10" theme={{ color: theme.color, opacity: 0.2 }}>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Welcome</h2>
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Your name</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/40" placeholder="Alex" />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Your goals (comma separated)</label>
                <input value={goals} onChange={(e)=>setGoals(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/40" />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Age group</label>
                <div className="grid grid-cols-2 gap-2">
                  {ageGroups.map((g)=> (
                    <button key={g.key} onClick={()=>setAge(g.key)} className={`px-3 py-2 rounded-xl border ${age===g.key?'bg-white/10 text-white border-white/20':'text-white/70 border-white/10 hover:bg-white/5'}`}>{g.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Theme</label>
                <div className="flex gap-3">
                  {themes.map((t)=> (
                    <button key={t.key} onClick={()=>{ setThemeLocal(t); setTheme?.({ color: t.color }); }} className={`w-10 h-10 rounded-full border-2`} style={{ background: t.color, borderColor: theme.key===t.key? '#fff' : '#ffffff33' }} />
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={()=>setStep(1)} className="px-4 py-2 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/15">Next</button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-white/80">Quick personality quiz</h3>
              {quiz.map((q)=> (
                <div key={q.k} className="space-y-2">
                  <div className="text-white/70">{q.q}</div>
                  <div className="flex gap-2">
                    {q.a.map((opt)=> (
                      <button key={opt} onClick={()=>setAnswers({...answers, [q.k]: opt})} className={`px-3 py-2 rounded-xl border ${answers[q.k]===opt?'bg-white/10 text-white border-white/20':'text-white/70 border-white/10 hover:bg-white/5'}`}>{opt}</button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-between">
                <button onClick={()=>setStep(0)} className="px-4 py-2 rounded-xl text-white/70 hover:text-white">Back</button>
                <button onClick={handleComplete} className="px-4 py-2 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/15">Finish</button>
              </div>
            </div>
          )}
        </div>
      </GlassCard>

      <div className="h-[420px] lg:h-[560px] relative rounded-3xl overflow-hidden border border-white/10">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0f1a] via-transparent to-transparent" />
      </div>
    </div>
  );
}
