import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
  placement?: 'top' | 'right';
  variant?: 'dark' | 'gray';
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, className, placement = 'top', variant = 'dark' }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Background color classes
  const bgClass = variant === 'gray' ? 'bg-neutral-500' : 'bg-slate-800';


  // Position classes
  const positionClasses = placement === 'right'
    ? 'left-full top-1/2 -translate-y-1/2 ml-2'
    : 'bottom-full left-1/2 -translate-x-1/2 mb-2';

  // Simplified arrow logic for just color matching since border positioning is tricky with class construction
  // We'll explicitly set border classes based on placement
  const arrowClasses = placement === 'right'
    ? `absolute right-full top-1/2 -translate-y-1/2 -mr-[1px] border-4 border-transparent border-r-${variant === 'gray' ? 'neutral-500' : 'slate-800'}`
    : `absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-${variant === 'gray' ? 'neutral-500' : 'slate-800'}`;

  return (
    <div
      className={`relative inline-block group ${className || 'cursor-help'}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute ${positionClasses} px-3 py-1.5 text-xs text-white ${bgClass} rounded-lg whitespace-nowrap z-50 animate-in fade-in zoom-in-95 duration-200 shadow-sm`}>
          {content}
          {/* Arrow */}
          <div className={arrowClasses} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
