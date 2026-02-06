import React from 'react';
import { theme } from '../../styles/theme';

interface ClaimsTableProps {
  data: Record<string, unknown> | null;
}


const ClaimsTable: React.FC<ClaimsTableProps> = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div style={{
        padding: theme.spacing.xl,
        color: theme.colors.textMuted,
        fontStyle: 'italic',
        textAlign: 'center',
        background: theme.colors.backgroundLight,
        borderRadius: theme.borderRadius.sm,
        border: `1px solid ${theme.colors.border}`,
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
        }}>
          {value.toString()}
        </span>
      );
    }
    return String(value);
  };

  return (
    <div style={{
      borderRadius: theme.borderRadius.sm,
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
            background: index % 2 === 0 ? theme.colors.background : theme.colors.backgroundLight,
          }}
        >
          <div style={{
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            fontWeight: '600',
            color: theme.colors.textPrimary,
            backgroundColor: theme.colors.backgroundGray,
            width: '40%',
            borderRight: `1px solid ${theme.colors.border}`,
            display: 'flex',
            alignItems: 'center',
          }}>
            {key}
          </div>
          <div style={{
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            color: theme.colors.secondary,
            width: '60%',
            wordBreak: 'break-all',
            display: 'flex',
            alignItems: 'center',
            fontFamily: theme.fonts.mono,
          }}>
            {renderValue(value)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClaimsTable;