export type CategoryType = 'SOFTWARE' | 'HARDWARE' | 'BOTH';

export type DomainType =
  | 'MedTech & Health'
  | 'Water Resources'
  | 'AgriTech & Soil'
  | 'Clean Energy'
  | 'Education & Skill'
  | 'Infra & Ecology';

export type SeverityType = 'critical' | 'moderate' | 'community';

export type ProblemStatus =
  | 'Submitted'
  | 'Field Triage'
  | 'SIH Shortlist'
  | 'Incubating'
  | 'Deployed';

export interface EvidenceFile {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
  verified: boolean;
  dateAdded: string;
}

export interface GeoLocationData {
  lat: number;
  lng: number;
  accuracy: number;
  formatted: string;
}

export interface CivicChallenge {
  id: string;
  sihCode: string;
  title: string;
  category: CategoryType;
  domain: DomainType;
  domainSub: string;
  district: string;
  districtHi: string;
  blockPanchayat: string;
  geoCoordinates: GeoLocationData;
  description: string;
  hasAudioNote: boolean;
  audioDurationSeconds?: number;
  audioNoteLabel?: string;
  evidenceFiles: EvidenceFile[];
  severity: SeverityType;
  isAnonymous: boolean;
  status: ProblemStatus;
  submittedAt: string;
  affectedPopulation: number;
  primaryBeneficiaries: string;
  workaroundUsed: string;
  assignedLab?: string;
  csrPartner?: string;
  grantCommitted?: string;
  teamsWorking?: number;
  triageScore: number;
  citizenName?: string;
  citizenPhone?: string;
}

export type TabType = 'report' | 'triage' | 'rd-hub' | 'csr' | 'analytics';

export type LanguageType = 'en' | 'hi';
