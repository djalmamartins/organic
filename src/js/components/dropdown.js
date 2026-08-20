/**
 * Organic UI v2
 * Dropdown
 */

class OrganicDropdown {
    constructor(element) {
        this.element = element;
        this.trigger = element.querySelector("[data-org-dropdown-toggle]");
        this.menu = element.querySelector(".org-dropdown-menu");

        if (!this.trigger || !this.menu) {
            return;
        }

        this.bindEvents();
    }

    open() {
        document
            .querySelectorAll(".org-dropdown.is-open")
            .forEach(dropdown => {
                if (dropdown !== this.element) {
                    dropdown.classList.remove("is-open");
                }
            });

        this.element.classList.add("is-open");

        this.trigger.setAttribute("aria-expanded", "true");
    }

    close() {
        this.element.classList.remove("is-open");

        this.trigger.setAttribute("aria-expanded", "false");
    }

    toggle() {
        if (this.element.classList.contains("is-open")) {
            this.close();
        } else {
            this.open();
        }
    }

    bindEvents() {
        this.trigger.addEventListener("click", event => {
            event.stopPropagation();
            this.toggle();
        });

        document.addEventListener("click", event => {
            if (!this.element.contains(event.target)) {
                this.close();
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                this.close();
            }
        });
    }
}

document
    .querySelectorAll("[data-org-dropdown]")
    .forEach(element => {
        new OrganicDropdown(element);
    });