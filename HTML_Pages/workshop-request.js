


// ===== LECTURE 9: ARRAYS - Array of Objects =====
let workshopRequests = [];

// ===== LECTURE 11: DOM - Unobtrusive JavaScript =====
document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.querySelector('.forms');
    
    // ===== LECTURE 9: FUNCTIONS =====
    function displayRequests() {
        let displayArea = document.getElementById('requests-display-area');
        
        if (!displayArea) {
            // ===== LECTURE 11: innerHTML =====
            // Create a simple div in the page to hold requests
            const mainElement = document.getElementById('forms-main');
            if (mainElement) {
                const currentHTML = mainElement.innerHTML;
                mainElement.innerHTML = currentHTML + '<div id="requests-display-area" style="margin-top: 30px; width: 80%;"></div>';
                displayArea = document.getElementById('requests-display-area');
            }
        }
        
        if (!displayArea) {
            console.error('Could not create display area');
            return;
        }
        
        // Build HTML for all request cards  
        let cardsHTML = '<h1 style=" color: #212319; margin-bottom: 20px;">Your Workshop Requests</h1>';
        
        for (let i = 0; i < workshopRequests.length; i++) {
            const request = workshopRequests[i];
            
            cardsHTML = cardsHTML + 
                '<div class="request-card" style="border: 0.5px solid #212319; border-radius: 8px; padding: 20px; margin-bottom: 15px; background-color: #f5edd9">' +
                    '<h3 style="color: #212319; margin-top: 0;">Request #' + (i + 1) + '</h3>' +
                    '<p><strong>Workshop:</strong> ' + request.workshop + '</p>' +
                    '<p><strong>Customer Name:</strong> ' + request.name + '</p>' +
                    '<p><strong>Due Date:</strong> ' + request.dueDate + '</p>' +
                    '<p><strong>Description:</strong> ' + request.description + '</p>' +
                '</div>';
        }
        
        displayArea.innerHTML = cardsHTML;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const workshopSelect = document.querySelector('select[name="requested-workshop"]');
        const workshopValue = workshopSelect.value;
        const workshopText = workshopSelect.options[workshopSelect.selectedIndex].text;
        const name = document.getElementById('name').value.trim();
        const dueDate = document.getElementById('due-date').value;
        const description = document.getElementById('request-description').value.trim();
        
        let isValid = true;
        let errorMessages = [];
        
        // Validation 1: Check if service is selected
        if (!workshopValue) {
            errorMessages.push('Please select a workshop');
            isValid = false;
        }
        
        // Validation 2: Validate name
        if (!name) {
            errorMessages.push('Name is required');
            isValid = false;
        } else {
            // ===== LECTURE 12: Regular Expressions =====
            if (/\d/.test(name)) {
                errorMessages.push('Name cannot contain numbers');
                isValid = false;
            }
            
            if (/[?!@]/.test(name)) {
                errorMessages.push('Name cannot contain special characters (?, !, @)');
                isValid = false;
            }
            
            const nameParts = name.split(/\s+/);
            if (nameParts.length < 2) {
                errorMessages.push('Please enter your full name (first and last name)');
                isValid = false;
            }
        }
        
        // Validation 3: Validate due date (at least 7 days)
        if (!dueDate) {
            errorMessages.push('Due date is required');
            isValid = false;
        } else {
            // ===== LECTURE 9: The Date Object =====
            const today = new Date();
            const selectedDate = new Date(dueDate);
            const diffTime = selectedDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays < 7) {
                errorMessages.push('Due date is too soon. Please select a date at least 7 days from today');
                isValid = false;
            }
        }
        
        // Validation 4: Validate description length (at least 100 chars)
        if (!description) {
            errorMessages.push('Request description is required');
            isValid = false;
        } else {
            if (description.length < 100) {
                // ===== LECTURE 9: String Concatenation =====
                errorMessages.push('Request description is too short. Please provide at least 100 characters (current: ' + description.length + ')');
                isValid = false;
            }
        }
        
        // Show errors or process form
        if (!isValid) {
            alert('Please fix the following errors:\n\n' + errorMessages.join('\n'));
        } else {
            // ===== INTEGRATE WITH COMMON WORKSHOPS SYSTEM =====
            if (window.workshopSystem) {
                const newCount = window.workshopSystem.incrementRequestCount(workshopText);
                console.log(workshopText + ' has been requested ' + newCount + ' times');
            }
            
            // ===== LECTURE 9: String Concatenation =====
            const message = 'Your workshop request has been sent successfully!\n\n' +
                          'Workshop: ' + workshopText + '\n' +
                          'Customer: ' + name + '\n' +
                          'Due Date: ' + dueDate + '\n\n' +
                          'Would you like to stay on this page to add another request?\n' +
                          '(Click OK to stay, Cancel to return to dashboard)';
            
            const stayOnPage = confirm(message);
            
            const newRequest = {
                workshop: workshopText,
                name: name,
                dueDate: dueDate,
                description: description
            };
            
            workshopRequests.push(newRequest);
            
            if (stayOnPage) {
                displayRequests();
                form.reset();
                
                // Reset character counter
                const counterDiv = document.getElementById('char-counter');
                if (counterDiv) {
                    counterDiv.textContent = '0 / 100 characters (minimum)';
                    counterDiv.style.color = '#e74c3c';
                }
                
                //alert('Form cleared. You can now add another workshop request.');
            } else {
                window.location.href = 'Customers_Dashboard.html';
            }
        }
    });
    
    // Character counter for description
    const descriptionField = document.getElementById('request-description');
    
    if (descriptionField) {
        // ===== LECTURE 11: innerHTML =====
        // Check if counter already exists
        let counterDiv = document.getElementById('char-counter');
        
        if (!counterDiv) {
            // Get the parent element and add counter
            const formGroup = descriptionField.parentNode;
            const existingHTML = formGroup.innerHTML;
            
            // Add counter div to the existing HTML
            formGroup.innerHTML = existingHTML + '<div id="char-counter" style="font-size: 14px; color: #e74c3c; margin-top: 5px;">0 / 100 characters (minimum)</div>';
            
            // Get references again after innerHTML update
            counterDiv = document.getElementById('char-counter');
        }
        
        // Re-attach event listener to the textarea
        const textarea = document.getElementById('request-description');
        
        if (textarea && counterDiv) {
            // ===== LECTURE 11: Events - Event Types =====
            textarea.addEventListener('input', function() {
                const length = this.value.length;
                // ===== LECTURE 9: String Concatenation =====
                counterDiv.textContent = length + ' / 100 characters (minimum)';
                
                // ===== LECTURE 11: Changing Colors =====
                if (length >= 100) {
                    counterDiv.style.color = '#27ae60';
                } else {
                    counterDiv.style.color = '#e74c3c';
                }
            });
        }
    }
});