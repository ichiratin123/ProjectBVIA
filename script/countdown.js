let deadline = new Date("Dec 2, 2024 13:37:25").getTime();
//let deadline = new Date("Nov 28, 2024 23:52:00 ").getTime();
let price = document.querySelector(".priceItem");
let delTag;
let newText;
let x = setInterval(function () {
    let now = new Date().getTime();
    let t = deadline - now;
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((t % (1000 * 60)) / 1000);
    
    if (!price.querySelector("del") && !price.querySelector("span")) {
        let originalPrice = price.innerHTML;

        delTag = document.createElement("del");
        delTag.innerHTML = originalPrice;

        newText = document.createElement("span");
        newText.innerHTML = "  <strong>Kč7,000.00<\strong>";
        newText.style.color = "red";
        price.innerHTML = "";
        price.appendChild(delTag);
        price.appendChild(newText);
    } 
    
    document.getElementById("countdownTag").innerHTML =
        days + "d " + hours + "h " +
        minutes + "m " + seconds + "s ";

    if (t < 0) {
        clearInterval(x);
        document.getElementById("countdownTag").remove();
        let saleItems = document.getElementsByClassName("saleItem");
        Array.from(saleItems).forEach(function(item) {
            item.remove();
        });
        price.removeChild(delTag);
        price.removeChild(newText);
        price.innerHTML = "Kč7,950.00";
    }
}, 1000);
