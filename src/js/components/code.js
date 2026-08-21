/**
 * Organic UI v2
 * Code
 */

document.querySelectorAll("[data-org-code]").forEach(codeBlock => {

    const tabs =
        codeBlock.querySelectorAll("[data-org-code-tab]");

    const panels =
        codeBlock.querySelectorAll("[data-org-code-panel]");

    const copyButton =
        codeBlock.querySelector("[data-org-code-copy]");


    /* Tabs */

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target =
                tab.dataset.orgCodeTab;

            tabs.forEach(item => {
                item.classList.toggle(
                    "is-active",
                    item === tab
                );
            });

            panels.forEach(panel => {
                panel.hidden =
                    panel.dataset.orgCodePanel !== target;
            });

        });

    });


    /* Copy */

    if (copyButton) {

        copyButton.addEventListener("click", async () => {

            const visiblePanel =
                Array.from(panels).find(panel => !panel.hidden);

            if (!visiblePanel) {
                return;
            }

            const code =
                visiblePanel.querySelector("code");

            if (!code) {
                return;
            }

            try {

                await navigator.clipboard.writeText(
                    code.textContent
                );

                const original =
                    copyButton.textContent;

                copyButton.textContent = "Copiado!";

                window.setTimeout(() => {
                    copyButton.textContent = original;
                }, 1500);

            } catch (error) {

                console.error(
                    "Organic: não foi possível copiar o código.",
                    error
                );

            }

        });

    }

});