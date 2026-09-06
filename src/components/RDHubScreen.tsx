import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  ExternalLink,
  Users,
  Award,
  Building,
  CheckCircle2,
  FileCode,
  Download,
} from 'lucide-react';
import { CivicChallenge, LanguageType } from '../types';
import { INCUBATION_LABS } from '../data/mockData';

interface RDHubScreenProps {
  challenges: CivicChallenge[];
  onSelectChallenge: (challenge: CivicChallenge) => void;
  language: LanguageType;
}

export const RDHubScreen: React.FC<RDHubScreenProps> = ({
  challenges,
  onSelectChallenge,
  language,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'challenges' | 'labs'>('challenges');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'SOFTWARE' | 'HARDWARE'>('ALL');
  const [search, setSearch] = useState('');

  const sihChallenges = challenges.filter(
    (c) =>
      (categoryFilter === 'ALL' || c.category === categoryFilter) &&
      (c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.sihCode.toLowerCase().includes(search.toLowerCase()) ||
        c.domain.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main
      id="rdhub-screen-main"
      className="w-full max-w-[1280px] mx-auto px-4 md:px-6 pt-4 pb-28 text-[#E0E0E0]"
    >
      {/* R&D Header Banner */}
      <section className="bg-[#141414] rounded-xl p-5 mb-4 border border-white/10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 text-[11px] font-extrabold bg-[#C5A059] text-black rounded shadow-[0_0_8px_rgba(197,160,89,0.3)]">
                SIH 2026 REGISTRY
              </span>
              <h1 className="text-[18px] md:text-[22px] font-bold text-white tracking-tight">
                State University R&D & Incubation Hub
              </h1>
            </div>
            <p className="text-xs text-white/50 mt-1 max-w-2xl leading-relaxed">
              Official registry of crowdsourced societal problems assigned to technical
              universities, polytechnics, and incubator laboratories across Jharkhand under Smart
              India Hackathon benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('challenges')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'challenges'
                  ? 'bg-[#C5A059] text-black shadow-xs font-extrabold'
                  : 'bg-[#1A1A1A] text-white/60 hover:text-white border border-white/10'
              }`}
            >
              Problem Statements ({sihChallenges.length})
            </button>
            <button
              onClick={() => setActiveSubTab('labs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'labs'
                  ? 'bg-[#C5A059] text-black shadow-xs font-extrabold'
                  : 'bg-[#1A1A1A] text-white/60 hover:text-white border border-white/10'
              }`}
            >
              Partner Labs ({INCUBATION_LABS.length})
            </button>
          </div>
        </div>

        {/* Filters */}
        {activeSubTab === 'challenges' && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search SIH Code or Domain..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-[#0F0F0F] pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-white/30 focus:border-[#C5A059]"
              />
            </div>

            <div className="inline-flex rounded-lg border border-white/15 bg-[#0F0F0F] p-0.5 text-xs font-bold">
              <button
                onClick={() => setCategoryFilter('ALL')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  categoryFilter === 'ALL'
                    ? 'bg-[#C5A059] text-black font-extrabold shadow-xs'
                    : 'text-white/60 hover:text-[#C5A059]'
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setCategoryFilter('SOFTWARE')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  categoryFilter === 'SOFTWARE'
                    ? 'bg-[#C5A059] text-black font-extrabold shadow-xs'
                    : 'text-white/60 hover:text-[#C5A059]'
                }`}
              >
                SOFTWARE
              </button>
              <button
                onClick={() => setCategoryFilter('HARDWARE')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  categoryFilter === 'HARDWARE'
                    ? 'bg-[#C5A059] text-black font-extrabold shadow-xs'
                    : 'text-white/60 hover:text-[#C5A059]'
                }`}
              >
                HARDWARE
              </button>
            </div>
          </div>
        )}
      </section>

      {/* View 1: Problem Statements Table / Cards */}
      {activeSubTab === 'challenges' && (
        <div className="space-y-3">
          {/* Desktop Table */}
          <div className="hidden md:block bg-[#141414] rounded-xl border border-white/10 overflow-hidden shadow-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1A1A1A] text-[#C5A059] text-[11px] font-bold uppercase tracking-wider border-b border-white/10">
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Problem Statement</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Domain</th>
                  <th className="py-3 px-4">Incubation Lab</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs">
                {sihChallenges.map((c) => (
                  <tr key={c.id} className="hover:bg-[#1A1A1A]/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#C5A059] whitespace-nowrap">
                      {c.sihCode}
                    </td>
                    <td className="py-3 px-4 max-w-sm">
                      <div className="font-bold text-white">{c.title}</div>
                      <div className="text-[11px] text-white/50 truncate">{c.description}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                          c.category === 'SOFTWARE'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                            : 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                        }`}
                      >
                        {c.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#C5A059] font-semibold">{c.domain}</td>
                    <td className="py-3 px-4">
                      <span className="text-white/70 font-medium">
                        {c.assignedLab ? c.assignedLab.split('-')[0] : 'Open for All Labs'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onSelectChallenge(c)}
                        className="px-2.5 py-1 rounded bg-[#141414] border border-[#C5A059]/40 text-[#C5A059] hover:bg-[#C5A059] hover:text-black text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer transition-all"
                      >
                        <span>Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {sihChallenges.map((c) => (
              <div
                key={c.id}
                className="bg-[#141414] rounded-xl p-4 border border-white/10 shadow-lg text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-extrabold px-2 py-0.5 bg-[#C5A059] text-black rounded shadow-[0_0_8px_rgba(197,160,89,0.25)]">
                    {c.sihCode}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      c.category === 'SOFTWARE'
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                        : 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                    }`}
                  >
                    {c.category}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white mb-1">{c.title}</h3>
                <p className="text-xs text-white/60 line-clamp-2 mb-3 leading-relaxed">
                  {c.description}
                </p>
                <div className="text-[11px] text-white/50 mb-3 space-y-1">
                  <div>
                    <span className="font-bold text-white">Domain:</span>{' '}
                    <span className="text-[#C5A059]">{c.domain}</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">Assigned:</span>{' '}
                    {c.assignedLab || 'State Open Competition'}
                  </div>
                </div>
                <button
                  onClick={() => onSelectChallenge(c)}
                  className="w-full py-2 rounded-lg bg-[#C5A059] hover:bg-[#DFC387] text-black text-xs font-bold flex items-center justify-center space-x-1 transition-all cursor-pointer"
                >
                  <span>View Problem Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 2: Partner Incubation Labs */}
      {activeSubTab === 'labs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INCUBATION_LABS.map((lab) => (
            <div
              key={lab.id}
              className="bg-[#141414] rounded-xl p-4 border border-white/10 shadow-lg text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#C5A059] flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-[#C5A059]" />
                  {lab.location}
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#1A1A1A] text-[#C5A059] font-bold border border-[#C5A059]/30">
                  {lab.activePrototypes} Active Prototypes
                </span>
              </div>
              <h3 className="font-bold text-base text-white mb-1">{lab.name}</h3>
              <p className="text-xs text-white/60 mb-3">
                <span className="font-semibold text-white">Key Focus:</span>{' '}
                {lab.specialization}
              </p>
              <div className="text-[11px] text-white/50 border-t border-white/10 pt-2 flex items-center justify-between">
                <span>Director: {lab.director}</span>
                <span className="text-[#C5A059] font-bold cursor-pointer hover:underline">
                  Visit Lab Cell &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
