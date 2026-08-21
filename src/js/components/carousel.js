/**
 * Organic UI v2
 * Carousel
 */

document
    .querySelectorAll("[data-org-carousel]")
    .forEach(carousel => {

        const viewport =
            carousel.querySelector(".org-carousel-viewport");

        const track =
            carousel.querySelector(".org-carousel-track");

        const slides = Array.from(
            carousel.querySelectorAll(".org-carousel-slide")
        );

        const previous =
            carousel.querySelector("[data-org-carousel-prev]");

        const next =
            carousel.querySelector("[data-org-carousel-next]");

        const dotsContainer =
            carousel.querySelector("[data-org-carousel-dots]");


        if (!viewport || !track || !slides.length) {
            return;
        }


        /* ==================================================
           Options
           ================================================== */

        const baseItems =
            Math.max(
                1,
                Number(carousel.dataset.orgItems) || 1
            );

        const gap =
            Number(carousel.dataset.orgGap) || 16;

        const loop =
            carousel.dataset.orgLoop === "true";

        const drag =
            carousel.dataset.orgDrag !== "false";

        const autoplay =
            Number(carousel.dataset.orgAutoplay) || 0;

        const pauseHover =
            carousel.dataset.orgPauseHover !== "false";


        let items = baseItems;

        let index = 0;

        let autoplayTimer = null;

        let startX = 0;
        let currentX = 0;
        let dragging = false;


        /* ==================================================
           Responsive
           ================================================== */

        function getItems() {

            const mobile =
                Number(carousel.dataset.orgItemsMobile);

            const tablet =
                Number(carousel.dataset.orgItemsTablet);

            const desktop =
                Number(carousel.dataset.orgItemsDesktop);


            if (
                window.innerWidth < 576 &&
                mobile
            ) {
                return mobile;
            }


            if (
                window.innerWidth < 992 &&
                tablet
            ) {
                return tablet;
            }


            if (
                window.innerWidth >= 992 &&
                desktop
            ) {
                return desktop;
            }


            return baseItems;
        }


        /* ==================================================
           Limits
           ================================================== */

        function maxIndex() {
            return Math.max(
                0,
                slides.length - items
            );
        }


        /* ==================================================
           Position
           ================================================== */

        function slideWidth() {

            return (
                viewport.clientWidth -
                gap * (items - 1)
            ) / items;

        }


        function position() {

            const offset =
                index * (slideWidth() + gap);

            track.style.transform =
                `translate3d(-${offset}px, 0, 0)`;

        }


        /* ==================================================
           Controls
           ================================================== */

        function updateControls() {

            if (!loop) {

                if (previous) {
                    previous.disabled = index <= 0;
                }

                if (next) {
                    next.disabled =
                        index >= maxIndex();
                }

            }


            const dots =
                dotsContainer
                    ? dotsContainer.querySelectorAll(
                        ".org-carousel-dot"
                    )
                    : [];

            dots.forEach((dot, dotIndex) => {

                const active =
                    dotIndex === index;

                dot.classList.toggle(
                    "is-active",
                    active
                );

                dot.setAttribute(
                    "aria-current",
                    active ? "true" : "false"
                );

            });

        }


        /* ==================================================
           Go
           ================================================== */

        function go(target) {

            const max = maxIndex();


            if (loop) {

                if (target < 0) {
                    target = max;
                }

                if (target > max) {
                    target = 0;
                }

            } else {

                target =
                    Math.max(
                        0,
                        Math.min(target, max)
                    );

            }


            index = target;

            position();
            updateControls();

        }


        /* ==================================================
           Previous / Next
           ================================================== */

        function goPrevious() {
            go(index - 1);
        }


        function goNext() {
            go(index + 1);
        }


        previous?.addEventListener(
            "click",
            goPrevious
        );


        next?.addEventListener(
            "click",
            goNext
        );


        /* ==================================================
           Dots
           ================================================== */

        function createDots() {

            if (!dotsContainer) {
                return;
            }


            dotsContainer.innerHTML = "";


            for (
                let i = 0;
                i <= maxIndex();
                i++
            ) {

                const dot =
                    document.createElement("button");

                dot.className =
                    "org-carousel-dot";

                dot.type = "button";

                dot.setAttribute(
                    "aria-label",
                    `Ir para slide ${i + 1}`
                );

                dot.addEventListener(
                    "click",
                    () => go(i)
                );

                dotsContainer.appendChild(dot);

            }

        }


        /* ==================================================
           Autoplay
           ================================================== */

        function stopAutoplay() {

            if (!autoplayTimer) {
                return;
            }

            window.clearInterval(
                autoplayTimer
            );

            autoplayTimer = null;

        }


        function startAutoplay() {

            stopAutoplay();


            if (
                autoplay <= 0 ||
                slides.length <= items
            ) {
                return;
            }


            autoplayTimer =
                window.setInterval(
                    goNext,
                    autoplay
                );

        }


        if (pauseHover) {

            carousel.addEventListener(
                "mouseenter",
                stopAutoplay
            );

            carousel.addEventListener(
                "mouseleave",
                startAutoplay
            );

        }


        /* ==================================================
           Drag / Swipe
           ================================================== */

        function pointerStart(event) {

            if (!drag) {
                return;
            }


            dragging = true;

            startX = event.clientX;
            currentX = startX;

            carousel.classList.add(
                "is-dragging"
            );

            stopAutoplay();


            if (
                event.pointerId !== undefined
            ) {
                viewport.setPointerCapture?.(
                    event.pointerId
                );
            }

        }


        function pointerMove(event) {

            if (!dragging) {
                return;
            }


            currentX = event.clientX;

            const delta =
                currentX - startX;

            const base =
                index *
                (slideWidth() + gap);

            track.style.transform =
                `translate3d(${delta - base}px, 0, 0)`;

        }


        function pointerEnd() {

            if (!dragging) {
                return;
            }


            const delta =
                currentX - startX;

            const threshold =
                Math.min(
                    80,
                    slideWidth() * .2
                );


            dragging = false;

            carousel.classList.remove(
                "is-dragging"
            );


            if (delta > threshold) {
                goPrevious();
            } else if (delta < -threshold) {
                goNext();
            } else {
                position();
            }


            startAutoplay();

        }


        if (drag) {

            viewport.addEventListener(
                "pointerdown",
                pointerStart
            );

            viewport.addEventListener(
                "pointermove",
                pointerMove
            );

            viewport.addEventListener(
                "pointerup",
                pointerEnd
            );

            viewport.addEventListener(
                "pointercancel",
                pointerEnd
            );

        }


        /* ==================================================
           Keyboard
           ================================================== */

        carousel.addEventListener(
            "keydown",
            event => {

                if (event.key === "ArrowLeft") {

                    event.preventDefault();

                    goPrevious();

                }


                if (event.key === "ArrowRight") {

                    event.preventDefault();

                    goNext();

                }

            }
        );


        /* ==================================================
           Resize
           ================================================== */

        function resize() {

            const newItems =
                Math.max(
                    1,
                    getItems()
                );


            if (newItems !== items) {

                items = newItems;

                carousel.style.setProperty(
                    "--org-carousel-items",
                    items
                );

                index =
                    Math.min(
                        index,
                        maxIndex()
                    );

                createDots();

            }


            position();
            updateControls();

        }


        window.addEventListener(
            "resize",
            resize
        );


        /* ==================================================
           Init
           ================================================== */

        carousel.style.setProperty(
            "--org-carousel-gap",
            `${gap}px`
        );

        items = getItems();

        carousel.style.setProperty(
            "--org-carousel-items",
            items
        );

        createDots();

        go(0);

        startAutoplay();

    });