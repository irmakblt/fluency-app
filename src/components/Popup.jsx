import Card from './Card';
import PrimaryButton from './PrimaryButton';
import popupIcon from '../assets/icons/popup-screens-icon.svg';

export default function Popup({ type, onClose, onAction }) {
  const isOops = type === 'oops';
  const title = isOops ? 'OOPS!' : 'HOLD ON!';
  const message = isOops
    ? 'Pick a level first so you can start your practice.'
    : 'Exiting now will cancel this practice. Are you sure you want to leave?';

  return (
    <Card>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px 20px',
        position: 'relative',
      }}>
        {/* X close button — OOPS only */}
        {isOops && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'VT323', monospace",
              fontSize: 24,
              color: '#05171F',
              lineHeight: 1,
              padding: 4,
            }}
          >
            X
          </button>
        )}

        <img src={popupIcon} alt="" style={{ width: 100, height: 84, marginBottom: 16 }} />

        <span style={{
          fontFamily: "'VT323', monospace",
          fontSize: 32,
          color: '#05171F',
          marginBottom: 10,
          textAlign: 'center',
        }}>
          {title}
        </span>

        <span style={{
          fontFamily: "'VT323', monospace",
          fontSize: 20,
          color: '#05171F',
          textAlign: 'center',
          lineHeight: 1.3,
          marginBottom: 24,
          maxWidth: 220,
        }}>
          {message}
        </span>

        {isOops ? (
          <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
            <PrimaryButton onClick={onAction} width={255}>SELECT</PrimaryButton>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'row', gap: 10, width: '100%' }}>
            <PrimaryButton onClick={onAction} width={122}>LEAVE</PrimaryButton>
            <PrimaryButton onClick={onClose} width={122}>STAY</PrimaryButton>
          </div>
        )}
      </div>
    </Card>
  );
}
