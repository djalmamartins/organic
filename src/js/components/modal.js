/**
 * Organic UI v2
 * Modal
 */

class OrganicModal {

    constructor(element) {
        this.element = element;

        this.closeButtons =
            element.querySelectorAll("[data-org-modal-close]");

        this.backdrop =
            element.querySelector(".org-modal-backdrop");

        this.previousFocus = null;

        this.bindEvents();
    }

    open() {
        this.previousFocus = document.activeElement;

        this.element.classList.add("is-open");
        this.element.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        const focusable = this.getFocusableElements();

        if (focusable.length) {
            focusable[0].focus();
        }
    }

    close() {
        this.element.classList.remove("is-open");
        this.element.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (this.previousFocus) {
            this.previousFocus.focus();
        }
    }

    getFocusableElements() {
        return this.element.querySelectorAll(
            "button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );
    }

    bindEvents() {
        this.closeButtons.forEach(button => {
            button.addEventListener("click", () => this.close());
        });

        if (this.backdrop) {
            this.backdrop.addEventListener(
                "click",
                () => this.close()
            );
        }

        document.addEventListener("keydown", event => {
            if (
                event.key === "Escape" &&
                this.element.classList.contains("is-open")
            ) {
                this.close();
            }
        });
    }

}

document.querySelectorAll("[data-org-modal]").forEach(modal => {

    const instance = new OrganicModal(modal);

    const id = modal.id;

    document
        .querySelectorAll(`[data-org-modal-open="${id}"]`)
        .forEach(trigger => {

            trigger.addEventListener("click", () => {
                instance.open();
            });

        });

});