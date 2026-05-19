import { playSound } from '../utils/sound';

const TABS = ['WELCOME', 'LEVEL', 'PRACTICE'];

function Tab({ label, active, marginLeft, onClick }) {
  const borderRadius = {
    WELCOME: '6px 0 0 6px',
    LEVEL: '0',
    PRACTICE: '0 6px 6px 0',
  }[label];

  const timing = active ? '100ms ease-in' : '200ms ease-out';
  const transition = `height ${timing}, top ${timing}, background ${timing}, box-shadow ${timing}`;

  return (
    <div
      onClick={() => { playSound('/sounds/navbar-sound.mp3', 0.5, 1.5); onClick(); }}
      style={{
        position: 'relative',
        width: 111,
        height: active ? 60 : 69,
        cursor: 'pointer',
        userSelect: 'none',
        flexShrink: 0,
        marginLeft,
        transition: `height ${timing}`,
      }}
    >
      {/* Bottom layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 111,
        height: active ? 60 : 69,
        background: active ? '#073E20' : '#075A2C',
        borderRadius,
        border: '2px solid #05171F',
        boxShadow: active ? '0 9px 0 0 rgba(5,25,47,0)' : '0 9px 0 0 rgba(5,25,47,0.4)',
        transition,
      }} />
      {/* Top layer */}
      <div style={{
        position: 'absolute',
        top: active ? 9 : 0,
        left: 0,
        width: 111,
        height: active ? 51 : 60,
        background: active ? '#075A2C' : '#01813F',
        borderRadius,
        border: '2px solid #05171F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition,
      }}>
        <span style={{
          fontFamily: "'VT323', monospace",
          fontSize: 26,
          color: active ? '#F2FFE8' : '#05171F',
          letterSpacing: 1,
          transition: `color ${timing}`,
        }}>{label}</span>
      </div>
    </div>
  );
}

export default function Navbar({ activeTab, onTabClick }) {
  return (
    <div style={{
      width: 390,
      display: 'flex',
      justifyContent: 'center',
      padding: '0 30px',
    }}>
      <div style={{
        display: 'flex',
        width: 329,
        alignItems: 'flex-start',
      }}>
        {TABS.map((tab, i) => (
          <Tab
            key={tab}
            label={tab}
            active={activeTab === tab}
            marginLeft={i > 0 ? -2 : 0}
            onClick={() => onTabClick(tab)}
          />
        ))}
      </div>
    </div>
  );
}
