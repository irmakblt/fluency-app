import Card from '../components/Card';
import dashboardIcon from '../assets/icons/dashboard-screen-icon.svg';

export default function DashboardScreen({ onOpenLibrary }) {
  return (
    <Card>
      <div style={{
        width: '100%',
        height: '100%',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div
          onClick={onOpenLibrary}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            cursor: 'pointer',
            userSelect: 'none',
            gap: 12,
          }}
        >
          <img src={dashboardIcon} alt="" style={{ width: 120, height: 81 }} />
          <span style={{
            fontFamily: "'VT323', monospace",
            fontSize: 26,
            color: '#05171F',
          }}>
            The Library
          </span>
        </div>
      </div>
    </Card>
  );
}
