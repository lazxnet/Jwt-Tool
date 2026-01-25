import React, { useState } from 'react';
import { encodeJWT } from '../../lib/jwt';
import { copyToClipboard } from '../../lib/clipboard';
import { DEFAULT_HEADER, DEFAULT_PAYLOAD, DEFAULT_SECRET } from '../../constants/defautls';
import { styles, theme } from '../../styles/theme';


const EncodeView: React.FC = () => {
  const [headerText, setHeaderText] = useState(JSON.stringify(DEFAULT_HEADER, null, 2));
  const [payloadText, setPayloadText] = useState(JSON.stringify(DEFAULT_PAYLOAD, null, 2));
  const [secret, setSecret] = useState(DEFAULT_SECRET);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    rows = 8
  ) => (
    <div style={{
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.lg,
      border: `1px solid ${theme.colors.border}`,
    }}>
      <div style={{
        padding: theme.spacing.md,
        borderBottom: `1px solid ${theme.colors.border}`,
        backgroundColor: theme.colors.backgroundLight,
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: theme.colors.textPrimary,
        }}>
          {label}
        </div>
      </div>
      <div style={{ padding: theme.spacing.md }}>
        <textarea
          style={{ ...styles.textarea, padding: theme.spacing.sm }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
        />
      </div>
    </div>
  );

  return (
    <div>
      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: theme.spacing.sm, marginBottom: theme.spacing.xl }}>
        <button
          style={{ ...styles.button.primary, opacity: isLoading ? 0.6 : 1 }}
          onClick={handleEncode}
          disabled={isLoading}
        >
          {isLoading ? 'Encoding...' : 'Encode'}
        </button>
        <button
          style={{
            ...styles.button.secondary,
            cursor: token ? 'pointer' : 'not-allowed',
            opacity: token ? 1 : 0.6,
          }}
          onClick={handleCopyToken}
          disabled={!token}
        >
          Copy Token
        </button>
        <button style={styles.button.secondary} onClick={handleClearAll}>
          Clear
        </button>
      </div>

      {/* Header and Payload Input */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
      }}>
        {renderTextArea('HEADER', headerText, setHeaderText)}
        {renderTextArea('PAYLOAD', payloadText, setPayloadText)}
      </div>

      {/* Secret Input */}
      <div style={{ marginBottom: theme.spacing.lg }}>
        <label style={{
          display: 'block',
          marginBottom: theme.spacing.xs,
          color: theme.colors.secondary,
          fontSize: '14px',
          fontWeight: '500',
        }}>
          Secret (for HS256)
        </label>
        <input
          style={styles.input}
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="secret"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          color: theme.colors.error,
          marginBottom: theme.spacing.md,
          fontSize: '14px',
          padding: theme.spacing.sm,
          backgroundColor: theme.colors.errorBg,
          borderRadius: theme.borderRadius.sm,
          border: `1px solid ${theme.colors.errorBorder}`,
        }}>
          {error}
        </div>
      )}

      {/* Generated Token Output */}
      <div>
        <label style={{
          display: 'block',
          marginBottom: theme.spacing.xs,
          color: theme.colors.secondary,
          fontSize: '14px',
          fontWeight: '500',
        }}>
          Generated Token
        </label>
        <textarea
          style={styles.textarea}
          value={token}
          readOnly
          rows={4}
        />
      </div>
    </div>
  );
};

export default EncodeView;