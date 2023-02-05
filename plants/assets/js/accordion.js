const accordion = function () {
    const contents = document.querySelectorAll(".accordion__content");
    const controls = document.querySelectorAll(".accordion__control");
    const items = document.querySelectorAll(".prices__block-item");

    controls.forEach((e) => {
        e.addEventListener("click", (i) => {
            const self = e.closest(".accordion");
            const content = self.querySelector(".accordion__content");
            const control = self.querySelector(".accordion__control");
            const item = self.querySelector(".prices__block-item");

            items.forEach((i) => {
                if (i !== item) {
                    i.classList.remove("prices__block-item-open");
                }
            });
            contents.forEach((i) => {
                if (i !== content) {
                    i.classList.remove("accordion__content-open");
                }
            });
            controls.forEach((i) => {
                if (i !== control) {
                    i.classList.remove("accordion__control-open");
                }
            });

            if (item.classList.contains("prices__block-item-open")) {
                content.classList.remove("accordion__content-open");
                item.classList.remove("prices__block-item-open");
                control.classList.remove("accordion__control-open");
            } else {
                content.classList.add("accordion__content-open");
                item.classList.add("prices__block-item-open");
                control.classList.add("accordion__control-open");
            }
        });
    });
};

accordion();
