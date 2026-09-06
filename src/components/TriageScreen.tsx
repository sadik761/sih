import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Building,
  Eye,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { CivicChallenge, DomainType, SeverityType, LanguageType } from '../types';
import { JHARKHAND_DISTRICTS } from '../data/mockData';

interface TriageScreenProps {
  challenges: CivicChallenge[];
  onUpdateStatus: (id: string, status: CivicChallenge['status']) => void;
  onSelectChallenge: (challenge: CivicChallenge) => void;
  language: LanguageType;
}

export const TriageScreen: React.FC<TriageScreenProps> = ({
  challenges,
  onUpdateStatus,
  onSelectChallenge,
  language,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const filteredChallenges = challenges.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sihCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomain === 'all' || c.domain === selectedDomain;
    const matchesDistrict = selectedDistrict === 'all' || c.district === selectedDistrict;
    const matchesSeverity = selectedSeverity === 'all' || c.severity === selectedSeverity;
    return matchesSearch && matchesDomain && matchesDistrict && matchesSeverity;
  });

  return (
    <main
      id="triage-screen-main"
      className="w-full max-w-[1280px] mx-auto px-4 md:px-6 pt-4 pb-28 text-[#E0E0E0]"
    >
      {/* Top Header Card */}
      <section className="bg-[#141414] rounded-xl p-4 mb-4 border border-white/10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 text-[11px] font-extrabold bg-[#C5A059] text-black rounded shadow-[0_0_8px_rgba(197,160,89,0.3)]">
                INCUBATION REVIEW DESK
              </span>
              <h1 className="text-[18px] md:text-[20px] font-bold text-white tracking-tight">
                Civic Verification & Problem Triage
              </h1>
            </div>
            <p className="text-xs text-white/50 mt-0.5">
              Technical evaluation pipeline for crowdsourced societal challenges under Smart India
              Hackathon protocols.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-1 bg-[#1A1A1A] text-[#C5A059] font-bold rounded-lg border border-[#C5A059]/30 shadow-xs">
              {filteredChallenges.length} Active Challenges
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2 border-t border-white/10">
          <div className="relative">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search title, SIH code, district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-[#0F0F0F] pl-9 pr-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-[#C5A059]"
            />
          </div>

          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="rounded-lg border border-white/15 bg-[#0F0F0F] px-3 py-2 text-xs text-white focus:border-[#C5A059]"
          >
            <option value="all" className="bg-[#141414] text-white">All Problem Domains</option>
            <option value="Water Resources" className="bg-[#141414] text-white">Water Resources</option>
            <option value="MedTech & Health" className="bg-[#141414] text-white">MedTech & Health</option>
            <option value="AgriTech & Soil" className="bg-[#141414] text-white">AgriTech & Soil</option>
            <option value="Clean Energy" className="bg-[#141414] text-white">Clean Energy</option>
            <option value="Education & Skill" className="bg-[#141414] text-white">Education & Skill</option>
            <option value="Infra & Ecology" className="bg-[#141414] text-white">Infra & Ecology</option>
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="rounded-lg border border-white/15 bg-[#0F0F0F] px-3 py-2 text-xs text-white focus:border-[#C5A059]"
          >
            <option value="all" className="bg-[#141414] text-white">All 24 Districts</option>
            {Object.values(JHARKHAND_DISTRICTS).map((d) => (
              <option key={d.name} value={d.name} className="bg-[#141414] text-white">
                {d.name} ({d.nameHi})
              </option>
            ))}
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="rounded-lg border border-white/15 bg-[#0F0F0F] px-3 py-2 text-xs text-white focus:border-[#C5A059]"
          >
            <option value="all" className="bg-[#141414] text-white">All Severity Tiers</option>
            <option value="critical" className="bg-[#141414] text-white">Critical (Immediate Threat)</option>
            <option value="moderate" className="bg-[#141414] text-white">Moderate (Recurring Hazard)</option>
            <option value="community" className="bg-[#141414] text-white">Community Concern</option>
          </select>
        </div>
      </section>

      {/* Challenges List */}
      <div className="space-y-3">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-[#141414] rounded-xl p-4 border border-white/10 shadow-lg hover:border-[#C5A059]/50 transition-all text-left"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                {/* SIH Problem Code */}
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#C5A059] text-black shadow-[0_0_8px_rgba(197,160,89,0.25)]">
                  {challenge.sihCode}
                </span>

                {/* Category Badge */}
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    challenge.category === 'SOFTWARE'
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                      : challenge.category === 'HARDWARE'
                      ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                      : 'bg-indigo-950/60 text-indigo-300 border-indigo-800/60'
                  }`}
                >
                  {challenge.category}
                </span>

                {/* Domain Chip */}
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1A1A1A] text-[#C5A059] border border-[#C5A059]/30">
                  {challenge.domain}
                </span>

                {/* Severity Badge */}
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 border ${
                    challenge.severity === 'critical'
                      ? 'bg-[#E55353]/20 text-[#E55353] border-[#E55353]/30'
                      : challenge.severity === 'moderate'
                      ? 'bg-[#C5A059]/20 text-[#C5A059] border-[#C5A059]/30'
                      : 'bg-white/10 text-white/80 border-white/20'
                  }`}
                >
                  {challenge.severity === 'critical' && <AlertTriangle className="w-3 h-3 text-[#E55353]" />}
                  {challenge.severity.toUpperCase()}
                </span>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold text-white/50">Status:</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1A1A1A] text-[#C5A059] border border-[#C5A059]/40">
                  {challenge.status}
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-base font-bold text-white mb-1 hover:text-[#C5A059] cursor-pointer transition-colors">
              {challenge.title}
            </h3>
            <p className="text-xs text-white/60 line-clamp-2 mb-3 leading-relaxed">
              {challenge.description}
            </p>

            {/* Evidence & Location Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 mb-3 border-y border-white/10 text-xs text-white/60">
              <div>
                <span className="font-semibold text-white">Location:</span>{' '}
                {challenge.district} • {challenge.blockPanchayat.split('•')[0]}
              </div>
              <div>
                <span className="font-semibold text-white">Evidence:</span>{' '}
                {challenge.evidenceFiles.length} file(s) •{' '}
                {challenge.hasAudioNote ? 'Audio Attached' : 'No Audio'}
              </div>
              <div>
                <span className="font-semibold text-white">AI Triage Score:</span>{' '}
                <span className="font-mono font-bold text-[#C5A059]">
                  {challenge.triageScore}/100
                </span>
              </div>
            </div>

            {/* Assigned Lab / CSR info */}
            {challenge.assignedLab && (
              <div className="mb-3 p-2 rounded bg-[#1A1A1A] border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5">
                  <Building className="w-4 h-4 text-[#C5A059]" />
                  <span className="font-semibold text-[#C5A059]">Incubation Lab:</span>
                  <span className="text-white/80">{challenge.assignedLab}</span>
                </div>
                {challenge.teamsWorking && (
                  <span className="font-bold text-black bg-[#C5A059] px-2 py-0.5 rounded text-[11px]">
                    {challenge.teamsWorking} Student Teams
                  </span>
                )}
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => onSelectChallenge(challenge)}
                  className="px-3 py-1.5 rounded-lg border border-white/15 text-xs font-bold text-white/80 hover:bg-white/10 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Inspect Dossier</span>
                </button>

                <button
                  type="button"
                  onClick={() => onUpdateStatus(challenge.id, 'SIH Shortlist')}
                  className="px-3 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#DFC387] text-black text-xs font-bold flex items-center gap-1 cursor-pointer shadow-[0_0_12px_rgba(197,160,89,0.25)] transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>Shortlist for SIH Hackathon</span>
                </button>
              </div>

              <span className="font-mono text-[10px] text-white/40">
                Logged: {challenge.submittedAt}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
