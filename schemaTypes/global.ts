import { defineField, defineType } from 'sanity'

export const globalSettings = defineType({
    name: 'globalSettings',
    title: 'Global Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'siteTitle',
            title: 'Site Title',
            type: 'string',
        }),
        defineField({
            name: 'heroVideoUrl',
            title: 'Hero Video URL',
            type: 'url',
            description: 'Link to the main hero video (e.g. hosted on Vercel blob or external)',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', type: 'string', title: 'Platform' },
                        { name: 'url', type: 'url', title: 'URL' },
                    ],
                },
            ],
        }),
    ],
})
