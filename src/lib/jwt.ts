export interface DecodeResult {
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

const decodeBase64 = (str: string): string => {
  try {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    
    // Añadir padding si es necesario
    switch (str.length % 4) {
      case 0: break;
      case 2: str += '=='; break;
      case 3: str += '='; break;
      default: throw new Error('Invalid base64 string');
    }

    const decoded = atob(str);
    const bytes = new Uint8Array(decoded.length);
    for (let i = 0; i < decoded.length; i++) {
      bytes[i] = decoded.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch (error) {
    throw new Error('Failed to decode base64 string');
  }
};

export function decodeJWT(token: string): DecodeResult {
  if (!token || typeof token !== 'string') {
    return {
      headerStr: '',
      payloadStr: '',
      headerObj: null,
      payloadObj: null,
      isValid: false,
    };
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format: Expected 3 parts');
    }

    const [header, payload] = parts;
    const headerDecoded = decodeBase64(header);
    const payloadDecoded = decodeBase64(payload);

    const headerObj = JSON.parse(headerDecoded) as JWTHeader;
    const payloadObj = JSON.parse(payloadDecoded) as JWTPayload;

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
      headerStr: 'Invalid JWT',
      payloadStr: 'Invalid JWT',
      headerObj: null,
      payloadObj: null,
      isValid: false,
    };
  }
}

// Agregar las funciones de encoding que faltan
const base64UrlEncode = (str: string): string => {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const arrayBufferToBase64Url = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

async function signHS256(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return arrayBufferToBase64Url(sig);
}

/**
 * Encode a JWT with optional HS256 signing. If secret is empty, returns an unsigned token
 * (signature omitted).
 */
export async function encodeJWT(
  header: Record<string, any>,
  payload: Record<string, any>,
  secret = '',
  alg: 'HS256' | string = 'HS256'
): Promise<string> {
  const headerCopy = { alg: alg === 'HS256' ? 'HS256' : alg, typ: 'JWT', ...header };
  const headerStr = JSON.stringify(headerCopy);
  const payloadStr = JSON.stringify(payload);

  const headerB64 = base64UrlEncode(headerStr);
  const payloadB64 = base64UrlEncode(payloadStr);

  const signingInput = `${headerB64}.${payloadB64}`;

  if (!secret) {
    // Return token without signature
    return `${signingInput}.`;
  }

  if (alg === 'HS256') {
    const sig = await signHS256(secret, signingInput);
    return `${signingInput}.${sig}`;
  }

  // Fallback: no signature
  return `${signingInput}.`;
}