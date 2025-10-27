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
}) => {
  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <textarea
          style={{
            width: '100%',
            background: '#ffffff',
            border: '1px solid #d9d9d9',
            borderRadius: '8px',
            padding: '16px',
            fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
            fontSize: '14px',
            lineHeight: 1.5,
            resize: 'vertical'
          }}
          value={jwt}
          onChange={onJwtChange}
          placeholder="Paste your JWT token here..."
          spellCheck="false"
          rows={4}
        />
        {!isValid && jwt.trim() && (
          <div style={{
            color: '#ff4d4f',
            fontSize: '14px',
            marginTop: '8px',
            padding: '8px 12px',
            background: '#fff2f0',
            border: '1px solid #ffccc7',
            borderRadius: '4px'
          }}>Invalid JWT token format</div>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
      }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #d9d9d9',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #d9d9d9',
            background: '#f0f0f0',
            borderRadius: '8px 8px 0 0'
          }}>
            <div style={{
              display: 'flex',
              gap: '4px',
              background: '#f0f0f0',
              padding: '4px',
              borderRadius: '6px'
            }}>
              <button
                style={{
                  padding: '6px 16px',
                  border: 'none',
                  background: activeHeaderTab === 'json' ? 'white' : 'transparent',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  color: activeHeaderTab === 'json' ? '#1890ff' : '#595959',
                  boxShadow: activeHeaderTab === 'json' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
                }}
                onClick={() => setActiveHeaderTab('json')}
              >
                JSON
              </button>
              <button
                style={{
                  padding: '6px 16px',
                  border: 'none',
                  background: activeHeaderTab === 'table' ? 'white' : 'transparent',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  color: activeHeaderTab === 'table' ? '#1890ff' : '#595959',
                  boxShadow: activeHeaderTab === 'table' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
                }}
                onClick={() => setActiveHeaderTab('table')}
              >
                CLAIMS TABLE
              </button>
            </div>
            <button 
              style={{
                background: 'transparent',
                border: '1px solid #d9d9d9',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                color: '#595959'
              }}
              onClick={copyHeader}
            >
              COPY
            </button>
          </div>
          <div style={{
            padding: '20px',
            minHeight: '300px',
            position: 'relative'
          }}>
            {activeHeaderTab === 'json' ? (
              <pre style={{
                fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                fontSize: '13px',
                lineHeight: 1.5,
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                color: '#262626'
              }}>{decoded.header}</pre>
            ) : (
              <ClaimsTable data={headerTable} />
            )}
          </div>
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '20px',
            background: '#1890ff',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>DECODED HEADER</div>
        </div>

        <div style={{
          background: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #d9d9d9',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #d9d9d9',
            background: '#f0f0f0',
            borderRadius: '8px 8px 0 0'
          }}>
            <div style={{
              display: 'flex',
              gap: '4px',
              background: '#f0f0f0',
              padding: '4px',
              borderRadius: '6px'
            }}>
              <button
                style={{
                  padding: '6px 16px',
                  border: 'none',
                  background: activePayloadTab === 'json' ? 'white' : 'transparent',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  color: activePayloadTab === 'json' ? '#1890ff' : '#595959',
                  boxShadow: activePayloadTab === 'json' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
                }}
                onClick={() => setActivePayloadTab('json')}
              >
                JSON
              </button>
              <button
                style={{
                  padding: '6px 16px',
                  border: 'none',
                  background: activePayloadTab === 'table' ? 'white' : 'transparent',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  color: activePayloadTab === 'table' ? '#1890ff' : '#595959',
                  boxShadow: activePayloadTab === 'table' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
                }}
                onClick={() => setActivePayloadTab('table')}
              >
                CLAIMS TABLE
              </button>
            </div>
            <button 
              style={{
                background: 'transparent',
                border: '1px solid #d9d9d9',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                color: '#595959'
              }}
              onClick={copyPayload}
            >
              COPY
            </button>
          </div>
          <div style={{
            padding: '20px',
            minHeight: '300px',
            position: 'relative'
          }}>
            {activePayloadTab === 'json' ? (
              <pre style={{
                fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                fontSize: '13px',
                lineHeight: 1.5,
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                color: '#262626'
              }}>{decoded.payload}</pre>
            ) : (
              <ClaimsTable data={payloadTable} />
            )}
          </div>
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '20px',
            background: '#1890ff',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>DECODED PAYLOAD</div>
        </div>
      </div>
    </>
  );
};

export default DecodeView;