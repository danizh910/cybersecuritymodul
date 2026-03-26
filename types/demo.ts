export type SensitivityLevel = 'niedrig' | 'mittel' | 'hoch';
export type CollectionMode = 'passiv' | 'aktiv';

export interface ServerRequestInfo {
  requestTime: string;
  requestedUrl: string;
  method: string;
  hostname: string;
  userAgent?: string;
  accept?: string;
  acceptLanguage?: string;
  acceptEncoding?: string;
  secChUa?: string;
  secChUaPlatform?: string;
  secChUaMobile?: string;
  referer?: string;
  origin?: string;
  xForwardedForAnonymized?: string;
  ipAnonymized?: string;
}

export interface BrowserField {
  key: string;
  label: string;
  value: string;
  sourceApi: string;
  mode: CollectionMode;
  permissionRequired: boolean;
  sensitivity: SensitivityLevel;
  explanation: string;
}

export interface BrowserVisibleInfo {
  collectedAt: string;
  fields: BrowserField[];
}

export interface PermissionModuleResult {
  moduleId: 'geolocation' | 'camera-microphone' | 'media-devices' | 'local-fonts' | 'webrtc';
  status: 'nicht gestartet' | 'nicht erlaubt' | 'erlaubt' | 'browser unterstuetzt nicht' | 'erfolgreich gelesen';
  details: Record<string, string | number | boolean | null>;
  collectedAt?: string;
}

export interface ExplanationMetadata {
  name: string;
  source: string;
  example: string;
  defaultVisible: boolean;
  permissionRequired: boolean;
  useCases: string[];
  privacyRisks: string[];
  transparencyReason: string;
}

export interface ExportReportSchema {
  exportedAt: string;
  consentMode: 'info-only' | 'passive' | 'extended';
  serverInfo?: ServerRequestInfo;
  browserInfo?: BrowserVisibleInfo;
  urlParams: Record<string, string>;
  referrerPresent: boolean;
  features: Record<string, boolean>;
  permissionModules: PermissionModuleResult[];
}
