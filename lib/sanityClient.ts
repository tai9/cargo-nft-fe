import sanityClient from '@sanity/client'

export const client = sanityClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN || '',
})
