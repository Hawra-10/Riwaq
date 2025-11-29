// Shared Theme Management System
class ThemeManager {
    constructor() {
        this.initTheme();
    }

    // Initialize theme on page load
    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light-theme';
        document.body.classList.add(savedTheme);
        this.updateThemeDependentElements();
    }

    // Switch between themes
    toggleTheme() {
        const body = document.body;
        
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
        
        this.updateThemeDependentElements();
    }

    // Update elements that depend on theme
    updateThemeDependentElements() {
        // Update navigation colors
        const navItems = document.querySelectorAll('#navigation');
        const isDark = document.body.classList.contains('dark-theme');
        
        navItems.forEach(item => {
            if (isDark) {
                item.style.backgroundColor = '#3a3a2a';
            } else {
                item.style.backgroundColor = '#3a3a2a';
            }
        });

        // Update any other theme-dependent elements
        this.updateButtons();
        this.updateCards();
    }

    updateButtons() {
        const buttons = document.querySelectorAll('button:not(.theme-toggle):not(.back-to-top)');
        const isDark = document.body.classList.contains('dark-theme');
        
        buttons.forEach(button => {
            if (isDark) {
                button.style.backgroundColor = '#fef8e3';
                button.style.color = '#212319';
            } else {
                button.style.backgroundColor = '#212319';
                button.style.color = '#fef8e3';
            }
        });
    }

    updateCards() {
        const cards = document.querySelectorAll('.card');
        const isDark = document.body.classList.contains('dark-theme');
        
        cards.forEach(card => {
            if (isDark) {
                card.style.backgroundColor = '#2a2a1a';
                card.style.color = '#fef8e3';
            } else {
                card.style.backgroundColor = '';
                card.style.color = '';
            }
        });
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.themeManager = new ThemeManager();
});

// Function to be called from homepage theme button
function toggleGlobalTheme() {
    if (window.themeManager) {
        window.themeManager.toggleTheme();
    } else {
        // Fallback if themeManager not initialized
        const body = document.body;
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    }
}