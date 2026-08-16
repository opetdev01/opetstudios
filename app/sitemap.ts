import { MetadataRoute } from 'next';
import { projects, servicesList } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.opetstudios.com';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/ar-vr',
    '/archviz',
    '/offline-experience',
    '/services',
    '/web-solutions',
    '/work',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic project routes
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/work/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Dynamic service routes
  const serviceRoutes = servicesList.map((service) => ({
    url: `${baseUrl}/web-solutions/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes];
}
