import { useState } from 'react';
import { playSound } from '../utils/sound';

export default function PrimaryButton({ children, onClick, disabled, width = 329 }) {
  const [pressed, setPressed] = useState(false);

  let bottomBg, topBg;
  if (disabled) {
    bottomBg = '#2F3A4F';
    topBg = '#485E87';
  } else if (pressed) {
    bottomBg = '#08265B';
    topBg = '#063894';
  } else {
    bottomBg = '#0B2C69';
    topBg = '#1654C7';
  }

  const translateY = pressed ? 9 : 0;
  const topShadow = (!pressed && !disabled) ? '0 9px 0 0 rgba(5,25,47,0.3)' : 'none';
  const layerTransition = pressed
    ? 'transform 80ms ease-in, background 80ms ease-in'
    : 'transform 150ms ease-out, background 150ms ease-out';

  return (
    <div
      style={{
        position: 'relative',
        width,
        height: 60,
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
      }}
      onMouseLeave={() => setPressed(false)}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => { if (!disabled) { setPressed(false); playSound('/sounds/primary-sound.mp3'); onClick?.(); } }}
      onTouchStart={() => !disabled && setPressed(true)}
      onTouchEnd={() => { if (!disabled) { setPressed(false); playSound('/sounds/primary-sound.mp3'); onClick?.(); } }}
    >
      {/* Bottom layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height: 60,
        background: bottomBg,
        borderRadius: 6,
        border: '2px solid #05171F',
        boxShadow: topShadow,
        transition: 'background 80ms ease-in, box-shadow 150ms ease',
      }} />
      {/* Top layer — moves down on press */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height: 51,
        background: topBg,
        borderRadius: 6,
        border: '2px solid #05171F',
        transform: `translateY(${translateY}px)`,
        transition: layerTransition,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: "'VT323', monospace",
          fontSize: 24,
          color: '#F2FFE8',
          letterSpacing: 2,
        }}>
          {children}
        </span>
      </div>
    </div>
  );
}
