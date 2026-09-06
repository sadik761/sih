import React, { useState, useRef } from 'react';
import {
  GraduationCap,
  BriefcaseMedical,
  Droplets,
  Tractor,
  Zap,
  HardHat,
  MapPin,
  Crosshair,
  Mic,
  Square,
  Play,
  RotateCcw,
  Camera,
  X,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Users,
  Send,
  Save,
  Eye,
  Check,
  Loader2,
  FileText,
  Building,
} from 'lucide-react';
import {
  CategoryType,
  DomainType,
  SeverityType,
  CivicChallenge,
  LanguageType,
} from '../types';
import { JHARKHAND_DISTRICTS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

interface ReportScreenProps {
  language: LanguageType;
  onSaveDraft: (challenge: Partial<CivicChallenge>) => void;
  onSubmitChallenge: (challenge: CivicChallenge) => void;
  onPreview: (challenge: Partial<CivicChallenge>) => void;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({
  language,
  onSaveDraft,
  onSubmitChallenge,
  onPreview,
}) => {
  const t = TRANSLATIONS[language];

  // Multi-step State
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form Field States (Pre-populated with the exact details from the prompt mockup)
  const [domain, setDomain] = useState<DomainType>('Water Resources');
  const [category, setCategory] = useState<CategoryType>('HARDWARE');
  const [title, setTitle] = useState(
    'Fluoride Contamination & Potable Water Scarcity in Rural Palamu'
  );
  const [districtKey, setDistrictKey] = useState<string>('palamu');
  const [blockPanchayat, setBlockPanchayat] = useState(
    'Chainpur Block • Mahugawan GP'
  );

  // GPS State
  const [coordinates, setCoordinates] = useState({
    lat: 24.0416,
    lng: 84.0722,
    accuracy: 4,
    formatted: '24.0416° N, 84.0722° E • Accuracy ±4m',
  });
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsLocked, setGpsLocked] = useState(true);

  // Description & Audio
  const [description, setDescription] = useState(
    'More than 450 households across Mahugawan and nearby hamlets rely entirely on 3 borewells showing visible white fluoride deposits. High rates of dental and skeletal fluorosis observed in children under 14. Existing local filtration units are non-operational due to lack of replacement adsorbent cartridges.'
  );
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasRecordedAudio, setHasRecordedAudio] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Evidence Files (Contains the exact photo hotlink from the prompt)
  const [evidenceFiles, setEvidenceFiles] = useState([
    {
      id: 'ev-default-1',
      name: 'water_test_sample.jpg',
      size: '2.4 MB',
      type: 'JPG',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBChIsm7JyuVJQwDq-lshhWc5VCAZyi8xWZtlw4NHtcYE8UE5aD-KBhF51g5badyNLqoNIOYvkjXjJgt0pg1dICNpIqTlvMCuW3ozsC_1BcFW6Wzd3Zbg-BrXEkorSGbhMxBtV3QMg8Jpf8tGNdn49o_4Af6_T_q7al5ShmAAJAvJwKzWKsTwTJSFcsFH2HHe3aWshqYXyH4JGVMQj3Qp9mJlCohNwzEcAs4B5PPgY8BVLvzUIKsWzmhQ',
      verified: true,
    },
  ]);

  // Severity & Anonymity
  const [severity, setSeverity] = useState<SeverityType>('critical');
  const [isAnonymous, setIsAnonymous] = useState(true);

  // Step 2 & 3 specifics
  const [affectedCount, setAffectedCount] = useState(450);
  const [beneficiaries, setBeneficiaries] = useState(
    'Children under 14, elderly residents, and local livestock'
  );
  const [workarounds, setWorkarounds] = useState(
    'Boiling water and gravel sedimentation, ineffective against dissolved fluoride'
  );
  const [citizenName, setCitizenName] = useState('Gram Swasthya Sahiyya Committee');
  const [citizenPhone, setCitizenPhone] = useState('+91 94311 02841');
  const [declarationAgreed, setDeclarationAgreed] = useState(true);

  // File Upload Helper
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setEvidenceFiles((prev) => [
        ...prev,
        {
          id: `ev-${Date.now()}`,
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
          url: objectUrl,
          verified: true,
        },
      ]);
    }
  };

  const removeEvidence = (id: string) => {
    setEvidenceFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // GPS Simulation / Browser API
  const handleCaptureGPS = () => {
    setGpsLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = parseFloat(pos.coords.latitude.toFixed(4));
          const lng = parseFloat(pos.coords.longitude.toFixed(4));
          const acc = Math.round(pos.coords.accuracy) || 4;
          setCoordinates({
            lat,
            lng,
            accuracy: acc,
            formatted: `${lat}° N, ${lng}° E • Accuracy ±${acc}m`,
          });
          setGpsLoading(false);
          setGpsLocked(true);
        },
        () => {
          // Fallback simulation for Palamu / Chainpur region
          setTimeout(() => {
            setCoordinates({
              lat: 24.0416,
              lng: 84.0722,
              accuracy: 4,
              formatted: '24.0416° N, 84.0722° E • Accuracy ±4m',
            });
            setGpsLoading(false);
            setGpsLocked(true);
          }, 800);
        },
        { timeout: 5000 }
      );
    } else {
      setTimeout(() => {
        setGpsLoading(false);
        setGpsLocked(true);
      }, 800);
    }
  };

  // Voice recording toggle
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      setHasRecordedAudio(true);
    } else {
      setIsRecording(true);
      setRecordingSeconds(0);
      setHasRecordedAudio(false);
      timerRef.current = window.setInterval(() => {
        setRecordingSeconds((s) => s + 1);
      }, 1000);
    }
  };

  // Construct current challenge object
  const getCurrentChallengePayload = (): CivicChallenge => {
    const selectedDist = JHARKHAND_DISTRICTS[districtKey];
    return {
      id: `JH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      sihCode: `SIH26${Math.floor(100 + Math.random() * 900)}`,
      title,
      category,
      domain,
      domainSub:
        domain === 'Water Resources'
          ? 'Potable Supply • Flow'
          : domain === 'MedTech & Health'
          ? 'BioTech • Sanitation'
          : domain === 'AgriTech & Soil'
          ? 'Tribal Farming • Yield'
          : domain === 'Clean Energy'
          ? 'Solar Microgrids • Hydro'
          : domain === 'Education & Skill'
          ? 'Vocational • Digital Labs'
          : 'Roads • Mining Runoff',
      district: selectedDist.name,
      districtHi: selectedDist.nameHi,
      blockPanchayat,
      geoCoordinates: coordinates,
      description,
      hasAudioNote: hasRecordedAudio,
      audioDurationSeconds: hasRecordedAudio ? 84 : 0,
      audioNoteLabel: hasRecordedAudio ? `${selectedDist.name}_Audio_Voice_Note.wav` : undefined,
      evidenceFiles: evidenceFiles.map((f) => ({
        ...f,
        dateAdded: new Date().toISOString().split('T')[0],
      })),
      severity,
      isAnonymous,
      status: 'Submitted',
      submittedAt: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      }) + ' IST',
      affectedPopulation: affectedCount,
      primaryBeneficiaries: beneficiaries,
      workaroundUsed: workarounds,
      citizenName: isAnonymous ? undefined : citizenName,
      citizenPhone: isAnonymous ? undefined : citizenPhone,
      triageScore: severity === 'critical' ? 95 : severity === 'moderate' ? 82 : 70,
    };
  };

  const handleFinalSubmit = () => {
    const payload = getCurrentChallengePayload();
    onSubmitChallenge(payload);
  };

  return (
    <main
      id="report-screen-main"
      className="w-full max-w-[1280px] mx-auto px-4 md:px-6 pt-4 pb-28 text-[#E0E0E0]"
    >
      {/* Progress Stepper */}
      <section
        id="report-stepper-card"
        className="bg-[#141414] rounded-xl p-4 mb-4 border border-white/10 shadow-lg"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[11px] font-extrabold bg-[#C5A059] text-black rounded shadow-[0_0_8px_rgba(197,160,89,0.3)]">
              STEP {currentStep} OF 3
            </span>
            <h1 className="text-[18px] md:text-[20px] font-bold text-white tracking-tight">
              {currentStep === 1 && t.stepTitle}
              {currentStep === 2 && 'Stakeholder Evidence & Impact'}
              {currentStep === 3 && 'Verification & Digital Receipt'}
            </h1>
          </div>
          <span className="font-mono text-xs font-semibold text-[#C5A059]">
            {currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%'} {t.stepCompleted}
          </span>
        </div>

        {/* Segmented Bar */}
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden flex">
          <div
            className="bg-[#C5A059] h-full rounded-full transition-all duration-300 shadow-[0_0_8px_#C5A059]"
            style={{
              width: currentStep === 1 ? '33.33%' : currentStep === 2 ? '66.66%' : '100%',
            }}
          ></div>
        </div>

        <div className="flex justify-between items-center mt-2 text-[11px] font-bold text-white/60">
          <button
            onClick={() => setCurrentStep(1)}
            className={`flex items-center gap-1 transition-colors ${
              currentStep === 1 ? 'text-[#C5A059] font-black' : 'opacity-60 hover:opacity-100 hover:text-white'
            }`}
          >
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                currentStep >= 1 ? 'bg-[#C5A059]' : 'bg-white/20'
              }`}
            ></span>{' '}
            1. {t.stepSub}
          </button>
          <button
            onClick={() => setCurrentStep(2)}
            className={`flex items-center gap-1 transition-colors ${
              currentStep === 2 ? 'text-[#C5A059] font-black' : 'opacity-60 hover:opacity-100 hover:text-white'
            }`}
          >
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                currentStep >= 2 ? 'bg-[#C5A059]' : 'bg-white/20'
              }`}
            ></span>{' '}
            2. {t.stepEvidence}
          </button>
          <button
            onClick={() => setCurrentStep(3)}
            className={`flex items-center gap-1 transition-colors ${
              currentStep === 3 ? 'text-[#C5A059] font-black' : 'opacity-60 hover:opacity-100 hover:text-white'
            }`}
          >
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                currentStep >= 3 ? 'bg-[#C5A059]' : 'bg-white/20'
              }`}
            ></span>{' '}
            3. {t.stepReview}
          </button>
        </div>
      </section>

      {/* Context Banner: SIH Benchmark Reference */}
      <div
        id="sih-context-banner"
        className="mb-4 bg-[#141414] border-l-4 border-[#C5A059] p-3.5 rounded-lg flex items-start space-x-3 shadow-md border-r border-t border-b border-white/5"
      >
        <GraduationCap className="w-5 h-5 text-[#C5A059] mt-0.5 shrink-0" />
        <div className="text-xs md:text-sm text-white/80 leading-snug">
          <span className="font-bold text-[#C5A059]">{t.sihBannerTitle} </span>
          {t.sihBannerDesc}
        </div>
      </div>

      {/* STEP 1: Main Problem Details & Location Formulation Form */}
      {currentStep === 1 && (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* 1. Problem Category Selector & Tech Solution Pill */}
          <section
            id="section-problem-domain"
            className="bg-[#141414] rounded-xl p-4 border border-white/10 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <label className="text-[17px] font-bold text-white flex items-center gap-1.5">
                {t.domainLabel}
                <span className="text-[#E55353] font-bold">*</span>
              </label>

              {/* SIH Category Pill Toggle (SOFTWARE / HARDWARE / BOTH) */}
              <div className="inline-flex items-center rounded border border-[#C5A059]/30 bg-[#1A1A1A] p-0.5 text-[11px] font-bold tracking-wider">
                <button
                  type="button"
                  onClick={() => setCategory('SOFTWARE')}
                  className={`px-2.5 py-0.5 rounded transition-colors ${
                    category === 'SOFTWARE'
                      ? 'bg-[#C5A059] text-black font-extrabold shadow-xs'
                      : 'text-[#C5A059] hover:bg-white/5'
                  }`}
                >
                  SOFTWARE
                </button>
                <span className="text-white/20 px-0.5">/</span>
                <button
                  type="button"
                  onClick={() => setCategory('HARDWARE')}
                  className={`px-2.5 py-0.5 rounded transition-colors ${
                    category === 'HARDWARE'
                      ? 'bg-[#C5A059] text-black font-extrabold shadow-xs'
                      : 'text-[#C5A059] hover:bg-white/5'
                  }`}
                >
                  HARDWARE
                </button>
              </div>
            </div>
            <p className="text-xs text-white/50 mb-3">{t.domainSub}</p>

            {/* Category Chips Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {/* MedTech & Health */}
              <button
                type="button"
                id="chip-medtech"
                onClick={() => setDomain('MedTech & Health')}
                className={`flex flex-col items-start p-3 rounded-lg text-left transition-all cursor-pointer ${
                  domain === 'MedTech & Health'
                    ? 'border-2 border-[#C5A059] bg-[#C5A059]/10 ring-1 ring-[#C5A059]/40 shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                    : 'border border-white/10 bg-[#0F0F0F] hover:bg-[#1A1A1A] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <BriefcaseMedical
                    className={`w-5 h-5 ${
                      domain === 'MedTech & Health' ? 'text-[#C5A059]' : 'text-white/50'
                    }`}
                  />
                  {domain === 'MedTech & Health' && (
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_6px_#C5A059]"></span>
                  )}
                </div>
                <span className="text-sm font-bold text-white leading-snug">
                  MedTech & Health
                </span>
                <span className="text-[11px] font-bold text-[#C5A059] mt-0.5">
                  BioTech • Sanitation
                </span>
              </button>

              {/* Water Resources */}
              <button
                type="button"
                id="chip-water"
                onClick={() => setDomain('Water Resources')}
                className={`flex flex-col items-start p-3 rounded-lg text-left transition-all cursor-pointer ${
                  domain === 'Water Resources'
                    ? 'border-2 border-[#C5A059] bg-[#C5A059]/10 ring-1 ring-[#C5A059]/40 shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                    : 'border border-white/10 bg-[#0F0F0F] hover:bg-[#1A1A1A] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <Droplets
                    className={`w-5 h-5 ${
                      domain === 'Water Resources' ? 'text-[#C5A059]' : 'text-white/50'
                    }`}
                  />
                  {domain === 'Water Resources' && (
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_6px_#C5A059]"></span>
                  )}
                </div>
                <span className="text-sm font-bold text-white leading-snug">
                  Water Resources
                </span>
                <span className="text-[11px] font-bold text-[#C5A059] mt-0.5">
                  Potable Supply • Flow
                </span>
              </button>

              {/* AgriTech & Soil */}
              <button
                type="button"
                id="chip-agritech"
                onClick={() => setDomain('AgriTech & Soil')}
                className={`flex flex-col items-start p-3 rounded-lg text-left transition-all cursor-pointer ${
                  domain === 'AgriTech & Soil'
                    ? 'border-2 border-[#C5A059] bg-[#C5A059]/10 ring-1 ring-[#C5A059]/40 shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                    : 'border border-white/10 bg-[#0F0F0F] hover:bg-[#1A1A1A] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <Tractor
                    className={`w-5 h-5 ${
                      domain === 'AgriTech & Soil' ? 'text-[#C5A059]' : 'text-white/50'
                    }`}
                  />
                  {domain === 'AgriTech & Soil' && (
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_6px_#C5A059]"></span>
                  )}
                </div>
                <span className="text-sm font-bold text-white leading-snug">
                  AgriTech & Soil
                </span>
                <span className="text-[11px] font-bold text-[#C5A059] mt-0.5">
                  Tribal Farming • Yield
                </span>
              </button>

              {/* Clean Energy */}
              <button
                type="button"
                id="chip-clean-energy"
                onClick={() => setDomain('Clean Energy')}
                className={`flex flex-col items-start p-3 rounded-lg text-left transition-all cursor-pointer ${
                  domain === 'Clean Energy'
                    ? 'border-2 border-[#C5A059] bg-[#C5A059]/10 ring-1 ring-[#C5A059]/40 shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                    : 'border border-white/10 bg-[#0F0F0F] hover:bg-[#1A1A1A] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <Zap
                    className={`w-5 h-5 ${
                      domain === 'Clean Energy' ? 'text-[#C5A059]' : 'text-white/50'
                    }`}
                  />
                  {domain === 'Clean Energy' && (
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_6px_#C5A059]"></span>
                  )}
                </div>
                <span className="text-sm font-bold text-white leading-snug">Clean Energy</span>
                <span className="text-[11px] font-bold text-[#C5A059] mt-0.5">
                  Solar Microgrids • Hydro
                </span>
              </button>

              {/* Education & Skill */}
              <button
                type="button"
                id="chip-education"
                onClick={() => setDomain('Education & Skill')}
                className={`flex flex-col items-start p-3 rounded-lg text-left transition-all cursor-pointer ${
                  domain === 'Education & Skill'
                    ? 'border-2 border-[#C5A059] bg-[#C5A059]/10 ring-1 ring-[#C5A059]/40 shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                    : 'border border-white/10 bg-[#0F0F0F] hover:bg-[#1A1A1A] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <GraduationCap
                    className={`w-5 h-5 ${
                      domain === 'Education & Skill' ? 'text-[#C5A059]' : 'text-white/50'
                    }`}
                  />
                  {domain === 'Education & Skill' && (
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_6px_#C5A059]"></span>
                  )}
                </div>
                <span className="text-sm font-bold text-white leading-snug">
                  Education & Skill
                </span>
                <span className="text-[11px] font-bold text-[#C5A059] mt-0.5">
                  Vocational • Digital Labs
                </span>
              </button>

              {/* Infra & Ecology */}
              <button
                type="button"
                id="chip-infra"
                onClick={() => setDomain('Infra & Ecology')}
                className={`flex flex-col items-start p-3 rounded-lg text-left transition-all cursor-pointer ${
                  domain === 'Infra & Ecology'
                    ? 'border-2 border-[#C5A059] bg-[#C5A059]/10 ring-1 ring-[#C5A059]/40 shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                    : 'border border-white/10 bg-[#0F0F0F] hover:bg-[#1A1A1A] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <HardHat
                    className={`w-5 h-5 ${
                      domain === 'Infra & Ecology' ? 'text-[#C5A059]' : 'text-white/50'
                    }`}
                  />
                  {domain === 'Infra & Ecology' && (
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_6px_#C5A059]"></span>
                  )}
                </div>
                <span className="text-sm font-bold text-white leading-snug">
                  Infra & Ecology
                </span>
                <span className="text-[11px] font-bold text-[#C5A059] mt-0.5">
                  Roads • Mining Runoff
                </span>
              </button>
            </div>
          </section>

          {/* 2. Challenge Title Input */}
          <section
            id="section-challenge-title"
            className="bg-[#141414] rounded-xl p-4 border border-white/10 shadow-lg"
          >
            <label
              htmlFor="challenge-title-input"
              className="block text-[17px] font-bold text-white mb-1"
            >
              {t.titleLabel}
              <span className="text-[#E55353] font-bold">*</span>
            </label>
            <p className="text-xs text-white/50 mb-2">{t.titleSub}</p>
            <div className="relative">
              <input
                id="challenge-title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 120))}
                placeholder={t.titlePlaceholder}
                className="w-full rounded-lg border border-white/15 bg-[#0F0F0F] px-3.5 py-2.5 text-sm text-white focus:border-[#C5A059] focus:bg-[#121212] focus:ring-2 focus:ring-[#C5A059]/20 transition-all placeholder:text-white/30 pr-16"
              />
              <span className="absolute right-3 top-3 font-mono text-xs text-white/40">
                {title.length}/120
              </span>
            </div>
          </section>

          {/* 3. Geo-Location Selector with GPS Quick-Pin */}
          <section
            id="section-admin-location"
            className="bg-[#141414] rounded-xl p-4 border border-white/10 shadow-lg"
          >
            <div className="flex items-center justify-between mb-1">
              <label className="text-[17px] font-bold text-white flex items-center gap-1.5">
                {t.locationLabel}
                <span className="text-[#E55353] font-bold">*</span>
              </label>
              <span className="text-[11px] font-bold uppercase text-[#C5A059] bg-[#C5A059]/15 border border-[#C5A059]/30 px-2 py-0.5 rounded">
                JHARKHAND GIS MAP
              </span>
            </div>
            <p className="text-xs text-white/50 mb-3">{t.locationSub}</p>

            {/* District & Block Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-[11px] font-bold text-white/60 mb-1">
                  {t.districtLabel}
                </label>
                <div className="relative">
                  <select
                    id="select-district"
                    value={districtKey}
                    onChange={(e) => {
                      const newDist = e.target.value;
                      setDistrictKey(newDist);
                      setBlockPanchayat(JHARKHAND_DISTRICTS[newDist].blocks[0]);
                    }}
                    className="w-full rounded-lg border border-white/15 bg-[#0F0F0F] px-3 py-2 text-sm text-white focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20"
                  >
                    {Object.entries(JHARKHAND_DISTRICTS).map(([key, info]) => (
                      <option key={key} value={key} className="bg-[#141414] text-white">
                        {info.name} ({info.nameHi})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-white/60 mb-1">
                  {t.blockLabel}
                </label>
                <div className="relative">
                  <select
                    id="select-block"
                    value={blockPanchayat}
                    onChange={(e) => setBlockPanchayat(e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-[#0F0F0F] px-3 py-2 text-sm text-white focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20"
                  >
                    {JHARKHAND_DISTRICTS[districtKey]?.blocks.map((block) => (
                      <option key={block} value={block} className="bg-[#141414] text-white">
                        {block}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* GPS Quick-Capture Card */}
            <div className="rounded-lg bg-[#1A1A1A] p-3 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-[#C5A059] text-black flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(197,160,89,0.3)]">
                  <MapPin className="w-4 h-4 text-black" />
                </div>
                <div>
                  <div className="text-xs md:text-sm font-bold text-white">
                    {t.capturedCoords}
                  </div>
                  <div className="font-mono text-xs text-[#C5A059]">{coordinates.formatted}</div>
                </div>
              </div>

              <button
                id="btn-gps-location"
                type="button"
                onClick={handleCaptureGPS}
                disabled={gpsLoading}
                className="w-full md:w-auto inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded bg-[#141414] hover:bg-[#C5A059] hover:text-black border border-[#C5A059]/40 text-[#C5A059] font-bold text-[11px] shadow-xs transition-colors cursor-pointer"
              >
                {gpsLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>{t.locatingGPS}</span>
                  </>
                ) : gpsLocked ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.gpsLocked}</span>
                  </>
                ) : (
                  <>
                    <Crosshair className="w-3.5 h-3.5" />
                    <span>{t.useGPS}</span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* 4. Detailed Description & Multilingual Voice Note */}
          <section
            id="section-detailed-statement"
            className="bg-[#141414] rounded-xl p-4 border border-white/10 shadow-lg"
          >
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="detailed-description-area"
                className="text-[17px] font-bold text-white flex items-center gap-1.5"
              >
                {t.statementLabel}
                <span className="text-[#E55353] font-bold">*</span>
              </label>
              <span className="font-mono text-xs text-[#C5A059]">Rich Text / Audio</span>
            </div>
            <p className="text-xs text-white/50 mb-2">{t.statementSub}</p>
            <div className="relative">
              <textarea
                id="detailed-description-area"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.statementPlaceholder}
                className="w-full rounded-lg border border-white/15 bg-[#0F0F0F] px-3 py-2.5 text-sm text-white focus:border-[#C5A059] focus:bg-[#121212] focus:ring-2 focus:ring-[#C5A059]/20 transition-all placeholder:text-white/30 leading-relaxed"
              ></textarea>
            </div>

            {/* Voice-note recording block */}
            <div className="mt-3 p-2.5 rounded-lg bg-[#1A1A1A] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    isRecording
                      ? 'bg-[#E55353]/20 text-[#E55353] animate-pulse border border-[#E55353]'
                      : 'bg-[#141414] text-[#C5A059] border border-[#C5A059]/30'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs md:text-sm font-bold text-white">
                    {t.audioNoteLabel}
                  </div>
                  <div className="text-[11px] text-white/50">
                    {isRecording ? (
                      <span className="text-[#E55353] font-bold font-mono">
                        Recording in progress: {recordingSeconds}s / 120s
                      </span>
                    ) : hasRecordedAudio ? (
                      <span className="text-emerald-400 font-bold">
                        Audio Note Attached (1m 24s) • Verified Citizen Voice
                      </span>
                    ) : (
                      t.audioNoteSub
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                {hasRecordedAudio && !isRecording && (
                  <button
                    type="button"
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="px-2.5 py-1 rounded-lg bg-[#141414] border border-[#C5A059]/40 text-[#C5A059] hover:bg-[#C5A059] hover:text-black text-[11px] font-bold flex items-center gap-1 transition-colors"
                  >
                    {isPlayingAudio ? (
                      <>
                        <Square className="w-3 h-3 text-[#E55353] fill-current" />
                        <span>Stop Test</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 text-[#C5A059] fill-current" />
                        <span>Play (1:24)</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  id="btn-record-voice"
                  onClick={toggleRecording}
                  className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isRecording
                      ? 'bg-[#E55353]/20 border-[#E55353] text-[#E55353]'
                      : 'bg-[#141414] border-white/15 text-white/90 hover:border-[#C5A059]/50 hover:text-[#C5A059]'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <Square className="w-3 h-3 text-[#E55353] fill-current" />
                      <span>{t.stopRecording}</span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-[#E55353] animate-pulse"></span>
                      <span>{hasRecordedAudio ? 'Re-record Voice' : t.recordVoice}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* 5. Evidence / Media Upload Zone */}
          <section
            id="section-field-evidence"
            className="bg-[#141414] rounded-xl p-4 border border-white/10 shadow-lg"
          >
            <div className="flex items-center justify-between mb-1">
              <label className="text-[17px] font-bold text-white flex items-center gap-1.5">
                {t.mediaLabel}
              </label>
              <span className="text-[11px] font-bold text-[#C5A059] bg-[#C5A059]/15 border border-[#C5A059]/30 px-2 py-0.5 rounded">
                {t.maxFiles}
              </span>
            </div>
            <p className="text-xs text-white/50 mb-3">{t.mediaSub}</p>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileUpload}
            />

            {/* Bento Media Zone: Capture Card & Uploaded Preview Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Camera Capture Action Box */}
              <div
                id="box-upload-dropzone"
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 hover:border-[#C5A059] rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-[#0F0F0F] hover:bg-[#181818] transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A] group-hover:bg-[#C5A059] text-[#C5A059] group-hover:text-black flex items-center justify-center mb-2 transition-all border border-white/10">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-white/90 group-hover:text-[#C5A059]">
                  {t.uploadTitle}
                </span>
                <span className="text-[11px] text-white/50 mt-0.5">{t.uploadSub}</span>
              </div>

              {/* Uploaded Thumbnail Preview Cards */}
              {evidenceFiles.map((file) => (
                <div
                  key={file.id}
                  className="relative border border-white/10 rounded-lg p-2.5 bg-[#1A1A1A] flex items-center space-x-3 shadow-sm"
                >
                  <div className="relative w-20 h-20 rounded-md overflow-hidden bg-black shrink-0 border border-white/15">
                    <img
                      src={file.url}
                      alt={file.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/90 text-[#C5A059] text-[9px] font-mono px-1 rounded border border-white/10">
                      {file.type}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-bold text-white truncate">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        aria-label="Remove image"
                        onClick={() => removeEvidence(file.id)}
                        className="text-white/40 hover:text-[#E55353] transition-colors p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="font-mono text-xs text-white/50">
                      {file.size} • Geo-tagged
                    </div>
                    {/* Evidence Status Chip */}
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#C5A059] text-black text-[10px] font-extrabold shadow-xs">
                      <CheckCircle2 className="w-3 h-3 text-black" />
                      <span>{t.verifiedChip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Severity Classification & Anonymous Toggle */}
          <section
            id="section-severity"
            className="bg-[#141414] rounded-xl p-4 border border-white/10 shadow-lg space-y-4"
          >
            <div>
              <label className="block text-[17px] font-bold text-white mb-1">
                {t.severityLabel}
                <span className="text-[#E55353] font-bold">*</span>
              </label>
              <p className="text-xs text-white/50 mb-2.5">{t.severitySub}</p>

              {/* Severity Options */}
              <div className="grid grid-cols-3 gap-2">
                {/* Critical */}
                <label
                  id="severity-critical"
                  onClick={() => setSeverity('critical')}
                  className={`relative flex flex-col items-center justify-center p-2.5 rounded-lg cursor-pointer text-center transition-all ${
                    severity === 'critical'
                      ? 'border-2 border-[#E55353] bg-[#E55353]/15 shadow-[0_0_12px_rgba(229,83,83,0.2)]'
                      : 'border border-white/10 bg-[#0F0F0F] hover:bg-[#1A1A1A]'
                  }`}
                >
                  <AlertTriangle
                    className={`w-5 h-5 mb-1 ${
                      severity === 'critical' ? 'text-[#E55353]' : 'text-white/40'
                    }`}
                  />
                  <span
                    className={`text-sm font-bold ${
                      severity === 'critical' ? 'text-[#E55353]' : 'text-white'
                    }`}
                  >
                    {t.criticalTitle}
                  </span>
                  <span className="text-[11px] text-white/50 mt-0.5">{t.criticalSub}</span>
                </label>

                {/* Moderate */}
                <label
                  id="severity-moderate"
                  onClick={() => setSeverity('moderate')}
                  className={`relative flex flex-col items-center justify-center p-2.5 rounded-lg cursor-pointer text-center transition-all ${
                    severity === 'moderate'
                      ? 'border-2 border-[#C5A059] bg-[#C5A059]/15 shadow-[0_0_12px_rgba(197,160,89,0.2)]'
                      : 'border border-white/10 bg-[#0F0F0F] hover:bg-[#1A1A1A]'
                  }`}
                >
                  <AlertCircle
                    className={`w-5 h-5 mb-1 ${
                      severity === 'moderate' ? 'text-[#C5A059]' : 'text-white/40'
                    }`}
                  />
                  <span
                    className={`text-sm font-bold ${
                      severity === 'moderate' ? 'text-[#C5A059]' : 'text-white'
                    }`}
                  >
                    {t.moderateTitle}
                  </span>
                  <span className="text-[11px] text-white/50 mt-0.5">{t.moderateSub}</span>
                </label>

                {/* Concern */}
                <label
                  id="severity-concern"
                  onClick={() => setSeverity('community')}
                  className={`relative flex flex-col items-center justify-center p-2.5 rounded-lg cursor-pointer text-center transition-all ${
                    severity === 'community'
                      ? 'border-2 border-white/40 bg-white/10'
                      : 'border border-white/10 bg-[#0F0F0F] hover:bg-[#1A1A1A]'
                  }`}
                >
                  <Users
                    className={`w-5 h-5 mb-1 ${
                      severity === 'community' ? 'text-[#C5A059]' : 'text-white/40'
                    }`}
                  />
                  <span
                    className={`text-sm font-bold ${
                      severity === 'community' ? 'text-white' : 'text-white/70'
                    }`}
                  >
                    {t.concernTitle}
                  </span>
                  <span className="text-[11px] text-white/50 mt-0.5">{t.concernSub}</span>
                </label>
              </div>
            </div>

            <hr className="border-white/10" />

            {/* Anonymous Submission Toggle Switch */}
            <div className="flex items-center justify-between pt-1">
              <div className="pr-3">
                <span className="text-sm font-bold text-white block">
                  {t.anonymousTitle}
                </span>
                <span className="text-xs text-white/50">{t.anonymousSub}</span>
              </div>

              <button
                type="button"
                id="toggle-anonymous"
                aria-label="Toggle anonymous submission"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  isAnonymous ? 'bg-[#C5A059]' : 'bg-white/20'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow-lg ring-0 transition duration-200 ease-in-out ${
                    isAnonymous ? 'translate-x-6 bg-black' : 'translate-x-0 bg-white'
                  }`}
                />
              </button>
            </div>
          </section>

          {/* 7. Action CTA Button Group */}
          <div className="pt-2 pb-6 space-y-2.5">
            {/* Big Primary CTA */}
            <button
              id="btn-submit-challenge"
              type="button"
              onClick={() => setCurrentStep(2)}
              className="w-full h-12 bg-[#C5A059] hover:bg-[#DFC387] active:scale-[0.99] text-black rounded-lg font-extrabold text-base flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(197,160,89,0.3)] transition-all cursor-pointer"
            >
              <Send className="w-5 h-5 text-black" />
              <span>Continue to Stakeholder Evidence (Step 2)</span>
            </button>

            {/* Secondary Actions: Save Draft & Preview */}
            <div className="grid grid-cols-2 gap-2">
              <button
                id="btn-save-draft"
                type="button"
                onClick={() => onSaveDraft(getCurrentChallengePayload())}
                className="h-10 bg-[#141414] hover:bg-[#1C1C1C] active:scale-[0.99] text-[#C5A059] border border-[#C5A059]/40 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{t.saveDraftBtn}</span>
              </button>

              <button
                id="btn-preview-entry"
                type="button"
                onClick={() => onPreview(getCurrentChallengePayload())}
                className="h-10 bg-[#141414] hover:bg-[#1C1C1C] active:scale-[0.99] text-white/80 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 border border-white/15 transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>{t.previewBtn}</span>
              </button>
            </div>

            <p className="text-center text-[11px] text-white/40 pt-1">{t.legalFooter}</p>
          </div>
        </form>
      )}

      {/* STEP 2: Stakeholder Evidence & Demographic Impact */}
      {currentStep === 2 && (
        <section
          id="step-2-container"
          className="space-y-4 bg-[#141414] rounded-xl p-5 border border-white/10 shadow-lg text-white"
        >
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-lg font-bold text-[#C5A059]">
              Step 2: Affected Demographics & Community Workarounds
            </h2>
            <p className="text-xs text-white/50">
              Helps University Incubation Labs and SIH Hackathon panels understand scale and
              urgency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white mb-1">
                Estimated Affected Population / Households
              </label>
              <input
                type="number"
                value={affectedCount}
                onChange={(e) => setAffectedCount(parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-white/15 bg-[#0F0F0F] px-3 py-2 text-sm text-white focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1">
                Primary Impacted Groups
              </label>
              <input
                type="text"
                value={beneficiaries}
                onChange={(e) => setBeneficiaries(e.target.value)}
                placeholder="e.g. Children, Pregnant Mothers, Tribal Farmers"
                className="w-full rounded-lg border border-white/15 bg-[#0F0F0F] px-3 py-2 text-sm text-white focus:border-[#C5A059]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white mb-1">
              Existing Makeshift Solutions or Workarounds
            </label>
            <textarea
              rows={3}
              value={workarounds}
              onChange={(e) => setWorkarounds(e.target.value)}
              placeholder="What has the community tried? Why did it fail?"
              className="w-full rounded-lg border border-white/15 bg-[#0F0F0F] px-3 py-2 text-sm text-white focus:border-[#C5A059]"
            />
          </div>

          {!isAnonymous && (
            <div className="p-3 bg-[#1A1A1A] rounded-lg border border-white/10 space-y-3">
              <span className="text-xs font-bold text-[#C5A059] block">
                Public Submitter Details (You chose non-anonymous)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-white/70 mb-1">
                    Contact Name / Community Group
                  </label>
                  <input
                    type="text"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    className="w-full rounded border border-white/15 bg-[#0F0F0F] px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-white/70 mb-1">
                    Mobile Number (UIDAI / SMS Updates)
                  </label>
                  <input
                    type="text"
                    value={citizenPhone}
                    onChange={(e) => setCitizenPhone(e.target.value)}
                    className="w-full rounded border border-white/15 bg-[#0F0F0F] px-3 py-1.5 text-xs font-mono text-white"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-lg border border-white/20 text-xs font-bold text-white/70 hover:bg-white/10"
            >
              Back to Step 1
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 rounded-lg bg-[#C5A059] text-black text-xs font-bold hover:bg-[#DFC387] transition-all cursor-pointer"
            >
              Proceed to Verification & Submit (Step 3)
            </button>
          </div>
        </section>
      )}

      {/* STEP 3: Final Verification & Declaration */}
      {currentStep === 3 && (
        <section
          id="step-3-container"
          className="space-y-4 bg-[#141414] rounded-xl p-5 border border-white/10 shadow-lg text-white"
        >
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-lg font-bold text-[#C5A059]">
              Step 3: Verification & Official Submission
            </h2>
            <p className="text-xs text-white/50">
              Final review before routing to State University Incubation Labs and SIH Hackathon
              Chambers.
            </p>
          </div>

          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                Summary of Submission
              </span>
              <span className="px-2 py-0.5 rounded bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30 text-[10px] font-bold">
                {severity.toUpperCase()} PRIORITY
              </span>
            </div>
            <div className="text-sm font-bold text-white">{title}</div>
            <div className="text-xs text-white/60">
              <span className="font-semibold text-white">{JHARKHAND_DISTRICTS[districtKey].name}</span> •{' '}
              {blockPanchayat}
            </div>
            <div className="text-xs text-white/70 line-clamp-2">{description}</div>
            <div className="flex gap-4 pt-2 text-[11px] text-[#C5A059] font-mono">
              <span>Domain: {domain}</span>
              <span>Category: {category}</span>
              <span>Evidence: {evidenceFiles.length} File(s)</span>
            </div>
          </div>

          {/* Statutory Declaration */}
          <div className="flex items-start space-x-2.5 p-3 rounded-lg border border-[#C5A059]/30 bg-[#1A1A1A]">
            <input
              type="checkbox"
              id="statutory-declaration"
              checked={declarationAgreed}
              onChange={(e) => setDeclarationAgreed(e.target.checked)}
              className="mt-0.5 rounded text-[#C5A059] focus:ring-[#C5A059]"
            />
            <label htmlFor="statutory-declaration" className="text-xs text-white/80 leading-snug">
              I certify under the Jharkhand Right to Public Services Act that this civic challenge
              represents a genuine societal difficulty requiring technical innovation, and the
              attached media evidence is truthful and unmanipulated.
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 rounded-lg border border-white/20 text-xs font-bold text-white/70 hover:bg-white/10"
            >
              Back to Step 2
            </button>
            <button
              type="button"
              disabled={!declarationAgreed}
              onClick={handleFinalSubmit}
              className="px-6 py-2.5 rounded-lg bg-[#C5A059] disabled:bg-white/20 disabled:text-white/40 text-black text-xs font-extrabold hover:bg-[#DFC387] flex items-center space-x-1.5 shadow-[0_0_15px_rgba(197,160,89,0.3)] cursor-pointer"
            >
              <Send className="w-4 h-4 text-black" />
              <span>Submit Civic Challenge for SIH Hackathon</span>
            </button>
          </div>
        </section>
      )}
    </main>
  );
};
