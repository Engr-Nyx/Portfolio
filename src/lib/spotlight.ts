import type { MouseEvent } from 'react';

/** Pair with the `.spotlight-card` CSS class — updates the cursor-tracked glow position. */
export function handleSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty('--spot-x', `${x}%`);
  el.style.setProperty('--spot-y', `${y}%`);
}
