import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://iufc.netlify.app'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/', // Prevent Google from indexing the admin panel
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
