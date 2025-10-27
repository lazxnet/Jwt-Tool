import React, { useState } from 'react';
import { encodeJWT } from '../lib/jwt';

const defaultHeader = JSON.stringify({ alg: 'HS256', typ: 'JWT' }, null, 2);
const defaultPayload = JSON.stringify({ sub: '1234567890', name: 'John Doe', admin: true }, null, 2);

const EncodeView: React.FC = () => {
  const [headerText, setHeaderText] = useState<string>(defaultHeader);
  const [payloadText, setPayloadText] = useState<string>(defaultPayload);
  const [secret, setSecret] = useState<string>('secret');
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEncode = async () => {
    setError('');
    try {
      const headerObj = headerText ? JSON.parse(headerText) : {};
      const payloadObj = payloadText ? JSON.parse(payloadText) : {};
      setIsLoading(true);
      const t = await encodeJWT(headerObj, payloadObj, secret || '', headerObj.alg || 'HS256');
      setToken(t);
    } catch (err: any) {
      setError(err?.message || 'Invalid JSON');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToken = () => {
    if (!token) return;
    navigator.clipboard.writeText(token);
  };

  const clearAll = () => {
    setHeaderText(defaultHeader);
    setPayloadText(defaultPayload);
    setSecret('secret');
    setToken('');
    setError('');
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
        <button 
          style={{
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            opacity: isLoading ? '0.7' : '1'
          }}
          onClick={handleEncode}
          disabled={isLoading}
        >
          {isLoading ? 'Encoding...' : 'Encode'}
        </button>
        <button 
          style={{
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: token ? 'pointer' : 'not-allowed',
            opacity: token ? '1' : '0.7'
          }}
          onClick={copyToken}
          disabled={!token}
        >
          COPY TOKEN
        </button>
        <button 
          style={{
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
          onClick={clearAll}
        >
          CLEAR
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #d9d9d9'
        }}>
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid #d9d9d9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              <div style={{
                padding: '6px 12px',
                borderRadius: '4px',
                backgroundColor: '#1890ff',
                color: 'white',
                fontSize: '14px'
              }}>HEADER</div>
            </div>
          </div>
          <div style={{ padding: '16px' }}>
            <textarea
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #d9d9d9',
                backgroundColor: '#f5f5f5',
                color: '#262626',
                fontSize: '14px',
                resize: 'vertical',
                fontFamily: 'monospace'
              }}
              value={headerText}
              onChange={(e) => setHeaderText(e.target.value)}
              rows={8}
            />
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #d9d9d9'
        }}>
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid #d9d9d9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              <div style={{
                padding: '6px 12px',
                borderRadius: '4px',
                backgroundColor: '#1890ff',
                color: 'white',
                fontSize: '14px'
              }}>PAYLOAD</div>
            </div>
          </div>
          <div style={{ padding: '16px' }}>
            <textarea
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #d9d9d9',
                backgroundColor: '#f5f5f5',
                color: '#262626',
                fontSize: '14px',
                resize: 'vertical',
                fontFamily: 'monospace'
              }}
              value={payloadText}
              onChange={(e) => setPayloadText(e.target.value)}
              rows={8}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <label style={{ 
          display: 'block',
          marginBottom: '6px',
          color: '#595959',
          fontSize: '14px'
        }}>Secret (for HS256)</label>
        <input
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #d9d9d9',
            backgroundColor: '#f5f5f5',
            color: '#262626',
            fontSize: '14px',
            fontFamily: 'monospace'
          }}
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="secret"
        />
      </div>

      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}

      <div style={{ marginTop: 16 }}>
        <label style={{ display: 'block', marginBottom: 6 }}>Generated Token</label>
        <textarea style={{
          width: '100%',
          background: '#ffffff',
          border: '1px solid #d9d9d9',
          borderRadius: '8px',
          padding: '16px',
          fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
          fontSize: '14px',
          lineHeight: 1.5,
          resize: 'vertical'
        }} value={token} readOnly rows={3} />
      </div>
    </div>
  );
};

export default EncodeView;