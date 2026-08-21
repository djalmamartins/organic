/**
 * Organic UI v2
 * Offcanvas
 */

document
    .querySelectorAll("[data-org-offcanvas]")
    .forEach(offcanvas => {

        const id = offcanvas.id;

        const triggers =
            document.querySelectorAll(
                `[data-org-offcanvas-open="${id}"]`
            );

        const closes =
            offcanvas.querySelectorAll(
                "[data-org-offcanvas-close]"
            );

        const backdrop =
            offcanvas.querySelector(
                ".org-offcanvas-backdrop"
            );

        function open() {
            offcanvas.classList.add("is-open");

            offcanvas.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow = "hidden";
        }

        function close() {
            offcanvas.classList.remove("is-open");

            offcanvas.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.style.overflow = "";
        }

        triggers.forEach(trigger => {
            trigger.addEventListener("click", open);
        });

        closes.forEach(button => {
            button.addEventListener("click", close);
        });

        if (backdrop) {
            backdrop.addEventListener("click", close);
        }

        document.addEventListener("keydown", event => {
            if (
                event.key === "Escape" &&
                offcanvas.classList.contains("is-open")
            ) {
                close();
            }
        });

    });