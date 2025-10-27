import React from 'react';

interface Props {
  data: Record<string, any> | null;
}

const ClaimsTable: React.FC<Props> = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div style={{ 
        padding: '24px', 
        color: '#999', 
        fontStyle: 'italic',
        textAlign: 'center',
        background: '#fafafa',
        borderRadius: '4px',
        border: '1px solid #e0e0e0'
      }}>
        No claims available
      </div>
    );
  }

  return (
    <div style={{
      borderRadius: '4px',
      overflow: 'hidden',
      border: '1px solid #e0e0e0'
    }}>
      {Object.entries(data).map(([key, value], index) => (
        <div 
          key={key} 
          style={{
            display: 'flex',
            borderBottom: index === Object.keys(data).length - 1 ? 'none' : '1px solid #e0e0e0',
            fontSize: '14px',
            background: index % 2 === 0 ? '#ffffff' : '#fafafa'
          }}
        >
          <div style={{
            padding: '12px 16px',
            fontWeight: '600',
            color: '#1a1a1a',
            backgroundColor: '#f5f5f5',
            width: '40%',
            borderRight: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center'
          }}>
            {key}
          </div>
          <div style={{
            padding: '12px 16px',
            color: '#666',
            width: '60%',
            wordBreak: 'break-all',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'monospace'
          }}>
            {typeof value === 'boolean' ? 
              <span style={{
                color: value ? '#388e3c' : '#d32f2f',
                fontWeight: '500'
              }}>
                {value.toString()}
              </span> : 
              String(value)
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClaimsTable;