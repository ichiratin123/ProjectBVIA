const cartButton = document.getElementById('cartButton');
const cartExtend = document.querySelector('.cartExtend');
const closeCart = document.getElementById('closeCart');
const cartOverlay = document.querySelector('.cartOverlay');
const headerAll = document.querySelector('.nav_items')
const logo = document.querySelector('#logoText');
const navitem = document.querySelectorAll('.nav_item');
const search = document.querySelector('.searchBar');
const shopetext = document.querySelectorAll('.shopText');
const login = document.querySelector('.loginText');
const cart = document.querySelector('.fa-bag-shopping');
var searchBar = document.querySelector(".searchBar");

cartButton.addEventListener('click', () => {
    cartExtend.classList.add('active');
    setTimeout(() => {
        cartOverlay.style.display = 'block';
    },100);
    logo.style.color = 'black';
    navitem.forEach((item) => {
        item.classList.add('changeColor');
    });
    search.classList.add('searchBarChange');
    shopetext.forEach((item) => {
        item.classList.remove('text-white');
        item.classList.add('text-dark');
    });
    login.classList.remove('text-white');
    login.classList.add('text-dark');
    cart.style.color = 'black';
});

closeCart.addEventListener('click', () => {
    cartExtend.classList.remove('active');
    cartOverlay.style.display = 'none';
    logo.style.color = 'white';
    navitem.forEach((item) => {
        item.classList.remove('changeColor');
    });
    search.classList.remove('searchBarChange');
    shopetext.forEach((item) => {
        item.classList.add('text-dark');
        item.classList.remove('text-white');
    });
    login.classList.add('text-dark');
    login.classList.remove('text-white');
    cart.style.color = 'black';
});

cartOverlay.addEventListener('click', () => {
    cartExtend.classList.remove('active');
    cartOverlay.style.display = 'none';
    logo.style.color = 'white';
    navitem.forEach((item) => {
        item.classList.remove('changeColor');
    });
    search.classList.remove('searchBarChange');
    shopetext.forEach((item) => {
        item.classList.add('text-dark');
        item.classList.remove('text-white');
    });
    login.classList.add('text-dark');
    login.classList.remove('text-white');
    cart.style.color = 'black';
});

searchBar.addEventListener('focus', () => {
    cartExtend.classList.remove('active');
    cartOverlay.style.display = 'none';
    logo.style.color = 'white';
    navitem.forEach((item) => {
        item.classList.remove('changeColor');
    });
    search.classList.remove('searchBarChange');
    shopetext.forEach((item) => {
        item.classList.add('text-dark');
        item.classList.remove('text-white');
    });
    login.classList.add('text-dark');
    login.classList.remove('text-white');
    cart.style.color = 'black';
});