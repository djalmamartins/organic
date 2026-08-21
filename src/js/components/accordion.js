/**
 * Organic UI v2
 * Accordion
 */

document
    .querySelectorAll("[data-org-accordion]")
    .forEach(accordion => {

        const triggers =
            accordion.querySelectorAll("[data-org-accordion-trigger]");

        triggers.forEach(trigger => {

            trigger.addEventListener("click", () => {

                const panelId =
                    trigger.getAttribute("aria-controls");

                const panel =
                    accordion.querySelector(`#${panelId}`);

                if (!panel) {
                    return;
                }

                const expanded =
                    trigger.getAttribute("aria-expanded") === "true";

                trigger.setAttribute(
                    "aria-expanded",
                    expanded ? "false" : "true"
                );

                panel.hidden = expanded;

            });

        });

    });