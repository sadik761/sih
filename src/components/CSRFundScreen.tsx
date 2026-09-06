import React, { useState } from 'react';
import { Handshake, Building2, CheckCircle2, TrendingUp, DollarSign, Award, ArrowUpRight } from 'lucide-react';
import { CSR_PARTNERS } from '../data/mockData';
import { CivicChallenge, LanguageType } from '../types';

interface CSRFundScreenProps {
  challenges: CivicChallenge[];
  onSelectChallenge: (challenge: CivicChallenge) => void;
  language: LanguageType;
}

export const CSRFundScreen: React.FC<CSRFundScreenProps> = ({
  challenges,
  onSelectChallenge,
  language,
}) => {
  const [pledgeModalOpen, setPledgeModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(CSR_PARTNERS[0]);
  const [pledgeSuccess, setPledgeSuccess] = useState(false);

  // Challenges needing CSR adoption
  const pendingFunding = challenges.filter((c) => !c.csrPartner);

  return (
    <main
      id="csrfund-screen-main"
      className="w-full max-w-[1280px] mx-auto px-4 md:px-6 pt-4 pb-28 text-[#E0E0E0]"
    >
      {/* Overview Metric Banner */}
      <section className="bg-[#141414] rounded-xl p-5 mb-4 border border-white/10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 text-[11px] font-extrabold bg-[#C5A059] text-black rounded shadow-[0_0_8px_rgba(197,160,89,0.3)]">
                INDUSTRY & CSR WINDOW
              </span>
              <h1 className="text-[18px] md:text-[22px] font-bold text-white tracking-tight">
                Corporate CSR & Impact Innovation Matching
              </h1>
            </div>
            <p className="text-xs text-white/50 mt-1 max-w-2xl leading-relaxed">
              Matching high-priority crowdsourced civic challenges with statutory Corporate Social
              Responsibility funds from Jharkhand&apos;s leading industrial enterprises.
            </p>
          </div>

          <button
            onClick={() => setPledgeModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-[#C5A059] text-black font-bold text-xs hover:bg-[#DFC387] shadow-[0_0_12px_rgba(197,160,89,0.25)] flex items-center space-x-1.5 self-start md:self-auto cursor-pointer transition-all"
          >
            <Handshake className="w-4 h-4 text-black" />
            <span>Pledge Corporate CSR Grant</span>
          </button>
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-white/10">
          <div className="p-3 bg-[#1A1A1A] rounded-lg border border-white/10">
            <div className="text-[11px] text-white/50 font-semibold">Total Committed Corpus</div>
            <div className="text-lg md:text-xl font-extrabold text-[#C5A059]">₹18.50 Cr</div>
          </div>
          <div className="p-3 bg-[#1A1A1A] rounded-lg border border-white/10">
            <div className="text-[11px] text-white/50 font-semibold">Disbursed to Prototypes</div>
            <div className="text-lg md:text-xl font-extrabold text-emerald-400">₹12.50 Cr</div>
          </div>
          <div className="p-3 bg-[#1A1A1A] rounded-lg border border-white/10">
            <div className="text-[11px] text-white/50 font-semibold">Civic Projects Backed</div>
            <div className="text-lg md:text-xl font-extrabold text-white">45 Initiatives</div>
          </div>
          <div className="p-3 bg-[#1A1A1A] rounded-lg border border-white/10">
            <div className="text-[11px] text-white/50 font-semibold">Average Grant Size</div>
            <div className="text-lg md:text-xl font-extrabold text-white/80">₹18.2 Lakhs</div>
          </div>
        </div>
      </section>

      {/* Corporate Partners Grid */}
      <h2 className="text-base font-bold text-white mb-3">Partner Industrial Foundations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {CSR_PARTNERS.map((partner) => (
          <div
            key={partner.id}
            className="bg-[#141414] rounded-xl p-4 border border-white/10 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-9 h-9 rounded-lg bg-[#1A1A1A] text-[#C5A059] font-black text-xs flex items-center justify-center border border-[#C5A059]/30">
                  {partner.logoText}
                </span>
                <span className="text-[11px] font-bold text-[#C5A059] font-mono">
                  {partner.projectsFunded} Projects
                </span>
              </div>
              <h3 className="font-bold text-sm text-white mb-1">{partner.name}</h3>
              <p className="text-xs text-white/60 mb-3">{partner.focus}</p>
            </div>

            <div className="border-t border-white/10 pt-2 text-xs">
              <div className="flex justify-between text-white/50 text-[11px]">
                <span>Allocated</span>
                <span className="font-bold text-[#C5A059]">{partner.allocated}</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-[#C5A059] h-full rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* High-Impact Civic Challenges Open for Industry Adoption */}
      <h2 className="text-base font-bold text-white mb-3">
        High-Priority Societal Challenges Awaiting CSR Sponsorship
      </h2>
      <div className="space-y-3">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-[#141414] rounded-xl p-4 border border-white/10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="max-w-2xl text-left">
              <div className="flex items-center space-x-2 mb-1 flex-wrap gap-y-1">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#C5A059] text-black shadow-[0_0_8px_rgba(197,160,89,0.25)]">
                  {challenge.sihCode}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1A1A1A] text-[#C5A059] border border-[#C5A059]/30">
                  {challenge.domain}
                </span>
                <span className="text-xs text-white/50">
                  {challenge.district} • {challenge.blockPanchayat.split('•')[0]}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{challenge.title}</h3>
              <p className="text-xs text-white/60 line-clamp-1">{challenge.description}</p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              {challenge.csrPartner ? (
                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 block">
                    Funded: {challenge.grantCommitted}
                  </span>
                  <span className="text-[10px] text-white/50">{challenge.csrPartner}</span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setSelectedPartner(CSR_PARTNERS[0]);
                    setPledgeModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#DFC387] text-black text-xs font-bold cursor-pointer transition-all shadow-[0_0_10px_rgba(197,160,89,0.2)]"
                >
                  Adopt for ₹15 Lakhs
                </button>
              )}
              <button
                onClick={() => onSelectChallenge(challenge)}
                className="p-1.5 rounded-lg border border-white/15 text-white/70 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
              >
                <ArrowUpRight className="w-4 h-4 text-[#C5A059]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pledge Modal */}
      {pledgeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#141414] rounded-xl max-w-md w-full p-5 shadow-2xl border border-white/15 text-left">
            <h3 className="font-bold text-base text-white mb-1">
              Corporate Innovation Grant Pledge
            </h3>
            <p className="text-xs text-white/50 mb-4">
              Allocate Section 135 CSR Funds directly to Jharkhand State University incubation
              laboratories to build prototypes for verified civic challenges.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">
                  Corporate Enterprise
                </label>
                <select
                  value={selectedPartner.id}
                  onChange={(e) =>
                    setSelectedPartner(
                      CSR_PARTNERS.find((p) => p.id === e.target.value) || CSR_PARTNERS[0]
                    )
                  }
                  className="w-full rounded-lg border border-white/15 bg-[#0F0F0F] p-2 text-xs text-white focus:border-[#C5A059]"
                >
                  {CSR_PARTNERS.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#141414] text-white">
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">
                  Pledge Amount (INR)
                </label>
                <input
                  type="text"
                  defaultValue="₹15,00,000 (Fifteen Lakhs)"
                  className="w-full rounded-lg border border-white/15 bg-[#0F0F0F] p-2 text-xs font-mono text-white focus:border-[#C5A059]"
                />
              </div>

              <div className="p-3 bg-[#1A1A1A] rounded-lg border border-white/10 text-xs text-white/70">
                <span className="font-bold text-[#C5A059]">Tax & Audit Compliance:</span> Eligible
                for 100% deduction under Section 35(1)(ii) for scientific R&D contributions to state
                institutions.
              </div>
            </div>

            <div className="mt-5 flex justify-end space-x-2">
              <button
                onClick={() => setPledgeModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white/60 hover:bg-white/5 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setPledgeSuccess(true);
                  setTimeout(() => {
                    setPledgeSuccess(false);
                    setPledgeModalOpen(false);
                  }, 1200);
                }}
                className="px-4 py-2 rounded-lg bg-[#C5A059] text-black text-xs font-bold hover:bg-[#DFC387] cursor-pointer transition-all shadow-[0_0_12px_rgba(197,160,89,0.25)]"
              >
                {pledgeSuccess ? 'Pledge Recorded!' : 'Confirm Grant Pledge'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
