document.addEventListener("DOMContentLoaded", () => {
    const wishlistIcons = document.querySelectorAll(".wishlistIcon");

    wishlistIcons.forEach(icon => {
        icon.addEventListener("mouseover", function () {
            if (this.classList.contains("fa-light")) {
                this.classList.remove("fa-light");
                this.classList.add("fa-solid");
                this.style.color = "#d33131";
            }
        });

        icon.addEventListener("mouseout", function () {
            if (!this.classList.contains("active")) {
                this.classList.remove("fa-solid");
                this.classList.add("fa-light");
                this.style.color = "black";
            }
        });

        icon.addEventListener("click", function () {
            const productId = this.getAttribute("data-id");

            if (this.classList.contains("fa-light")) {
                this.classList.remove("fa-light");
                this.classList.add("fa-solid");
                this.style.color = "#d33131";
                this.classList.add("active");
            } else {
                this.classList.remove("fa-solid");
                this.classList.add("fa-light");
                this.style.color = "black";
                this.classList.remove("active");
            }
        });
    });
});
