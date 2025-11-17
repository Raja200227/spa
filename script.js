// Hero Video Handling
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    console.log('Video element found, initializing...');
    
    // Log video source attempts
    heroVideo.addEventListener('loadstart', function() {
        console.log('Video loading started');
    });
    
    // Ensure video plays on load
    heroVideo.addEventListener('loadeddata', function() {
        console.log('Video data loaded, attempting to play...');
        this.play().catch(function(error) {
            console.error('Video autoplay prevented:', error);
            // Show user a message if autoplay is blocked
            console.log('Tip: Some browsers require user interaction to play video');
        });
    });
    
    // Handle video can play
    heroVideo.addEventListener('canplay', function() {
        console.log('Video can play, attempting to start...');
        this.play().catch(function(error) {
            console.error('Video play error:', error);
        });
    });
    
    // Video successfully started playing
    heroVideo.addEventListener('playing', function() {
        console.log('Video is now playing!');
    });
    
    // Fallback: if video fails to load
    heroVideo.addEventListener('error', function(e) {
        console.error('Video failed to load:', e);
        console.error('Error details:', this.error);
        console.log('Make sure the video file exists in the project folder');
        console.log('Expected file: Flora_Spa_Promotional_Video_Creation.mp4');
        // Don't hide video, let fallback sources try
    });
    
    // Try to play video immediately (required for some browsers)
    setTimeout(function() {
        heroVideo.play().catch(function(error) {
            console.log('Initial play attempt failed:', error);
            console.log('This is normal - video will play when ready');
        });
    }, 100);
    
    // Pause video when page is not visible (save resources)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            heroVideo.pause();
        } else {
            heroVideo.play().catch(function(error) {
                console.log('Video autoplay prevented on visibility change:', error);
            });
        }
    });
    
    // Additional attempt after page fully loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            heroVideo.play().catch(function(error) {
                console.log('Post-load play attempt:', error);
            });
        }, 500);
    });
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to Top Button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Scroll to Booking Section
function scrollToBooking() {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        bookingSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Contact Numbers
const CALL_NUMBER = '+917829977969';
const WHATSAPP_NUMBER = '919187079284'; // Format: country code + number (no + or spaces)

function openWhatsAppWithText(rawMessage = '') {
    const encoded = rawMessage ? encodeURIComponent(rawMessage) : '';
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let url = '';
    if (isMobile) {
        url = encoded
            ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
            : `https://wa.me/${WHATSAPP_NUMBER}`;
    } else {
        const textParam = encoded ? `&text=${encoded}` : '';
        url = `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}${textParam}`;
    }

    const win = window.open(url, '_blank');
    if (!win) {
        window.location.href = url;
    }
}

// Function to open WhatsApp with pre-filled message
function openWhatsApp(serviceName = '') {
    let message = '';
    
    if (serviceName) {
        message = `Hello! I'm interested in booking ${serviceName}. Please let me know about availability.`;
    } else {
        message = 'Hello! I would like to book an appointment. Please let me know about availability.';
    }
    
    openWhatsAppWithText(message);
}

// Store booking data temporarily for confirmation
let pendingBookingData = null;

// Function to send booking details to WhatsApp
function sendBookingToWhatsApp(bookingData) {
    const {
        name,
        phone,
        email,
        service,
        date,
        time,
        message
    } = bookingData;

    // Format the booking message
    let bookingMessage = `*New Appointment Booking Request - Flora Thai Spa*\n\n`;
    bookingMessage += `*👤 Name:* ${name}\n`;
    bookingMessage += `*📱 Phone:* ${phone}\n`;
    
    if (email && email.trim()) {
        bookingMessage += `*📧 Email:* ${email}\n`;
    }
    
    bookingMessage += `*💆 Service:* ${service || 'Not specified'}\n`;
    bookingMessage += `*📅 Preferred Date:* ${formatDate(date)}\n`;
    bookingMessage += `*⏰ Preferred Time:* ${formatTime(time)}\n`;
    
    if (message && message.trim()) {
        bookingMessage += `*📝 Additional Notes:* ${message}\n`;
    }
    
    bookingMessage += `\nPlease confirm this appointment slot. Thank you!`;

    // Encode the message for URL
    openWhatsAppWithText(bookingMessage);
    
    return true;
}

// Show confirmation modal
function showConfirmationModal(bookingData) {
    pendingBookingData = bookingData;
    
    // Populate confirmation modal
    document.getElementById('confirmName').textContent = bookingData.name;
    document.getElementById('confirmPhone').textContent = bookingData.phone;
    document.getElementById('confirmDate').textContent = formatDate(bookingData.date);
    document.getElementById('confirmTime').textContent = formatTime(bookingData.time);
    document.getElementById('confirmService').textContent = bookingData.service || 'Not selected';
    
    // Show/hide email if provided
    if (bookingData.email && bookingData.email.trim()) {
        document.getElementById('confirmEmail').textContent = bookingData.email;
        document.getElementById('confirmEmailItem').style.display = 'flex';
    } else {
        document.getElementById('confirmEmailItem').style.display = 'none';
    }
    
    // Show/hide message if provided
    if (bookingData.message && bookingData.message.trim()) {
        document.getElementById('confirmMessage').textContent = bookingData.message;
        document.getElementById('confirmMessageItem').style.display = 'flex';
    } else {
        document.getElementById('confirmMessageItem').style.display = 'none';
    }
    
    // Show modal
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close confirmation modal
function closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    pendingBookingData = null;
}

// Confirm booking and send to WhatsApp
function confirmBooking() {
    if (pendingBookingData) {
        sendBookingToWhatsApp(pendingBookingData);
        closeConfirmationModal();
        
        // Reset form
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.reset();
        }
        
        // Show success message
        setTimeout(() => {
            alert('Your booking request has been sent to WhatsApp! Please complete the booking there.');
        }, 500);
    }
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format time for display
function formatTime(timeString) {
    if (!timeString) return 'Not specified';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Booking Form Handler
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            message: document.getElementById('message').value.trim()
        };

        // Validate form
        if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
            alert('Please fill in all required fields (Name, Phone, Service, Date, and Time).');
            return;
        }
        
        // Validate email if provided
        if (formData.email && formData.email.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }
        }

        // Validate phone number (basic validation)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(formData.phone)) {
            alert('Please enter a valid phone number.');
            return;
        }

        // Validate date (should not be in the past)
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Please select a future date.');
            return;
        }

        // Show confirmation modal
        showConfirmationModal(formData);
    });
}

