// Staff Member Form Validation Script

// Wait for DOM to load before attaching event handlers
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('staff-member-form');
    
    // Add submit event listener
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Get all form field values
        const staffName = document.getElementById('staff-name').value.trim();
        const birthDate = document.getElementById('birth-date').value;
        const staffEmail = document.getElementById('staff-email').value.trim();
        const fileInput = document.getElementById('workshop-photo');
        const areaOfExpertize = document.getElementById('area-of-expertize').value.trim();
        const skills = document.getElementById('skills').value.trim();
        const education = document.getElementById('education').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation flags
        let isValid = true;
        let errorMessages = [];
        
        // 1. Check for empty fields
        if (!staffName) {
            errorMessages.push('Full Name is required');
            isValid = false;
        }
        
        if (!birthDate) {
            errorMessages.push('Birth Date is required');
            isValid = false;
        }
        
        if (!staffEmail) {
            errorMessages.push('Email is required');
            isValid = false;
        }
        
        if (!areaOfExpertize) {
            errorMessages.push('Area of Expertize is required');
            isValid = false;
        }
        
        if (!skills) {
            errorMessages.push('Skills is required');
            isValid = false;
        }
        
        if (!education) {
            errorMessages.push('Education is required');
            isValid = false;
        }
        
        if (!message) {
            errorMessages.push('Message is required');
            isValid = false;
        }
        
        // 2. Validate name field - can't start with numbers
        // Using RegEx: ^ means start of string, \d means digit
        if (staffName && /^\d/.test(staffName)) {
            errorMessages.push('Full Name cannot start with a number');
            isValid = false;
        }
        
        // 3. Validate photo field - accepts only images
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            
            if (!allowedTypes.includes(file.type)) {
                errorMessages.push('Photo field accepts only image files (JPEG, PNG, GIF, WebP)');
                isValid = false;
            }
        } else {
            errorMessages.push('Please upload a photo');
            isValid = false;
        }
        
        // 4. Validate DOB - should not be after 2008
        if (birthDate) {
            const birthYear = new Date(birthDate).getFullYear();
            
            if (birthYear > 2008) {
                errorMessages.push('Birth Date should not be after 2008');
                isValid = false;
            }
        }
        
        // If form is valid, show confirmation alert
        if (isValid) {
            alert('Form submitted successfully!\n\nThank you, ' + staffName + ', for joining our team!');
            // Optionally, you can submit the form here or clear it
            // form.submit(); // Uncomment to actually submit the form
            // form.reset(); // Uncomment to clear the form after successful validation
        } else {
            // Show all error messages
            alert('Please fix the following errors:\n\n' + errorMessages.join('\n'));
        }
    });
    
    // Optional: Update file input display and show image preview when file is selected
    const fileInput = document.getElementById('workshop-photo');
    const fileDisplay = document.getElementById('file-upload');
    const fileUploadLabel = document.getElementById('file-upload-label');
    
    if (fileInput && fileDisplay) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                const file = this.files[0];
                fileDisplay.value = file.name;
                
                // ===== LECTURE 11: Dynamic Content - Changing Colors and Fonts =====
                // "Colors and font properties can be manipulated through the style property"
                // ===== Image Preview Using FileReader API =====
                // Check if file is an image
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    // ===== LECTURE 11: Events - Event Handlers =====
                    // "An event handler is a program segment designed to execute when a certain event occurs"
                    reader.onload = function(e) {
                        // Update the label to show the image preview
                        // ===== LECTURE 11: Accessing Nodes - innerHTML =====
                        // "innerHTML stands for the HTML content within that element"
                        fileUploadLabel.innerHTML = '<img src="' + e.target.result + '" alt="Preview" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">';
                    };
                    
                    // Read the file as a data URL
                    reader.readAsDataURL(file);
                } else {
                    // If not an image, keep the icon
                    fileUploadLabel.innerHTML = `
                        <span class="icon-wrapper">
                            <i class="fas fa-image main-icon"></i>
                            <i class="fas fa-plus badge-icon"></i>
                        </span>
                    `;
                }
            } else {
                fileDisplay.value = '';
                // Reset to original icon
                fileUploadLabel.innerHTML = `
                    <span class="icon-wrapper">
                        <i class="fas fa-image main-icon"></i>
                        <i class="fas fa-plus badge-icon"></i>
                    </span>
                `;
            }
        });
    }
});