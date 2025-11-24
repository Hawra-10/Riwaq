// Integrated Workshop Request Form Script
// This version integrates with the common workshops system

// ===== LECTURE 9: ARRAYS - Array of Objects =====
let workshopRequests = [];

// ===== LECTURE 11: DOM - Unobtrusive JavaScript =====
document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.querySelector('.forms');
    
    // ===== LECTURE 9: FUNCTIONS =====
    function displayRequests() {
        let displayArea = document.getElementById('requests-display-area');
        
        if (!displayArea) {
            displayArea = document.createElement('div');
            displayArea.id = 'requests-display-area';
            displayArea.style.marginTop = '30px';
            displayArea.style.width = '100%';
            
            const heading = document.createElement('h2');
            heading.textContent = 'Your Workshop Requests';
            heading.style.color = '#2c3e50';
            heading.style.marginBottom = '20px';
            displayArea.appendChild(heading);
            
            form.parentNode.appendChild(displayArea);
        }
        
        const existingCards = displayArea.querySelectorAll('.request-card');
        for (let i = 0; i < existingCards.length; i++) {
            existingCards[i].remove();
        }
        
        for (let i = 0; i < workshopRequests.length; i++) {
            const request = workshopRequests[i];
            
            const card = document.createElement('div');
            card.className = 'request-card';
            card.style.border = '2px solid #3498db';
            card.style.borderRadius = '8px';
            card.style.padding = '20px';
            card.style.marginBottom = '15px';
            card.style.backgroundColor = '#f8f9fa';
            
            // ===== LECTURE 9: String Object - String Concatenation =====
            // "The operation + is the string catenation operation"
            card.innerHTML = 
                '<h3 style="color: #3498db; margin-top: 0;">Request #' + (i + 1) + '</h3>' +
                '<p><strong>Workshop:</strong> ' + request.workshop + '</p>' +
                '<p><strong>Customer Name:</strong> ' + request.name + '</p>' +
                '<p><strong>Due Date:</strong> ' + request.dueDate + '</p>' +
                '<p><strong>Description:</strong> ' + request.description + '</p>';
            
            displayArea.appendChild(card);
        }
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
                errorMessages.push('Request description is too short. Please provide at least 100 characters (current: ' + description.length + ')');
                isValid = false;
            }
        }
        
        // Show errors or process form
        if (!isValid) {
            alert('Please fix the following errors:\n\n' + errorMessages.join('\n'));
        } else {
            // ===== INTEGRATE WITH COMMON WORKSHOPS SYSTEM =====
            // Increment the request count for this workshop
            if (window.workshopSystem) {
                const newCount = window.workshopSystem.incrementRequestCount(workshopText);
                console.log(workshopText + ' has been requested ' + newCount + ' times');
            }
            
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
                alert('Form cleared. You can now add another workshop request.');
            } else {
                window.location.href = 'Customers_Dashboard.html';
            }
        }
    });
    
    // Character counter for description
    const descriptionField = document.getElementById('request-description');
    
    if (descriptionField) {
        const counterDiv = document.createElement('div');
        counterDiv.id = 'char-counter';
        counterDiv.style.fontSize = '14px';
        counterDiv.style.color = '#7f8c8d';
        counterDiv.style.marginTop = '5px';
        counterDiv.textContent = '0 / 100 characters (minimum)';
        
        descriptionField.parentNode.insertBefore(counterDiv, descriptionField.nextSibling);
        
        descriptionField.addEventListener('input', function() {
            const length = this.value.length;
            counterDiv.textContent = length + ' / 100 characters (minimum)';
            
            if (length >= 100) {
                counterDiv.style.color = '#27ae60';
            } else {
                counterDiv.style.color = '#e74c3c';
            }
        });
    }
});