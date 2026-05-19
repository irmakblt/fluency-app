import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_KEY = 'sk_3d1f7aab77cb339cf3965a993f3d41c7a1c860ecd49b6180';
const VOICE_ID = 'IIDv6GxNiGBZXaMk2cl9';
const MODEL = 'eleven_multilingual_v2';
const DELAY_MS = 500;

const LEVELS = ['a1', 'a2', 'b1'];

const outputDir = path.join(__dirname, 'public', 'sounds', 'phrases');
fs.mkdirSync(outputDir, { recursive: true });

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateAudio(text, outputPath) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: MODEL,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true,
          speed: 0.85,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`ElevenLabs API error ${response.status}: ${err}`);
  }

  const buffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
}

async function main() {
  for (const level of LEVELS) {
    const dataPath = path.join(__dirname, 'src', 'data', `phrases_${level}.json`);
    const phrases = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    console.log(`\nProcessing ${level.toUpperCase()} (${phrases.length} phrases)...`);

    for (let i = 0; i < phrases.length; i++) {
      const phrase = phrases[i];
      const index = String(i + 1).padStart(2, '0');
      const filename = `${level}_${index}.mp3`;
      const outputPath = path.join(outputDir, filename);

      if (fs.existsSync(outputPath)) {
        console.log(`  [skip] ${filename} already exists`);
        continue;
      }

      process.stdout.write(`  [${index}/${String(phrases.length).padStart(2, '0')}] "${phrase.german}" → ${filename} ... `);

      try {
        await generateAudio(phrase.german, outputPath);
        console.log('done');
      } catch (err) {
        console.log(`FAILED: ${err.message}`);
      }

      if (i < phrases.length - 1) {
        await delay(DELAY_MS);
      }
    }
  }

  console.log('\nAll done.');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
