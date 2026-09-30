import type { Metadata } from 'next';
import { coverageAreas } from '@/data/coverageAreas';
import { services } from '@/data/services';
import { COMPANY_NAME, EMAIL, LOCATION, PHONE, WEBSITE } from '@/lib/constants';

export const siteConfig = {
  name: COMPANY_NAME,
  url: WEBSITE,
  locale: 'en_GB',
  location: LOCATION,
  phone: PHONE,
  email: EMAIL,
  logo: '/images/logo/hm-logo-light.png',
  defaultImage: '/images/fleet/share-car-yellow.jpg',
  keywords: [
    'Heathrow minicab',
    'Heathrow taxi',
    'Heathrow airport transfers',
    'minicab Hounslow',
    'West London taxi',
    'Heathrow meet and greet',
    'private hire Heathrow',
    'Heathrow Mini Cab',
  ],
};

export const defaultSEO = {
  title: 'Heathrow Minicabs & Airport Transfers | Heathrow Mini Cab',
  description:
    'Book reliable Heathrow minicabs, fixed-price airport transfers and private hire cars across Hounslow, Hayes and West London with Heathrow Mini Cab. Call 020 3761 7526.',
  keywords: siteConfig.keywords.join(', '),
};

type MetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString();
}

export function buildMetadata({
  title = defaultSEO.title,
  description = defaultSEO.description,
  path = '/',
  image = siteConfig.defaultImage,
  keywords = [],
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const allKeywords = Array.from(new Set([...siteConfig.keywords, ...keywords]));

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    keywords: allKeywords,
    alternates: {
      canonical,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} minicab service at Heathrow`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    category: 'transportation',
  };
}

export const servicePages = [
  {
    path: '/',
    name: 'Heathrow minicabs and private hire cars',
    description: defaultSEO.description,
    image: siteConfig.defaultImage,
  },
  {
    path: '/services',
    name: 'Minicab services at Heathrow and West London',
    description:
      'Airport transfers, school runs, local rides and corporate travel from Heathrow Mini Cab.',
    image: '/images/fleet/hero-yellow-dark.jpg',
  },
  {
    path: '/airport-transfers',
    name: 'Heathrow airport transfers',
    description:
      'Fixed-price transfers to and from Heathrow Terminals 2, 3, 4 and 5, plus Gatwick, Stansted, Luton and London City Airport.',
    image: '/images/fleet/airport-branded.jpg',
  },
  {
    path: '/school-runs',
    name: 'School runs in Hounslow, Hayes and West London',
    description:
      'Safe, punctual school transport with DBS-checked drivers across West London.',
    image: '/images/fleet/school-branded.jpg',
  },
  {
    path: '/local-rides',
    name: 'Local minicab rides across West London',
    description:
      'Reliable local minicab rides across Hounslow, Hayes, Feltham, West Drayton, Uxbridge and nearby areas.',
    image: '/images/fleet/local-branded.jpg',
  },
  {
    path: '/corporate-travel',
    name: 'Corporate travel around Heathrow and West London',
    description:
      'Professional business transport, executive vehicles, priority booking and corporate accounts.',
    image: '/images/fleet/corporate.png',
  },
  {
    path: '/book',
    name: 'Book a taxi with Heathrow Mini Cab',
    description:
      'Book a fixed-price taxi, airport transfer, school run or local ride with Heathrow Mini Cab.',
    image: siteConfig.defaultImage,
  },
  {
    path: '/contact',
    name: 'Contact Heathrow Mini Cab',
    description:
      'Call, email or request a quote from Heathrow Mini Cab for minicab services at Heathrow and across West London.',
    image: siteConfig.defaultImage,
  },
  {
    path: '/about',
    name: 'About Heathrow Mini Cab',
    description:
      'Learn about Heathrow Mini Cab, a trusted Heathrow minicab service for airport transfers, school runs and local rides.',
    image: siteConfig.defaultImage,
  },
];

export const faqs = [
  {
    question: 'How do I book a taxi with Heathrow Mini Cab?',
    answer:
      'You can book by calling us at 020 3761 7526 or by using the online booking form. Heathrow Mini Cab offers local rides, airport transfers, school runs and corporate travel.',
  },
  {
    question: 'Does Heathrow Mini Cab cover all Heathrow terminals?',
    answer:
      'Yes. Heathrow Mini Cab provides fixed-price transfers to and from Heathrow Terminals 2, 3, 4 and 5, with flight tracking and meet & greet. We also cover Gatwick, Stansted, Luton, London City and Southend Airport.',
  },
  {
    question: 'Are school run drivers DBS checked?',
    answer:
      'Yes. School run drivers are DBS checked and trained to provide safe, reliable and punctual transport for children across West London.',
  },
  {
    question: 'Which areas does Heathrow Mini Cab cover?',
    answer: `Heathrow Mini Cab covers ${coverageAreas.join(', ')} and nearby West London areas.`,
  },
  {
    question: 'Is Heathrow Mini Cab available 24/7?',
    answer:
      'Yes. Heathrow Mini Cab is available 24 hours a day, 7 days a week for taxis, airport transfers and pre-booked journeys.',
  },
];

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['TaxiService', 'LocalBusiness'],
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    image: absoluteUrl(siteConfig.defaultImage),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: '££',
    description: defaultSEO.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Heathrow',
      addressRegion: 'London',
      addressCountry: 'GB',
    },
    areaServed: coverageAreas.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Taxi and private hire services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          url: absoluteUrl(service.href),
          provider: {
            '@id': `${siteConfig.url}/#localbusiness`,
          },
        },
      })),
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: {
      '@id': `${siteConfig.url}/#localbusiness`,
    },
    inLanguage: 'en-GB',
  };
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function serviceJsonLd(path: string) {
  const servicePage = servicePages.find((page) => page.path === path);

  if (!servicePage) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name: servicePage.name,
    description: servicePage.description,
    url: absoluteUrl(path),
    image: absoluteUrl(servicePage.image),
    provider: {
      '@id': `${siteConfig.url}/#localbusiness`,
    },
    areaServed: coverageAreas.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
  };
}
