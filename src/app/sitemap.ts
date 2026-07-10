import type { MetadataRoute } from 'next';
import { absoluteUrl, servicePages } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return servicePages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.path === '/' ? 'weekly' : 'monthly',
    priority: page.path === '/' ? 1 : page.path === '/contact' || page.path === '/book' ? 0.9 : 0.8,
  }));
}
