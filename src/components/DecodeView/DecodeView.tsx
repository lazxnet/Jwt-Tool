import React, { useState, useRef } from 'react';
import ClaimsTable from '../ClaimsTable';
import type { JWTDecodeResult, TabType } from '../../types/jwt.types';
import { theme } from '../../styles/theme';

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
  const headerCardRef = useRef<HTMLDivElement>(null);
  const payloadCardRef = useRef<HTMLDivElement>(null);

  const renderTabButton = (
    label: string,
    isActive: boolean,
    onClick: () => void
  ) => (
    <button
      className={`tab-btn ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  const renderSection = (
    activeTab: TabType,
    onTabChange: (tab: TabType) => void,
    jsonContent: string,
    tableData: Record<string, unknown> | null,
    onCopyClick: () => void,
    title: string,
    cardRef: React.RefObject<HTMLDivElement>
  ) => (
    <div className="panel" ref={cardRef}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <h3 className="section-label">{title}</h3>
        <button className="copy-btn" onClick={onCopyClick}>
          Copy
        </button>
      </div>
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e5e5e7',
        marginBottom: '12px',
        background: 'rgba(245, 245, 247, 0.4)',
        borderRadius: '10px 10px 0 0',
      }}>
        <div style={{ display: 'flex', flex: 1 }}>
          {renderTabButton('JSON', activeTab === 'json', () => onTabChange('json'))}
          {renderTabButton('TABLE', activeTab === 'table', () => onTabChange('table'))}
        </div>
      </div>
      <div style={{
        padding: '16px',
        minHeight: '200px',
        maxHeight: '350px',
        overflow: 'auto',
        borderRadius: '0 0 10px 10px',
      }}>
        {activeTab === 'json' ? (
          <pre style={{
            fontFamily: theme.fonts.mono,
            fontSize: '13px',
            lineHeight: 1.6,
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            color: theme.colors.textPrimary,
          }}>
            {jsonContent || <span style={{ color: theme.colors.tertiary }}>No data</span>}
          </pre>
        ) : (
          <ClaimsTable data={tableData} />
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="panel" style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <div>
            <h2 className="section-title">Encoded JWT</h2>
            {jwt.trim() && (
              <span className="badge" style={{
                marginTop: '4px',
                background: decoded.isValid
                  ? 'rgba(52, 199, 89, 0.1)'
                  : 'rgba(255, 59, 48, 0.1)',
                color: decoded.isValid ? theme.colors.success : theme.colors.error,
                display: 'inline-block',
              }}>
                {decoded.isValid ? '✓ Valid token' : '✗ Invalid format'}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn-primary"
              onClick={() => onCopy('jwt')}
              disabled={!jwt.trim()}
              style={{ opacity: jwt.trim() ? 1 : 0.5 }}
            >
              Copy
            </button>
            <button
              className="btn-secondary"
              onClick={onClear}
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          className="textarea-field"
          style={{ marginTop: '16px', minHeight: '80px' }}
          value={jwt}
          onChange={(e) => onJwtChange(e.target.value)}
          placeholder="Paste your JWT token here..."
          spellCheck={false}
          rows={3}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
      }}>
        <div>
          {renderSection(
            activeHeaderTab,
            setActiveHeaderTab,
            decoded.headerStr,
            decoded.headerObj,
            () => onCopy('header'),
            'Header',
            headerCardRef
          )}
        </div>
        <div>
          {renderSection(
            activePayloadTab,
            setActivePayloadTab,
            decoded.payloadStr,
            decoded.payloadObj,
            () => onCopy('payload'),
            'Payload',
            payloadCardRef
          )}
        </div>
      </div>
    </>
  );
};

export default DecodeView;