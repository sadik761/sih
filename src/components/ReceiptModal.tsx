import React from 'react';
import { CheckCircle2, QrCode, Download, Printer, ArrowRight, ShieldCheck } from 'lucide-react';
import { CivicChallenge, TabType } from '../types';

interface ReceiptModalProps {
  challenge: CivicChallenge | null;
  onClose: () => void;
  onNavigateTab: (tab: TabType) => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  challenge,
  onClose,
  onNavigateTab,
}) => {
  if (!challenge) return null;

  return (
    <div
      id="submission-receipt-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 overflow-y-auto"
    >
      <div className="bg-[#141414] rounded-xl max-w-lg w-full p-6 shadow-2xl border border-white/15 my-8 text-center text-[#E0E0E0]">
        {/* Success Icon */}
        <div className="w-14 h-14 rounded-full bg-[#1A1A1A] border border-[#C5A059]/40 text-[#C5A059] flex items-center justify-center mx-auto mb-3 shadow-[0_0_16px_rgba(197,160,89,0.25)]">
          <CheckCircle2 className="w-8 h-8 text-[#C5A059]" />
        </div>

        <h2 className="text-xl font-bold text-white mb-1">
          Civic Challenge Successfully Registered!
        </h2>
        <p className="text-xs text-white/50 mb-4">
          Your problem statement has been assigned to the State Incubation Evaluation Desk and
          indexed for the upcoming Jharkhand State R&D Hackathon (SIH Benchmark).
        </p>

        {/* Receipt Box */}
        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-white/10 text-left space-y-3 mb-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <span className="text-[10px] text-white/50 uppercase block">State Tracking Code</span>
              <span className="font-mono font-bold text-sm text-[#C5A059]">{challenge.id}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-white/50 uppercase block">SIH Problem Code</span>
              <span className="font-mono font-bold text-sm text-white">
                {challenge.sihCode}
              </span>
            </div>
          </div>

          <div className="text-xs">
            <span className="font-bold text-white block">{challenge.title}</span>
            <span className="text-white/60 block mt-0.5">
              {challenge.district} District • {challenge.blockPanchayat}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-white/10 text-white/60">
            <div>
              <span className="text-white/40 block">Submitted At:</span>
              <span className="font-mono font-semibold text-white/80">{challenge.submittedAt}</span>
            </div>
            <div>
              <span className="text-white/40 block">Assigned Pipeline:</span>
              <span className="font-semibold text-[#C5A059]">State University Incubator</span>
            </div>
          </div>

          {/* QR Code and UIDAI Verification */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-white rounded border border-gray-300">
                <QrCode className="w-8 h-8 text-black" />
              </div>
              <div className="text-[10px] text-white/50">
                <span className="font-bold block text-white">Scan for Live Status</span>
                <span>Jharkhand Public Portal</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-[11px] font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>UIDAI Authenticated</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onClose();
                onNavigateTab('triage');
              }}
              className="py-2.5 px-3 rounded-lg bg-[#C5A059] text-black text-xs font-bold hover:bg-[#DFC387] flex items-center justify-center space-x-1 cursor-pointer transition-all shadow-[0_0_10px_rgba(197,160,89,0.25)]"
            >
              <span>View in Triage Desk</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>

            <button
              onClick={() => {
                onClose();
                onNavigateTab('rd-hub');
              }}
              className="py-2.5 px-3 rounded-lg bg-[#141414] text-[#C5A059] border border-[#C5A059]/40 text-xs font-bold hover:bg-[#C5A059] hover:text-black flex items-center justify-center space-x-1 cursor-pointer transition-all"
            >
              <span>Explore R&D Hub</span>
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="w-full py-2 rounded-lg border border-white/15 text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white flex items-center justify-center space-x-1 cursor-pointer transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Print Official Acknowledgment Slip</span>
          </button>
        </div>
      </div>
    </div>
  );
};
