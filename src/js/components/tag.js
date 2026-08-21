/**
 * Organic UI v2
 * Tag
 */

document.querySelectorAll("[data-org-tags]").forEach(container => {

    const input = container.querySelector("[data-org-tag-input]");
    const list = container.querySelector("[data-org-tag-list]");

    if (!input || !list) {
        return;
    }

    function createTag(value) {
        const text = value.trim();

        if (!text) {
            return;
        }

        const exists = Array
            .from(list.querySelectorAll("[data-org-tag-value]"))
            .some(tag => tag.dataset.orgTagValue.toLowerCase() === text.toLowerCase());

        if (exists) {
            input.value = "";
            return;
        }

        const tag = document.createElement("span");

        tag.className = "org-tag org-tag-primary";
        tag.dataset.orgTagValue = text;

        tag.innerHTML = `
            <span>${text}</span>

            <button
                class="org-tag-remove"
                type="button"
                aria-label="Remover ${text}"
                data-org-tag-remove
            >
                ×
            </button>
        `;

        list.appendChild(tag);

        input.value = "";
    }

    input.addEventListener("keydown", event => {

        if (
            event.key === "Enter" ||
            event.key === ","
        ) {
            event.preventDefault();

            createTag(input.value);
        }

        if (
            event.key === "Backspace" &&
            !input.value
        ) {
            const tags = list.querySelectorAll("[data-org-tag-value]");
            const lastTag = tags[tags.length - 1];

            if (lastTag) {
                lastTag.remove();
            }
        }

    });


    container.addEventListener("click", event => {

        const removeButton =
            event.target.closest("[data-org-tag-remove]");

        if (!removeButton) {
            return;
        }

        const tag =
            removeButton.closest("[data-org-tag-value]");

        if (tag) {
            tag.remove();
        }

    });

});