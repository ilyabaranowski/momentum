const time = document.querySelector('.time');
const dateInfo = document.querySelector('.date');
const date = new Date();
const hours = date.getHours();

///////////////////Time
function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString("en-US", { hour12: false });
    time.textContent = currentTime;

    function showDate(){
    const options = {
        weekday: 'long',
        month: 'long',
        day:'numeric',
    };
    const currentDate = date.toDateString('en-US', options);
    dateInfo.textContent = currentDate;
    }
    showDate();
    setTimeout(showTime, 1000);
}
showTime();
