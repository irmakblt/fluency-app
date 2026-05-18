import Card from '../components/Card';

export default function LearnedPhrasesScreen({ phrases }) {
  return (
    <Card>
      <div style={{
        width: '100%',
        height: '100%',
        padding: '20px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {phrases.length === 0 ? (
          <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: "'VT323', monospace",
              fontSize: 22,
              color: '#05171F',
              textAlign: 'center',
            }}>
              Nothing here… yet!
            </span>
          </div>
        ) : (
          phrases.map((phrase, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <span style={{
                fontFamily: "'VT323', monospace",
                fontSize: 20,
                color: '#05171F',
                lineHeight: 1.3,
              }}>
                - {phrase.german}
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
