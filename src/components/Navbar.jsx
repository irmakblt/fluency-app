const TABS = ['WELCOME', 'LEVEL', 'PRACTICE'];

function Tab({ label, active, marginLeft, onClick }) {
  const borderRadius = {
    WELCOME: '6px 0 0 6px',
    LEVEL: '0',
    PRACTICE: '0 6px 6px 0',
  }[label];

  if (active) {
    return (
      <div
        onClick={onClick}
        style={{
          position: 'relative',
          width: 111,
          height: 60,
          cursor: 'pointer',
          userSelect: 'none',
          flexShrink: 0,
          marginLeft,
        }}
      >
        {/* Active bottom layer */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 111,
          height: 60,
          background: '#073E20',
          borderRadius,
          border: '2px solid #05171F',
        }} />
        {/* Active top layer */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 111,
          height: 51,
          background: '#075A2C',
          borderRadius,
          border: '2px solid #05171F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'VT323', monospace",
            fontSize: 26,
            color: '#F2FFE8',
            letterSpacing: 1,
          }}>{label}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        width: 111,
        height: 69,
        cursor: 'pointer',
        userSelect: 'none',
        flexShrink: 0,
        marginLeft,
      }}
    >
      {/* Inactive bottom layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 111,
        height: 69,
        background: '#075A2C',
        borderRadius,
        border: '2px solid #05171F',
        boxShadow: '0 9px 0 0 rgba(5,25,47,0.4)',
      }} />
      {/* Inactive top layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 111,
        height: 60,
        background: '#01813F',
        borderRadius,
        border: '2px solid #05171F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: "'VT323', monospace",
          fontSize: 26,
          color: '#05171F',
          letterSpacing: 1,
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
