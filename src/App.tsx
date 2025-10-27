import React, { useState, useEffect } from 'react';
import { decodeJWT } from './lib/jwt';
import type { JWTHeader, JWTPayload } from './lib/jwt';
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
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      backgroundColor: '#f5f5f5',
      color: '#262626',
      lineHeight: 1.5
    }}>
      <header style={{
        background: '#ffffff',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #d9d9d9'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: '600', 
            color: '#262626', 
            margin: 0 
          }}>
            JSON WEB TOKEN (JWT)
          </h1>
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <div style={{ 
              display: 'flex', 
              gap: '4px', 
              background: '#f0f0f0', 
              padding: '4px', 
              borderRadius: '6px',
              marginRight: '12px'
            }}>
              <button
                style={{
                  padding: '6px 16px',
                  border: 'none',
                  background: viewMode === 'decode' ? 'white' : 'transparent',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  color: viewMode === 'decode' ? '#1890ff' : '#595959',
                  boxShadow: viewMode === 'decode' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
                }}
                onClick={() => setViewMode('decode')}
              >
                DECODE
              </button>
              <button
                style={{
                  padding: '6px 16px',
                  border: 'none',
                  background: viewMode === 'encode' ? 'white' : 'transparent',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  color: viewMode === 'encode' ? '#1890ff' : '#595959',
                  boxShadow: viewMode === 'encode' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
                }}
                onClick={() => setViewMode('encode')}
              >
                ENCODE
              </button>
            </div>
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              <button 
                style={{
                  background: '#1890ff',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onClick={copyJWT}
              >
                COPY
              </button>
              <button 
                style={{
                  background: '#1890ff',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onClick={clearJWT}
              >
                CLEAR
              </button>
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          {isValid && (
            <>
              <span style={{
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                background: '#52c41a',
                color: 'white'
              }}>Valid JWT</span>
              <span style={{
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                background: '#13c2c2',
                color: 'white'
              }}>Signature Verified</span>
            </>
          )}
        </div>
      </header>

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
        />
      ) : (
        <EncodeView />
      )}
    </div>
  );
}

export default App;