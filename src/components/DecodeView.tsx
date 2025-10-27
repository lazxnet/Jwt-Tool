import React from 'react';
import ClaimsTable from './ClaimsTable';

interface JWTData {
  header: string;
  payload: string;
}

interface DecodeViewProps {
  jwt: string;
  onJwtChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  decoded: JWTData;
  headerTable: Record<string, any> | null;
  payloadTable: Record<string, any> | null;
  activeHeaderTab: 'json' | 'table';
  activePayloadTab: 'json' | 'table';
  setActiveHeaderTab: (v: 'json' | 'table') => void;
  setActivePayloadTab: (v: 'json' | 'table') => void;
  copyHeader: () => void;
  copyPayload: () => void;
  isValid: boolean;
  copyJWT: () => void;
  clearJWT: () => void;
}

const DecodeView: React.FC<DecodeViewProps> = ({
  jwt,
  onJwtChange,
  decoded,
  headerTable,
  payloadTable,
  activeHeaderTab,
  activePayloadTab,
  setActiveHeaderTab,
  setActivePayloadTab,
  copyHeader,
  copyPayload,
  isValid,
  copyJWT,
  clearJWT,
}) => {
  return (
    <>
      {/* ENCODED VALUE Section - Minimalista */}
      <div style={{
        background: '#ffffff',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: 0,
            color: '#1a1a1a'
          }}>
            ENCODED JWT
          </h2>
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            <button 
              style={{
                background: '#1a1a1a',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={copyJWT}
            >
              COPY
            </button>
            <button 
              style={{
                background: '#f5f5f5',
                color: '#666',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={clearJWT}
            >
              CLEAR
            </button>
          </div>
        </div>
        
        <textarea
          style={{
            width: '100%',
            background: '#fafafa',
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            padding: '16px',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: 1.5,
            resize: 'vertical',
            minHeight: '80px',
            color: '#1a1a1a'
          }}
          value={jwt}
          onChange={onJwtChange}
          placeholder="Paste your JWT token here..."
          spellCheck="false"
          rows={3}
        />
        
        {!isValid && jwt.trim() && (
          <div style={{
            color: '#d32f2f',
            fontSize: '13px',
            marginTop: '8px',
            fontWeight: '500'
          }}>
            Invalid JWT token format
          </div>
        )}
        
        {isValid && jwt.trim() && (
          <div style={{
            color: '#388e3c',
            fontSize: '13px',
            marginTop: '8px',
            fontWeight: '500'
          }}>
            Valid JWT token
          </div>
        )}
      </div>

      {/* DECODED SECTIONS - Minimalista */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        background: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {/* HEADER COLUMN */}
        <div style={{
          borderRight: '1px solid #e0e0e0'
        }}>
          {/* Header tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #e0e0e0',
            background: '#fafafa'
          }}>
            <div style={{
              display: 'flex',
              flex: 1
            }}>
              <button
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: 'none',
                  background: activeHeaderTab === 'json' ? '#ffffff' : 'transparent',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  color: activeHeaderTab === 'json' ? '#1a1a1a' : '#666',
                  borderBottom: activeHeaderTab === 'json' ? '2px solid #1a1a1a' : 'none'
                }}
                onClick={() => setActiveHeaderTab('json')}
              >
                JSON
              </button>
              <button
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: 'none',
                  background: activeHeaderTab === 'table' ? '#ffffff' : 'transparent',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  color: activeHeaderTab === 'table' ? '#1a1a1a' : '#666',
                  borderBottom: activeHeaderTab === 'table' ? '2px solid #1a1a1a' : 'none'
                }}
                onClick={() => setActiveHeaderTab('table')}
              >
                TABLE
              </button>
            </div>
            <button 
              style={{
                background: 'transparent',
                border: 'none',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                color: '#666',
                borderLeft: '1px solid #e0e0e0'
              }}
              onClick={copyHeader}
            >
              COPY
            </button>
          </div>
          
          {/* Header content */}
          <div style={{
            padding: '20px',
            minHeight: '300px',
            maxHeight: '400px',
            overflow: 'auto'
          }}>
            {activeHeaderTab === 'json' ? (
              <pre style={{
                fontFamily: 'monospace',
                fontSize: '13px',
                lineHeight: 1.5,
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                color: '#1a1a1a'
              }}>{decoded.header}</pre>
            ) : (
              <ClaimsTable data={headerTable} />
            )}
          </div>
        </div>

        {/* PAYLOAD COLUMN */}
        <div>
          {/* Payload tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #e0e0e0',
            background: '#fafafa'
          }}>
            <div style={{
              display: 'flex',
              flex: 1
            }}>
              <button
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: 'none',
                  background: activePayloadTab === 'json' ? '#ffffff' : 'transparent',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  color: activePayloadTab === 'json' ? '#1a1a1a' : '#666',
                  borderBottom: activePayloadTab === 'json' ? '2px solid #1a1a1a' : 'none'
                }}
                onClick={() => setActivePayloadTab('json')}
              >
                JSON
              </button>
              <button
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: 'none',
                  background: activePayloadTab === 'table' ? '#ffffff' : 'transparent',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  color: activePayloadTab === 'table' ? '#1a1a1a' : '#666',
                  borderBottom: activePayloadTab === 'table' ? '2px solid #1a1a1a' : 'none'
                }}
                onClick={() => setActivePayloadTab('table')}
              >
                TABLE
              </button>
            </div>
            <button 
              style={{
                background: 'transparent',
                border: 'none',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                color: '#666',
                borderLeft: '1px solid #e0e0e0'
              }}
              onClick={copyPayload}
            >
              COPY
            </button>
          </div>
          
          {/* Payload content */}
          <div style={{
            padding: '20px',
            minHeight: '300px',
            maxHeight: '400px',
            overflow: 'auto'
          }}>
            {activePayloadTab === 'json' ? (
              <pre style={{
                fontFamily: 'monospace',
                fontSize: '13px',
                lineHeight: 1.5,
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                color: '#1a1a1a'
              }}>{decoded.payload}</pre>
            ) : (
              <ClaimsTable data={payloadTable} />
            )}
          </div>
        </div>
      </div>

      {/* Títulos minimalistas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        marginTop: '12px'
      }}>
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: '600',
          color: '#666'
        }}>
          HEADER
        </div>
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: '600',
          color: '#666'
        }}>
          PAYLOAD
        </div>
      </div>
    </>
  );
};

export default DecodeView;