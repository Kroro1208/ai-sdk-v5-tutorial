import * as React from 'react';
import { cn } from '@/lib/utils';

interface ResponseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Response = ({ className, children, ...props }: ResponseProps) => {
  return (
    <div
      className={cn('prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap', className)}
      {...props}
    >
      {children}
    </div>
  );
};
Response.displayName = 'Response';

export { Response };
