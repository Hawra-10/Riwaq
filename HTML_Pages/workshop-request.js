// Workshop Request Form Script

// ===== LECTURE 9: ARRAYS - Array of Objects =====
// "Elements of an array do not have to be of the same type"
// Array to store workshop requests
let workshopRequests = [];

// ===== LECTURE 11: DOM - Unobtrusive JavaScript =====
// "Uses the DOM to attach and execute all JavaScript functions"
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== LECTURE 11: Accessing Nodes - querySelector() =====
    const form = document.querySelector('.forms');
    
    // ===== LECTURE 9: FUNCTIONS =====
    // "Functions are objects in JavaScript"
    // Function to display all workshop requests
    function displayRequests() {
        // Check if display area already exists
        let displayArea = document.getElementById('requests-display-area');
        
        if (!displayArea) {
            // ===== LECTURE 11: DOM Tree Modification =====
            // "By manipulating the DOM tree representing the document, the document content can be changed"
            displayArea = document.createElement('div');
            displayArea.id = 'requests-display-area';
            displayArea.style.marginTop = '30px';
            displayArea.style.width = '100%';
            
            // Add heading
            const heading = document.createElement('h2');
            heading.textContent = 'Your Workshop Requests';
            heading.style.color = '#2c3e50';
            heading.style.marginBottom = '20px';
            displayArea.appendChild(heading);
            
            // Insert after the form
            form.parentNode.appendChild(displayArea);
        }
        
        // Clear previous content (except heading)
        // ===== LECTURE 11: Accessing Nodes - querySelectorAll() =====
        const existingCards = displayArea.querySelectorAll('.request-card');
        for (let i = 0; i < existingCards.length; i++) {
            existingCards[i].remove();
        }
        
        // ===== LECTURE 9: Loop Statements - For Loop =====
        // "The for loop is used to execute a block of code while a certain condition is true"
        // Display each request
        for (let i = 0; i < workshopRequests.length; i++) {
            const request = workshopRequests[i];
            
            // Create card for each request
            const card = document.createElement('div');
            card.className = 'request-card';
            card.style.border = '2px solid #3498db';
            card.style.borderRadius = '8px';
            card.style.padding = '20px';
            card.style.marginBottom = '15px';
            card.style.backgroundColor = '#f8f9fa';
            
            // ===== LECTURE 11: Accessing Nodes - innerHTML =====
            // "innerHTML stands for the HTML content within that element"
            card.innerHTML = `
                <h3 style="color: #3498db; margin-top: 0;">Request #${i + 1}</h3>
                <p><strong>Workshop:</strong> ${request.workshop}</p>
                <p><strong>Customer Name:</strong> ${request.name}</p>
                <p><strong>Due Date:</strong> ${request.dueDate}</p>
                <p><strong>Description:</strong> ${request.description}</p>
            `;
            
            displayArea.appendChild(card);
        }
    }
    
    // ===== LECTURE 11: Events and Event Handling - Registration =====
    // "Registration is the activity of connecting a script to a type of event"
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // ===== LECTURE 11: Dynamic Content =====
        // "The content of an element is accessed through the value property"
        // Get form values
        const workshopSelect = document.querySelector('select[name="requested-workshop"]');
        const workshopValue = workshopSelect.value;
        const workshopText = workshopSelect.options[workshopSelect.selectedIndex].text;
        const name = document.getElementById('name').value.trim();
        const dueDate = document.getElementById('due-date').value;
        const description = document.getElementById('request-description').value.trim();
        
        // ===== LECTURE 9: Primitives - Boolean Type =====
        let isValid = true;
        let errorMessages = [];
        
        // ===== VALIDATION 1: Check if service is selected =====
        if (!workshopValue) {
            errorMessages.push('Please select a workshop');
            isValid = false;
        }
        
        // ===== VALIDATION 2: Validate name =====
        // Name must be full name (at least 2 words)
        // No numbers or special characters (?, !, @)
        if (!name) {
            errorMessages.push('Name is required');
            isValid = false;
        } else {
            // ===== LECTURE 12: Regular Expressions - Character Classes =====
            // Check for numbers
            if (/\d/.test(name)) {
                errorMessages.push('Name cannot contain numbers');
                isValid = false;
            }
            
            // ===== LECTURE 12: Regular Expressions - Special Characters =====
            // Check for special characters (?, !, @)
            // Using character class [?!@] to match any of these characters
            if (/[?!@]/.test(name)) {
                errorMessages.push('Name cannot contain special characters (?, !, @)');
                isValid = false;
            }
            
            // ===== LECTURE 12: Regular Expressions - Quantifiers =====
            // Check if it's a full name (at least two words)
            // \s means whitespace, + means one or more
            const nameParts = name.split(/\s+/);
            if (nameParts.length < 2) {
                errorMessages.push('Please enter your full name (first and last name)');
                isValid = false;
            }
        }
        
        // ===== VALIDATION 3: Validate due date =====
        // Due date should be at least 7 days from today
        if (!dueDate) {
            errorMessages.push('Due date is required');
            isValid = false;
        } else {
            // ===== LECTURE 9: The Date Object =====
            // "A Date object represents a time stamp, that is, a point in time"
            const today = new Date();
            const selectedDate = new Date(dueDate);
            
            // Calculate difference in days
            // ===== LECTURE 9: Date methods - getTime() =====
            const diffTime = selectedDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            // Due date must be at least 7 days in the future
            if (diffDays < 7) {
                errorMessages.push('Due date is too soon. Please select a date at least 7 days from today');
                isValid = false;
            }
        }
        
        // ===== VALIDATION 4: Validate description length =====
        // Must be at least 100 characters
        if (!description) {
            errorMessages.push('Request description is required');
            isValid = false;
        } else {
            // ===== LECTURE 9: String Object - length property =====
            // "Length property (not a method as in Java)"
            if (description.length < 100) {
                errorMessages.push('Request description is too short. Please provide at least 100 characters (current: ' + description.length + ')');
                isValid = false;
            }
        }
        
        // ===== Show errors or process form =====
        if (!isValid) {
            // ===== LECTURE 9: Window Object - The alert Method =====
            // "The alert method opens a dialog box with a message"
            // ===== LECTURE 9: Array Methods - join() =====
            alert('Please fix the following errors:\n\n' + errorMessages.join('\n'));
        } else {
            // ===== Form is valid, show confirmation =====
            // ===== LECTURE 9: Window Object - The confirm Method =====
            // "The confirm methods displays a message provided as a parameter"
            // "If the user presses OK, true is returned by the method"
            const message = 'Your workshop request has been sent successfully!\n\n' +
                          'Workshop: ' + workshopText + '\n' +
                          'Customer: ' + name + '\n' +
                          'Due Date: ' + dueDate + '\n\n' +
                          'Would you like to stay on this page to add another request?\n' +
                          '(Click OK to stay, Cancel to return to dashboard)';
            
            const stayOnPage = confirm(message);
            
            // ===== LECTURE 9: Object Creation and Modification =====
            // "Create an Object object"
            // Create request object
            const newRequest = {
                workshop: workshopText,
                name: name,
                dueDate: dueDate,
                description: description
            };
            
            // ===== LECTURE 9: Array Methods - push =====
            // "push add to back"
            // Add to requests array
            workshopRequests.push(newRequest);
            
            // ===== LECTURE 9: Control Statements - If Statement =====
            if (stayOnPage) {
                // User wants to stay on the page
                // Display all requests
                displayRequests();
                
                // Clear the form for next entry
                form.reset();
                
                // ===== LECTURE 9: Window Object - The alert Method =====
                alert('Form cleared. You can now add another workshop request.');
            } else {
                // User wants to leave the page
                // ===== LECTURE 11: Window Object =====
                // "The Window object represents the window in which the document containing the script is being displayed"
                // Redirect to dashboard
                window.location.href = 'Customers_Dashboard.html';
            }
        }
    });
    
    // ===== BONUS: Character counter for description =====
    const descriptionField = document.getElementById('request-description');
    
    if (descriptionField) {
        // Create character counter display
        const counterDiv = document.createElement('div');
        counterDiv.id = 'char-counter';
        counterDiv.style.fontSize = '14px';
        counterDiv.style.color = '#7f8c8d';
        counterDiv.style.marginTop = '5px';
        counterDiv.textContent = '0 / 100 characters (minimum)';
        
        // Insert after textarea
        descriptionField.parentNode.insertBefore(counterDiv, descriptionField.nextSibling);
        
        // ===== LECTURE 11: Events - Event Types =====
        // Update counter on input
        descriptionField.addEventListener('input', function() {
            const length = this.value.length;
            counterDiv.textContent = length + ' / 100 characters (minimum)';
            
            // ===== LECTURE 11: Changing Colors and Fonts =====
            // "Colors and font properties can be manipulated through the style property of an element"
            if (length >= 100) {
                counterDiv.style.color = '#27ae60'; // Green when valid
            } else {
                counterDiv.style.color = '#e74c3c'; // Red when too short
            }
        });
    }
});