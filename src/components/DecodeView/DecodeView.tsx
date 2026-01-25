import React, { useState } from 'react';
import ClaimsTable from '../ClaimsTable';
import type { JWTDecodeResult, TabType } from '../../types/jwt.types';
import { styles, theme } from '../../styles/theme';

interface DecodeViewProps {
  jwt: string;
  onJwtChange: (value: string) => void;
  decoded: JWTDecodeResult;
  onCopy: (type: 'jwt' | 'header' | 'payload') => void;
  onClear: () => void;
}


const DecodeView: React.FC<DecodeViewProps> = ({
  jwt,
  onJwtChange,
  decoded,
  onCopy,
  onClear,
}) => {
  const [activeHeaderTab, setActiveHeaderTab] = useState<TabType>('json');
  const [activePayloadTab, setActivePayloadTab] = useState<TabType>('json');

  const renderTabButton = (
    label: string,
    isActive: boolean,
    onClick: () => void
  ) => (
    <button
      style={{
        flex: 1,
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        border: 'none',
        background: isActive ? theme.colors.background : 'transparent',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        color: isActive ? theme.colors.textPrimary : theme.colors.secondary,
        borderBottom: isActive ? `2px solid ${theme.colors.primary}` : 'none',
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );

  const renderSection = (
    activeTab: TabType,
    onTabChange: (tab: TabType) => void,
    jsonContent: string,
    tableData: Record<string, any> | null,
    onCopyClick: () => void
  ) => (
    <div>
      <div style={{
        display: 'flex',
        borderBottom: `1px solid ${theme.colors.border}`,
        background: theme.colors.backgroundLight,
      }}>
        <div style={{ display: 'flex', flex: 1 }}>
          {renderTabButton('JSON', activeTab === 'json', () => onTabChange('json'))}
          {renderTabButton('TABLE', activeTab === 'table', () => onTabChange('table'))}
        </div>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            color: theme.colors.secondary,
            borderLeft: `1px solid ${theme.colors.border}`,
          }}
          onClick={onCopyClick}
        >
          COPY
        </button>
      </div>
      <div style={{
        padding: theme.spacing.lg,
        minHeight: '300px',
        maxHeight: '400px',
        overflow: 'auto',
      }}>
        {activeTab === 'json' ? (
          <pre style={{
            fontFamily: theme.fonts.mono,
            fontSize: '13px',
            lineHeight: 1.5,
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            color: theme.colors.textPrimary,
          }}>
            {jsonContent}
          </pre>
        ) : (
          <ClaimsTable data={tableData} />
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* JWT Input Section */}
      <div style={{ ...styles.card, marginBottom: theme.spacing.xl }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing.md,
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: 0,
            color: theme.colors.textPrimary,
          }}>
            ENCODED JWT
          </h2>
          <div style={{ display: 'flex', gap: theme.spacing.xs }}>
            <button style={styles.button.primary} onClick={() => onCopy('jwt')}>
              COPY
            </button>
            <button style={styles.button.secondary} onClick={onClear}>
              CLEAR
            </button>
          </div>
        </div>

        <textarea
          style={{ ...styles.textarea, minHeight: '80px' }}
          value={jwt}
          onChange={(e) => onJwtChange(e.target.value)}
          placeholder="Paste your JWT token here..."
          spellCheck={false}
          rows={3}
        />

        {jwt.trim() && (
          <div style={{
            color: decoded.isValid ? theme.colors.success : theme.colors.error,
            fontSize: '13px',
            marginTop: theme.spacing.xs,
            fontWeight: '500',
          }}>
            {decoded.isValid ? 'Valid JWT token' : 'Invalid JWT token format'}
          </div>
        )}
      </div>

      {/* Header and Payload Sections */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        background: theme.colors.background,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
      }}>
        <div style={{ borderRight: `1px solid ${theme.colors.border}` }}>
          {renderSection(
            activeHeaderTab,
            setActiveHeaderTab,
            decoded.headerStr,
            decoded.headerObj,
            () => onCopy('header')
          )}
        </div>
        <div>
          {renderSection(
            activePayloadTab,
            setActivePayloadTab,
            decoded.payloadStr,
            decoded.payloadObj,
            () => onCopy('payload')
          )}
        </div>
      </div>

      {/* Labels */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        marginTop: theme.spacing.sm,
      }}>
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: '600',
          color: theme.colors.secondary,
        }}>
          HEADER
        </div>
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: '600',
          color: theme.colors.secondary,
        }}>
          PAYLOAD
        </div>
      </div>
    </>
  );
};

export default DecodeView;