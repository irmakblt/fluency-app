export function playSound(src, volume = 0.5, playbackRate = 1) {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.playbackRate = playbackRate;
  audio.play().catch(() => {});
}
