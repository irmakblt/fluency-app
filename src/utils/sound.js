let ctx = null;
const buffers = {};

// Call once inside a user gesture handler to create and unlock the AudioContext.
export function initAudioContext() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  } else if (ctx.state === 'suspended') {
    ctx.resume();
  }
}

async function loadBuffer(src) {
  if (buffers[src]) return buffers[src];
  const res = await fetch(src);
  const arrayBuf = await res.arrayBuffer();
  const audioBuf = await ctx.decodeAudioData(arrayBuf);
  buffers[src] = audioBuf;
  return audioBuf;
}

export function playSound(src, volume = 0.5, playbackRate = 1) {
  if (!ctx) return;
  loadBuffer(src).then(buffer => {
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = playbackRate;
    const gain = ctx.createGain();
    gain.gain.value = volume;
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start(0);
  }).catch(() => {});
}
