# AGENTS.md

# Bittacy Cars Website Revamp

This document is the complete build guide for AI agents and developers working on the Bittacy Cars website redesign.

The goal is to rebuild the existing taxi website UI using **Next.js + TypeScript** while keeping the current business functionality unchanged.

Website: https://www.bittacycars.com/

Brand: **Bittacy Cars**  
Business Type: **Mill Hill Taxis, Airport Transfers & School Runs in North London**

---

## 1. Main Objective

Create a modern, premium, high-converting taxi website with a dark luxury theme.

The new website should feel:

- Premium
- Fast
- Reliable
- Modern
- Trustworthy
- Professional
- Easy to use
- Mobile friendly

Do **not** change existing business logic or booking functionality unless specifically requested.

This is a **UI/UX revamp only**.

---

## 2. Technology Stack

Use only:

```txt
Next.js
TypeScript
React
CSS / Tailwind CSS
Framer Motion
Lucide React
Next/Image
```

Recommended setup:

```txt
Next.js App Router
TypeScript
Tailwind CSS
Framer Motion for animation
Lucide React for icons
```

Do not use:

```txt
jQuery
Bootstrap
Material UI
Chakra UI
Database changes
Backend rewrites
Unnecessary third-party templates
```

---

## 3. Design Theme

Use the 60-30-10 design rule.

### 60% Dark Theme

Use dark colors for the main website background.

```css
--color-dark-main: #050505;
--color-dark-card: #0B0B0D;
--color-dark-soft: #121214;
--color-dark-border: #262626;
```

Use dark for:

- Body background
- Header
- Footer
- Hero background
- Cards
- Booking widget
- Fleet cards

---

### 30% Brand Red

Use red as the main brand and action color.

```css
--color-red-main: #FF1D25;
--color-red-dark: #D90012;
--color-red-soft: #FF3B42;
--color-red-glow: rgba(255, 29, 37, 0.35);
```

Use red for:

- Primary buttons
- Active nav link
- CTA banners
- Icons
- Important words in headings
- Hover states
- Animation glow

---

### 10% White

Use white only for contrast and readability.

```css
--color-white: #FFFFFF;
--color-white-soft: #F5F5F5;
--color-muted: #A1A1AA;
```

Use white for:

- Headings
- Body text
- Input text
- Button text
- Small highlights

---

## 4. Typography

Use a clean modern font.

Recommended:

```txt
Inter
```

Fallback:

```css
font-family: Inter, Arial, sans-serif;
```

### Heading Style

Use bold, modern, large headings.

```css
font-weight: 800;
letter-spacing: -0.04em;
line-height: 1.05;
```

### Body Style

```css
font-weight: 400;
line-height: 1.7;
color: #A1A1AA;
```

---

## 5. Website Personality

The website should look like a premium private hire / executive transfer company, not an old traditional taxi website.

Use inspiration from:

- Uber Business
- Blacklane
- Mercedes-Benz
- Tesla
- Bolt Business

Design keywords:

```txt
luxury
speed
safety
trust
comfort
professional
conversion focused
```

---

## 7. Homepage Layout

Build the homepage in this exact order:

```txt
Header
Hero Section
Quick Booking Widget
Trust Bar
Services Section
Why Choose Us Section
Fleet Section
Coverage Areas Section
Testimonials Section
Statistics Section
CTA Banner
Footer
```

---

## 8. Header Requirements

Header should be sticky, dark, glassy, and premium.

### Header Content

Left:

```txt
Bittacy logo
```

Center navigation:

```txt
Home
About Us
Airport Transfers
Services
Fleet
Book Now
Contact Us
```

Right:

```txt
Phone CTA button
020 3761 7526
```

### Header Style

```css
background: rgba(5, 5, 5, 0.75);
backdrop-filter: blur(20px);
border-bottom: 1px solid rgba(255, 255, 255, 0.08);
```

Active nav link should be red.

Mobile header should collapse into a hamburger menu.

---

## 9. Hero Section Requirements

The hero section is the most important section.

It should be bold, premium, and conversion focused.

### Hero Content

Small red label:

```txt
MILL HILL TAXIS, AIRPORT TRANSFERS & SCHOOL RUNS
```

Main headline:

```txt
Your Journey,
Our Priority
```

Highlight the word `Priority` in red.

Subheading:

```txt
Reliable, punctual and comfortable taxi services across North London and beyond.
```

Buttons:

```txt
Book a Ride
Get a Quote
```

Hero trust points:

```txt
24/7 Always Available
On Time Every Time
Fixed Prices No Hidden Charges
Professional & Friendly Drivers
```

---

## 10. Hero Car Animation Requirement

Add a premium car animation when the website opens.

### Animation Idea

When the visitor opens the homepage:

1. Car starts small and slightly blurred in the background.
2. Car moves from back to front.
3. Car becomes larger, sharper, and more visible.
4. Red light streaks appear behind the car.
5. After the entrance animation, the car slightly moves toward the booking area direction.
6. Booking form fades up after the car animation.

