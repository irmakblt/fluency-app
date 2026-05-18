export default function Card({ children, style, cardHeight = 480 }) {
  const l5h = cardHeight;
  const l4h = l5h - 9;
  const innerH = l4h - 34;
  const l2h = innerH - 9;
  const l1h = innerH - 18;

  return (
    <div style={{ position: 'relative', width: 329, height: l5h, ...style }}>
      {/* Layer 5 - bottom shadow base */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 329,
        height: l5h,
        background: '#712721',
        borderRadius: 6,
        border: '2px solid #05171F',
        boxShadow: '0 9px 0 0 rgba(5,25,47,0.4)',
      }} />
      {/* Layer 4 - red outer frame */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 329,
        height: l4h,
        background: '#A9382E',
        borderRadius: 6,
        border: '2px solid #05171F',
        boxShadow: 'inset 0 2px 0 0 #FFB1AA',
      }}>
        {/* Layers 3, 2, 1 — centered inside layer 4, bottom-aligned */}
        <div style={{
          position: 'absolute',
          bottom: 17,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 295,
          height: innerH,
        }}>
          {/* Layer 3 */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 295,
            height: innerH,
            background: '#C76057',
            borderRadius: 6,
            border: '2px solid #05171F',
          }} />
          {/* Layer 2 */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 295,
            height: l2h,
            background: '#05171F',
            borderRadius: 6,
            border: '2px solid #05171F',
          }} />
          {/* Layer 1 - content */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 295,
            height: l1h,
            background: '#F6FFEF',
            borderRadius: 6,
            border: '2px solid #05171F',
            overflow: 'hidden',
          }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
