import Card from '../components/Card';
import completionIcon from '../assets/icons/completion-state-screen-icon.svg';

export default function CompletionScreen({ type, sessionLikedCount, selectedLevel }) {
  let title, message;

  if (type === 'session') {
    title = 'Well done!';
    message = `You just added ${sessionLikedCount} phrase${sessionLikedCount !== 1 ? 's' : ''}, your brain is partying!`;
  } else if (type === 'level') {
    title = 'Congrats!';
    message = `You just finished all the ${selectedLevel} phrases, brain officially upgraded!`;
  } else {
    title = 'Wow!';
    message = "You've finished all the phrases at every level! Time to use them in the wild!";
  }

  return (
    <Card>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
      }}>
        <img
          src={completionIcon}
          alt=""
          style={{ width: 140, height: 140, marginBottom: 24 }}
        />
        <span style={{
          fontFamily: "'VT323', monospace",
          fontSize: 36,
          color: '#05171F',
          marginBottom: 12,
          textAlign: 'center',
        }}>
          {title}
        </span>
        <span style={{
          fontFamily: "'VT323', monospace",
          fontSize: 22,
          color: '#05171F',
          textAlign: 'center',
          lineHeight: 1.3,
          maxWidth: 220,
        }}>
          {message}
        </span>
      </div>
    </Card>
  );
}
