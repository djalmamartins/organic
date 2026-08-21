/**
 * Organic UI v2
 * Popover
 */

document
    .querySelectorAll("[data-org-popover]")
    .forEach(popover => {

        const trigger =
            popover.querySelector("[data-org-popover-toggle]");

        if (!trigger) {
            return;
        }

        trigger.addEventListener("click", event => {
            event.stopPropagation();

            const open =
                popover.classList.toggle("is-open");

            trigger.setAttribute(
                "aria-expanded",
                open ? "true" : "false"
            );
        });

        document.addEventListener("click", event => {

            if (!popover.contains(event.target)) {
                popover.classList.remove("is-open");

                trigger.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                popover.classList.remove("is-open");

                trigger.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    });