// Set minimum date to today for date input
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Call Now Functionality
function callNow() {
    window.location.href = `tel:${CALL_NUMBER}`;
}

// Update phone numbers in the code
// You can update these values to match your actual contact information
function updateContactInfo() {
    // Update phone number in floating buttons
    const callBtn = document.querySelector('.call-btn');
    if (callBtn) {
        callBtn.href = `tel:${CALL_NUMBER}`;
    }

    // Update WhatsApp button
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}`;
        whatsappBtn.addEventListener('click', (event) => {
            event.preventDefault();
            openWhatsApp();
        });
    }
}

// Initialize contact info on page load
document.addEventListener('DOMContentLoaded', () => {
    updateContactInfo();
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .feature-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    navbar.style.boxShadow = currentScroll > 50 ? '0 5px 20px rgba(0, 0, 0, 0.15)' : '0 2px 10px rgba(0, 0, 0, 0.1)';
    lastScroll = currentScroll;
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('confirmationModal');
    if (event.target === modal) {
        closeConfirmationModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeConfirmationModal();
    }
});

// Form validation feedback
const formInputs = document.querySelectorAll('.booking-form input, .booking-form select, .booking-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#ddd';
        }
    });

    input.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(231, 76, 60)') {
            this.style.borderColor = '#ddd';
        }
    });
});

// Service card click handlers
document.querySelectorAll('.service-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const serviceName = this.closest('.service-card').querySelector('h3').textContent;
        openWhatsApp(serviceName);
    });
});

