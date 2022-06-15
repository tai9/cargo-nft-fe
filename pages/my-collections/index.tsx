import { Button, Container } from '@mui/material'
import CollectionCard from 'components/collection/CollectionCard'
import { NormalLayout } from 'components/layout'
import { Collection, getAllcollectionQuery, NextPageWithLayout } from 'models'
import { GetStaticProps } from 'next'
import { client } from 'lib/sanityClient'
import Router from 'next/router'

const MyCollectionPage: NextPageWithLayout = ({ collections }: any) => {
  return (
    <Container>
      <div className="text-white space-y-8 mt-12">
        <div className="text-4xl font-bold">My Collections</div>
        <div>
          Create, curate, and manage collections of unique NFTs to share and
          sell.
        </div>
        <Button
          variant="contained"
          size="large"
          sx={{ paddingY: 2, borderRadius: 4, fontWeight: 'bold' }}
          onClick={() => Router.push('/collections/create')}
        >
          Create a collection
        </Button>

        <div className="grid grid-cols-3 gap-4">
          {collections.map((collection: any, index: number) => (
            <CollectionCard key={index} data={collection} />
          ))}
        </div>
      </div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<any> = async () => {
  const collections: Collection[] = await client.fetch(getAllcollectionQuery)
  return {
    props: {
      collections,
    },
  }
}

MyCollectionPage.Layout = NormalLayout

export default MyCollectionPage
