# Flora Spa Website

A beautiful, modern, and fully functional website for Flora Spa with integrated WhatsApp booking and call functionality.

## Features

- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- ✅ **WhatsApp Integration** - Appointment bookings are sent directly to WhatsApp
- ✅ **Call Booking** - One-click call functionality with floating action buttons
- ✅ **Modern UI/UX** - Beautiful, spa-inspired design with smooth animations
- ✅ **Service Booking** - Easy-to-use booking form with validation
- ✅ **Smooth Scrolling** - Enhanced navigation experience
- ✅ **Mobile Menu** - Hamburger menu for mobile devices

## Setup Instructions

### 1. Update Contact Information

#### Update Phone Numbers

Open `script.js` and update the following:

```javascript
// Line 25 - Update this with your WhatsApp business number
const WHATSAPP_NUMBER = '15551234567'; // Format: country code + number (no + or spaces)
```

**Important:** 
- Remove any spaces, dashes, or plus signs
- Include country code (e.g., for India: 91, for USA: 1)
- Example: If your number is +91 6363716266, use `916363716266`

#### Update Phone Number in HTML

Open `index.html` and update the phone number in the floating call button:

```html
<!-- Line 280 - Update the href attribute -->
<a href="tel:+15551234567" class="floating-btn call-btn" title="Call Now">
```

Also update in the footer contact section (around line 240):
```html
<li><i class="fas fa-phone"></i> +1 (555) 123-4567</li>
```

#### Update Email Address

Open `index.html` and update the email in the footer:

```html
<!-- Around line 241 -->
<li><i class="fas fa-envelope"></i> info@floraspa.com</li>
```

### 2. Update Business Information

#### Address
Update the address in:
- Booking section (around line 200 in `index.html`)
- Footer section (around line 239 in `index.html`)

#### Business Hours
Update opening hours in the booking section (around line 207 in `index.html`)

### 3. Customize Services

You can add or modify services in:
- Services section (around line 120 in `index.html`)
- Booking form dropdown (around line 220 in `index.html`)

### 4. Test WhatsApp Integration

1. Open the website in a browser
2. Fill out the booking form
3. Click "BOOK NOW"
4. WhatsApp should open with a pre-filled message containing all booking details

### 5. Test Call Functionality

1. Click the green phone icon (floating button on the right)
2. Or click "Call Now" buttons throughout the site
3. Your device should initiate a call

## File Structure

```
spa/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## How It Works

### WhatsApp Booking Flow

1. User fills out the booking form
2. Form validates all required fields
3. On submit, booking details are formatted into a message
4. WhatsApp opens with pre-filled message
5. User can send the message to complete booking

### Call Booking Flow

1. User clicks "Call Now" button or floating phone icon
2. Device initiates a call to the configured phone number
3. User can speak directly with spa staff

## Customization

### Colors

Edit CSS variables in `styles.css` (lines 7-14):

```css
:root {
    --primary-color: #2d8659;    /* Main green color */
    --secondary-color: #3ba372;  /* Lighter green */
    --accent-color: #1a5d3f;     /* Dark green */
    /* ... */
}
```

### Images

Replace the hero background image URL in `index.html` (line 50):
```html
background: ... url('YOUR_IMAGE_URL') center/cover;
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- Make sure your WhatsApp number is a business account for better integration
- Test the WhatsApp link on both desktop and mobile devices
- The phone number format should match your country's dialing code
- All form fields marked with * are required

## Support

For issues or questions, please check:
1. Phone number format is correct (no spaces, includes country code)
2. WhatsApp number is a valid business number
3. All required fields are filled in the booking form

---

**Enjoy your new Flora Spa website! 🌸**

