import * as React from 'react';
import { cn } from '@/lib/utils';

interface ActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Actions = ({ className, children, ...props }: ActionsProps) => {
  return (
    <div
      className={cn('flex items-center gap-1', className)}
      {...props}
    >
      {children}
    </div>
  );
};
Actions.displayName = 'Actions';

interface ActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  children: React.ReactNode;
}

const Action = ({ className, label, children, ...props }: ActionProps) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'h-8 w-8 p-0',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      title={label}
      {...props}
    >
      {children}
    </button>
  );
};
Action.displayName = 'Action';

export { Actions, Action };
