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

  const renderModeButton = (mode: ViewMode, label: string) => (
    <button
      style={{
        padding: 'clamp(10px, 2vw, 12px) clamp(24px, 3vw, 32px)',
        border: 'none',
        background: viewMode === mode ? theme.colors.background : 'transparent',
        borderRadius: theme.borderRadius.md,
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        color: viewMode === mode ? theme.colors.textPrimary : theme.colors.secondary,
        transition: 'all 0.2s ease',
        boxShadow: viewMode === mode ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
        whiteSpace: 'nowrap',
      }}
      onClick={() => setViewMode(mode)}
    >
      {label}
    </button>
  );

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(32px, 5vw, 48px)',
        }}>
          <h1 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            fontWeight: '300',
            margin: '0 0 12px 0',
            color: theme.colors.textPrimary,
            letterSpacing: '-0.025em',
          }}>
            JWT Toolkit
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: theme.colors.secondary,
            margin: 0,
            fontWeight: '400',
          }}>
            Decode and encode JWT tokens
          </p>
        </div>

        {/* Mode Toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 'clamp(24px, 4vw, 32px)',
        }}>
          <div style={{
            display: 'flex',
            background: '#f8f9fa',
            borderRadius: theme.borderRadius.lg,
            padding: '4px',
            width: 'fit-content',
          }}>
            {renderModeButton('decode', 'DECODE')}
            {renderModeButton('encode', 'ENCODE')}
          </div>
        </div>

        {/* Main Content */}
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

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: 'clamp(40px, 6vw, 60px)',
          padding: '24px 0',
          color: theme.colors.textTertiary,
          fontSize: '14px',
          borderTop: `1px solid ${theme.colors.borderLight}`,
        }}>
          <p>© {new Date().getFullYear()} JWT Toolkit by Lazxdev</p>
        </div>
      </div>
    </div>
  );
}

export default App;