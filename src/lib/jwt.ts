import type { JWTDecodeResult } from '../types/jwt.types';


const decodeBase64 = (str: string): string => {
  try {
    const normalized = str.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      '='
    );

    const decoded = atob(padded);
    const bytes = new Uint8Array(decoded.length);
    for (let i = 0; i < decoded.length; i++) {
      bytes[i] = decoded.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch {
    throw new Error('Failed to decode base64 string');
  }
};


const encodeBase64Url = (str: string): string => {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};


const arrayBufferToBase64Url = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};


const signHS256 = async (secret: string, data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return arrayBufferToBase64Url(signature);
};

export const decodeJWT = (token: string): JWTDecodeResult => {
  const emptyResult: JWTDecodeResult = {
    headerStr: '',
    payloadStr: '',
    headerObj: null,
    payloadObj: null,
    isValid: false,
  };

  if (!token?.trim()) return emptyResult;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format: Expected 3 parts');
    }

    const [headerB64, payloadB64] = parts;
    const headerDecoded = decodeBase64(headerB64);
    const payloadDecoded = decodeBase64(payloadB64);

    const headerObj = JSON.parse(headerDecoded);
    const payloadObj = JSON.parse(payloadDecoded);

    return {
      headerStr: JSON.stringify(headerObj, null, 2),
      payloadStr: JSON.stringify(payloadObj, null, 2),
      headerObj,
      payloadObj,
      isValid: true,
    };
  } catch (error) {
    console.error('JWT decoding error:', error);
    return {
      ...emptyResult,
      headerStr: 'Invalid JWT',
      payloadStr: 'Invalid JWT',
    };
  }
};


export const encodeJWT = async (
  header: Record<string, unknown>,
  payload: Record<string, unknown>,
  secret = '',
  alg = 'HS256'
): Promise<string> => {
  const headerWithDefaults = { alg, typ: 'JWT', ...header };
  const headerB64 = encodeBase64Url(JSON.stringify(headerWithDefaults));
  const payloadB64 = encodeBase64Url(JSON.stringify(payload));
  const signingInput = `${headerB64}.${payloadB64}`;

  if (!secret) return `${signingInput}.`;

  if (alg === 'HS256') {
    const signature = await signHS256(secret, signingInput);
    return `${signingInput}.${signature}`;
  }

  return `${signingInput}.`;
};