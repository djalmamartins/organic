/**
 * Organic UI v2
 * Tree View
 */

document.addEventListener("click", event => {

    const toggle =
        event.target.closest("[data-org-tree-toggle]");

    if (!toggle) {
        return;
    }

    const item =
        toggle.closest("[data-org-tree-item]");

    if (!item) {
        return;
    }

    const open =
        item.classList.toggle("is-open");

    toggle.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
    );

});