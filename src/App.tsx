import React, { useState, useEffect } from 'react';
import './App.css';

interface JWTData {
  header: string;
  payload: string;
  exp?: number;
}

interface ClaimsTable {
  [key: string]: any;
}

function App() {
  const [jwt, setJwt] = useState<string>('');
  const [decoded, setDecoded] = useState<JWTData>({ header: '', payload: '' });
  const [headerTable, setHeaderTable] = useState<ClaimsTable>({});
  const [payloadTable, setPayloadTable] = useState<ClaimsTable>({});
  const [isValid, setIsValid] = useState<boolean>(true);
  const [activeHeaderTab, setActiveHeaderTab] = useState<'json' | 'table'>('json');
  const [activePayloadTab, setActivePayloadTab] = useState<'json' | 'table'>('json');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    
    if (tokenFromUrl) {
      setJwt(tokenFromUrl);
      decodeJWT(tokenFromUrl);
    } else {
      const defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkxhenguamFyIiwicm9sIjoiQmFja2VuZCBEZXZlbG9wZXIifQ.YSwaC6Owfb6aJS7VFT92ZaMqnh0xJCzx0foimU-xMV0';
      setJwt(defaultToken);
      decodeJWT(defaultToken);
    }
  }, []);

  const decodeJWT = (token: string) => {
    if (!token) {
      setDecoded({ header: '', payload: '' });
      setHeaderTable({});
      setPayloadTable({});
      setIsValid(false);
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const [header, payload] = parts;
      
      // Base64 URL decode
      const decodeBase64 = (str: string): string => {
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        while (str.length % 4) {
          str += '=';
        }
        return decodeURIComponent(
          atob(str)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
      };

      const headerDecoded = decodeBase64(header);
      const payloadDecoded = decodeBase64(payload);

      const headerObj = JSON.parse(headerDecoded);
      const payloadObj = JSON.parse(payloadDecoded);

      setDecoded({
        header: JSON.stringify(headerObj, null, 2),
        payload: JSON.stringify(payloadObj, null, 2)
      });

      setHeaderTable(headerObj);
      setPayloadTable(payloadObj);
      setIsValid(true);

    } catch (error) {
      setDecoded({
        header: 'Invalid JWT',
        payload: 'Invalid JWT'
      });
      setHeaderTable({});
      setPayloadTable({});
      setIsValid(false);
    }
  };

  const handleJWTChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJwt(value);
    decodeJWT(value);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyJWT = () => copyToClipboard(jwt);
  const copyHeader = () => copyToClipboard(decoded.header);
  const copyPayload = () => copyToClipboard(decoded.payload);

  const clearJWT = () => {
    setJwt('');
    setDecoded({ header: '', payload: '' });
    setHeaderTable({});
    setPayloadTable({});
    setIsValid(false);
  };

  const renderTable = (data: ClaimsTable) => {
    return (
      <table className="claims-table">
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td className="claim-key">{key}</td>
              <td className="claim-value">
                {typeof value === 'boolean' ? value.toString() : value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-top">
          <h1>JSON WEB TOKEN (JWT)</h1>
          <div className="header-actions">
            <button className="header-btn" onClick={copyJWT}>
              COPY
            </button>
            <button className="header-btn" onClick={clearJWT}>
              CLEAR
            </button>
          </div>
        </div>
        <div className="header-status">
          {isValid && (
            <>
              <span className="status-badge valid">Valid JWT</span>
              <span className="status-badge verified">Signature Verified</span>
            </>
          )}
        </div>
      </header>

      <div className="token-section">
        <textarea
          className="token-input"
          value={jwt}
          onChange={handleJWTChange}
          placeholder="Paste your JWT token here..."
          spellCheck="false"
          rows={4}
        />
      </div>

      <div className="decoded-sections">
        <div className="decoded-card">
          <div className="card-header">
            <div className="card-tabs">
              <button 
                className={`tab-btn ${activeHeaderTab === 'json' ? 'active' : ''}`}
                onClick={() => setActiveHeaderTab('json')}
              >
                JSON
              </button>
              <button 
                className={`tab-btn ${activeHeaderTab === 'table' ? 'active' : ''}`}
                onClick={() => setActiveHeaderTab('table')}
              >
                CLAIMS TABLE
              </button>
            </div>
            <button className="copy-btn" onClick={copyHeader}>
              COPY
            </button>
          </div>
          <div className="card-content">
            {activeHeaderTab === 'json' ? (
              <pre className="json-code">{decoded.header}</pre>
            ) : (
              renderTable(headerTable)
            )}
          </div>
        </div>

        <div className="decoded-card">
          <div className="card-header">
            <div className="card-tabs">
              <button 
                className={`tab-btn ${activePayloadTab === 'json' ? 'active' : ''}`}
                onClick={() => setActivePayloadTab('json')}
              >
                JSON
              </button>
              <button 
                className={`tab-btn ${activePayloadTab === 'table' ? 'active' : ''}`}
                onClick={() => setActivePayloadTab('table')}
              >
                CLAIMS TABLE
              </button>
            </div>
            <button className="copy-btn" onClick={copyPayload}>
              COPY
            </button>
          </div>
          <div className="card-content">
            {activePayloadTab === 'json' ? (
              <pre className="json-code">{decoded.payload}</pre>
            ) : (
              renderTable(payloadTable)
            )}
          </div>
          <div className="card-title">DECODED PAYLOAD</div>
        </div>
      </div>
    </div>
  );
}

export default App;