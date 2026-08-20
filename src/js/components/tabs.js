/**
 * Organic UI v2
 * Tabs
 */

document.querySelectorAll("[data-org-tabs]").forEach(tabs => {

    const buttons = tabs.querySelectorAll("[data-org-tab]");
    const panels = tabs.querySelectorAll("[data-org-tab-panel]");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            if (button.disabled) {
                return;
            }

            const target = button.dataset.orgTab;

            buttons.forEach(item => {

                item.classList.remove("is-active");

                item.setAttribute(
                    "aria-selected",
                    "false"
                );

            });


            panels.forEach(panel => {

                panel.hidden =
                    panel.dataset.orgTabPanel !== target;

            });


            button.classList.add("is-active");

            button.setAttribute(
                "aria-selected",
                "true"
            );

        });

    });

});