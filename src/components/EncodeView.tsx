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
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button 
          style={{
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            opacity: isLoading ? '0.6' : '1'
          }}
          onClick={handleEncode}
          disabled={isLoading}
        >
          {isLoading ? 'Encoding...' : 'Encode'}
        </button>
        <button 
          style={{
            backgroundColor: '#f5f5f5',
            color: '#666',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: token ? 'pointer' : 'not-allowed',
            opacity: token ? '1' : '0.6'
          }}
          onClick={copyToken}
          disabled={!token}
        >
          Copy Token
        </button>
        <button 
          style={{
            backgroundColor: '#f5f5f5',
            color: '#666',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
          onClick={clearAll}
        >
          Clear
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #e0e0e0',
            backgroundColor: '#fafafa'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#1a1a1a'
            }}>HEADER</div>
          </div>
          <div style={{ padding: '16px' }}>
            <textarea
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#fafafa',
                color: '#1a1a1a',
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
          border: '1px solid #e0e0e0'
        }}>
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #e0e0e0',
            backgroundColor: '#fafafa'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#1a1a1a'
            }}>PAYLOAD</div>
          </div>
          <div style={{ padding: '16px' }}>
            <textarea
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#fafafa',
                color: '#1a1a1a',
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

      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'block',
          marginBottom: '8px',
          color: '#666',
          fontSize: '14px',
          fontWeight: '500'
        }}>Secret (for HS256)</label>
        <input
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '4px',
            border: '1px solid #e0e0e0',
            backgroundColor: '#fafafa',
            color: '#1a1a1a',
            fontSize: '14px',
            fontFamily: 'monospace'
          }}
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="secret"
        />
      </div>

      {error && (
        <div style={{ 
          color: '#d32f2f', 
          marginBottom: '16px',
          fontSize: '14px',
          padding: '12px',
          backgroundColor: '#ffebee',
          borderRadius: '4px',
          border: '1px solid #ffcdd2'
        }}>
          {error}
        </div>
      )}

      <div>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px',
          color: '#666',
          fontSize: '14px',
          fontWeight: '500'
        }}>Generated Token</label>
        <textarea style={{
          width: '100%',
          background: '#fafafa',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          padding: '16px',
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: 1.5,
          resize: 'vertical',
          color: '#1a1a1a'
        }} value={token} readOnly rows={4} />
      </div>
    </div>
  );
};

export default EncodeView;