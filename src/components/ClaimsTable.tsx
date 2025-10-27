import React from 'react';

interface Props {
  data: Record<string, any> | null;
}

const ClaimsTable: React.FC<Props> = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <div>No claims</div>;
  }

  return (
    <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'var(--card-background)',
      border: '1px solid var(--border-color)',
      borderRadius: '4px'
    }}>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{
              padding: '12px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--background-light)',
              width: '40%'
            }}>{key}</td>
            <td style={{
              padding: '12px',
              color: 'var(--text-primary)'
            }}>{typeof value === 'boolean' ? value.toString() : String(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClaimsTable;
