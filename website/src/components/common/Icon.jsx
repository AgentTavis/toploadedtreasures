// Lightweight inline SVG icon set (stroke = currentColor). No emoji as icons.
const P = {
  buy: <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z M3 6h18 M16 10a4 4 0 0 1-8 0" />,
  sell: <><path d="M12 1v22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
  trade: <><path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></>,
  single: <><rect x="6" y="3" width="12" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
  slab: <><path d="M12 2 3 6v6c0 5 3.8 8.4 9 10 5.2-1.6 9-5 9-10V6Z" /><path d="m9 12 2 2 4-4" /></>,
  mystery: <><path d="M20 12v9H4v-9" /><path d="M2 7h20v5H2z" /><path d="M12 22V7" /><path d="M12 7S9 2 6.5 4 12 7 12 7Z M12 7s3-5 5.5-3S12 7 12 7Z" /></>,
  star: <path d="m12 2 3 6.9 7.5.6-5.7 4.9 1.8 7.3L12 17.8 5.4 21.7l1.8-7.3L1.5 9.5 9 8.9Z" />,
  arrowRight: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
  close: <><path d="M18 6 6 18M6 6l12 12" /></>,
  pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  check: <path d="m20 6-11 11-5-5" />,
  cart: <><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  trash: <><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></>,
  live: <><circle cx="12" cy="12" r="3" /><path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4M3.5 3.5a12 12 0 0 0 0 17M20.5 3.5a12 12 0 0 1 0 17" /></>,
  flame: <path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 .5-2S6 10 6 14a6 6 0 0 0 12 0c0-5-6-12-6-12Z" />,
  spark: <path d="M12 2v6m0 8v6M2 12h6m8 0h6M5 5l3 3m8 8 3 3M19 5l-3 3M8 16l-3 3" />,
}

// Brand glyphs (filled)
const BRAND = {
  // Solid star for review ratings — the stroked `star` above reads too light at 14px.
  starFill: <path fill="currentColor" stroke="none" d="m12 2 3 6.9 7.5.6-5.7 4.9 1.8 7.3L12 17.8 5.4 21.7l1.8-7.3L1.5 9.5 9 8.9Z" />,
  youtube: <path fill="currentColor" stroke="none" d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.7C19.3 5.2 12 5.2 12 5.2s-7.3 0-8.9.4A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.7c1.6.4 8.9.4 8.9.4s7.3 0 8.9-.4a2.5 2.5 0 0 0 1.7-1.7C23 15.2 23 12 23 12ZM9.8 15.3V8.7l5.7 3.3Z" />,
  instagram: <><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" /></>,
  whatnot: <><circle cx="12" cy="12" r="3" /><path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4" /></>,
}

export default function Icon({ name, className = '', size = 24, strokeWidth = 1.75, ...rest }) {
  const brand = BRAND[name]
  const body = brand || P[name] || null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {body}
    </svg>
  )
}
