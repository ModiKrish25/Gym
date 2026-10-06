import React from "react";

export function BarbellIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Central bar */}
      <line x1="2" y1="12" x2="22" y2="12" />
      {/* Inner collars */}
      <line x1="6" y1="9" x2="6" y2="15" />
      <line x1="18" y1="9" x2="18" y2="15" />
      {/* Outer plates */}
      <rect x="4" y="7" width="2" height="10" rx="1" fill="currentColor" fillOpacity="0.2" />
      <rect x="18" y="7" width="2" height="10" rx="1" fill="currentColor" fillOpacity="0.2" />
      {/* Smaller outer plates */}
      <rect x="2" y="8.5" width="2" height="7" rx="0.5" />
      <rect x="20" y="8.5" width="2" height="7" rx="0.5" />
    </svg>
  );
}

export function KettlebellIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Handle */}
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      {/* Kettlebell body */}
      <circle cx="12" cy="14" r="7" fill="currentColor" fillOpacity="0.15" />
      {/* Base flat line */}
      <line x1="9" y1="20" x2="15" y2="20" strokeWidth="2.5" />
    </svg>
  );
}

export function CableMachineIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Frame columns */}
      <line x1="4" y1="3" x2="4" y2="21" />
      <line x1="20" y1="3" x2="20" y2="21" />
      {/* Top beam */}
      <line x1="3" y1="3" x2="21" y2="3" />
      {/* Pulley wheels */}
      <circle cx="8" cy="5" r="1.5" />
      <circle cx="16" cy="5" r="1.5" />
      {/* Cables */}
      <path d="M8 6.5v8l4 2.5" />
      <path d="M16 6.5v8l-4 2.5" />
      {/* Weight stack on sides */}
      <rect x="2.5" y="11" width="3" height="7" rx="0.5" fill="currentColor" fillOpacity="0.25" />
      <rect x="18.5" y="11" width="3" height="7" rx="0.5" fill="currentColor" fillOpacity="0.25" />
    </svg>
  );
}

export function PlateLoadedIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Bench angle */}
      <line x1="4" y1="18" x2="14" y2="7" />
      {/* Base leg */}
      <line x1="3" y1="20" x2="21" y2="20" />
      <line x1="14" y1="7" x2="14" y2="20" />
      {/* Pivot lever */}
      <circle cx="16" cy="11" r="5" strokeDasharray="3 3" />
      <circle cx="16" cy="11" r="2.5" fill="currentColor" fillOpacity="0.3" />
      {/* Handle */}
      <line x1="18" y1="8" x2="21" y2="6" strokeWidth="2.5" />
    </svg>
  );
}

export function PowerCageIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Uprights */}
      <line x1="5" y1="3" x2="5" y2="21" />
      <line x1="9" y1="4" x2="9" y2="21" strokeDasharray="1 2" />
      <line x1="15" y1="4" x2="15" y2="21" strokeDasharray="1 2" />
      <line x1="19" y1="3" x2="19" y2="21" />
      {/* Top pull-up crossbeam */}
      <line x1="4" y1="3" x2="20" y2="3" />
      {/* Safety spotter arms */}
      <line x1="5" y1="14" x2="19" y2="14" strokeWidth="2.5" />
      {/* Barbell resting on J-cups */}
      <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" stroke="currentColor" />
    </svg>
  );
}
