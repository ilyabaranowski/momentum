///Time & date
const time = document.querySelector('.time');
const dateInfo = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const date = new Date();

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
const greetingText = document.querySelector('.name');

function getTimeOfDay(){
    const hours = date.getHours();
    let text;
    if (hours >= 6 && hours < 12) text = 'morning';
    else if (hours >= 12 && hours < 18) text = 'afternoon';
    else if (hours >= 18 && hours < 24) text = 'evening';
    else text = 'night';
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
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
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
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {
    const quotes = `./quotes/quotes-${lang}.json`;
    const res = await fetch(quotes);
    const data =await res.json();
    let randomQuote = getRandomQuote(data.length);
    quote.textContent = data[randomQuote].text;
    author.textContent = data[randomQuote].author;
}
getQuotes();

changeQuote.onclick = () => {
    getQuotes()
};

function getRandomQuote (num) {
    return Math.ceil(Math.random() * num);
};

///AudioPlayer
const player = document.querySelector('.player');
const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playListAudio = document.querySelector('.play-list');
const songTitle = document.querySelector('.song-title');

import playList from "./playList.js";

const audio = document.createElement('audio');
let isPlay = false;
let playNum = 0;

audio.src = playList[playNum].src;
showSongTitle();

//create playlist
playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    playListAudio.appendChild(li);
});

//show current track name in title
function showSongTitle() {
    songTitle.innerHTML = playList[playNum].title;
}

//play track on click (track name)
const itemList = Array.from(document.querySelectorAll('.play-item'));

for(let item of itemList) {
    item.addEventListener('click', () => {
        let index = itemList.findIndex(el => el.textContent === item.textContent);
        if (playNum == index && isPlay) {
            playAudio();
            itemList[playNum].classList.remove('item-pause');
        } else if(playNum == index && !isPlay) {
            pauseAudio();
            itemList[playNum].classList.add('item-pause');
        } else {
            playNum = index;
            itemList.forEach(el => {el.classList.remove('item-active');
            el.classList.remove('item-pause');
            });

            audio.src = playList[playNum].src;
            itemActive(playNum);
            itemList[playNum].classList.add('item-pause');

            playAudio();
        }
    });
}

//start player with control panel
function startPlayAudio() {
    if(!isPlay) {
        playAudio();
        itemActive(playNum);
        itemList[playNum].classList.add('item-pause');
    } else {
        pauseAudio();
        itemList[playNum].classList.remove('item-pause');
    }
}

function itemActive(playNum) {
    itemList[playNum].classList.add('item-active');
    itemList[playNum].classList.add('item-pause');
    itemList[playNum].scrollIntoView({block:'center', behavior:'smooth'});
}

function itemInactive(playNum){
    itemList[playNum].classList.remove('item-active');
    itemList[playNum].classList.remove('item-pause');
}

function playAudio() {
    showSongTitle();
    audio.play();
    isPlay = true;
    play.classList.add('pause');
}

function pauseAudio() {
    audio.pause();
    isPlay = false;
    play.classList.remove('pause');
}

play.addEventListener('click', startPlayAudio);

//switch to the next track
function playNextTrack() {
    itemInactive(playNum);
    playNum++;
    if(playNum > (playList.length - 1)){playNum = 0};
    audio.src = playList[playNum].src;
    itemActive(playNum);
    playAudio();
    play.classList.add('pause');
};

playNext.onclick = () => {playNextTrack()};

//switch to prev track
function playPrevTrack() {
    itemInactive(playNum);
    playNum--;
    if(playNum < 0){playNum = playList.length - 1};
    audio.src = playList[playNum].src;
    itemActive(playNum);
    playAudio();
};

playPrev.onclick = () => {playPrevTrack()};

audio.addEventListener('ended', playNextTrack);

const progressBar = document.querySelector('#progress-bar');

progressBar.addEventListener('click', changeProgressBar);

function changeProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
};


function updateProgressValue() {
    if(audio.duration){
        progressBar.max = audio.duration;
    }
    progressBar.value = audio.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(audio.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(audio.duration)));
    }
};

//convert mm to ss
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    };
    return `${min}:${sec}`;
};

//update player indicator
setInterval(updateProgressValue, 500);

