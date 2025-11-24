// Common Workshops Display Script - FIXED VERSION

// ===== LECTURE 9: ARRAYS - Array of Objects =====
// "Elements of an array do not have to be of the same type"
// Database of all available workshops with their details


/*const allWorkshops = [
    {
        name: "Wooden Surface Photography",
        subtitle: "Bring Your Memories to Life",
        description: "Transform your favorite photos into warm wooden panels, adding a personal touch to your home decor.",
        price: "160.00 SAR",
        location: "Riyadh – Almalqa",
        image: "../images/wooden2.jpeg",
        blurredImage: "../images/blurWood.JPEG"
    },
    {
        name: "Metal Engraving Art",
        subtitle: "Etch Your Creativity in Steel",
        description: "Design and carve patterns or names onto small metal plates or jewelry pieces, turning raw metal into personalized keepsakes.",
        price: "140.00 SAR",
        location: "Jeddah – Al Rawdah",
        image: "../images/m3dn.jpeg",
        blurredImage: "../images/blurM3.JPEG"
    },
    {
        name: "Clay Art & Pottery",
        subtitle: "Shape Your Imagination",
        description: "Discover the joy of creating with your hands — mold, carve, and paint your own ceramic pieces to take home.",
        price: "170.00 SAR",
        location: "Riyadh – Al Yasmin",
        image: "../images/pottery.jpeg",
        blurredImage: "../images/blurPottery.JPEG"
    },
    {
        name: "Embroidery & Fabric Art",
        subtitle: "Stitch Your Story",
        description: "Learn traditional and modern embroidery techniques to create beautiful fabric art pieces.",
        price: "150.00 SAR",
        location: "Riyadh – Al Olaya",
        image: "../images/embroidery.jpeg",
        blurredImage: "../images/blurEmbroidery.JPEG"
    },
    {
        name: "Candle Making & Scents",
        subtitle: "Light Up Your Creativity",
        description: "Create custom scented candles with natural waxes and essential oils.",
        price: "130.00 SAR",
        location: "Jeddah – Al Hamra",
        image: "../images/candle.jpeg",
        blurredImage: "../images/blurCandle.JPEG"
    },
    {
        name: "Leather Crafting Basics",
        subtitle: "Craft with Character",
        description: "Learn to create leather goods like wallets, keychains, and accessories.",
        price: "180.00 SAR",
        location: "Riyadh – King Fahd",
        image: "../images/leather.jpeg",
        blurredImage: "../images/blurLeather.JPEG"
    },
    {
        name: "Resin Art Workshop",
        subtitle: "Pour Your Creativity",
        description: "Create stunning resin art pieces, coasters, and jewelry with colorful designs.",
        price: "165.00 SAR",
        location: "Dammam – Al Faisaliyah",
        image: "../images/resin.jpeg",
        blurredImage: "../images/blurResin.JPEG"
    },
    {
        name: "Soap Making with Natural Oils",
        subtitle: "Cleanse with Creativity",
        description: "Craft natural, skin-friendly soaps using essential oils and organic ingredients.",
        price: "120.00 SAR",
        location: "Riyadh – Al Nakheel",
        image: "../images/soap.jpeg",
        blurredImage: "../images/blurSoap.JPEG"
    },
    {
        name: "Calligraphy & Hand Lettering",
        subtitle: "Write with Elegance",
        description: "Master the art of beautiful writing with traditional and modern calligraphy techniques.",
        price: "145.00 SAR",
        location: "Jeddah – Al Zahra",
        image: "../images/calligraphy.jpeg",
        blurredImage: "../images/blurCalligraphy.JPEG"
    }
];

// ===== LECTURE 10: LOCAL STORAGE =====
// "localStorage allows you to store key/value pairs in a web browser"
// "The data stored in localStorage persist even after the browser is closed"

// ===== LECTURE 9: FUNCTIONS =====
// "Functions are objects in JavaScript"
// Function to get request count for a workshop
function getRequestCount(workshopName) {
    // ===== LECTURE 10: getItem() =====
    // "Used to retrieve the value associated with the specified key from localStorage"
    const storedCounts = localStorage.getItem('workshopRequestCounts');
    
    if (storedCounts) {
        // ===== LECTURE 10: JSON.parse =====
        // "deserializing them when retrieving them"
        const counts = JSON.parse(storedCounts);
        return counts[workshopName] || 0;
    }
    
    return 0;
}

// Function to increment request count for a workshop
function incrementRequestCount(workshopName) {
    const storedCounts = localStorage.getItem('workshopRequestCounts');
    let counts = {};
    
    if (storedCounts) {
        counts = JSON.parse(storedCounts);
    }
    
    // Increment the count
    if (counts[workshopName]) {
        counts[workshopName]++;
    } else {
        counts[workshopName] = 1;
    }
    
    // ===== LECTURE 10: setItem() and JSON.stringify =====
    // "Used to store a key/value pair in localStorage"
    // "serialize them to a string format before storing"
    localStorage.setItem('workshopRequestCounts', JSON.stringify(counts));
    
    console.log('Updated counts:', counts);
    console.log(workshopName + ' now has ' + counts[workshopName] + ' requests');
    
    return counts[workshopName];
}

// Function to get common workshops (requested 3+ times)
function getCommonWorkshops() {
    // ===== LECTURE 9: Arrays - Array Creation =====
    const commonWorkshops = [];
    
    // ===== LECTURE 9: Loop Statements - For Loop =====
    // "The for loop is used to execute a block of code while a certain condition is true"
    for (let i = 0; i < allWorkshops.length; i++) {
        const workshop = allWorkshops[i];
        const requestCount = getRequestCount(workshop.name);
        
        console.log(workshop.name + ' has ' + requestCount + ' requests');
        
        // ===== LECTURE 9: Control Statements - If Statement =====
        // "Use an if statement whenever you come to a 'fork' in the program"
        if (requestCount >= 3) {
            // ===== LECTURE 9: Array Methods - push =====
            // "push add to back"
            commonWorkshops.push(workshop);
        }
    }
    
    console.log('Common workshops (3+ requests):', commonWorkshops.length);
    return commonWorkshops;
}

// Function to render common workshops section
function renderCommonWorkshops() {
    // ===== LECTURE 11: Accessing Nodes - getElementById() =====
    // "Accesses a single element by the value of its id attribute"
    const container = document.getElementById('common-workshops');
    
    if (!container) {
        console.error('Common workshops container not found!');
        return;
    }
    
    console.log('Rendering common workshops...');
    
    // Get workshops with 3+ requests
    const commonWorkshops = getCommonWorkshops();
    
    // ===== LECTURE 11: Accessing Nodes - innerHTML =====
    // "innerHTML stands for the HTML content within that element"
    // Clear current content
    container.innerHTML = '';
    
    // ===== LECTURE 9: Control Statements - If Statement =====
    if (commonWorkshops.length === 0) {
        // ===== LECTURE 11: DOM Tree Modification =====
        // "By manipulating the DOM tree representing the document, the document content can be changed"
        const message = document.createElement('p');
        message.textContent = 'No workshops have been requested 3 or more times yet. Check back soon!';
        message.style.textAlign = 'center';
        message.style.fontSize = '18px';
        message.style.color = '#7f8c8d';
        message.style.padding = '40px';
        container.appendChild(message);
        console.log('No common workshops to display');
        return;
    }
    
    // ===== LECTURE 9: Loop Statements - For Loop =====
    // Render each common workshop
    for (let i = 0; i < commonWorkshops.length; i++) {
        const workshop = commonWorkshops[i];
        
        console.log('Rendering workshop: ' + workshop.name);
        
        // ===== LECTURE 11: DOM Tree Modification - createElement =====
        // Create article element
        const article = document.createElement('article');
        article.className = 'card';
        
        // Create background image
        const bgImg = document.createElement('img');
        bgImg.className = 'bg';
        bgImg.src = workshop.image;
        bgImg.alt = workshop.name;
        
        // Create blurred image
        const blurredImg = document.createElement('img');
        blurredImg.className = 'blurred-img';
        blurredImg.src = workshop.blurredImage;
        blurredImg.alt = workshop.name;
        
        // Create card inner
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        
        // Create card header
        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        
        const heading = document.createElement('h3');
        // ===== LECTURE 9: String Object - String Concatenation =====
        // "The operation + is the string catenation operation"
        heading.innerHTML = workshop.name + '<br>' + workshop.subtitle;
        cardHeader.appendChild(heading);
        
        // Create description
        const description = document.createElement('div');
        description.className = 'centered-workshops';
        description.textContent = workshop.description;
        
        // Append to card inner
        cardInner.appendChild(cardHeader);
        cardInner.appendChild(description);
        
        // Create meta information
        const meta = document.createElement('div');
        meta.className = 'meta';
        
        const priceSpan = document.createElement('span');
        priceSpan.className = 'pprice';
        priceSpan.textContent = workshop.price;
        
        const locationSpan = document.createElement('span');
        locationSpan.className = 'location';
        locationSpan.textContent = workshop.location;
        
        meta.appendChild(priceSpan);
        meta.appendChild(locationSpan);
        
        // Append all to article
        article.appendChild(bgImg);
        article.appendChild(blurredImg);
        article.appendChild(cardInner);
        article.appendChild(meta);
        
        // Append article to container
        container.appendChild(article);
    }
    
    console.log('Finished rendering ' + commonWorkshops.length + ' workshops');
}

// ===== LECTURE 11: DOM - Unobtrusive JavaScript =====
// "Uses the DOM to attach and execute all JavaScript functions"
document.addEventListener('DOMContentLoaded', function() {
    console.log('Common workshops script loaded');
    
    // Render common workshops
    renderCommonWorkshops();
});

// ===== EXPORT FUNCTIONS FOR USE IN OTHER SCRIPTS =====
// These functions can be called from the workshop request form
// Make functions available globally
window.workshopSystem = {
    incrementRequestCount: incrementRequestCount,
    renderCommonWorkshops: renderCommonWorkshops,
    getCommonWorkshops: getCommonWorkshops,
    getRequestCount: getRequestCount,
    allWorkshops: allWorkshops
};*/


