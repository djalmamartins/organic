/**
 * Organic UI v2
 * Toast
 */

function closeToast(toast) {

    if (!toast || toast.classList.contains("is-closing")) {
        return;
    }

    toast.classList.add("is-closing");

    window.setTimeout(() => {
        toast.remove();
    }, 200);

}


/* Manual close */

document.addEventListener("click", event => {

    const button =
        event.target.closest("[data-org-toast-close]");

    if (!button) {
        return;
    }

    const toast =
        button.closest("[data-org-toast]");

    closeToast(toast);

});


/* Auto close */

document
    .querySelectorAll("[data-org-toast]")
    .forEach(toast => {

        const duration =
            Number(toast.dataset.orgToastDuration);

        if (!duration || duration <= 0) {
            return;
        }

        window.setTimeout(() => {
            closeToast(toast);
        }, duration);

    });