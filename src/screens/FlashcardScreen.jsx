import { useState, useEffect, useRef } from 'react';
import Card from '../components/Card';
import IconButton from '../components/IconButton';
import soundInactiveIcon from '../assets/icons/phrase-sound-icon-inactive.svg';
import soundActiveIcon from '../assets/icons/phrase-sound-icon-active.svg';

function ProgressBar({ filled }) {
  return (
    <div style={{
      position: 'relative',
      width: 100,
      height: 13,
      flexShrink: 0,
      background: '#F6FFEF',
      border: '1.5px solid #05171F',
      boxSizing: 'border-box',
      overflow: 'hidden',
      clipPath: 'polygon(2px 0%, calc(100% - 2px) 0%, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0% calc(100% - 2px), 0% 2px)',
    }}>
      {/* Single growing green bar */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: `${(filled / 20) * 100}%`,
        background: 'linear-gradient(to bottom, #01813F 60%, #075A2C 60%)',
        transition: 'width 600ms cubic-bezier(0.4, 0, 0.2, 1)',
      }} />
      {/* Segment dividers overlay — transparent, only divider lines show */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'row',
      }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} style={{
            flex: 1,
            height: '100%',
            borderRight: i < 9 ? '1.5px solid #073E20' : 'none',
          }} />
        ))}
      </div>
    </div>
  );
}

export default function FlashcardScreen({ phrase, onLike, onDislike, learnedCount }) {
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
          {/* Progress bar — absolute, left-aligned, vertically centered with sound icon */}
          {/* Sound icon: top=10, height=40 → center y=30. Bar height=13 → top=30-6.5=23.5 */}
          <div style={{ position: 'absolute', top: 23.5, left: 20 }}>
            <ProgressBar filled={learnedCount} />
          </div>

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

          {/* German phrase — 18px below icon bottom (paddingTop: 10+40+18=68) */}
          <div style={{
            height: 170,
            display: 'flex',
            alignItems: 'flex-start',
            padding: '68px 20px 0 20px',
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
            padding: '25px 20px 0 20px',
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
        <IconButton label="Repeat" onClick={handleDislike} />
        <IconButton label={"Got it"} onClick={handleLike} />
      </div>
    </>
  );
}
