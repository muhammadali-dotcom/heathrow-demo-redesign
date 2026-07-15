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
  logo: '/images/fleet/bittacylogo.png',
  defaultImage: '/images/fleet/hero-car.png',
  keywords: [
    'Mill Hill taxis',
    'taxi Mill Hill',
    'North London taxi',
    'airport transfers Mill Hill',
    'school runs North London',
    'private hire Mill Hill',
    'corporate travel North London',
    'Bittacy Cars',
  ],
};

export const defaultSEO = {
  title: 'Mill Hill Taxis, Airport Transfers & School Runs | Bittacy Cars',
  description:
    'Book reliable Mill Hill taxis, airport transfers, school runs and private hire cars across North London with Bittacy Cars. Call 020 3761 7526.',
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
          alt: `${siteConfig.name} taxi service in Mill Hill`,
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
    name: 'Mill Hill taxis and private hire cars',
    description: defaultSEO.description,
    image: siteConfig.defaultImage,
  },
  {
    path: '/services',
    name: 'Taxi services in Mill Hill and North London',
    description:
      'Airport transfers, school runs, local rides and corporate travel from Bittacy Cars.',
    image: '/images/fleet/hero2.png',
  },
  {
    path: '/airport-transfers',
    name: 'Airport transfers from Mill Hill',
    description:
      'Fixed-price airport transfers from Mill Hill to Heathrow, Gatwick, Stansted, Luton and London City Airport.',
    image: '/images/fleet/airport.png',
  },
  {
    path: '/school-runs',
    name: 'School runs in Mill Hill and North London',
    description:
      'Safe, punctual school transport with DBS-checked drivers across North London.',
    image: '/images/fleet/school.png',
  },
  {
    path: '/local-rides',
    name: 'Local taxi rides across North London',
    description:
      'Reliable local taxi rides across Mill Hill, Barnet, Hendon, Finchley, Edgware and nearby areas.',
    image: '/images/fleet/local.png',
  },
  {
    path: '/corporate-travel',
    name: 'Corporate travel in North London',
    description:
      'Professional business transport, executive vehicles, priority booking and corporate accounts.',
    image: '/images/fleet/corporate.png',
  },
  {
    path: '/book',
    name: 'Book a taxi with Bittacy Cars',
    description:
      'Book a fixed-price taxi, airport transfer, school run or local ride with Bittacy Cars.',
    image: siteConfig.defaultImage,
  },
  {
    path: '/contact',
    name: 'Contact Bittacy Cars',
    description:
      'Call, email or request a quote from Bittacy Cars for taxi services across Mill Hill and North London.',
    image: siteConfig.defaultImage,
  },
  {
    path: '/about',
    name: 'About Bittacy Cars',
    description:
      'Learn about Bittacy Cars, a trusted Mill Hill taxi service for airport transfers, school runs and local rides.',
    image: siteConfig.defaultImage,
  },
];

export const faqs = [
  {
    question: 'How do I book a taxi with Bittacy Cars?',
    answer:
      'You can book by calling us at020 3761 7526 or by using the online booking form. Bittacy Cars offers local rides, airport transfers, school runs and corporate travel.',
  },
  {
    question: 'Does Bittacy Cars provide airport transfers from Mill Hill?',
    answer:
      'Yes. Bittacy Cars provides fixed-price airport transfers from Mill Hill and North London to Heathrow, Gatwick, Stansted, Luton, London City and Southend Airport.',
  },
  {
    question: 'Are school run drivers DBS checked?',
    answer:
      'Yes. School run drivers are DBS checked and trained to provide safe, reliable and punctual transport for children across North London.',
  },
  {
    question: 'Which areas does Bittacy Cars cover?',
    answer: `Bittacy Cars covers ${coverageAreas.join(', ')} and nearby North London areas.`,
  },
  {
    question: 'Is Bittacy Cars available 24/7?',
    answer:
      'Yes. Bittacy Cars is available 24 hours a day, 7 days a week for taxis, airport transfers and pre-booked journeys.',
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
      addressLocality: 'Mill Hill',
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
