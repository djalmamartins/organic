/**
 * Organic UI v2
 * File Upload
 */

document
    .querySelectorAll("[data-org-upload]")
    .forEach(upload => {

        const input =
            upload.querySelector("[data-org-upload-input]");

        const list =
            upload.parentElement.querySelector(
                "[data-org-upload-files]"
            );

        if (!input) {
            return;
        }

        function formatSize(bytes) {
            if (bytes < 1024) {
                return `${bytes} B`;
            }

            if (bytes < 1024 * 1024) {
                return `${(bytes / 1024).toFixed(1)} KB`;
            }

            return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
        }

        function renderFiles(files) {
            if (!list) {
                return;
            }

            list.innerHTML = "";

            Array.from(files).forEach(file => {

                const item =
                    document.createElement("div");

                item.className =
                    "org-upload-file";

                item.innerHTML = `
                    <div class="org-upload-file-info">
                        <span class="org-upload-file-name">
                            ${file.name}
                        </span>

                        <span class="org-upload-file-size">
                            ${formatSize(file.size)}
                        </span>
                    </div>

                    <span class="org-badge org-badge-success">
                        Pronto
                    </span>
                `;

                list.appendChild(item);
            });
        }

        input.addEventListener("change", () => {
            renderFiles(input.files);
        });

        upload.addEventListener("dragover", event => {
            event.preventDefault();

            upload.classList.add("is-dragging");
        });

        upload.addEventListener("dragleave", () => {
            upload.classList.remove("is-dragging");
        });

        upload.addEventListener("drop", event => {
            event.preventDefault();

            upload.classList.remove("is-dragging");

            if (event.dataTransfer.files.length) {
                renderFiles(event.dataTransfer.files);
            }
        });

    });