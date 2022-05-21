import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '4s3a37gw',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skyi1Kh4TBzzuKsSPKn4DsSSVNOWMljov0PpGmTOayRPnGGBfNfyzThh7NYVA1oiJ807P3RIVH8KE23t7D6HoUeXuptrFYi3dc98Plr2IZyH40qOZ16wAHzYVdJzoGgC7UvFfAciyxtysA8hXkpOsWIXfPN9eK8plm6pC7Q3M2eyVn4ZgDLH',
  useCdn: false,
})
