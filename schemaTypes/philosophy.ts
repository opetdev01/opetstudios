import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'philosophy',
    title: 'Philosophy Principle',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'icon',
            title: 'Icon Name',
            type: 'string',
            description: 'Available icons: Zap, Eye, Cpu, Lightbulb, Box, Layers',
            options: {
                list: ['Zap', 'Eye', 'Cpu', 'Lightbulb', 'Box', 'Layers'],
            }
        }),
        defineField({
            name: 'color',
            title: 'Tailwind Color Class',
            type: 'string',
            description: 'e.g., text-yellow-400, text-cyan-400, text-red-400',
        }),
    ],
})