// All workshops database
var allWorkshops = [
    {
        name: "Wooden Surface Photography",
        subtitle: "Bring Your Memories to Life",
        description: "Transform your favorite photos into warm wooden panels, adding a personal touch to your home decor.",
        price: "160.00 SAR",
        location: "Riyadh – Almalqa",
        image: "../images/wooden2.jpeg",
        blurredImage: "../images/blurWood.JPEG"
    },
    {
        name: "Metal Engraving Art",
        subtitle: "Etch Your Creativity in Steel",
        description: "Design and carve patterns or names onto small metal plates or jewelry pieces, turning raw metal into personalized keepsakes.",
        price: "140.00 SAR",
        location: "Jeddah – Al Rawdah",
        image: "../images/m3dn.jpeg",
        blurredImage: "../images/blurM3.JPEG"
    },
    {
        name: "Clay Art & Pottery",
        subtitle: "Shape Your Imagination",
        description: "Discover the joy of creating with your hands — mold, carve, and paint your own ceramic pieces to take home.",
        price: "170.00 SAR",
        location: "Riyadh – Al Yasmin",
        image: "../images/pottery.jpeg",
        blurredImage: "../images/blurPottery.JPEG"
    },
    {
        name: "Embroidery & Fabric Art",
        subtitle: "Threads That Tell Stories",
        description: "Bring color to cloth by learning creative stitching patterns and designs for clothes, hoops, and home decor.",
        price: "160.00 SAR",
        location: "Jeddah – Al Salamah",
        image: "../images/embroidery.jpeg",
        blurredImage: "../images/blurEmbroidery.JPEG"
    },
    {
        name: "Candle Making & Scents",
        subtitle: "Light Up Your Space",
        description: "Mix soothing fragrances and colors to craft personalized candles perfect for gifts or cozy nights in.",
        price: "200.00 SAR",
        location: "Dammam – Al Faisaliah",
        image: "../images/candel2.jpeg",
        blurredImage: "../images/blurCandel.JPEG"
    },
    {
        name: "Leather Crafting Basics",
        subtitle: "From Hide to Handmade",
        description: "Learn how to design, cut, and stitch your own leather wallet or keychain using traditional techniques.",
        price: "300.00 SAR",
        location: "Riyadh – Al Nakhil",
        image: "../images/Leather.jpeg",
        blurredImage: "../images/blurLeather.JPEG"
    },
    {
        name: "Resin Art Workshop",
        subtitle: "Freeze Time in Art",
        description: "Create stunning resin pieces — from ocean-inspired coasters to jewelry — blending colors, patterns, and texture.",
        price: "189.00 SAR",
        location: "Jeddah – Al Andalus",
        image: "../images/Resin.jpeg",
        blurredImage: "../images/blurResin.JPEG"
    },
    {
        name: "Soap Making with Natural Oils",
        subtitle: "Pure, Simple, Organic",
        description: "Blend essential oils and natural ingredients to create custom organic soaps that look and smell amazing.",
        price: "160.00 SAR",
        location: "Riyadh – Al Sahafa",
        image: "../images/Soap.jpeg",
        blurredImage: "../images/blurSoap.JPEG"
    },
    {
        name: "Calligraphy & Hand Lettering",
        subtitle: "Write with Style",
        description: "Learn the art of elegant writing — from brush strokes to designing personalized cards and quotes.",
        price: "150.00 SAR",
        location: "Dammam – Al Rakah",
        image: "../images/write.jpeg",
        blurredImage: "../images/blurWrite.JPEG"
    }
];

