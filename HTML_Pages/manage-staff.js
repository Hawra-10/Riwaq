// Manage Staff Members Script

// ===== LECTURE 9: ARRAYS - Array of Objects =====
// "Elements of an array do not have to be of the same type"
// "Array to store staff member objects"
/*let staffMembers = [
    {
        name: "Aroub Alswayyed",
        image: "../images/aroub.jpeg",
        birthDate: "1995-05-15",
        email: "aroub@example.com",
        expertize: "Web Development",
        skills: "HTML, CSS, JavaScript",
        education: "Computer Science Degree"
    },
    {
        name: "Shatha Marzuq",
        image: "../images/shatha.jpeg",
        birthDate: "1993-08-20",
        email: "shatha@example.com",
        expertize: "Graphic Design",
        skills: "Adobe Photoshop, Illustrator",
        education: "Fine Arts Degree"
    },
    {
        name: "Ahmad Musa",
        image: "../images/ahmad.jpeg",
        birthDate: "1990-03-10",
        email: "ahmad@example.com",
        expertize: "Marketing",
        skills: "SEO, Content Writing",
        education: "Marketing Degree"
    },
    {
        name: "Mohammad Ali",
        image: "../images/mohammad.jpeg",
        birthDate: "1992-11-25",
        email: "mohammad@example.com",
        expertize: "Data Analysis",
        skills: "Python, SQL, Excel",
        education: "Statistics Degree"
    },
    {
        name: "Noara Saleh",
        image: "../images/noura.jpeg",
        birthDate: "1994-07-18",
        email: "noura@example.com",
        expertize: "Project Management",
        skills: "Agile, Scrum, Leadership",
        education: "Business Administration"
    },
    {
        name: "Salman Majed",
        image: "../images/salman.jpeg",
        birthDate: "1991-02-14",
        email: "salman@example.com",
        expertize: "UI/UX Design",
        skills: "Figma, User Research",
        education: "Design Degree"
    }
];

// ===== LECTURE 11: DOM - Unobtrusive JavaScript =====
// "Uses the DOM to attach and execute all JavaScript functions"
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== LECTURE 9: FUNCTIONS =====
    // "Functions are objects in JavaScript"
    // Function to render staff members list
    function renderStaffList() {
        // ===== LECTURE 11: Accessing Nodes - getElementById() =====
        const deleteForm = document.getElementById('delete-staff-form');
        
        // ===== LECTURE 11: Accessing Nodes - innerHTML =====
        // "innerHTML stands for the HTML content within that element"
        // Clear current list
        deleteForm.innerHTML = '';
        
        // ===== LECTURE 9: Loop Statements - For Loop =====
        // "The for loop is used to execute a block of code while a certain condition is true"
        // Render each staff member
        for (let i = 0; i < staffMembers.length; i++) {
            const member = staffMembers[i];
            
            // ===== LECTURE 11: DOM Tree Modification =====
            // "By manipulating the DOM tree representing the document, the document content can be changed"
            const staffDiv = document.createElement('div');
            staffDiv.className = 'staff-members';
            
            // Create image element
            const img = document.createElement('img');
            img.src = member.image;
            img.alt = member.name;
            img.width = 80;
            img.height = 80;
            
            // Create span element
            const span = document.createElement('span');
            span.textContent = member.name;
            
            // Create checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'staff-to-delete';
            checkbox.value = i; // Store index for deletion
            
            // Append elements
            staffDiv.appendChild(img);
            staffDiv.appendChild(span);
            staffDiv.appendChild(checkbox);
            deleteForm.appendChild(staffDiv);
        }
    }
    
    // Initial render
    renderStaffList();
    
    // ===== DELETE FUNCTIONALITY =====
    // ===== LECTURE 11: Events and Event Handling - Registration =====
    // "Registration is the activity of connecting a script to a type of event"
    const deleteButton = document.querySelector('input[type="submit"][value="Delete"]');
    
    deleteButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // ===== LECTURE 11: Accessing Nodes - querySelectorAll() =====
        // "Accesses nodes based on a CSS selector"
        const checkboxes = document.querySelectorAll('input[name="staff-to-delete"]:checked');
        
        // ===== LECTURE 9: Control Statements - If Statement =====
        // Check if any checkbox is selected
        if (checkboxes.length === 0) {
            // ===== LECTURE 9: Window Object - The alert Method =====
            alert('Please select at least one member');
            return;
        }
        
        // ===== LECTURE 9: Window Object - The confirm Method =====
        // "The confirm methods displays a message provided as a parameter"
        // "If the user presses OK, true is returned"
        const confirmed = confirm('Are you sure you want to delete the selected member(s)?');
        
        if (confirmed) {
            // ===== LECTURE 9: Arrays - Array Methods =====
            // "Methods: concat, join, pop, push, reverse, shift, slice, sort, splice"
            // Collect indices to delete (in reverse order to avoid index issues)
            const indicesToDelete = [];
            
            // ===== LECTURE 9: Loop Statements - For Loop =====
            for (let i = 0; i < checkboxes.length; i++) {
                indicesToDelete.push(parseInt(checkboxes[i].value));
            }
            
            // ===== LECTURE 9: Array Methods - sort =====
            // Sort in descending order to delete from end to beginning
            indicesToDelete.sort(function(a, b) { return b - a; });
            
            // Delete selected members
            for (let i = 0; i < indicesToDelete.length; i++) {
                // ===== LECTURE 9: Array Methods - splice =====
                // "splice removes elements from array"
                staffMembers.splice(indicesToDelete[i], 1);
            }
            
            // Re-render the list
            renderStaffList();
            
            alert('Selected member(s) deleted successfully!');
        }
    });
    
    // ===== ADD NEW STAFF MEMBER FUNCTIONALITY =====
    const staffForm = document.getElementById('staff-member-form');
    
    staffForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // ===== LECTURE 11: Dynamic Content =====
        // "The content of an element is accessed through the value property"
        // Get form values
        const name = document.getElementById('staff-name').value.trim();
        const birthDate = document.getElementById('birth-date').value;
        const email = document.getElementById('staff-email').value.trim();
        const fileInput = document.getElementById('workshop-photo');
        const expertize = document.getElementById('area-of-expertize').value.trim();
        const skills = document.getElementById('skills').value.trim();
        const education = document.getElementById('education').value.trim();
        
        // ===== LECTURE 9: Primitives - Boolean Type =====
        let isValid = true;
        let errorMessages = [];
        
        // ===== Validate all fields are not empty =====
        if (!name) {
            errorMessages.push('Full Name is required');
            isValid = false;
        }
        
        if (!birthDate) {
            errorMessages.push('Birth Date is required');
            isValid = false;
        }
        
        if (!email) {
            errorMessages.push('Email is required');
            isValid = false;
        }
        
        if (!expertize) {
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
        
        // ===== LECTURE 12: Regular Expressions - Anchors =====
        // Validate name doesn't start with number
        if (name && /^\d/.test(name)) {
            errorMessages.push('Full Name cannot start with a number');
            isValid = false;
        }
        
        // Validate photo field
        let imageUrl = '../images/default-avatar.jpg'; // Default image
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            
            if (!allowedTypes.includes(file.type)) {
                errorMessages.push('Photo field accepts only image files');
                isValid = false;
            } else {
                // Create object URL for the uploaded image
                imageUrl = URL.createObjectURL(file);
            }
        }
        
        // ===== LECTURE 9: The Date Object =====
        // Validate DOB
        if (birthDate) {
            const birthYear = new Date(birthDate).getFullYear();
            if (birthYear > 2008) {
                errorMessages.push('Birth Date should not be after 2008');
                isValid = false;
            }
        }
        
        // Show errors or add member
        if (!isValid) {
            // ===== LECTURE 9: Array Methods - join() =====
            alert('Please fix the following errors:\n\n' + errorMessages.join('\n'));
        } else {
            // ===== LECTURE 9: Object Creation and Modification =====
            // "Create an Object object"
            // Create new staff member object
            const newMember = {
                name: name,
                image: imageUrl,
                birthDate: birthDate,
                email: email,
                expertize: expertize,
                skills: skills,
                education: education
            };
            
            // ===== LECTURE 9: Array Methods - push =====
            // "push add to back"
            // Add to array
            staffMembers.push(newMember);
            
            // Re-render the list
            renderStaffList();
            
            // ===== LECTURE 9: String Object - String Concatenation =====
            // "The operation + is the string catenation operation"
            alert('New staff member added successfully!\n\nWelcome, ' + name + '!');
            
            // Clear the form
            staffForm.reset();
            
            // Reset file upload label to original icon
            const fileUploadLabel = document.getElementById('file-upload-label');
            fileUploadLabel.innerHTML = `
                <span class="icon-wrapper">
                    <i class="fas fa-image main-icon"></i>
                    <i class="fas fa-plus badge-icon"></i>
                </span>
            `;
        }
    });
    
    // ===== IMAGE PREVIEW FUNCTIONALITY =====
    const fileInput = document.getElementById('workshop-photo');
    const fileDisplay = document.getElementById('file-upload');
    const fileUploadLabel = document.getElementById('file-upload-label');
    
    if (fileInput && fileDisplay) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                const file = this.files[0];
                fileDisplay.value = file.name;
                
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        fileUploadLabel.innerHTML = '<img src="' + e.target.result + '" alt="Preview" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">';
                    };
                    
                    reader.readAsDataURL(file);
                } else {
                    fileUploadLabel.innerHTML = `
                        <span class="icon-wrapper">
                            <i class="fas fa-image main-icon"></i>
                            <i class="fas fa-plus badge-icon"></i>
                        </span>
                    `;
                }
            } else {
                fileDisplay.value = '';
                fileUploadLabel.innerHTML = `
                    <span class="icon-wrapper">
                        <i class="fas fa-image main-icon"></i>
                        <i class="fas fa-plus badge-icon"></i>
                    </span>
                `;
            }
        });
    }
});*/










