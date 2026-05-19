import { useState } from 'react';
import { playSound } from '../utils/sound';

export default function IconButton({ icon, onClick }) {
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
        width: 56,
        height: 66,
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onPointerLeave={() => setPressed(false)}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => { setPressed(false); playSound('/sounds/primary-sound.mp3'); onClick?.(); }}
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
        boxShadow: shadow,
        transition: 'background 80ms ease-in, box-shadow 150ms ease',
      }} />
      {/* Top layer — moves down on press */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 56,
        height: 57,
        background: topBg,
        borderRadius: 6,
        border: '2px solid #05171F',
        transform: `translateY(${pressed ? 9 : 0}px)`,
        transition: layerTransition,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img src={icon} alt="" style={{ width: 26, height: 26 }} />
      </div>
    </div>
  );
}
