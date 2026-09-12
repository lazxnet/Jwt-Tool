import React from 'react';
import { theme } from '../../styles/theme';

interface ClaimsTableProps {
  data: Record<string, unknown> | null;
}

const ClaimsTable: React.FC<ClaimsTableProps> = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div style={{
        padding: '32px 16px',
        color: theme.colors.tertiary,
        textAlign: 'center',
        background: 'rgba(245, 245, 247, 0.4)',
        borderRadius: theme.borderRadius.md,
        border: `1px dashed ${theme.colors.border}`,
        fontSize: '14px',
      }}>
        No claims available
      </div>
    );
  }

  const entries = Object.entries(data);

  const renderValue = (value: unknown) => {
    if (typeof value === 'boolean') {
      return (
        <span style={{
          color: value ? theme.colors.success : theme.colors.error,
          fontWeight: '500',
          fontSize: '14px',
        }}>
          {value.toString()}
        </span>
      );
    }
    if (typeof value === 'number') {
      return (
        <span style={{ fontFamily: theme.fonts.mono, fontSize: '13px' }}>
          {value.toLocaleString()}
        </span>
      );
    }
    return <span style={{ fontFamily: theme.fonts.mono, fontSize: '13px', wordBreak: 'break-all' }}>{String(value)}</span>;
  };

  return (
    <div style={{
      borderRadius: theme.borderRadius.md,
      overflow: 'hidden',
      border: `1px solid ${theme.colors.border}`,
    }}>
      {entries.map(([key, value], index) => (
        <div
          key={key}
          style={{
            display: 'flex',
            borderBottom: index === entries.length - 1 ? 'none' : `1px solid ${theme.colors.border}`,
            fontSize: '14px',
            background: index % 2 === 0 ? '#ffffff' : 'rgba(245, 245, 247, 0.4)',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 113, 227, 0.04)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = index % 2 === 0 ? '#ffffff' : 'rgba(245, 245, 247, 0.4)';
          }}
        >
          <div style={{
            padding: '12px 16px',
            fontWeight: '600',
            color: theme.colors.textPrimary,
            background: 'rgba(245, 245, 247, 0.4)',
            width: '40%',
            borderRight: `1px solid ${theme.colors.border}`,
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            fontFamily: theme.fonts.mono,
          }}>
            {key}
          </div>
          <div style={{
            padding: '12px 16px',
            color: theme.colors.textSecondary,
            width: '60%',
            wordBreak: 'break-all',
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
          }}>
            {renderValue(value)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClaimsTable;
