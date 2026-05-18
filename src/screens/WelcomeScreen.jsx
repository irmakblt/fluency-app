import Card from '../components/Card';
import welcomeIcon from '../assets/icons/welcome-screen-icon.svg';

export default function WelcomeScreen() {
  return (
    <Card>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px 24px',
      }}>
        <img
          src={welcomeIcon}
          alt=""
          style={{ width: 135, height: 135, marginBottom: 28 }}
        />
        <span style={{
          fontFamily: "'VT323', monospace",
          fontSize: 40,
          color: '#05171F',
          textAlign: 'left',
          lineHeight: 1.1,
          marginBottom: 16,
          alignSelf: 'flex-start',
        }}>
          FLUENCY LOOKS GOOD ON YOU.
        </span>
        <span style={{
          fontFamily: "'VT323', monospace",
          fontSize: 20,
          color: '#05171F',
          textAlign: 'left',
          alignSelf: 'flex-start',
        }}>
          No Chaos. Just Learning.
        </span>
      </div>
    </Card>
  );
}
