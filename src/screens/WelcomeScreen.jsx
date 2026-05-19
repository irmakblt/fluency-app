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
      }}>
        {/* Icon: centered in remaining space above the text block */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img src={welcomeIcon} alt="" style={{ width: 135, height: 135 }} />
        </div>

        {/* Heading */}
        <span style={{
          fontFamily: "'VT323', monospace",
          fontSize: 47,
          color: '#05171F',
          lineHeight: 1.1,
          marginLeft: 20,
          marginBottom: 20,
        }}>
          FLUENCY LOOKS GOOD ON YOU.
        </span>

        {/* Subheading */}
        <span style={{
          fontFamily: "'VT323', monospace",
          fontSize: 20,
          color: '#05171F',
          letterSpacing: '0.03em',
          marginLeft: 20,
          marginBottom: 40,
        }}>
          No Chaos. Just Learning.
        </span>
      </div>
    </Card>
  );
}