// Manage Staff Members Script

// ===== LECTURE 9: ARRAYS - Array of Objects =====
// "Elements of an array do not have to be of the same type"
// "Array to store staff member objects"
let staffMembers = [
    {
        name: "Aroub Alswayyed",
        image: "../images/aroub.jpeg",
        birthDate: "1995-05-15",
        email: "aroub@example.com",
        expertize: "Web Development",
        skills: "HTML, CSS, JavaScript",
        education: "Computer Science Degree"
    },
    {
        name: "Shatha Marzuq",
        image: "../images/shatha.jpeg",
        birthDate: "1993-08-20",
        email: "shatha@example.com",
        expertize: "Graphic Design",
        skills: "Adobe Photoshop, Illustrator",
        education: "Fine Arts Degree"
    },
    {
        name: "Ahmad Musa",
        image: "../images/ahmad.jpeg",
        birthDate: "1990-03-10",
        email: "ahmad@example.com",
        expertize: "Marketing",
        skills: "SEO, Content Writing",
        education: "Marketing Degree"
    },
    {
        name: "Mohammad Ali",
        image: "../images/mohammad.jpeg",
        birthDate: "1992-11-25",
        email: "mohammad@example.com",
        expertize: "Data Analysis",
        skills: "Python, SQL, Excel",
        education: "Statistics Degree"
    },
    {
        name: "Noara Saleh",
        image: "../images/noura.jpeg",
        birthDate: "1994-07-18",
        email: "noura@example.com",
        expertize: "Project Management",
        skills: "Agile, Scrum, Leadership",
        education: "Business Administration"
    },
    {
        name: "Salman Majed",
        image: "../images/salman.jpeg",
        birthDate: "1991-02-14",
        email: "salman@example.com",
        expertize: "UI/UX Design",
        skills: "Figma, User Research",
        education: "Design Degree"
    }
];

