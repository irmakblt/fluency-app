import Card from '../components/Card';
import arrowLeft from '../assets/icons/level-screen-arrow-left.svg';
import arrowRight from '../assets/icons/level-screen-arrow-right.svg';

const LEVELS = ['A1', 'A2', 'B1'];

export default function LevelSelectionScreen({ selectedLevel, completedLevels, onSelect }) {
  return (
    <Card>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        padding: '24px',
      }}>
        {LEVELS.map((level) => {
          const isSelected = selectedLevel === level;
          const isCompleted = completedLevels.includes(level);

          return (
            <div
              key={level}
              onClick={() => !isCompleted && onSelect(level)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                cursor: isCompleted ? 'not-allowed' : 'pointer',
                opacity: isCompleted ? 0.35 : 1,
                userSelect: 'none',
              }}
            >
              <img
                src={arrowLeft}
                alt=""
                style={{
                  width: 40,
                  height: 40,
                  visibility: isSelected ? 'visible' : 'hidden',
                }}
              />
              <span style={{
                fontFamily: "'VT323', monospace",
                fontSize: 36,
                color: '#05171F',
                letterSpacing: 2,
                minWidth: 140,
                textAlign: 'center',
              }}>
                LEVEL-{level}
              </span>
              <img
                src={arrowRight}
                alt=""
                style={{
                  width: 40,
                  height: 40,
                  visibility: isSelected ? 'visible' : 'hidden',
                }}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
