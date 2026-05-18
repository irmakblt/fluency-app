import { useState } from 'react';

export default function IconButton({ icon, onClick }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const bottomBg = hovered ? '#825B27' : '#A8752F';
  const topBg = hovered ? '#B27E36' : '#E19F43';
  const topShift = pressed ? 4 : 0;

  return (
    <div
      style={{
        position: 'relative',
        width: 56,
        height: 66,
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => { setPressed(false); onClick?.(); }}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => { setPressed(false); onClick?.(); }}
    >
      {/* Bottom layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 56,
        height: 66,
        background: bottomBg,
        borderRadius: 6,
        border: '2px solid #05171F',
      }} />
      {/* Top layer — top-aligned */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 56,
        height: 57,
        background: topBg,
        borderRadius: 6,
        border: '2px solid #05171F',
        transform: `translateY(${topShift}px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: pressed ? 'none' : 'transform 0.08s ease-out',
      }}>
        <img src={icon} alt="" style={{ width: 26, height: 26 }} />
      </div>
    </div>
  );
}