This creates the feeling that the car arrives first, then the user books the ride.

### Animation Behavior

Use Framer Motion.

Hero car initial state:

```ts
initial={{
  scale: 0.65,
  opacity: 0,
  x: 180,
  y: 80,
  filter: 'blur(10px)'
}}
```

Hero car animate state:

```ts
animate={{
  scale: 1,
  opacity: 1,
  x: 0,
  y: 0,
  filter: 'blur(0px)'
}}
```

Hero car transition:

```ts
transition={{
  duration: 1.4,
  ease: [0.16, 1, 0.3, 1]
}}
```

After entrance, add subtle idle motion:

```ts
animate={{
  y: [0, -6, 0],
}}
transition={{
  duration: 4,
  repeat: Infinity,
  ease: 'easeInOut'
}}
```

### Important Animation Rules

Do not overdo the animation.

The car animation should feel premium, not childish.

Use:

- smooth movement
- slight blur
- red light streaks
- soft glow
- slow entrance

Avoid:

- bouncing too much
- cartoon effects
- spinning
- excessive motion
- too many flashing lights

### Reduced Motion Accessibility

Respect reduced motion preferences.

If user prefers reduced motion, disable the car entrance animation and show the car normally.

Use:

```ts
const shouldReduceMotion = useReducedMotion();
```

---

## 11. Hero Background

Use a dark London background.

Recommended visual style:

```txt
Dark London skyline
Subtle Big Ben / London Eye silhouette
Red gradient glow on the right side
Road light streaks
Premium black car in front
```

Use overlay:

```css
background:
  linear-gradient(90deg, rgba(5,5,5,0.95), rgba(5,5,5,0.65), rgba(255,29,37,0.2)),
  url('/images/london-bg.jpg');
```

---

## 12. Quick Booking Widget

Place the booking widget immediately after the hero content, visually overlapping the bottom of the hero section.

### Booking Fields

```txt
Pickup Location
Drop-off Location
Journey Type
Date
Time
Passengers
```

CTA button:

```txt
Get Quote / Book Now
```

### Booking Widget Style

```css
background: linear-gradient(180deg, rgba(18,18,20,0.96), rgba(8,8,10,0.96));
border: 1px solid rgba(255,255,255,0.1);
border-radius: 24px;
box-shadow: 0 30px 80px rgba(0,0,0,0.45);
```

Inputs should be large, clean, and easy to use.

No functionality should be removed.

---

## 13. Services Section

Title:

```txt
Travel Solutions Tailored to You
```

Small label:

```txt
OUR SERVICES
```

Service cards:

```txt
Airport Transfers
School Runs
Local Rides
Corporate Travel
```

Each card should include:

- Image
- Red circular icon
- Title
- Short description
- Book Now link

Card hover:

```css
transform: translateY(-8px);
border-color: rgba(255,29,37,0.45);
box-shadow: 0 24px 60px rgba(255,29,37,0.12);
```

---

## 14. Why Choose Us Section

Title:

```txt
Experience the Bittacy Difference
```

Highlight `Bittacy` in red.

Feature cards:

```txt
Reliable & Punctual
Clean & Comfortable
Professional Drivers
24/7 Support
Fixed Prices
Airport Specialists
```

Use minimal line icons in red.

Do not use colorful icons.

---

## 15. Fleet Section

Title:

```txt
Ride in Comfort and Style
```

Fleet cards:

```txt
Saloon
Estate
MPV
Executive
```

Each card should show:

- Car image
- Vehicle name
- Passenger capacity
- Luggage capacity
- View / Book CTA

Card background should be dark glass style.

---

## 16. Coverage Areas Section

Add a modern coverage area section because this helps taxi SEO.

Title:

```txt
Serving Mill Hill and North London
```

Areas:

```txt
Mill Hill
Edgware
Hendon
Finchley
Barnet
Stanmore
Colindale
Golders Green
Wembley
North London
```

Design as red outlined chips or cards.

---

## 17. Testimonials Section

Title:

```txt
What Our Customers Say
```

Cards should include:

- Quote icon
- Review text
- Customer name
- Star rating

Use red stars.

---

## 18. Statistics Section

Add strong business trust numbers.

Example stats:

```txt
15+ Years Experience
24/7 Availability
5000+ Airport Transfers
98% Customer Satisfaction
```

Use animated counters if possible.

Keep it professional.

---

## 19. CTA Section

Use a red gradient CTA banner.

Title:

```txt
Ready to Book Your Ride?
```

Subtitle:

```txt
Fast, reliable and professional taxi services just a click away.
```

Buttons:

```txt
Get a Quote
Book Now
```

CTA section should strongly push conversion.

---

## 20. Footer Requirements

Footer should include:

