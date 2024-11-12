const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById
    ('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('forw');

// Music
const songs = [
    {
        name: 'Govhochist',
        displayName: 'Govhochist',
        artist: 'Ilushka',
    },
    {
        name: 'indiscriminate-man',
        displayName: 'Indiscriminate Man',
        artist: 'Ilushka',
    },
    {
        name: 'Descent Into The Porcelain Abyss',
        displayName: 'Descent Into The Porcelain Abyss',
        artist: 'Ilushka',
    },
    {
        name: 'The Porcelain Abyss',
        displayName: 'The Porcelain Abyss',
        artist: 'Ilushka',
    },
    {
        name: 'Govnovoz-1',
        displayName: 'Govnovoz-1',
        artist: 'Ilushka',
    },
    {
        name: 'Govnovoz-2',
        displayName: 'Govnovoz-2',
        artist: 'Ilushka',
    },
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playButton.addEventListener('click', () => isPlaying ? pauseSong() : playSong());

// Updtae DOM 
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpeg`
}

// Current Song
let songIndex = 0;

// Prev Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
}


// On Load - Select Firs Song
loadSong(songs[songIndex]);

// Update Progress Bar and Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        console.log(duration, currentTime);
        // Update progress bar witdth
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        durationSeconds = durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        currentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);