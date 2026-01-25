export interface JWTDecodeResult {
  headerStr: string;
  payloadStr: string;
  headerObj: Record<string, any> | null;
  payloadObj: Record<string, any> | null;
  isValid: boolean;
}

export interface JWTHeader {
  alg: string;
  typ: string;
  [key: string]: any;
}

export interface JWTPayload {
  sub?: string;
  name?: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export type TabType = 'json' | 'table';
export type ViewMode = 'decode' | 'encode';