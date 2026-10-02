import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ShieldAlert } from 'lucide-react';

interface StatusBadgeProps {
  status: 'compatible' | 'caution' | 'conflict' | 'incompatible' | 'conditional';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export function StatusBadge({ status, size = 'md', showIcon = true, className = '' }: StatusBadgeProps) {
  const normalized = status === 'incompatible' ? 'conflict' : status === 'conditional' ? 'caution' : status;

  const config = {
    compatible: {
      label: 'COMPATIBLE',
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/30 dark:border-emerald-500/40',
      icon: CheckCircle2,
      dot: 'bg-emerald-500'
    },
    caution: {
      label: 'CAUTION',
      bg: 'bg-amber-500/10 dark:bg-amber-500/15',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/30 dark:border-amber-500/40',
      icon: AlertTriangle,
      dot: 'bg-amber-500'
    },
    conflict: {
      label: 'CONFLICT / INCOMPATIBLE',
      bg: 'bg-rose-500/10 dark:bg-rose-500/15',
      text: 'text-rose-700 dark:text-rose-300',
      border: 'border-rose-500/30 dark:border-rose-500/40',
      icon: XCircle,
      dot: 'bg-rose-500'
    }
  }[normalized] || {
    label: 'COMPATIBLE',
    bg: 'bg-slate-500/10',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-500/30',
    icon: CheckCircle2,
    dot: 'bg-slate-500'
  };

  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3.5 py-1.5 text-sm gap-2'
  }[size];

  return (
    <span
      className={`
        inline-flex items-center font-black rounded-xl border backdrop-blur-sm tracking-wide
        ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}
      `}
    >
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      <span>{config.label}</span>
    </span>
  );
}
