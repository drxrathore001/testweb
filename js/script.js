document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('header-container');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu-overlay');
    const menuIconContainer = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const mobileBtnLinks = document.querySelectorAll('.mobile-link-btn');
    let isMenuOpen = false;
    
    // SVG Definitions with explicit styles
    const svgHamburger = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 100%; height: 100%;"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>';
    const svgClose = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 100%; height: 100%;"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>';

    // Scroll Effect Logic
    const checkScroll = () => {
        if (isMenuOpen) return; // Do nothing if menu is open (CSS handles transparency)

        if (window.scrollY > 50) {
            navbar.classList.add('bg-midnight-950/90', 'backdrop-blur-md', 'shadow-lg', 'py-2', 'border-white/5');
            navbar.classList.remove('py-4', 'border-transparent');
        } else {
            navbar.classList.remove('bg-midnight-950/90', 'backdrop-blur-md', 'shadow-lg', 'py-2', 'border-white/5');
            navbar.classList.add('py-4', 'border-transparent');
        }
    };

    // Toggle Logic
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        document.body.classList.toggle('menu-open'); // Triggers CSS override

        // Toggle icon class
        if (isMenuOpen) {
            menuIconContainer.classList.add('active'); // Start rotation
            setTimeout(() => {
                menuIconContainer.innerHTML = svgClose;
            }, 150); // Swap halfway through rotation
        } else {
            menuIconContainer.classList.remove('active'); // Rotate back
            setTimeout(() => {
                menuIconContainer.innerHTML = svgHamburger;
            }, 150); // Swap back halfway
        }

        if (isMenuOpen) {
            // Open
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            document.body.style.overflow = 'hidden';
        } else {
            // Close
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = '';
            
            // Re-check scroll state immediately
            checkScroll();
        }
    }

    menuBtn.addEventListener('click', toggleMenu);
    
    // Close menu when any link is clicked
    const closeMenuOnClick = () => {
        if (isMenuOpen) toggleMenu();
    };

    mobileLinks.forEach(link => link.addEventListener('click', closeMenuOnClick));
    mobileBtnLinks.forEach(link => link.addEventListener('click', closeMenuOnClick));
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Init

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    
    setTimeout(() => {
        document.querySelectorAll('header .animate-fade-in-up').forEach(el => el.style.opacity = '1');
    }, 100);

    // Carousel Logic
    const slider = document.getElementById('slider-container');
    const scrollAmount = window.innerWidth < 768 ? 280 : 320;
    document.getElementById('scroll-right')?.addEventListener('click', () => slider.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
    document.getElementById('scroll-left')?.addEventListener('click', () => slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));

    // Star Rating - REWRITTEN FOR SVG
    const stars = document.querySelectorAll('#star-rating .star-icon');
    const ratingInput = document.getElementById('rating-value');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const val = this.dataset.value;
            ratingInput.value = val;
            stars.forEach(s => {
                if (s.dataset.value <= val) {
                    // Filled state
                    s.classList.remove('text-gray-600'); 
                    s.classList.add('text-gold');
                    s.setAttribute('fill', 'currentColor');
                    s.style.color = '#D4AF37'; // Explicitly set gold color
                } else {
                    // Empty state
                    s.classList.remove('text-gold'); 
                    s.classList.add('text-gray-600');
                    s.setAttribute('fill', 'none');
                    s.style.color = '#4B5563'; // Explicitly set gray color (Tailwind gray-600)
                }
            });
        });
    });
});

// Inject fade-in-up animation styles
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes fade-in-up {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
`;
document.head.appendChild(styleSheet);
