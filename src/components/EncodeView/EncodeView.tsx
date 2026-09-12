import React, { useState, useRef } from 'react';
import { encodeJWT } from '../../lib/jwt';
import { copyToClipboard } from '../../lib/clipboard';
import { DEFAULT_HEADER, DEFAULT_PAYLOAD, DEFAULT_SECRET } from '../../constants/defautls';
import { theme } from '../../styles/theme';

const EncodeView: React.FC = () => {
  const [headerText, setHeaderText] = useState(JSON.stringify(DEFAULT_HEADER, null, 2));
  const [payloadText, setPayloadText] = useState(JSON.stringify(DEFAULT_PAYLOAD, null, 2));
  const [secret, setSecret] = useState(DEFAULT_SECRET);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const headerCardRef = useRef<HTMLDivElement>(null);
  const payloadCardRef = useRef<HTMLDivElement>(null);
  const secretCardRef = useRef<HTMLDivElement>(null);
  const tokenCardRef = useRef<HTMLDivElement>(null);

  const handleEncode = async () => {
    setError('');
    setIsLoading(true);

    try {
      const headerObj = headerText ? JSON.parse(headerText) : {};
      const payloadObj = payloadText ? JSON.parse(payloadText) : {};
      const generatedToken = await encodeJWT(
        headerObj,
        payloadObj,
        secret || '',
        headerObj.alg || 'HS256'
      );
      setToken(generatedToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToken = () => {
    if (token) copyToClipboard(token);
  };

  const handleClearAll = () => {
    setHeaderText(JSON.stringify(DEFAULT_HEADER, null, 2));
    setPayloadText(JSON.stringify(DEFAULT_PAYLOAD, null, 2));
    setSecret(DEFAULT_SECRET);
    setToken('');
    setError('');
  };

  const renderTextArea = (
    label: string,
    value: string,
    onChange: (value: string) => void,
    rows = 8,
    cardRef: React.RefObject<HTMLDivElement>
  ) => (
    <div className="panel" ref={cardRef}>
      <div style={{
        padding: '0 0 12px 0',
        borderBottom: '1px solid #e5e5e7',
        marginBottom: '12px',
      }}>
        <span className="section-label">{label}</span>
      </div>
      <textarea
        className="textarea-field"
        style={{ padding: '14px' }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        spellCheck={false}
      />
    </div>
  );

  return (
    <div>
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '24px',
        flexWrap: 'wrap',
      }}>
        <button
          className="btn-primary"
          onClick={handleEncode}
          disabled={isLoading}
          style={{ opacity: isLoading ? 0.6 : 1 }}
        >
          {isLoading ? 'Encoding...' : 'Encode'}
        </button>
        <button
          className="btn-secondary"
          onClick={handleCopyToken}
          disabled={!token}
          style={{ opacity: token ? 1 : 0.5, cursor: token ? 'pointer' : 'not-allowed' }}
        >
          Copy Token
        </button>
        <button className="btn-secondary" onClick={handleClearAll}>
          Clear
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '24px',
      }}>
        {renderTextArea('Header', headerText, setHeaderText, 8, headerCardRef)}
        {renderTextArea('Payload', payloadText, setPayloadText, 8, payloadCardRef)}
      </div>

      <div className="panel" ref={secretCardRef} style={{ marginBottom: '16px' }}>
        <div style={{
          padding: '0 0 12px 0',
          borderBottom: '1px solid #e5e5e7',
          marginBottom: '12px',
        }}>
          <span className="section-label">Secret (for HS256)</span>
        </div>
        <input
          className="input-field"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="secret"
          type="text"
        />
      </div>

      {error && (
        <div style={{
          color: theme.colors.error,
          marginBottom: theme.spacing.md,
          fontSize: '14px',
          padding: '12px 16px',
          backgroundColor: theme.colors.errorBg,
          borderRadius: theme.borderRadius.md,
          border: `1px solid ${theme.colors.errorBorder}`,
        }}>
          {error}
        </div>
      )}

      <div className="panel" ref={tokenCardRef}>
        <div style={{
          padding: '0 0 12px 0',
          borderBottom: '1px solid #e5e5e7',
          marginBottom: '12px',
        }}>
          <span className="section-label">Generated Token</span>
        </div>
        <textarea
          className="textarea-field"
          style={{ minHeight: '60px' }}
          value={token}
          readOnly
          rows={4}
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default EncodeView;