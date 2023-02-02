window.addEventListener("DOMContentLoaded", () => {
    const servicesFunc = function () {
        const servButton = document.querySelectorAll('.service-button');
        const serviceCard = document.querySelectorAll('.service');
        const gardens = document.querySelector('#gardens');
        const lawn = document.querySelector('#lawn');
        const planting = document.querySelector('#planting');
        const gardensCard = document.querySelector('.slider-garden');
        const lawnCard = document.querySelector('.slider-lawn');
        const plantingCard = document.querySelector('.slider-planting');

        let count = 0;

        servButton.forEach((item) => {
            item.addEventListener('click', () => {
                serviceCard.forEach(((e) => {
                    e.classList.add('service-blur');
                }));
            });
        });

        function clickCard(button, card) {
            button.addEventListener('click', () => {
                if (!button.classList.contains('service-active')) {
                    count += 1;
                    button.classList.add('service-active');
                    card.forEach((i) => {
                        i.classList.add('service-unblur');
                    });
                    // removeClass();
                } else {
                    count -= 1;
                    button.classList.remove('service-active');
                    card.forEach((i) => {
                        i.classList.remove('service-unblur');
                    });
                    // removeClass();
                }
            });
        }

        clickCard(gardens, gardensCard);
        clickCard(lawn, lawnCard);
        clickCard(planting, plantingCard);

        function removeClass() {
            if (count > 2 || count === 0) {
                count = 0;
                servButton.forEach((item) => {
                    item.classList.remove('service-active')
                });
                serviceCard.forEach((item) => {
                    elem.classList.remove('service-unblur');
                    elem.classList.remove('service-blur');
                });
            }
        }
    };

    servicesFunc();
})
