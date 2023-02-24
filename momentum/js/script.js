const time = document.querySelector('.time');
const dateInfo = document.querySelector('.date');
const greetingContainer = document.querySelector('.greeting-container');
const greeting = document.querySelector('.greeting');
const greetingText = document.querySelector('.name');
const date = new Date();
const body = document.querySelector('body');
const timeOfDay = getTimeOfDay();
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const hours = date. getHours();

///Time & date
function showTime() {
    const date = new Date();
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

///Greeting
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

///Slider & background
let randomNum = getRandomNum(1, 20);

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBg() {
    let timeOfDay = getTimeOfDay();
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum
        .toString()
        .padStart(2, '0')}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    };
}
setBg();

function getSlideNext() {
    randomNum = randomNum !== 20 ? randomNum + 1 : 1;
    setBg();
}

function getSlidePrev() {
    randomNum = randomNum !== 1 ? randomNum - 1 : 20;
    setBg();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

///Weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weather = document.querySelector('.weather');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherErr = document.querySelector('.weather-error');
let lang = 'en';


async function getWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=f5d1d74c3abc367654445530b2812b8b&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
        humidity.textContent = `Humidity: ${data.main.humidity} %`;
        wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
    } catch (err) {
        weatherErr.textContent = `Error ${city.value} is not found`;
    }
}

function setWeather(e) {
    if(e.type === 'keypress') {
        if(e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('city', e.target.innerText);
            city.blur();
        }
    } else {
        localStorage.setItem('city', e.target.innerText);
    }
}

city.addEventListener('keypress', setWeather);
city.addEventListener('blur', setWeather);

city.addEventListener('change', () => {
    getWeather();
    location.reload();
});

function setLocalStorageWeather() {
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorageWeather);

function getLocalStorageWeather() {
    if (localStorage.getItem('city')) {
        city.value =localStorage.getItem('city');
    }
    getWeather();
}
window.addEventListener('load', getLocalStorageWeather);

///Quotes

