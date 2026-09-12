import { useState, useEffect, useCallback } from 'react';
import DecodeView from './components/DecodeView';
import EncodeView from './components/EncodeView';
import { decodeJWT } from './lib/jwt';
import { copyToClipboard } from './lib/clipboard';
import type { JWTDecodeResult, ViewMode } from './types/jwt.types';
import { DEFAULT_JWT } from './constants/defautls';
import { styles, theme } from './styles/theme';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('decode');
  const [jwt, setJwt] = useState('');
  const [decoded, setDecoded] = useState<JWTDecodeResult>({
    headerStr: '',
    payloadStr: '',
    headerObj: null,
    payloadObj: null,
    isValid: false,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    const initialToken = tokenFromUrl || DEFAULT_JWT;

    setJwt(initialToken);
    setDecoded(decodeJWT(initialToken));
  }, []);

  const handleJwtChange = useCallback((value: string) => {
    setJwt(value);
    setDecoded(decodeJWT(value));
  }, []);

  const handleCopy = useCallback((type: 'jwt' | 'header' | 'payload') => {
    const textMap = {
      jwt,
      header: decoded.headerStr,
      payload: decoded.payloadStr,
    };
    copyToClipboard(textMap[type]);
  }, [jwt, decoded]);

  const handleClear = useCallback(() => {
    setJwt('');
    setDecoded({
      headerStr: '',
      payloadStr: '',
      headerObj: null,
      payloadObj: null,
      isValid: false,
    });
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(48px, 8vw, 80px)',
          paddingTop: 'clamp(20px, 3vw, 40px)',
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: '200',
            margin: '0 0 8px 0',
            color: theme.colors.textPrimary,
            letterSpacing: '-0.03em',
          }}>
            JWT Toolkit
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: theme.colors.secondary,
            margin: 0,
            fontWeight: '400',
            letterSpacing: '-0.01em',
          }}>
            Decode, encode, and inspect JSON Web Tokens
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 'clamp(32px, 5vw, 48px)',
        }}>
          <div className="toggle-pill">
            <button
              className={`toggle-btn ${viewMode === 'decode' ? 'active' : ''}`}
              onClick={() => setViewMode('decode')}
            >
              Decode
            </button>
            <button
              className={`toggle-btn ${viewMode === 'encode' ? 'active' : ''}`}
              onClick={() => setViewMode('encode')}
            >
              Encode
            </button>
          </div>
        </div>

        <div className="fade-in">
          {viewMode === 'decode' ? (
            <DecodeView
              jwt={jwt}
              onJwtChange={handleJwtChange}
              decoded={decoded}
              onCopy={handleCopy}
              onClear={handleClear}
            />
          ) : (
            <EncodeView />
          )}
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: 'clamp(48px, 6vw, 64px)',
          paddingTop: '24px',
          color: theme.colors.tertiary,
          fontSize: '13px',
        }}>
          <p>© {new Date().getFullYear()} JWT Toolkit by Lazxdev</p>
        </div>
      </div>
    </div>
  );
}

export default App;
