const cache = {};
let unlocked = false;

function getAudio(src) {
  if (!cache[src]) {
    const audio = new Audio(src);
    audio.preload = 'auto';
    cache[src] = audio;
  }
  return cache[src];
}

export function preloadSounds(srcs) {
  srcs.forEach(src => getAudio(src));
}

// Call once on the first user interaction to prime decoding and unlock iOS audio.
export function unlockAudio() {
  if (unlocked) return;
  unlocked = true;
  Object.values(cache).forEach(audio => {
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
    }).catch(() => {});
  });
}

export function playSound(src, volume = 0.5, playbackRate = 1) {
  const audio = getAudio(src);
  audio.volume = volume;
  audio.playbackRate = playbackRate;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}
