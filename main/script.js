// Theme Functions
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    const themeToggle = document.getElementById('theme-toggle');
    
    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon text-black"></i>';
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun text-accent"></i>';
    }
}

function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeToggle = document.getElementById('theme-toggle');
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
        themeToggle.innerHTML = '<i class="fas fa-sun text-accent"></i>';
    } else {
        document.documentElement.classList.remove('dark');
        themeToggle.innerHTML = '<i class="fas fa-moon text-black"></i>';
    }
}

// Mobile Menu Functions
function openMenu() {
    document.getElementById('sideMenu').classList.remove('translate-x-full');
    document.body.classList.add('overflow-hidden');
}

function closeMenu() {
    document.getElementById('sideMenu').classList.add('translate-x-full');
    document.body.classList.remove('overflow-hidden');
}

// Scroll to Top Button
function setupScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.remove('opacity-0', 'invisible');
            scrollTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollTopBtn.classList.add('opacity-0', 'invisible');
            scrollTopBtn.classList.remove('opacity-100', 'visible');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Contact Form Submission
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const successDiv = document.getElementById('form-success');
        const errorDiv = document.getElementById('form-error');
        
        successDiv.classList.add('hidden');
        errorDiv.classList.add('hidden');
        
        // Simulate form submission
        setTimeout(() => {
            successDiv.classList.remove('hidden');
            form.reset();
            
            setTimeout(() => {
                successDiv.classList.add('hidden');
            }, 5000);
        }, 1000);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    checkTheme();
    setupScrollToTop();
    setupContactForm();
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('#sideMenu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});