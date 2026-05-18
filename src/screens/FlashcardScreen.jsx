import Card from '../components/Card';
import IconButton from '../components/IconButton';
import likeIcon from '../assets/icons/flashcards-screen-like-icon.svg';
import dislikeIcon from '../assets/icons/flashcards-screen-dislike-icon.svg';

export default function FlashcardScreen({ phrase, onLike, onDislike }) {
  return (
    <>
      <Card cardHeight={380}>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            padding: '20px 20px 12px',
          }}>
            <span style={{
              fontFamily: "'VT323', monospace",
              fontSize: 26,
              color: '#05171F',
              lineHeight: 1.3,
            }}>
              {phrase.german}
            </span>
          </div>
          <div style={{
            width: 293,
            height: 2,
            alignSelf: 'center',
            background: 'repeating-linear-gradient(to right, #05171F 0px, #05171F 6px, transparent 6px, transparent 12px)',
          }} />
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            padding: '12px 20px 20px',
          }}>
            <span style={{
              fontFamily: "'VT323', monospace",
              fontSize: 22,
              color: '#05171F',
              lineHeight: 1.3,
            }}>
              {phrase.english}
            </span>
          </div>
        </div>
      </Card>

      {/* Like / Dislike row — sits between card and divider */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 329,
        padding: '0 20px',
      }}>
        <IconButton icon={dislikeIcon} onClick={onDislike} />
        <IconButton icon={likeIcon} onClick={onLike} />
      </div>
    </>
  );
}
