import { useState } from 'react';

export default function PrimaryButton({ children, onClick, disabled, width = 329 }) {
  const [pressed, setPressed] = useState(false);

  const bottomBg = disabled ? '#2F3A4F' : '#0B2C69';
  const topBg = disabled ? '#485E87' : '#1654C7';
  const topShift = !disabled && pressed ? 4 : 0;

  return (
    <div
      style={{
        position: 'relative',
        width: width,
        height: 60,
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
      }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => { if (!disabled) { setPressed(false); onClick?.(); } }}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => !disabled && setPressed(true)}
      onTouchEnd={() => { if (!disabled) { setPressed(false); onClick?.(); } }}
    >
      {/* Bottom layer */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width,
        height: 60,
        background: bottomBg,
        borderRadius: 6,
        border: '2px solid #05171F',
      }} />
      {/* Top layer */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width,
        height: 51,
        background: topBg,
        borderRadius: 6,
        border: '2px solid #05171F',
        transform: `translateY(-${topShift}px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: pressed ? 'none' : 'transform 0.08s ease-out',
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
