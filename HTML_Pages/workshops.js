function sortWorkshops() {
    var sortValue = document.getElementById("sort").value;
    var container = document.querySelector(".cards");
    var cards = document.querySelectorAll(".card");
    var arr = [];
    
    for (var i = 0; i < cards.length; i++) {
        arr[i] = cards[i];
    }
    
    if (sortValue === "price-high" || sortValue === "price-low") {
        arr.sort(function(a, b) {
            var priceA = parseFloat(a.querySelector(".pprice").innerHTML);
            var priceB = parseFloat(b.querySelector(".pprice").innerHTML);
            return sortValue === "price-high" ? priceB - priceA : priceA - priceB;
        });
    } else if (sortValue === "name-a-z" || sortValue === "name-z-a") {
        arr.sort(function(a, b) {
            var nameA = a.querySelector("h3").innerHTML.toLowerCase();
            var nameB = b.querySelector("h3").innerHTML.toLowerCase();
            if (sortValue === "name-a-z") {
                return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
            } else {
                return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
            }
        });
    }
    
    for (var j = 0; j < cards.length; j++) {
        container.removeChild(cards[j]);
    }
    for (var k = 0; k < arr.length; k++) {
        container.appendChild(arr[k]);
    }
}

function shuffleCards() {
    var container = document.querySelector(".cards");
    var cards = document.querySelectorAll(".card");
    var arr = [];
    
    for (var i = 0; i < cards.length; i++) {
        arr[i] = cards[i];
    }
    
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    for (var j = 0; j < cards.length; j++) {
        container.removeChild(cards[j]);
    }
    for (var k = 0; k < arr.length; k++) {
        container.appendChild(arr[k]);
    }
}

window.onload = function() {
    shuffleCards();
    document.getElementById("sort").onchange = sortWorkshops;
};