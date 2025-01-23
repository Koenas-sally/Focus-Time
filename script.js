// DOM Elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const progressBar = document.getElementById('progress');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');
const saveSettingsButton = document.getElementById('save-settings-btn');
const muteButton = document.getElementById('mute-btn');

// Initial values
let WORK_MINUTES = 25;
let BREAK_MINUTES = 5;
let isRunning = false;
let isWorkSession = true;
let timer = null;
let timeRemaining = 0;
let totalDuration = 0;
let isMuted = false;

// Create an audio object for the alert sound
const alertSound = new Audio('alert.mp3');

// Update progress bar
function updateProgressBar(timeRemaining, totalDuration) {
  const progressPercentage = ((totalDuration - timeRemaining) / totalDuration) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

// Countdown timer logic
function startCountdown() {
  timer = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;

    updateProgressBar(timeRemaining, totalDuration); // Update the progress bar

    if (timeRemaining === 0) {
      clearInterval(timer);
      isRunning = false;
      isWorkSession = !isWorkSession;
      playAlertSound();
      resetTimer();
    } else {
      timeRemaining--;
    }
  }, 1000);
}

// Play alert sound
function playAlertSound() {
  if (!isMuted) {
    alertSound.play();
  }
}

// Start button handler
startButton.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    if (timeRemaining === 0) {
      timeRemaining = isWorkSession ? WORK_MINUTES * 60 : BREAK_MINUTES * 60;
      totalDuration = timeRemaining;
    }
    startCountdown();
  }
});

// Pause button handler
pauseButton.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
});

// Reset button handler
resetButton.addEventListener('click', resetTimer);

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isWorkSession = true;
  timeRemaining = WORK_MINUTES * 60;
  totalDuration = WORK_MINUTES * 60;
  minutesDisplay.textContent = String(Math.floor(timeRemaining / 60)).padStart(2, '0');
  secondsDisplay.textContent = String(timeRemaining % 60).padStart(2, '0');
  updateProgressBar(0, 1); // Reset progress bar
}

// Save settings handler
saveSettingsButton.addEventListener('click', () => {
  const newWorkDuration = parseInt(workDurationInput.value, 10);
  const newBreakDuration = parseInt(breakDurationInput.value, 10);

  if (newWorkDuration > 0 && newBreakDuration > 0) {
    WORK_MINUTES = newWorkDuration;
    BREAK_MINUTES = newBreakDuration;
    resetTimer();
    alert('Settings saved!');
  } else {
    alert('Please enter valid durations!');
  }
});

// Mute button handler
muteButton.addEventListener('click', () => {
  isMuted = !isMuted;
  muteButton.textContent = isMuted ? 'Unmute' : 'Mute';
});



