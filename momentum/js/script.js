const time = document.querySelector('.time');
const dateInfo = document.querySelector('.date');

///////////////////Time
function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;

    function showDate(){
    const options = {
        weekday: 'long',
        month: 'long',
        day:'numeric',
    };
    const currentDate = date.toLocaleTimeString();
    dateInfo.textContent = currentDate;
    };
    showDate();
    setTimeout(showTime, 1000);
}
showTime();
