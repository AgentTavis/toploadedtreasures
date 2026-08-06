// Seamless infinite marquee.
// The list is rendered as several identical copies so that ONE half of the track always
// overflows the widest viewport. The track then animates translateX 0 -> -50% on a linear
// infinite loop; because the second half is identical to the first, the reset is invisible
// and the strip never shows empty space. Always-moving (no hover pause). Under
// prefers-reduced-motion it renders static and centered (see .marquee in index.css).
export default function Marquee({ items, className = '', duration = 60 }) {
  // 6 copies -> translateX(-50%) shifts by 3 full copies, always wider than any real
  // viewport (desktop or mobile), so there is never a gap at the right edge.
  const COPIES = 6

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee__track" style={{ animationDuration: `${duration}s` }}>
        {Array.from({ length: COPIES }).map((_, g) => (
          <ul className="marquee__group" key={g}>
            {items.map((item, i) => (
              <li className="marquee__item" key={`${g}-${i}`}>
                <span className="marquee__word">{item}</span>
                <span className="marquee__sep">◆</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
