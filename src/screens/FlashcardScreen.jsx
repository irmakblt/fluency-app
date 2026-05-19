import { useState, useEffect, useRef } from 'react';
import Card from '../components/Card';
import IconButton from '../components/IconButton';
import likeIcon from '../assets/icons/flashcards-screen-like-icon.svg';
import dislikeIcon from '../assets/icons/flashcards-screen-dislike-icon.svg';
import soundInactiveIcon from '../assets/icons/phrase-sound-icon-inactive.svg';
import soundActiveIcon from '../assets/icons/phrase-sound-icon-active.svg';

export default function FlashcardScreen({ phrase, onLike, onDislike }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setIsPlaying(false);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [phrase]);

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
  }

  function handleSoundClick() {
    if (isPlaying) {
      stopAudio();
      return;
    }
    const level = phrase.level.toLowerCase();
    const index = String(phrase.id).padStart(2, '0');
    const audio = new Audio(`/sounds/phrases/${level}_${index}.mp3`);
    audioRef.current = audio;
    setIsPlaying(true);
    audio.play().catch(() => {});
    audio.onended = () => {
      setIsPlaying(false);
      audioRef.current = null;
    };
  }

  function handleLike() {
    stopAudio();
    onLike();
  }

  function handleDislike() {
    stopAudio();
    onDislike();
  }

  return (
    <>
      <Card cardHeight={380}>
        <div style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Sound icon — absolute top-right */}
          <img
            src={isPlaying ? soundActiveIcon : soundInactiveIcon}
            alt=""
            onClick={handleSoundClick}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 40,
              height: 40,
              cursor: 'pointer',
            }}
          />

          {/* German phrase — starts 10px below icon bottom (paddingTop: 60 = 10+40+10) */}
          <div style={{
            height: 170,
            display: 'flex',
            alignItems: 'flex-start',
            padding: '60px 20px 0 20px',
          }}>
            <span style={{
              fontFamily: "'VT323', monospace",
              fontSize: 24,
              color: '#05171F',
              lineHeight: 1,
              textAlign: 'left',
            }}>
              {phrase.german}
            </span>
          </div>

          {/* Dashed divider at 170px from top of content area */}
          <div style={{
            width: 293,
            height: 2,
            alignSelf: 'center',
            background: 'repeating-linear-gradient(to right, #05171F 0px, #05171F 6px, transparent 6px, transparent 12px)',
          }} />

          {/* English translation — 20px below divider, left-aligned */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            padding: '20px 20px 0 20px',
          }}>
            <span style={{
              fontFamily: "'VT323', monospace",
              fontSize: 22,
              color: '#05171F',
              lineHeight: 1,
              textAlign: 'left',
            }}>
              {phrase.english}
            </span>
          </div>
        </div>
      </Card>

      {/* Like / Dislike row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 329,
        padding: '0 20px',
      }}>
        <IconButton icon={dislikeIcon} onClick={handleDislike} />
        <IconButton icon={likeIcon} onClick={handleLike} />
      </div>
    </>
  );
}
