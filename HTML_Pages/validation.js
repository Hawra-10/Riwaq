// Get form element
var form = document.querySelector('.forms');

// Form submit event handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    //  ======== GET USER INPUT VALUES ======== 
    var workshop = document.getElementById('workshop').value;
    var review = document.getElementById('review').value;
    var rating = getSelectedRating();
    
    // checking form inputs
    if (workshop === '' || rating === null || review.trim() === '') {
        alert('Please complete all fields: select workshop, add rating, and write feedback');
        highlightErrors(workshop, rating, review);
        return;
    }
    
    
    if (rating >= 3) {
        alert('Thank you for your wonderful feedback!');
    } else {
        alert('We apologize for not meeting your expectations.');
    }
    
    //  Transfer the customer to the dashboard
    window.location.href = 'Customers_Dashboard.html';
});

// Get selected rating value
function getSelectedRating() {
    var ratingInputs = document.getElementsByName('rating');
    for (var i = 0; i < ratingInputs.length; i++) {
        if (ratingInputs[i].checked) {
            return Number(ratingInputs[i].value);
        }
    }
    return null;
}

// Highlight unfilled inputs
function highlightErrors(workshop, rating, review) {
    if (workshop === '') {
        document.getElementById('workshop').style.border = '2px solid red';
    }
    if (rating === null) {
        document.querySelector('.rating-stars').style.border = '2px solid red';
    }
    if (review.trim() === '') {
        document.getElementById('review').style.border = '2px solid red';
    }
}