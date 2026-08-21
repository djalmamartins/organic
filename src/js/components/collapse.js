/**
 * Organic UI v2
 * Collapse
 */

document.addEventListener("click", event => {

    const trigger =
        event.target.closest("[data-org-collapse-toggle]");

    if (!trigger) {
        return;
    }

    const targetId =
        trigger.getAttribute("data-org-collapse-toggle");

    const target =
        document.getElementById(targetId);

    if (!target) {
        return;
    }

    const open =
        target.classList.toggle("is-open");

    trigger.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
    );

});