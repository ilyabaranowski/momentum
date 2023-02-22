const time = document.querySelector('.time');
const dateInfo = document.querySelector('.date');
const greetingContainer = document.querySelector('.greeting-container');
const greeting = document.querySelector('.greeting');
const greetingText = document.querySelector('.name');
const date = new Date();


///////////////////Time & date
function showTime() {
    const currentTime = date.toLocaleTimeString('en-US', {hour12: false});
    time.textContent = currentTime;

    function showDate() {
        const options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        };
        const currentDate = date.toLocaleDateString('en-Us', options);
        dateInfo.textContent = currentDate;
    }
    showDate();
    setTimeout(showTime, 1000);
    showGreeting();
}
showTime();

//////////////Greeting
function getTimeOfDay(){
    const hours = date.getHours();
    let text;
    if (hours >= 6 && hours < 12) text = 'morning';
    if (hours >= 12 && hours < 18) text = 'afternoon';
    if (hours >= 18 && hours < 24) text = 'evening';
    if (hours >= 00 && hours < 6) text = 'night';
    return text;
}

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    greeting.textContent = `Good ${timeOfDay},`;
}

function setLocalStorage() {
    localStorage.setItem('greetingText', greetingText.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('greetingText')) {
        greetingText.value = localStorage.getItem('greetingText');
    }
}
window.addEventListener('load', getLocalStorage)
