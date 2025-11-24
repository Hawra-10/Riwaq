function updateClock() {
    var now = new Date();
    var timeString = now.toLocaleTimeString();
    document.getElementById("clock").innerHTML = timeString;
}

window.onload = function() {
    updateClock();
    setInterval(updateClock, 1000);
};