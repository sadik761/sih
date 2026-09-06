import React from 'react';
import { Flag, ListChecks, GraduationCap, Handshake, BarChart3 } from 'lucide-react';
import { TabType, LanguageType } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface BottomNavBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  language: LanguageType;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  setActiveTab,
  language,
}) => {
  const t = TRANSLATIONS[language].tabs;

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'report',
      label: t.report,
      icon: <Flag className="w-5 h-5" />,
    },
    {
      id: 'triage',
      label: t.triage,
      icon: <ListChecks className="w-5 h-5" />,
    },
    {
      id: 'rd-hub',
      label: t.rdHub,
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      id: 'csr',
      label: t.csrFund,
      icon: <Handshake className="w-5 h-5" />,
    },
    {
      id: 'analytics',
      label: t.analytics,
      icon: <BarChart3 className="w-5 h-5" />,
    },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 py-2.5 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/10 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`nav-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center px-3.5 py-1.5 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
              isActive
                ? 'bg-[#C5A059] text-black font-extrabold shadow-[0_0_15px_rgba(197,160,89,0.35)]'
                : 'text-white/40 hover:text-[#C5A059] hover:bg-white/5 font-medium'
            }`}
            type="button"
          >
            <span className={isActive ? 'text-black' : 'text-white/50'}>
              {tab.icon}
            </span>
            <span
              className={`text-[10px] mt-0.5 tracking-wider uppercase font-bold ${
                isActive ? 'text-black' : 'text-white/50'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
