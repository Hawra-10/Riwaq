

// Common Workshops Display Script - Using innerHTML Only (No createElement)

// ===== LECTURE 9: ARRAYS - Array of Objects =====
const allWorkshops = [
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

// ===== LECTURE 9: FUNCTIONS =====
function getRequestCount(workshopName) {
    // ===== LECTURE 10: getItem() =====
    const storedCounts = localStorage.getItem('workshopRequestCounts');
    
    if (storedCounts) {
        // ===== LECTURE 10: JSON.parse =====
        const counts = JSON.parse(storedCounts);
        return counts[workshopName] || 0;
    }
    
    return 0;
}

function incrementRequestCount(workshopName) {
    const storedCounts = localStorage.getItem('workshopRequestCounts');
    let counts = {};
    
    if (storedCounts) {
        counts = JSON.parse(storedCounts);
    }
    
    if (counts[workshopName]) {
        counts[workshopName]++;
    } else {
        counts[workshopName] = 1;
    }
    
    // ===== LECTURE 10: setItem() and JSON.stringify =====
    localStorage.setItem('workshopRequestCounts', JSON.stringify(counts));
    
    console.log('Updated counts:', counts);
    console.log(workshopName + ' now has ' + counts[workshopName] + ' requests');
    
    return counts[workshopName];
}

function getCommonWorkshops() {
    // ===== LECTURE 9: Arrays - Array Creation =====
    const commonWorkshops = [];
    
    // ===== LECTURE 9: Loop Statements - For Loop =====
    for (let i = 0; i < allWorkshops.length; i++) {
        const workshop = allWorkshops[i];
        const requestCount = getRequestCount(workshop.name);
        
        console.log(workshop.name + ' has ' + requestCount + ' requests');
        
        // ===== LECTURE 9: Control Statements - If Statement =====
        if (requestCount >= 3) {
            // ===== LECTURE 9: Array Methods - push =====
            commonWorkshops.push(workshop);
        }
    }
    
    console.log('Common workshops (3+ requests):', commonWorkshops.length);
    return commonWorkshops;
}

function renderCommonWorkshops() {
    // ===== LECTURE 11: Accessing Nodes - getElementById() =====
    // "Accesses a single element by the value of its id attribute"
    const container = document.getElementById('common-workshops');
    
    if (!container) {
        console.error('Common workshops container not found!');
        return;
    }
    
    console.log('Rendering common workshops...');
    
    const commonWorkshops = getCommonWorkshops();
    
    // ===== LECTURE 11: Accessing Nodes - innerHTML =====
    // "innerHTML stands for the HTML content within that element"
    
    // ===== LECTURE 9: Control Statements - If Statement =====
    if (commonWorkshops.length == 0) {
        // Build HTML string for no workshops message
        container.innerHTML = '<p style="text-align: center; font-size: 18px; color: #7f8c8d; padding: 40px;">Check back soon!</p>';
        console.log('No common workshops to display');
        return;
    }
    
    // ===== LECTURE 9: String Object - String Concatenation =====
    // "The operation + is the string catenation operation"
    // Build the entire HTML as a string
    let htmlContent = '';
    
    // ===== LECTURE 9: Loop Statements - For Loop =====
    for (let i = 0; i < commonWorkshops.length; i++) {
        const workshop = commonWorkshops[i];
        
        console.log('Rendering workshop: ' + workshop.name);
        
        // Build HTML string for each workshop card
        htmlContent = htmlContent + 
            '<article class="card">' +
                '<img class="bg" src="' + workshop.image + '" alt="' + workshop.name + '">' +
                '<img class="blurred-img" src="' + workshop.blurredImage + '" alt="' + workshop.name + '">' +
                '<div class="card-inner">' +
                    '<div class="card-header">' +
                        '<h3>' + workshop.name + '<br>' + workshop.subtitle + '</h3>' +
                    '</div>' +
                    '<div class="centered-workshops">' + workshop.description + '</div>' +
                '</div>' +
                '<div class="meta">' +
                    '<span class="pprice">' + workshop.price + '</span>' +
                    '<span class="location">' + workshop.location + '</span>' +
                '</div>' +
            '</article>';
    }
    
    // Set the entire HTML content at once
    container.innerHTML = htmlContent;
    
    console.log('Finished rendering ' + commonWorkshops.length + ' workshops');
}

// ===== LECTURE 11: DOM - Unobtrusive JavaScript =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Common workshops script loaded');
    renderCommonWorkshops();
});

// Make functions available globally
window.workshopSystem = {
    incrementRequestCount: incrementRequestCount,
    renderCommonWorkshops: renderCommonWorkshops,
    getCommonWorkshops: getCommonWorkshops,
    getRequestCount: getRequestCount,
    allWorkshops: allWorkshops
};