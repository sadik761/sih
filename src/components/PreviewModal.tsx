import React from 'react';
import { X, Printer, Download, MapPin, Building, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { CivicChallenge } from '../types';

interface PreviewModalProps {
  challenge: Partial<CivicChallenge> | null;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ challenge, onClose }) => {
  if (!challenge) return null;

  return (
    <div
      id="preview-entry-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 overflow-y-auto"
    >
      <div className="bg-[#141414] rounded-xl max-w-2xl w-full p-6 shadow-2xl border border-white/15 my-8 text-left text-[#E0E0E0]">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059] text-black flex items-center justify-center font-extrabold text-xs shadow-[0_0_8px_rgba(197,160,89,0.3)]">
              JH
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                GOVERNMENT OF JHARKHAND • DEPT. OF HIGHER & TECHNICAL EDUCATION
              </span>
              <span className="text-[10px] text-white/50 uppercase tracking-wider">
                Official Civic Problem Statement Dossier (Form JH-SIH-01)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-lg border border-white/15 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer transition-colors"
              title="Print Dossier"
            >
              <Printer className="w-4 h-4 text-[#C5A059]" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-white/15 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dossier Content */}
        <div className="space-y-4">
          {/* Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#1A1A1A] p-3 rounded-lg border border-white/10 text-xs">
            <div>
              <span className="text-[10px] text-white/50 block uppercase">Tracking ID</span>
              <span className="font-mono font-bold text-[#C5A059]">{challenge.id || 'DRAFT'}</span>
            </div>
            <div>
              <span className="text-[10px] text-white/50 block uppercase">Category</span>
              <span className="font-bold text-emerald-400">{challenge.category}</span>
            </div>
            <div>
              <span className="text-[10px] text-white/50 block uppercase">Severity</span>
              <span className="font-bold text-[#E55353] uppercase">{challenge.severity}</span>
            </div>
            <div>
              <span className="text-[10px] text-white/50 block uppercase">Privacy</span>
              <span className="font-bold text-white">
                {challenge.isAnonymous ? 'Anonymous' : 'Public'}
              </span>
            </div>
          </div>

          {/* Title */}
          <div>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block mb-0.5">
              Challenge Statement
            </span>
            <h2 className="text-base font-bold text-white">{challenge.title}</h2>
          </div>

          {/* Domain & Geographic Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#1A1A1A] p-3 rounded-lg border border-white/10">
            <div>
              <span className="text-white/50 block font-semibold mb-0.5">Affected Administrative Area</span>
              <div className="flex items-center space-x-1 font-bold text-white">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>
                  {challenge.district} District • {challenge.blockPanchayat}
                </span>
              </div>
              <div className="text-[11px] font-mono text-white/50 mt-0.5">
                {challenge.geoCoordinates?.formatted}
              </div>
            </div>

            <div>
              <span className="text-white/50 block font-semibold mb-0.5">Sector & Impact Domain</span>
              <span className="font-bold text-[#C5A059] block">{challenge.domain}</span>
              <span className="text-[11px] text-white/50">{challenge.domainSub}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block mb-0.5">
              Detailed Narrative & Ground Reality
            </span>
            <p className="text-xs text-white/70 leading-relaxed bg-[#0F0F0F] p-3 rounded-lg border border-white/10">
              {challenge.description}
            </p>
          </div>

          {/* Media Evidence */}
          {challenge.evidenceFiles && challenge.evidenceFiles.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block mb-1">
                Verified Verification Attachments ({challenge.evidenceFiles.length})
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {challenge.evidenceFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-2 rounded border border-white/10 bg-[#1A1A1A] flex items-center space-x-2"
                  >
                    <div className="w-10 h-10 rounded overflow-hidden shrink-0 bg-black/40">
                      <img
                        src={file.url}
                        alt={file.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-bold text-white truncate">{file.name}</div>
                      <div className="text-[9px] text-white/50">{file.size}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Statutory Seal */}
          <div className="p-3 bg-[#1A1A1A] rounded-lg border border-[#C5A059]/30 flex items-center justify-between text-xs text-white/80">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
              <span>Verified Citizen Record under Jharkhand Right to Public Services Act.</span>
            </div>
            <span className="font-mono text-[10px] text-[#C5A059]">Digital Seal #JH-0914</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t border-white/10 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#C5A059] hover:bg-[#DFC387] text-black text-xs font-bold cursor-pointer transition-all shadow-[0_0_10px_rgba(197,160,89,0.25)]"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
