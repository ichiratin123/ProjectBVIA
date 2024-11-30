var searchBar = document.querySelector(".searchBar");
var closeButton = document.querySelector("#closeSearchBar");
var itemExtend = document.querySelector(".itemExtend");
var overlay = document.querySelector(".effectOverlay");
var itemExtend = document.querySelector(".itemExtend");
var popup = document.querySelector(".popupcontainer");
var iconBag = document.querySelector('.iconBag');

searchBar.addEventListener("focus", ()=>{
    searchBar.parentNode.classList.add("searchBarExtend");
    searchBar.classList.add("placeHolderBlack");
    itemExtend.style.display = "block";
    closeButton.style.display = "block";
    overlay.style.display = "block";
    iconBag.style.display = 'none';
})
closeButton.onclick = ()=>{
    searchBar.parentNode.classList.remove("searchBarExtend");
    searchBar.classList.remove("placeHolderBlack");
    closeButton.style.display = "none"; 
    itemExtend.style.display = "none";
    overlay.style.display = "none";
    iconBag.style.display = 'block';
}

overlay.onclick = ()=>{
    searchBar.parentNode.classList.remove("searchBarExtend");
    searchBar.classList.remove("placeHolderBlack");
    closeButton.style.display = "none"; 
    itemExtend.style.display = "none";
    overlay.style.display = "none";
    iconBag.style.display = 'block';
}

itemExtend.addEventListener('mousedown', (event) => {
    event.preventDefault();
});
