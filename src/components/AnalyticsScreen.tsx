import React, { useState } from 'react';
import {
  BarChart3,
  MapPin,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Droplets,
  BriefcaseMedical,
  Tractor,
  Zap,
  GraduationCap,
  HardHat,
} from 'lucide-react';
import { CivicChallenge, LanguageType } from '../types';
import { JHARKHAND_DISTRICTS } from '../data/mockData';

interface AnalyticsScreenProps {
  challenges: CivicChallenge[];
  language: LanguageType;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ challenges, language }) => {
  const [selectedMetric, setSelectedMetric] = useState<'domain' | 'district'>('district');

  const domainStats = [
    { name: 'Water Resources', count: 38, pct: 32, icon: Droplets, color: 'bg-blue-600' },
    { name: 'AgriTech & Soil', count: 31, pct: 26, icon: Tractor, color: 'bg-emerald-600' },
    { name: 'MedTech & Health', count: 21, pct: 18, icon: BriefcaseMedical, color: 'bg-red-600' },
    { name: 'Clean Energy', count: 16, pct: 14, icon: Zap, color: 'bg-amber-600' },
    { name: 'Infra & Ecology', count: 8, pct: 6, icon: HardHat, color: 'bg-slate-600' },
    { name: 'Education & Skill', count: 5, pct: 4, icon: GraduationCap, color: 'bg-indigo-600' },
  ];

  const districtHotspots = [
    { name: 'Palamu', nameHi: 'पलामू', challenges: 19, critical: 11, topIssue: 'Fluoride / Water' },
    { name: 'Latehar', nameHi: 'लातेहार', challenges: 16, critical: 8, topIssue: 'Forest Produce Storage' },
    { name: 'Dhanbad', nameHi: 'धनबाद', challenges: 14, critical: 9, topIssue: 'Mine Runoff / Drainage' },
    { name: 'Koderma', nameHi: 'कोडरमा', challenges: 13, critical: 7, topIssue: 'Mica Dust / Silicosis' },
    { name: 'Ranchi', nameHi: 'राँची', challenges: 12, critical: 4, topIssue: 'Peri-urban Agro Soil' },
    { name: 'East Singhbhum', nameHi: 'पूर्वी सिंहभूम', challenges: 10, critical: 3, topIssue: 'Tribal Language EdTech' },
    { name: 'Bokaro', nameHi: 'बोकारो', challenges: 9, critical: 4, topIssue: 'Industrial Sludge Telemetry' },
    { name: 'Sahebganj', nameHi: 'साहिबगंज', challenges: 8, critical: 6, topIssue: 'Ganga Basin Arsenic' },
  ];

  return (
    <main
      id="analytics-screen-main"
      className="w-full max-w-[1280px] mx-auto px-4 md:px-6 pt-4 pb-28 text-[#E0E0E0]"
    >
      {/* Top Banner */}
      <section className="bg-[#141414] rounded-xl p-5 mb-4 border border-white/10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 text-[11px] font-extrabold bg-[#C5A059] text-black rounded shadow-[0_0_8px_rgba(197,160,89,0.3)]">
                JHARKHAND GIS DATA
              </span>
              <h1 className="text-[18px] md:text-[22px] font-bold text-white tracking-tight">
                Civic Innovation & Societal Problems Index
              </h1>
            </div>
            <p className="text-xs text-white/50 mt-1 max-w-2xl leading-relaxed">
              Real-time analytics and geospatial hotspot mapping of crowdsourced civic challenges
              driving state university incubators under Dept. of Higher & Technical Education.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#C5A059] font-mono px-2.5 py-1 rounded bg-[#1A1A1A] border border-[#C5A059]/30">
              Data Updated: Live
            </span>
          </div>
        </div>

        {/* 4 Core Stat Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-white/10">
          <div className="p-3 bg-[#1A1A1A] rounded-lg border border-white/10">
            <div className="text-[11px] text-white/50 font-semibold">Registered Challenges</div>
            <div className="text-xl md:text-2xl font-extrabold text-[#C5A059]">1,428</div>
            <div className="text-[10px] text-emerald-400 font-bold mt-0.5">
              +14% from last quarter
            </div>
          </div>

          <div className="p-3 bg-[#1A1A1A] rounded-lg border border-white/10">
            <div className="text-[11px] text-white/50 font-semibold">Field Verification Rate</div>
            <div className="text-xl md:text-2xl font-extrabold text-emerald-400">94.2%</div>
            <div className="text-[10px] text-white/40 mt-0.5">Geo-tagged evidence</div>
          </div>

          <div className="p-3 bg-[#1A1A1A] rounded-lg border border-white/10">
            <div className="text-[11px] text-white/50 font-semibold">Active University Labs</div>
            <div className="text-xl md:text-2xl font-extrabold text-white">18 Labs</div>
            <div className="text-[10px] text-white/40 mt-0.5">BIT Mesra, IIT ISM, NIT</div>
          </div>

          <div className="p-3 bg-[#1A1A1A] rounded-lg border border-white/10">
            <div className="text-[11px] text-white/50 font-semibold">Pilots Field Deployed</div>
            <div className="text-xl md:text-2xl font-extrabold text-white/90">64 Prototypes</div>
            <div className="text-[10px] text-[#C5A059] font-bold mt-0.5">
              Serving 45,000+ citizens
            </div>
          </div>
        </div>
      </section>

      {/* Main Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Domain Distribution */}
        <section className="bg-[#141414] rounded-xl p-5 border border-white/10 shadow-lg text-left">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">Problem Domains Distribution</h2>
            <span className="text-xs font-mono text-[#C5A059] px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#C5A059]/30">
              119 SIH Codes
            </span>
          </div>

          <div className="space-y-3">
            {domainStats.map((d) => (
              <div key={d.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center space-x-2">
                    <d.icon className="w-4 h-4 text-[#C5A059]" />
                    <span className="text-white">{d.name}</span>
                  </div>
                  <div className="font-mono text-white/60">
                    {d.count} ({d.pct}%)
                  </div>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C5A059] h-full rounded-full transition-all duration-500"
                    style={{ width: `${d.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* District Priority Breakdown */}
        <section className="bg-[#141414] rounded-xl p-5 border border-white/10 shadow-lg text-left">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">Top Impact Hotspots by District</h2>
            <span className="text-xs font-bold text-[#E55353] bg-[#E55353]/15 px-2 py-0.5 rounded border border-[#E55353]/30">
              Critical Urgency
            </span>
          </div>

          <div className="divide-y divide-white/10 text-xs">
            {districtHotspots.slice(0, 5).map((dist) => (
              <div key={dist.name} className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">
                    {dist.name} ({dist.nameHi})
                  </div>
                  <div className="text-[11px] text-white/50">Key Issue: {dist.topIssue}</div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-[#C5A059] text-sm">
                    {dist.challenges}
                  </span>
                  <span className="text-[11px] text-[#E55353] block">
                    {dist.critical} critical threats
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
