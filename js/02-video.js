import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerElement = document.getElementById('vimeo-player');
const player = new Player(playerElement);
const storageKey = 'videoplayer-current-time';

player.on('timeupdate', throttle(handleTimeUpdate, 1000));

function handleTimeUpdate(event) {
  const currentTime = event.seconds;
  localStorage.setItem(storageKey, currentTime.toString());
}

async function restorePlayerTime() {
  try {
    const savedTime = localStorage.getItem(storageKey);
    if (savedTime !== null) {
      await player.setCurrentTime(parseFloat(savedTime));
    }
  } catch (error) {
    console.error('Error restoring player time:', error);
  }
}

restorePlayerTime();
