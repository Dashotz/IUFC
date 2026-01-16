import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    // Update this to your deployed domain (e.g., https://your-site.netlify.app or custom domain)
    // Currently using the one found in your layout.tsx configuration
    const baseUrl = 'https://iufc.netlify.app'

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/attendance`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]
}