// ===== LECTURE 11: DOM - Unobtrusive JavaScript =====
// "Uses the DOM to attach and execute all JavaScript functions"
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== LECTURE 9: FUNCTIONS =====
    // "Functions are objects in JavaScript"
    // Function to render staff members list
    function renderStaffList() {
        // ===== LECTURE 11: Accessing Nodes - getElementById() =====
        const deleteForm = document.getElementById('delete-staff-form');
        
        // ===== LECTURE 11: Accessing Nodes - innerHTML =====
        // "innerHTML stands for the HTML content within that element"
        
        // ===== LECTURE 9: String Object - String Concatenation =====
        // "The operation + is the string catenation operation"
        // Build the entire HTML as a string
        let htmlContent = '';
        
        // ===== LECTURE 9: Loop Statements - For Loop =====
        // "The for loop is used to execute a block of code while a certain condition is true"
        // Render each staff member
        for (let i = 0; i < staffMembers.length; i++) {
            const member = staffMembers[i];
            
            // Build HTML string for each staff member
            htmlContent = htmlContent + 
                '<div class="staff-members">' +
                    '<img src="' + member.image + '" alt="' + member.name + '" width="80" height="80">' +
                    '<span>' + member.name + '</span>' +
                    '<input type="checkbox" name="staff-to-delete" value="' + i + '">' +
                '</div>';
        }
        
        // Set the entire HTML content at once
        deleteForm.innerHTML = htmlContent;
    }
    
    // Initial render
    renderStaffList();
    
    // ===== DELETE FUNCTIONALITY =====
    // ===== LECTURE 11: Events and Event Handling - Registration =====
    // "Registration is the activity of connecting a script to a type of event"
    const deleteButton = document.querySelector('input[type="submit"][value="Delete"]');
    
    deleteButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // ===== LECTURE 11: Accessing Nodes - querySelectorAll() =====
        // "Accesses nodes based on a CSS selector"
        const checkboxes = document.querySelectorAll('input[name="staff-to-delete"]:checked');
        
        // ===== LECTURE 9: Control Statements - If Statement =====
        // Check if any checkbox is selected
        if (checkboxes.length === 0) {
            // ===== LECTURE 9: Window Object - The alert Method =====
            alert('Please select at least one member');
            return;
        }
        
        // ===== LECTURE 9: Window Object - The confirm Method =====
        // "The confirm methods displays a message provided as a parameter"
        // "If the user presses OK, true is returned"
        const confirmed = confirm('Are you sure you want to delete the selected member(s)?');
        
        if (confirmed) {
            // ===== LECTURE 9: Arrays - Array Methods =====
            // "Methods: concat, join, pop, push, reverse, shift, slice, sort, splice"
            // Collect indices to delete (in reverse order to avoid index issues)
            const indicesToDelete = [];
            
            // ===== LECTURE 9: Loop Statements - For Loop =====
            for (let i = 0; i < checkboxes.length; i++) {
                indicesToDelete.push(parseInt(checkboxes[i].value));
            }
            
            // ===== LECTURE 9: Array Methods - sort =====
            // Sort in descending order to delete from end to beginning
            indicesToDelete.sort(function(a, b) { return b - a; });
            
            // Delete selected members
            for (let i = 0; i < indicesToDelete.length; i++) {
                // ===== LECTURE 9: Array Methods - splice =====
                // "splice removes elements from array"
                staffMembers.splice(indicesToDelete[i], 1);
            }
            
            // Re-render the list
            renderStaffList();
            
            alert('Selected member(s) deleted successfully!');
        }
    });
    
    // ===== ADD NEW STAFF MEMBER FUNCTIONALITY =====
    const staffForm = document.getElementById('staff-member-form');
    
    staffForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // ===== LECTURE 11: Dynamic Content =====
        // "The content of an element is accessed through the value property"
        // Get form values
        const name = document.getElementById('staff-name').value.trim();
        const birthDate = document.getElementById('birth-date').value;
        const email = document.getElementById('staff-email').value.trim();
        const fileInput = document.getElementById('workshop-photo');
        const expertize = document.getElementById('area-of-expertize').value.trim();
        const skills = document.getElementById('skills').value.trim();
        const education = document.getElementById('education').value.trim();
        
        // ===== LECTURE 9: Primitives - Boolean Type =====
        let isValid = true;
        let errorMessages = [];
        
        // ===== Validate all fields are not empty =====
        if (!name) {
            errorMessages.push('Full Name is required');
            isValid = false;
        }
        
        if (!birthDate) {
            errorMessages.push('Birth Date is required');
            isValid = false;
        }
        
        if (!email) {
            errorMessages.push('Email is required');
            isValid = false;
        }
        
        if (!expertize) {
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
        
        // ===== LECTURE 12: Regular Expressions - Anchors =====
        // Validate name doesn't start with number
        if (name && /^\d/.test(name)) {
            errorMessages.push('Full Name cannot start with a number');
            isValid = false;
        }
        
        // Validate photo field
        let imageUrl = '../images/default-avatar.jpg'; // Default image
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            
            if (!allowedTypes.includes(file.type)) {
                errorMessages.push('Photo field accepts only image files');
                isValid = false;
            } else {
                // Create object URL for the uploaded image
                imageUrl = URL.createObjectURL(file);
            }
        }
        
        // ===== LECTURE 9: The Date Object =====
        // Validate DOB
        if (birthDate) {
            const birthYear = new Date(birthDate).getFullYear();
            if (birthYear > 2008) {
                errorMessages.push('Birth Date should not be after 2008');
                isValid = false;
            }
        }
        
        // Show errors or add member
        if (!isValid) {
            // ===== LECTURE 9: Array Methods - join() =====
            alert('Please fix the following errors:\n\n' + errorMessages.join('\n'));
        } else {
            // ===== LECTURE 9: Object Creation and Modification =====
            // "Create an Object object"
            // Create new staff member object
            const newMember = {
                name: name,
                image: imageUrl,
                birthDate: birthDate,
                email: email,
                expertize: expertize,
                skills: skills,
                education: education
            };
            
            // ===== LECTURE 9: Array Methods - push =====
            // "push add to back"
            // Add to array
            staffMembers.push(newMember);
            
            // Re-render the list
            renderStaffList();
            
            // ===== LECTURE 9: String Object - String Concatenation =====
            // "The operation + is the string catenation operation"
            alert('New staff member added successfully!\n\nWelcome, ' + name + '!');
            
            // Clear the form
            staffForm.reset();
            
            // Reset file upload label to original icon
            const fileUploadLabel = document.getElementById('file-upload-label');
            // ===== LECTURE 9: String Concatenation =====
            fileUploadLabel.innerHTML = 
                '<span class="icon-wrapper">' +
                    '<i class="fas fa-image main-icon"></i>' +
                    '<i class="fas fa-plus badge-icon"></i>' +
                '</span>';
        }
    });
    
    // ===== IMAGE PREVIEW FUNCTIONALITY =====
    const fileInput = document.getElementById('workshop-photo');
    const fileDisplay = document.getElementById('file-upload');
    const fileUploadLabel = document.getElementById('file-upload-label');
    
    if (fileInput && fileDisplay) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                const file = this.files[0];
                fileDisplay.value = file.name;
                
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        // ===== LECTURE 9: String Concatenation =====
                        fileUploadLabel.innerHTML = '<img src="' + e.target.result + '" alt="Preview" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">';
                    };
                    
                    reader.readAsDataURL(file);
                } else {
                    fileUploadLabel.innerHTML = `
                        <span class="icon-wrapper">
                            <i class="fas fa-image main-icon"></i>
                            <i class="fas fa-plus badge-icon"></i>
                        </span>
                    `;
                }
            } else {
                fileDisplay.value = '';
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