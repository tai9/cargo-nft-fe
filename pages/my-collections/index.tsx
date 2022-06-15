import { Button, Container } from '@mui/material'
import CollectionCard from 'components/collection/CollectionCard'
import { SkeletonCard } from 'components/common'
import { NormalLayout } from 'components/layout'
import { client } from 'lib/sanityClient'
import { Collection, getAllcollectionQuery, NextPageWithLayout } from 'models'
import Router from 'next/router'
import { useEffect, useState } from 'react'

const MyCollectionPage: NextPageWithLayout = () => {
  const [collections, setCollections] = useState<Collection[]>([])

  useEffect(() => {
    ;(async () => {
      const collections: Collection[] = await client.fetch(
        getAllcollectionQuery
      )
      setCollections(collections)
    })()
  }, [])

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
          {collections.length === 0 ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            collections.map((collection: any, index: number) => (
              <CollectionCard key={index} data={collection} editable />
            ))
          )}
        </div>
      </div>
    </Container>
  )
}

MyCollectionPage.Layout = NormalLayout

export default MyCollectionPage