// Get request count from localStorage
function getRequestCount(workshopName) {
    var storedCounts = localStorage.getItem("workshopRequestCounts");
    
    if (storedCounts) {
        var counts = JSON.parse(storedCounts);
        return counts[workshopName] || 0;
    }
    
    return 0;
}

// Increment request count
function incrementRequestCount(workshopName) {
    var storedCounts = localStorage.getItem("workshopRequestCounts");
    var counts = {};
    
    if (storedCounts) {
        counts = JSON.parse(storedCounts);
    }
    
    if (counts[workshopName]) {
        counts[workshopName] = counts[workshopName] + 1;
    } else {
        counts[workshopName] = 1;
    }
    
    localStorage.setItem("workshopRequestCounts", JSON.stringify(counts));
    
    return counts[workshopName];
}

// Get common workshops (3+ requests)
function getCommonWorkshops() {
    var commonWorkshops = [];
    
    for (var i = 0; i < allWorkshops.length; i++) {
        var workshop = allWorkshops[i];
        var requestCount = getRequestCount(workshop.name);
        
        if (requestCount >= 3) {
            commonWorkshops[commonWorkshops.length] = workshop;
        }
    }
    
    return commonWorkshops;
}

// Render common workshops
function renderCommonWorkshops() {
    var container = document.getElementById("common-workshops");
    
    if (container == null) {
        return;
    }
    
    var commonWorkshops = getCommonWorkshops();
    
    // Clear container
    container.innerHTML = "";
    
    if (commonWorkshops.length == 0) {
        container.innerHTML = "<p style='text-align: center; padding: 40px;'>No workshops have been requested 3 or more times yet.</p>";
        return;
    }
    
    // Build HTML for all workshops
    var html = "";
    
    for (var i = 0; i < commonWorkshops.length; i++) {
        var w = commonWorkshops[i];
        
        html = html + "<article class='card'>";
        html = html + "<img class='bg' src='" + w.image + "' alt=''>";
        html = html + "<img class='blurred-img' src='" + w.blurredImage + "' alt=''>";
        html = html + "<div class='card-inner'>";
        html = html + "<div class='card-header'>";
        html = html + "<h3>" + w.name + "<br>" + w.subtitle + "</h3>";
        html = html + "</div>";
        html = html + "<div class='centered-workshops'>" + w.description + "</div>";
        html = html + "</div>";
        html = html + "<div class='meta'>";
        html = html + "<span class='pprice'>" + w.price + "</span>";
        html = html + "<span class='location'>" + w.location + "</span>";
        html = html + "</div>";
        html = html + "</article>";
    }
    
    container.innerHTML = html;
}

// Run when page loads
window.onload = function() {
    renderCommonWorkshops();
};