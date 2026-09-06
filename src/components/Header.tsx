import React, { useState } from 'react';
import { Landmark, Bell, X, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { LanguageType } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  accessibilityFontSize: 'normal' | 'large';
  setAccessibilityFontSize: (size: 'normal' | 'large') => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  accessibilityFontSize,
  setAccessibilityFontSize,
}) => {
  const t = TRANSLATIONS[language];
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    {
      id: 'notif-1',
      title: 'Lab Matched: BIT Mesra',
      desc: 'Challenge #JH-2026-0419 (Fluoride in Palamu) assigned to Env Tech Lab for adsorbent prototype testing.',
      time: '15 mins ago',
      type: 'success',
    },
    {
      id: 'notif-2',
      title: 'Field Verification Completed',
      desc: 'Block Development Officer (Chainpur) verified water turbidity reports for Mahugawan GP.',
      time: '2 hours ago',
      type: 'info',
    },
    {
      id: 'notif-3',
      title: 'State R&D Hackathon 2026',
      desc: 'Smart India Hackathon guidelines updated by Dept. of Higher Education.',
      time: 'Yesterday',
      type: 'alert',
    },
  ];

  return (
    <>
      {/* Top Utility Banner (Government of Jharkhand Anchor) */}
      <aside
        id="jharkhand-gov-banner"
        className="bg-[#0D0D0D] text-white/75 px-4 py-1.5 text-[11px] font-bold flex justify-between items-center tracking-wider border-b border-white/5 select-none"
      >
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_6px_#C5A059]"></span>
          <span className="truncate tracking-widest uppercase text-white/80">{t.govtBanner}</span>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setShowAccessModal(true)}
            className="text-[#C5A059] hover:text-[#DFC387] cursor-pointer transition-colors"
          >
            {t.accessibility}
          </button>
          <span className="text-white/20">|</span>
          <button
            onClick={() =>
              setAccessibilityFontSize(accessibilityFontSize === 'normal' ? 'large' : 'normal')
            }
            title="Toggle Font Size (A / A+)"
            className={`cursor-pointer transition-colors px-1.5 py-0.5 rounded ${
              accessibilityFontSize === 'large'
                ? 'bg-[#C5A059] font-black text-black'
                : 'text-white/70 hover:text-[#C5A059] font-bold'
            }`}
          >
            {accessibilityFontSize === 'large' ? 'A++' : 'A+'}
          </button>
        </div>
      </aside>

      {/* Top Header Bar */}
      <header
        id="app-header"
        className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 shadow-lg"
      >
        <div className="flex justify-between items-center w-full px-4 md:px-6 max-w-[1280px] mx-auto h-16">
          {/* Leading Icon & Portal Headline */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#141414] flex items-center justify-center text-[#C5A059] border border-[#C5A059]/30 shadow-[0_0_12px_rgba(197,160,89,0.15)]">
              <Landmark className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[18px] md:text-[20px] font-bold text-white tracking-tight leading-tight">
                {t.portalTitle}
              </span>
              <span className="text-[9px] md:text-[10px] font-bold text-[#C5A059] -mt-0.5 tracking-[0.25em] uppercase">
                {t.portalSubtitle}
              </span>
            </div>
          </div>

          {/* Trailing Action: Language Switcher & Notification */}
          <div className="flex items-center space-x-2.5">
            {/* Language Switcher Pill (EN / HI) */}
            <div
              id="lang-switcher"
              className="inline-flex p-0.5 rounded-lg bg-[#141414] border border-white/10 text-[11px] font-bold"
            >
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  language === 'en'
                    ? 'bg-[#C5A059] text-black shadow-xs font-extrabold'
                    : 'text-white/60 hover:text-[#C5A059] font-semibold'
                }`}
                type="button"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  language === 'hi'
                    ? 'bg-[#C5A059] text-black shadow-xs font-extrabold'
                    : 'text-white/60 hover:text-[#C5A059] font-semibold'
                }`}
                type="button"
              >
                हिन्दी
              </button>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                id="notifications-btn"
                aria-label="Notifications"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setUnreadCount(0);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-[#C5A059] bg-[#141414] hover:bg-[#1E1E1E] transition-colors active:scale-95 border border-white/10 relative"
                type="button"
              >
                <Bell className="w-5 h-5 text-[#C5A059]" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E55353] shadow-[0_0_6px_#E55353] animate-pulse"></span>
                )}
              </button>

              {/* Notification Dropdown Drawer */}
              {showNotifications && (
                <div
                  id="notifications-popover"
                  className="absolute right-0 top-12 w-80 sm:w-96 bg-[#141414] rounded-xl shadow-2xl border border-white/10 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-white"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                    <div className="flex items-center space-x-1.5">
                      <Bell className="w-4 h-4 text-[#C5A059]" />
                      <span className="text-sm font-bold text-white">
                        Govt. Triage & Lab Updates
                      </span>
                    </div>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-2.5 rounded-lg bg-[#1A1A1A] hover:bg-[#202020] transition-colors border border-white/5 text-left"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#C5A059] flex items-center gap-1">
                            {n.type === 'success' && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            )}
                            {n.type === 'alert' && (
                              <AlertTriangle className="w-3.5 h-3.5 text-[#C5A059]" />
                            )}
                            {n.title}
                          </span>
                          <span className="text-[10px] text-white/40 font-mono">{n.time}</span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed">{n.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-white/10 text-center">
                    <span className="text-[11px] font-bold text-[#C5A059] hover:underline cursor-pointer">
                      Official Gazette & Lab Notification Hub &rarr;
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Accessibility Modal */}
      {showAccessModal && (
        <div
          id="accessibility-modal"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-[#141414] rounded-xl max-w-md w-full p-5 shadow-2xl border border-white/15 text-white">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
                <h3 className="font-bold text-base text-[#C5A059]">
                  Civic Accessibility Options
                </h3>
              </div>
              <button
                onClick={() => setShowAccessModal(false)}
                className="p-1 rounded text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-white/60 mb-4">
              In adherence to the Right to Public Services Act and W3C Web Accessibility (WCAG 2.1 AA) guidelines for citizen portals.
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#1A1A1A] border border-white/5">
                <div>
                  <div className="text-xs font-bold text-white">High Legibility Type Size</div>
                  <div className="text-[11px] text-white/50">
                    Enlarge base body and form text for readability
                  </div>
                </div>
                <button
                  onClick={() =>
                    setAccessibilityFontSize(
                      accessibilityFontSize === 'normal' ? 'large' : 'normal'
                    )
                  }
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                    accessibilityFontSize === 'large'
                      ? 'bg-[#C5A059] text-black shadow-sm'
                      : 'bg-white/10 border border-white/20 text-white/80'
                  }`}
                >
                  {accessibilityFontSize === 'large' ? 'Large (Active)' : 'Normal'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#1A1A1A] border border-white/5">
                <div>
                  <div className="text-xs font-bold text-white">Language Audio Assistance</div>
                  <div className="text-[11px] text-white/50">
                    Voice transcription in Santali (Ol Chiki), Ho, and Hindi
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40">
                  Built-in
                </span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowAccessModal(false)}
                className="px-4 py-2 rounded-lg bg-[#C5A059] text-black text-xs font-bold hover:bg-[#DFC387] transition-colors cursor-pointer"
              >
                Apply & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
