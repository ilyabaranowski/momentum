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
                serviceCard.forEach(((elem) => {
                    elem.classList.add('service-blur');
                }));
            });
        });

        function clickCard(a, slider) {
            a.addEventListener('click', () => {
                if (!a.classList.contains('service-active')) {
                    count += 1;
                    a.classList.add('service-active');
                    slider.forEach((i) => {
                        i.classList.add('service-unblur');
                    });
                    removeClass();
                } else {
                    count -= 1;
                    a.classList.remove('service-active');
                    slider.forEach((i) => {
                        i.classList.remove('service-unblur');
                    });
                    removeClass();
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
                serviceCard.forEach((elem) => {
                    elem.classList.remove('service-unblur');
                    elem.classList.remove('service-blur');
                });
            }
        }
    };

    servicesFunc();
