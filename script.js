const songs = [
  { src: 'song.mp3', name: 'Veloce — Aggressive', img: 'hero.jpg' },
  { src: 'song2.mp3', name: 'Chubina East Duo — Chilling', img: 'images.jpg' }
];

let current = 0;
const audio = document.getElementById('audio');
const disc = document.getElementById('disc');
const playIcon = document.getElementById('playIcon');
const progressFill = document.getElementById('progressFill');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const trackName = document.getElementById('trackName');

function loadSong(index) {
  audio.src = songs[index].src;
  trackName.textContent = songs[index].name;
  document.querySelector('.disc-img').src = songs[index].img;
  progressFill.style.width = '0%';
  currentTimeEl.textContent = '0:00';
  durationEl.textContent = '0:00';
}

function switchSong(index) {
  const wasPlaying = !audio.paused;
  current = index;
  loadSong(index);
  document.querySelectorAll('.song-tab').forEach((t, i) => t.classList.toggle('active', i === index));
  if (wasPlaying) audio.play();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playIcon.className = 'fa-solid fa-pause';
    disc.classList.add('spinning');
  } else {
    audio.pause();
    playIcon.className = 'fa-solid fa-play';
    disc.classList.remove('spinning');
  }
}

function changeVolume(delta) {
  audio.volume = Math.min(1, Math.max(0, audio.volume + delta));
}

function seekAudio(e) {
  const bar = document.getElementById('progressBar');
  audio.currentTime = (e.offsetX / bar.offsetWidth) * audio.duration;
}

function fmt(s) {
  return isNaN(s) ? '0:00' : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    progressFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
    currentTimeEl.textContent = fmt(audio.currentTime);
  }
});

audio.addEventListener('loadedmetadata', () => { durationEl.textContent = fmt(audio.duration); });

audio.addEventListener('ended', () => {
  playIcon.className = 'fa-solid fa-play';
  disc.classList.remove('spinning');
  progressFill.style.width = '0%';
  currentTimeEl.textContent = '0:00';
});

// Contact form
function sendMail(e) {
  e.preventDefault();
  const toast = document.querySelector('.form-toast');
  if (toast) { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000); }
  e.target.reset();
}

loadSong(0);
