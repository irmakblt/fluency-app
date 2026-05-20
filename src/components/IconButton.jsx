import { useState } from 'react';
import { playSound } from '../utils/sound';

const BUTTON_WIDTH = 92;
const BOTTOM_OFFSET = 9;

export default function IconButton({ label, paddingY = 16, onClick }) {
  const [pressed, setPressed] = useState(false);

  const bottomBg = pressed ? '#8C6227' : '#A8752F';
  const topBg = pressed ? '#C88E3E' : '#E19F43';
  const shadow = pressed ? 'none' : '0 9px 0 0 rgba(5,25,47,0.3)';
  const layerTransition = pressed
    ? 'transform 80ms ease-in, background 80ms ease-in'
    : 'transform 150ms ease-out, background 150ms ease-out';

  return (
    <div
      style={{
        position: 'relative',
        width: BUTTON_WIDTH,
        paddingBottom: BOTTOM_OFFSET,
        display: 'inline-block',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onPointerLeave={() => setPressed(false)}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => { setPressed(false); playSound('/sounds/primary-sound.mp3'); onClick?.(); }}
    >
      {/* Ghost sizer — drives container height via paddingY, hidden */}
      <div style={{
        padding: `${paddingY}px 0`,
        border: '2px solid transparent',
        visibility: 'hidden',
      }}>
        <span style={{ fontFamily: "'VT323', monospace", fontSize: 26, lineHeight: 1, display: 'block' }}>
          {label}
        </span>
      </div>

      {/* Bottom layer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: bottomBg,
        borderRadius: 6,
        border: '2px solid #05171F',
        boxShadow: shadow,
        transition: 'background 80ms ease-in, box-shadow 150ms ease',
      }} />

      {/* Top layer — 92px wide, stops 9px above container bottom */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: BOTTOM_OFFSET,
        background: topBg,
        borderRadius: 6,
        border: '2px solid #05171F',
        transform: `translateY(${pressed ? BOTTOM_OFFSET : 0}px)`,
        transition: layerTransition,
      }} />

      {/* Label — fixed, centered, does not shift with top layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: BOTTOM_OFFSET,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: "'VT323', monospace",
          fontSize: 26,
          color: '#05171F',
          lineHeight: 1,
        }}>{label}</span>
      </div>
    </div>
  );
}