//volume settings
const  volume = document.querySelector('#volumeRange');
volume.value = audio.volume;
volume.addEventListener('input', function () {
    audio.volume = volume.value;
});

const muteButton = document.querySelector('.volume');

muteButton.addEventListener('click', () => {
    audio.muted = !audio.muted;
    if(audio.muted) {
        muteButton.classList.remove('volume');
        muteButton.classList.add('volume-off');
    } else {
        muteButton.classList.add('volume');
        muteButton.classList.remove('volume-off');
    }
});

///Background API
async function getLinkToImageUnsplash() {
    const url =
        "https://api.unsplash.com/photos/random?query=morning&client_id=s3Tks4rgDK_CnQQ_DsFAQN7Br6aC0eWATJu7D-Rmis0";
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = data.urls.regular;
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    };
}

async function getLinkToImageFlickr() {
    const url =
        "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=643fc387f6573e07275e7664f38a5148&tags=nature&extras=url_l&format=json&nojsoncallback=1";
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = data.photos.photo[1].url_l;
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    };
}

///Settings
const openMenu = document.querySelector('.open-settings');
const settingsMenu = document.querySelector('.settings-menu');
const checkboxButton = document.querySelectorAll('.chekbox-button');

checkboxButton.forEach(e=> {
    if(localStorage[e.id] == 'false'){
        e.checked = false;
        document.querySelector(`.${e.name}`).classList.toggle('hidden');
    }
});

openMenu.onclick = () => {
    settingsMenu.classList.toggle('show');
    openMenu.classList.toggle('open-settings-active');
}

settingsMenu.addEventListener('click', e => {
    if(e.target.name && e.target.name !='tag'){
        document.querySelector(`.${e.target.name}`).classList.toggle('hidden');
        localStorage.setItem(e.target.name, document.getElementById(`${e.target.name}`).checked);
    }
});

///ToDo-list
const openTodo = document.querySelector('.open-list');
const todoMenu = document.querySelector('.todo-menu');

openTodo.onclick = () =>{
    todoMenu.classList.toggle('show');
}

const list = document.querySelector('.todo-list');
let items = list.children;
const newItemForm = document.querySelector('.add-form');
const taskTemplate = document.querySelector('#task-template').content;
const newItemTemplate = taskTemplate.querySelector('.todo-list-item');
const newItemTitle = newItemForm.querySelector('.add-form-input');
const emptyList = document.querySelector('.empty-list');
const emptyButton = document.querySelector('.empty-list-button');

emptyButton.onclick = ()=>{
    emptyList.classList.toggle('hidden');
    newItemForm.classList.toggle('show');
    newItemTitle.focus();
}

newItemTitle.placeholder = ['newTodo'];
emptyList.querySelector('span').textContent = ['noTodo'];
emptyButton.textContent = ['newTodo'];

let itemSotrage = [];
if(localStorage.getItem('todo')){
    itemSotrage = JSON.parse(localStorage.getItem('todo'));
    itemSotrage.forEach(e => tasksOut(e));
    toggleEmptyListMessage();
}

//tasks out
function tasksOut(value){
    const taskText = value;
    const task = newItemTemplate.cloneNode(true);
    const taskDescription = task.querySelector('span');
    taskDescription.textContent = taskText;
    addCheckHandler(task);

    list.appendChild(task);
    list.classList.add('min-height');
    task.scrollIntoView();
}

function addCheckHandler (item) {
    const checkbox = item.querySelector('.todo-list-input');
    checkbox.addEventListener('change', function () {
        itemSotrage.splice(itemSotrage.indexOf(item.textContent.trim()), 1);
        localStorage.setItem('todo', JSON.stringify(itemSotrage));
        item.remove();
        toggleEmptyListMessage();
    });
};

function toggleEmptyListMessage () {
    if (items.length === 0) {
        list.classList.remove('min-height');
        emptyList.classList.remove('hidden');
        newItemForm.classList.remove('show');
    }else{
        list.classList.add('min-height');
        emptyList.classList.add('hidden');
        newItemForm.classList.add('show');
    }
};

newItemForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    itemSotrage.push(newItemTitle.value.trim());
    tasksOut(newItemTitle.value);
    newItemTitle.value = '';

    localStorage.setItem('todo', JSON.stringify(itemSotrage));
});
