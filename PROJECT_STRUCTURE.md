# 6. Required File Structure

Create the project structure like this:

```txt
heathrow-mini-cab/
│
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero-car.png
│   │   ├── london-bg.jpg
│   │   ├── airport-transfer.jpg
│   │   ├── school-runs.jpg
│   │   ├── local-rides.jpg
│   │   ├── corporate-travel.jpg
│   │   └── fleet/
│   │       ├── saloon.png
│   │       ├── estate.png
│   │       ├── mpv.png
│   │       └── executive.png
│   │
│   └── icons/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── airport-transfers/
│   │   │   └── page.tsx
│   │   │
│   │   ├── school-runs/
│   │   │   └── page.tsx
│   │   │
│   │   ├── local-rides/
│   │   │   └── page.tsx
│   │   │
│   │   ├── corporate-travel/
│   │   │   └── page.tsx
│   │   │
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── TrustBar.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── Fleet.tsx
│   │   │   ├── CoverageAreas.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Statistics.tsx
│   │   │   └── CTA.tsx
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Badge.tsx
│   │       ├── SectionTitle.tsx
│   │       ├── ServiceCard.tsx
│   │       ├── FleetCard.tsx
│   │       ├── FeatureCard.tsx
│   │       └── TestimonialCard.tsx
│   │
│   ├── data/
│   │   ├── navigation.ts
│   │   ├── services.ts
│   │   ├── fleet.ts
│   │   ├── features.ts
│   │   ├── testimonials.ts
│   │   └── coverageAreas.ts
│   │
│   ├── types/
│   │   ├── service.ts
│   │   ├── fleet.ts
│   │   └── testimonial.ts
│   │
│   └── lib/
│       ├── constants.ts
│       ├── seo.ts
│       └── utils.ts
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── AGENTS.md