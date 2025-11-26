
function getSelectedRating() {
    var ratingInputs = document.querySelectorAll('input[name="rating"]');
    
    for (var i = 0; i < ratingInputs.length; i++) {
        if (ratingInputs[i].checked) {
            return parseInt(ratingInputs[i].value);
        }
    }
    
    return null;
}


function validateForm() {
    // Get form elements
    var workshop = document.getElementById("workshop");
    var review = document.getElementById("review");
    var rating = getSelectedRating();
    
    // Variable to track if form is valid
    var isValid = true;
    
    // Check if workshop is selected
    if (workshop.value == "") {
        workshop.style.border = "2px solid red";
        isValid = false;
    } else {
        workshop.style.border = "";
    }
    
    // Check if rating is selected
    if (rating == null) {
        var ratingFieldset = document.querySelector(".rating-stars");
        ratingFieldset.style.border = "2px solid red";
        ratingFieldset.style.padding = "5px";
        isValid = false;
    } else {
        var ratingFieldset = document.querySelector(".rating-stars");
        ratingFieldset.style.border = "";
        ratingFieldset.style.padding = "";
    }
    
    // Check if review is filled
    if (review.value == "") {
        review.style.border = "2px solid red";
        isValid = false;
    } else {
        review.style.border = "";
    }
    
    // If form is not valid 
    if (isValid == false) {
        alert("Please fill all required fields!");
        return false;
    }
    
    // If form is valid
    if (rating >= 3) {
        alert("Thank you for your positive feedback! We're glad you enjoyed the workshop.");
    } else {
        alert("We're sorry to hear that. We'll work on improving our workshops. Thank you for your feedback.");
    }
    
    // Redirect to dashboard after showing message
    window.location.href = "Customers_Dashboard.html";
    
    return false;
}

// Register the form submit event when page loads
window.onload = function() {
    var form = document.querySelector(".forms");
    form.onsubmit = validateForm;
};