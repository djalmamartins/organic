/**
 * Organic UI v2
 * Stepper / Wizard
 */

document
    .querySelectorAll("[data-org-wizard]")
    .forEach(wizard => {

        const steps = Array.from(
            wizard.querySelectorAll("[data-org-step]")
        );

        const panels = Array.from(
            wizard.querySelectorAll("[data-org-step-panel]")
        );

        const nextButtons =
            wizard.querySelectorAll("[data-org-step-next]");

        const previousButtons =
            wizard.querySelectorAll("[data-org-step-prev]");

        let current = 0;


        function update() {

            steps.forEach((step, index) => {

                step.classList.toggle(
                    "is-active",
                    index === current
                );

                step.classList.toggle(
                    "is-complete",
                    index < current
                );

                if (index === current) {
                    step.setAttribute(
                        "aria-current",
                        "step"
                    );
                } else {
                    step.removeAttribute("aria-current");
                }

            });


            panels.forEach((panel, index) => {
                panel.hidden = index !== current;
            });

        }


        nextButtons.forEach(button => {

            button.addEventListener("click", () => {

                if (current >= steps.length - 1) {
                    return;
                }

                current++;

                update();

            });

        });


        previousButtons.forEach(button => {

            button.addEventListener("click", () => {

                if (current <= 0) {
                    return;
                }

                current--;

                update();

            });

        });


        update();

    });