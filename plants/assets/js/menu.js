const open = document.querySelector('.toggle-nav');
const close = document.querySelector('.close-icon');
const menu = document.querySelector('.mobile-nav');
const dark =document.querySelector('.dark');

open.onclick = function () {
    menu.style.transform = 'translateX(0)';
    dark.classList.add('active');
};

close.onclick = function () {
    menu.style.transform = 'translateX(100%)';
    dark.classList.remove('active');
};

document.onclick = function (e) {
    if (e.target.className != 'mobile-nav' && e.target.className != 'toggle-nav' ) {
        menu.style.transform = 'translateX(100%)';
        dark.classList.remove('active');
    };
};
