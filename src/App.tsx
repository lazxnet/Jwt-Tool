import React, { useState, useEffect } from 'react';
import { decodeJWT } from './lib/jwt';
import DecodeView from './components/DecodeView';
import EncodeView from './components/EncodeView';

interface JWTData {
  header: string;
  payload: string;
}

function App() {
  const [jwt, setJwt] = useState<string>('');
  const [decoded, setDecoded] = useState<JWTData>({ header: '', payload: '' });
  const [headerTable, setHeaderTable] = useState<Record<string, any> | null>(null);
  const [payloadTable, setPayloadTable] = useState<Record<string, any> | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [activeHeaderTab, setActiveHeaderTab] = useState<'json' | 'table'>('json');
  const [activePayloadTab, setActivePayloadTab] = useState<'json' | 'table'>('json');
  const [viewMode, setViewMode] = useState<'decode' | 'encode'>('decode');

  useEffect(() => {
    const initializeToken = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get('token');

      const defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

      const initial = tokenFromUrl || defaultToken;
      setJwt(initial);
      handleDecode(initial);
    };

    initializeToken();
  }, []);

  const handleDecode = (token: string) => {
    const result = decodeJWT(token);
    setDecoded({ 
      header: result.headerStr, 
      payload: result.payloadStr 
    });
    setHeaderTable(result.headerObj);
    setPayloadTable(result.payloadObj);
    setIsValid(result.isValid);
  };

  const handleJWTChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJwt(value);
    handleDecode(value);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const copyJWT = () => copyToClipboard(jwt);
  const copyHeader = () => copyToClipboard(decoded.header);
  const copyPayload = () => copyToClipboard(decoded.payload);

  const clearJWT = () => {
    setJwt('');
    setDecoded({ header: '', payload: '' });
    setHeaderTable(null);
    setPayloadTable(null);
    setIsValid(false);
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      lineHeight: 1.5
    }}>
      {/* Contenedor principal con padding responsive */}
      <div style={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(20px, 4vw, 40px) clamp(16px, 3vw, 24px)',
        boxSizing: 'border-box'
      }}>
        {/* Header minimalista */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(32px, 5vw, 48px)'
        }}>
          <h1 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            fontWeight: '300',
            margin: '0 0 12px 0',
            color: '#1a1a1a',
            letterSpacing: '-0.025em'
          }}>
            JWT Toolkit
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: '#666',
            margin: 0,
            fontWeight: '400'
          }}>
            Decode and encode JWT tokens
          </p>
        </div>

        {/* Botones de modo minimalistas */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 'clamp(24px, 4vw, 32px)'
        }}>
          <div style={{
            display: 'flex',
            background: '#f8f9fa',
            borderRadius: '8px',
            padding: '4px',
            width: 'fit-content'
          }}>
            <button
              style={{
                padding: 'clamp(10px, 2vw, 12px) clamp(24px, 3vw, 32px)',
                border: 'none',
                background: viewMode === 'decode' ? '#ffffff' : 'transparent',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                color: viewMode === 'decode' ? '#1a1a1a' : '#666',
                transition: 'all 0.2s ease',
                boxShadow: viewMode === 'decode' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
                whiteSpace: 'nowrap'
              }}
              onClick={() => setViewMode('decode')}
            >
              DECODE
            </button>
            <button
              style={{
                padding: 'clamp(10px, 2vw, 12px) clamp(24px, 3vw, 32px)',
                border: 'none',
                background: viewMode === 'encode' ? '#ffffff' : 'transparent',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                color: viewMode === 'encode' ? '#1a1a1a' : '#666',
                transition: 'all 0.2s ease',
                boxShadow: viewMode === 'encode' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
                whiteSpace: 'nowrap'
              }}
              onClick={() => setViewMode('encode')}
            >
              ENCODE
            </button>
          </div>
        </div>

        {viewMode === 'decode' ? (
          <DecodeView
            jwt={jwt}
            onJwtChange={handleJWTChange}
            decoded={decoded}
            headerTable={headerTable}
            payloadTable={payloadTable}
            activeHeaderTab={activeHeaderTab}
            activePayloadTab={activePayloadTab}
            setActiveHeaderTab={setActiveHeaderTab}
            setActivePayloadTab={setActivePayloadTab}
            copyHeader={copyHeader}
            copyPayload={copyPayload}
            isValid={isValid}
            copyJWT={copyJWT}
            clearJWT={clearJWT}
          />
        ) : (
          <EncodeView />
        )}

        {/* Footer minimalista */}
        <div style={{
          textAlign: 'center',
          marginTop: 'clamp(40px, 6vw, 60px)',
          padding: '24px 0',
          color: '#888',
          fontSize: '14px',
          borderTop: '1px solid #eaeaea'
        }}>
          <p>JWT Toolkit</p>
        </div>
      </div>
    </div>
  );
}

export default App;