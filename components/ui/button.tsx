import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[var(--rounded)] text-sm font-semibold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary-300 text-white hover:bg-primary-300/90 transition',
        destructive: 'bg-red-500 text-white hover:bg-red-500/90',
        destructiveOutline: 'border border-red-500 text-red-500 hover:bg-red-500/10',
        outline: 'border border-primary-300 bg-white text-primary-300 hover:bg-primary-300/10',
        outlineGrayHover: 'border-gray-400 text-gray-500 px-3 flex gap-2 items-center font-[500] hover:bg-gray-200',
        ghost: 'text-primary-300 hover:bg-primary-300/10',
        link: 'text-gray-900',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
