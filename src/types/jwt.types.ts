export interface JWTDecodeResult {
  headerStr: string;
  payloadStr: string;
  headerObj: Record<string, unknown> | null;
  payloadObj: Record<string, unknown> | null;
  isValid: boolean;
}

export interface JWTHeader {
  alg: string;
  typ: string;
  [key: string]: unknown;
}

export interface JWTPayload {
  sub?: string;
  name?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

export type TabType = 'json' | 'table';
export type ViewMode = 'decode' | 'encode';