import { defineField, defineType } from 'sanity'

export const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery Images',
            type: 'array',
            of: [{ type: 'image' }],
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video URL (Vimeo/YouTube/Self-hosted)',
            type: 'url',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'string',
        }),
        defineField({
            name: 'services',
            title: 'Services',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Lens (Visualization)', value: 'lens' },
                    { title: 'Dive (Animation)', value: 'dive' },
                    { title: 'Touch (VR/AR)', value: 'touch' },
                ]
            }
        }),
    ],
})
