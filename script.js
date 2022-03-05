'use strict';
const timeSetting = document.getElementById('time-setting');
const inputForm = document.getElementById('inputForm');
const endTime = document.getElementById('endtime');
const startTime = document.getElementById('start-count');

const countdownContainer = document.getElementById('countdown-container');
const countdownHeader = document.getElementById('countdown-heading');
const countdownReset = document.getElementById('countdown-reset');
const timeEl = document.querySelectorAll('span');

const completeContainer = document.getElementById('complete-container');
const completeBtn = document.getElementById('complete-button');

let timer = '';
let countdownDate = '';
let countdownValue = new Date(endTime.value);
console.log(countdownValue);
let countdownActive;

let daysEl = document.getElementById('days');
let hoursEl = document.getElementById('hours');
let minsEl = document.getElementById('mins');
let secondsEl = document.getElementById('seconds');
let end;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Input (Today's Date) with min
const currentDate = new Date().toISOString().slice(0, 10);
console.log(currentDate);
endTime.setAttribute('min', currentDate);
// countdownValue = currentDate.getTime();

// Populate Countdown
function countdown() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    console.log(distance);
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide input container
    timeSetting.hidden = true;

    // Show Complete Screen
    if (distance < 0) {
      completeContainer.hidden = true;
      clearInterval(countdownActive);
      completeContainer.hidden = false;
    } else {
      // Show the countdown in progress
      timeEl[0].textContent = `${days}`;
      timeEl[1].textContent = `${hours}`;
      timeEl[2].textContent = `${minutes}`;
      timeEl[3].textContent = `${seconds}`;
      countdownContainer.hidden = false;
    }
  }, 1000);
}

// Take values form Input
function updateCountdown(e) {
  console.log(e);
  e.preventDefault();
  countdownDate = e.target[0].value;

  //   Check Validity
  if (countdownDate === '') {
    alert('Please put a date!');
  } else {
    countdownValue = new Date(countdownDate).getTime();
    countdown();
  }
}

// Click New Countdown Button (Reset)
function newCountdown() {
  timeSetting.hidden = false;
  countdownContainer.hidden = true;
  completeContainer.hidden = true;
  clearInterval(countdownActive);

  //   Reset date
  countdownDate = '';
  endTime.value = '';
}

// Event Listener
inputForm.addEventListener('submit', updateCountdown);
countdownReset.addEventListener('click', newCountdown);
completeBtn.addEventListener('click', newCountdown);
