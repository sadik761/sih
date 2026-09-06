import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNavBar } from './components/BottomNavBar';
import { ReportScreen } from './components/ReportScreen';
import { TriageScreen } from './components/TriageScreen';
import { RDHubScreen } from './components/RDHubScreen';
import { CSRFundScreen } from './components/CSRFundScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { PreviewModal } from './components/PreviewModal';
import { ReceiptModal } from './components/ReceiptModal';
import { CivicChallenge, TabType, LanguageType } from './types';
import { INITIAL_CHALLENGES } from './data/mockData';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('report');
  const [language, setLanguage] = useState<LanguageType>('en');
  const [accessibilityFontSize, setAccessibilityFontSize] = useState<'normal' | 'large'>('normal');

  // Challenges loaded from local storage with initial mock data
  const [challenges, setChallenges] = useState<CivicChallenge[]>(() => {
    try {
      const saved = localStorage.getItem('jharkhand_civic_challenges');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_CHALLENGES;
  });

  // Save challenges to local storage on changes
  useEffect(() => {
    try {
      localStorage.setItem('jharkhand_civic_challenges', JSON.stringify(challenges));
    } catch {
      // ignore
    }
  }, [challenges]);

  // Modal States
  const [previewChallenge, setPreviewChallenge] = useState<Partial<CivicChallenge> | null>(null);
  const [receiptChallenge, setReceiptChallenge] = useState<CivicChallenge | null>(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Draft saving
  const handleSaveDraft = (draft: Partial<CivicChallenge>) => {
    try {
      localStorage.setItem('jharkhand_civic_draft', JSON.stringify(draft));
      showToast('Civic Challenge Draft saved to browser local memory!');
    } catch {
      showToast('Could not save draft.');
    }
  };

  // Submission handler
  const handleSubmitChallenge = (newChallenge: CivicChallenge) => {
    setChallenges((prev) => [newChallenge, ...prev]);
    setReceiptChallenge(newChallenge);
    showToast('Challenge registered successfully under Jharkhand Right to Public Services Act!');
  };

  // Status update in Triage
  const handleUpdateStatus = (id: string, status: CivicChallenge['status']) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
    showToast(`Status updated to "${status}"!`);
  };

  return (
    <div
      id="jharkhand-samadhan-app"
      className={`min-h-screen bg-[#0A0A0A] text-[#E0E0E0] flex flex-col font-sans ${
        accessibilityFontSize === 'large' ? 'text-[17px]' : 'text-[14px]'
      }`}
    >
      {/* Top Banner & Navigation Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        accessibilityFontSize={accessibilityFontSize}
        setAccessibilityFontSize={setAccessibilityFontSize}
      />

      {/* Main Content Body */}
      <div className="flex-1 w-full bg-[#0A0A0A]">
        {activeTab === 'report' && (
          <ReportScreen
            language={language}
            onSaveDraft={handleSaveDraft}
            onSubmitChallenge={handleSubmitChallenge}
            onPreview={(c) => setPreviewChallenge(c)}
          />
        )}

        {activeTab === 'triage' && (
          <TriageScreen
            challenges={challenges}
            onUpdateStatus={handleUpdateStatus}
            onSelectChallenge={(c) => setPreviewChallenge(c)}
            language={language}
          />
        )}

        {activeTab === 'rd-hub' && (
          <RDHubScreen
            challenges={challenges}
            onSelectChallenge={(c) => setPreviewChallenge(c)}
            language={language}
          />
        )}

        {activeTab === 'csr' && (
          <CSRFundScreen
            challenges={challenges}
            onSelectChallenge={(c) => setPreviewChallenge(c)}
            language={language}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsScreen challenges={challenges} language={language} />
        )}
      </div>

      {/* Fixed Bottom Navigation Bar (Report, Triage, R&D Hub, CSR Fund, Analytics) */}
      <BottomNavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
      />

      {/* Preview Modal */}
      {previewChallenge && (
        <PreviewModal
          challenge={previewChallenge}
          onClose={() => setPreviewChallenge(null)}
        />
      )}

      {/* Submission Receipt Modal */}
      {receiptChallenge && (
        <ReceiptModal
          challenge={receiptChallenge}
          onClose={() => setReceiptChallenge(null)}
          onNavigateTab={(tab) => {
            setReceiptChallenge(null);
            setActiveTab(tab);
          }}
        />
      )}

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div
          id="portal-toast"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#141414] text-white px-4 py-2.5 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.8)] flex items-center space-x-2.5 text-xs font-bold border border-[#C5A059]/50 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
