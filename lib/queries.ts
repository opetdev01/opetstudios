import { groq } from 'next-sanity'

export const projectsQuery = groq`*[_type == "project"] | order(year desc) {
  "id": _id,
  title,
  "slug": slug.current,
  "image": mainImage.asset->url,
  category,
  year
}`

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  "id": _id,
  title,
  "slug": slug.current,
  "image": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  category,
  year,
  location,
  area,
  description,
  videoUrl,
  services
}`

export const teamQuery = groq`*[_type == "team"] | order(_createdAt asc) {
  "id": _id,
  name,
  role,
  "imageUrl": image.asset->url,
  bio
}`

export const globalSettingsQuery = groq`*[_type == "globalSettings"][0]{
  siteTitle,
  heroVideoUrl,
  socialLinks
}`

export const servicesQuery = groq`*[_type == "service"] | order(title asc) {
  "id": _id,
  title,
  "slug": slug.current,
  subtitle,
  mainText,
  icon,
  features
}`

export const mapsQuery = groq`*[_type == "map"] | order(title asc) {
  "id": _id,
  title,
  "slug": slug.current,
  description,
  url,
  "thumbnail": thumbnail.asset->url
}`

export const philosophyQuery = groq`*[_type == "philosophy"] | order(title asc) {
  "id": _id,
  title,
  description,
  icon,
  color
}`
