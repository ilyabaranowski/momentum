const time = document.querySelector('.time');
const dateInfo = document.querySelector('.date');

///////////////////Time & date
function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString('en-US', { hour12: false });
    time.textContent = currentTime;

    function showDate(){
    const options = {
        weekday: 'long',
        month: 'long',
        day:'numeric',
    };
    const currentDate = date.toLocaleDateString('en-US', options);
    dateInfo.textContent = currentDate;
    }
    showDate();
    setTimeout(showTime, 1000);
}
showTime();

//////////////Greeting


