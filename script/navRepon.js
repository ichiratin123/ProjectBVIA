
document.getElementById("burgerMenu").addEventListener("click", function () {
    const burgerMenu = document.getElementById("burgerMenuItems");
    burgerMenu.classList.add("active");
});

document.getElementById("closeBurger").addEventListener("click", function () {
    const burgerMenu = document.getElementById("burgerMenuItems");
    burgerMenu.classList.remove("active");
});
