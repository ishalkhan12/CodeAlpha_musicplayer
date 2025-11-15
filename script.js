const songs = [
  { title: "Calm Breeze", src: "songs/song1.mp3", cover: "https://coverartworks.com/wp-content/uploads/2021/08/Alone-jpg.webp" },
  { title: "Night Sky", src: "songs/song2.mp3", cover: "https://media.istockphoto.com/id/1475307058/vector/vinyl-record-with-album-cover-on-package-music-retro-vintage-concept-flat-stylevector.jpg?s=612x612&w=0&k=20&c=z10rfEzZ-heVXJw_y8n_Pkota7xn4hjjNZ9Tn2tMS4s=" },
  { title: "Ocean Waves", src: "songs/song3.mp3", cover: "https://media.istockphoto.com/id/1476716727/photo/a-12-inch-lp-vinyl-record-isolated-on-white-background-with-clipping-paths.jpg?s=612x612&w=0&k=20&c=o-BXar5Z01t17L2UH8AgBm0iS_s7QvNs4OyoIBkEEts=" }
];


let currentSong = 0;
const audio = new Audio();
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const time = document.getElementById("time");
const player = document.querySelector(".cover");

function loadSong(song) {
  audio.src = song.src;
  title.textContent = song.title;
  cover.src = song.cover;
}
loadSong(songs[currentSong]);

function playSong() {
  audio.play();
  playBtn.innerHTML = "⏸";
  player.classList.add("playing");
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = "▶️";
  player.classList.remove("playing");
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;
  time.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