```txt
Logo
Short company description
Quick Links
Services
Contact Details
Working Hours
Social Icons
Privacy Policy
Terms & Conditions
```

Contact details:

```txt
Phone: 020 3761 7526
Email: info@bittacycars.com
Location: Mill Hill, North London, United Kingdom
Working Hours: 24 Hours
```

---

## 21. Component Rules

Components must be:

- Small
- Reusable
- Typed with TypeScript
- Easy to maintain
- Cleanly named

Use this component style:

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export function Button({ children, variant = 'primary', className }: ButtonProps) {
  return <button className={className}>{children}</button>;
}
```

Avoid huge components.

Split sections clearly.

---

## 22. Data Rules

Do not hardcode long repeated arrays inside components.

Use `/src/data` files.

Example:

```ts
export const services = [
  {
    title: 'Airport Transfers',
    description: 'Reliable airport transfers to and from all major London airports.',
    image: '/images/airport-transfer.jpg',
    href: '/airport-transfers',
  },
];
```

---

## 23. UI Standards

### Spacing Scale

Use consistent spacing:

```txt
4px
8px
12px
16px
24px
32px
48px
64px
96px
128px
```

### Border Radius

```css
--radius-sm: 10px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-xl: 32px;
```

### Cards

Cards should use:

```css
background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025));
border: 1px solid rgba(255,255,255,0.1);
border-radius: 24px;
```

### Buttons

Primary button:

```css
background: linear-gradient(135deg, #FF1D25, #D90012);
color: #FFFFFF;
border-radius: 14px;
box-shadow: 0 16px 40px rgba(255,29,37,0.28);
```

Secondary button:

```css
background: rgba(255,255,255,0.04);
color: #FFFFFF;
border: 1px solid rgba(255,255,255,0.18);
```

---

## 24. Animation Standards

Use Framer Motion only.

Recommended animations:

```txt
fade-up
fade-in
scale-in
slide-left
slide-right
car-arrival
```

Timing:

```txt
Small UI animations: 0.2s - 0.3s
Section animations: 0.5s - 0.8s
Hero car animation: 1.2s - 1.6s
```

Avoid excessive animations.

Use animations to guide attention, not distract.

---

## 25. Mobile UX Rules

Mobile is extremely important.

The website must work perfectly on:

```txt
iPhone SE
iPhone 12/13/14/15
Android phones
iPad
Desktop
Large screens
```

Mobile rules:

- Header becomes hamburger menu
- Hero text remains readable
- Booking form becomes one column
- Buttons must be full width where needed
- Cards stack vertically
- No horizontal overflow
- Tap targets minimum 44px height

---

## 26. SEO Requirements

Use proper semantic HTML.

Homepage should include keywords naturally:

```txt
Mill Hill taxis
North London taxi service
Airport transfers Mill Hill
School runs North London
Private hire cars Mill Hill
Local taxi service
Corporate travel North London
```

Use correct heading structure:

```txt
One H1 only
H2 for main sections
H3 for cards
```

Use metadata in `layout.tsx` or page files.

Example:

```ts
export const metadata = {
  title: 'Mill Hill Taxis, Airport Transfers & School Runs | Bittacy Cars',
  description: 'Book reliable Mill Hill taxis, airport transfers, school runs and private hire cars across North London with Bittacy Cars.',
};
```

---

## 27. Accessibility Requirements

Follow accessibility basics:

- Buttons must have readable text
- Images must have alt text
- Inputs must have labels
- Color contrast must be strong
- Keyboard navigation must work
- Do not rely only on color to explain status
- Respect reduced motion preferences

---

## 28. Performance Requirements

Use:

```txt
next/image
lazy loading
optimized images
small components
clean CSS
```

Target Lighthouse:

```txt
Performance: 90+
Accessibility: 95+
SEO: 95+
Best Practices: 95+
```

Avoid:

```txt
Huge images
Unoptimized videos
Heavy animation libraries besides Framer Motion
Too many external scripts
```

---

## 29. Suggested Homepage Copy

### Hero

```txt
Your Journey,
Our Priority
```

```txt
Reliable, punctual and comfortable taxi services across North London and beyond.
```

### Services

```txt
Travel Solutions Tailored to You
```

### Why Choose Us

```txt
Experience the Bittacy Difference
```

### Fleet

```txt
Ride in Comfort and Style
```

### Coverage

```txt
Serving Mill Hill and North London
```

### Testimonials

```txt
What Our Customers Say
```

### CTA

```txt
Ready to Book Your Ride?
```

---

## 30. Final Build Goal

The final website should look like a premium modern taxi brand website with:

- Dark luxury interface
- Strong red brand identity
- Clear booking flow
- Smooth car animation in hero section
- Modern cards
- High trust visuals
- Excellent mobile experience
- Better conversion focus
- Same existing functionality

The website should not feel like a traditional outdated local taxi website.

It should feel like a serious, reliable, premium North London taxi and airport transfer company.
