let [miliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let [ms, s, m, h] = [0, 0, 0, 0];
let lapList = [];
let intervalId = null;

const displayTimerElement = document.querySelector('.js-timer-display');
const startbuttonElement = document.getElementById('js-start-pause-button'); 
const resetbuttonElement = document.querySelector('.js-reset-button');
const lapbuttonElement = document.querySelector('.js-lap-button');

startbuttonElement.addEventListener('click', start_pause);
resetbuttonElement.addEventListener('click', reset);
lapbuttonElement.addEventListener('click', displayTimeStamp);

renderlapList();

function start_pause() {
  if(startbuttonElement.innerText === 'Start') {
    intervalId = setInterval(displayTimer, 10);
    startbuttonElement.innerText = 'Pause';
    startbuttonElement.classList.remove('start-button');
    startbuttonElement.classList.add('pause-button');
  }
  else {
    clearInterval(intervalId);

    startbuttonElement.innerText = 'Start';
    startbuttonElement.classList.add('start-button');
    startbuttonElement.classList.remove('pause-button');
  }
}

function reset() {
  clearInterval(intervalId);
  [miliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  displayTimerElement.innerHTML = '00 : 00 : 00 : 00';
  document.querySelector('.js-laps-list').innerHTML = '';

  number = 0;
  lapList = [];

  if (startbuttonElement.innerText === 'Pause') {
    startbuttonElement.innerText = 'Start';
    startbuttonElement.classList.add('start-button');
    startbuttonElement.classList.remove('pause-button');
  }
}

function displayTimeStamp() {
  if(startbuttonElement.innerText === 'Pause') {
    const timeStamp = displayTimerElement.innerHTML;
    lapList.push(timeStamp)
    renderlapList();
  }
}

function renderlapList() {
  let lapListHTML = '';
  lapList.forEach(
    (ts, i) => {
      lapListHTML += 
      `<li class="lap-item">
      <span class="number">#${i + 1}</span>
      <span class="time-stamp">${ts}</span>
      <img src="/Images/cancel.png" alt="x" class="js-delete delete">
      </li>`
    }
  )

  const laplistElement = document.querySelector('.js-laps-list');
  laplistElement.innerHTML = lapListHTML;

  document.querySelectorAll('.js-delete').forEach(
    (val, index) => {
      val.addEventListener(
        'click', 
        () => {
          lapList.splice(index, 1);
          renderlapList();
        }
      );
    }
  )
}

function displayTimer() {
  miliseconds += 10;
  if(miliseconds === 1000) {
    miliseconds = 0
    seconds++;
    if(seconds === 60) {
      seconds = 0;
      minutes++;
      if(minutes === 60) {
        minutes = 0;
        hours++;
        if(hours === 24) {
          resetfunction();
        }
      }
    }
  }

  h = hours < 10 ? '0' + hours : hours;
  m = minutes < 10 ? '0' + minutes : minutes;
  s = seconds < 10 ? '0' + seconds : seconds;
  ms =  '' + miliseconds;
  ms = ms.slice(0, 2);

  displayTimerElement.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}

