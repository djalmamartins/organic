/**
 * Organic UI v2
 * Spotlight / Command Palette
 */

document
    .querySelectorAll("[data-org-spotlight]")
    .forEach(spotlight => {

        const id = spotlight.id;

        const input =
            spotlight.querySelector(
                "[data-org-spotlight-input]"
            );

        const items = Array.from(
            spotlight.querySelectorAll(
                "[data-org-spotlight-item]"
            )
        );

        const empty =
            spotlight.querySelector(
                "[data-org-spotlight-empty]"
            );

        const triggers =
            document.querySelectorAll(
                `[data-org-spotlight-open="${id}"]`
            );


        function open() {

            spotlight.classList.add("is-open");

            spotlight.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow = "hidden";

            window.setTimeout(() => {
                input?.focus();
            }, 0);

        }


        function close() {

            spotlight.classList.remove("is-open");

            spotlight.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.style.overflow = "";

            if (input) {
                input.value = "";
            }

            filter("");

        }


        function filter(value) {

            const query =
                value.trim().toLowerCase();

            let visible = 0;

            items.forEach(item => {

                const search =
                    (
                        item.dataset.orgSpotlightSearch ||
                        item.textContent
                    ).toLowerCase();

                const match =
                    !query || search.includes(query);

                item.hidden = !match;

                if (match) {
                    visible++;
                }

            });

            if (empty) {
                empty.classList.toggle(
                    "is-visible",
                    visible === 0
                );
            }

        }


        triggers.forEach(trigger => {
            trigger.addEventListener("click", open);
        });


        input?.addEventListener("input", () => {
            filter(input.value);
        });


        spotlight.addEventListener("click", event => {

            if (event.target === spotlight) {
                close();
            }

        });


        document.addEventListener("keydown", event => {

            const shortcut =
                (event.metaKey || event.ctrlKey) &&
                event.key.toLowerCase() === "k";

            if (shortcut) {

                event.preventDefault();

                spotlight.classList.contains("is-open")
                    ? close()
                    : open();

            }


            if (
                event.key === "Escape" &&
                spotlight.classList.contains("is-open")
            ) {
                close();
            }

        });

    });