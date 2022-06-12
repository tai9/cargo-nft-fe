import CollectionCard from 'components/collection/CollectionCard'
import { MainLayout } from 'components/layout'
import { client } from 'lib/sanityClient'
import { Collection, getAllcollectionQuery, NextPageWithLayout } from 'models'
import { GetStaticProps } from 'next'
import BannerImage from 'assets/collection-banner.png'
import Image from 'next/image'

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  midRow: `w-full flex justify-center text-white`,
}

const Collections: NextPageWithLayout = ({ collections }: any) => {
  return (
    <div className="overflow-hidden">
      <div className={style.bannerImageContainer}>
        <div className={style.bannerImage}>
          <Image src={BannerImage} alt="banner" layout="responsive" />
        </div>
      </div>
      <div className="my-20 max-w-7xl mx-auto">
        <div className={style.midRow}>
          <div className="text-5xl font-bold mb-12">All Collections</div>
        </div>
        <div className="border-darkBlue border-t-[0.1px]"></div>
      </div>
      <div className="grid grid-cols-2 gap-10 max-w-7xl mx-auto mb-20">
        {collections.map((collection: any, index: number) => (
          <CollectionCard key={index} data={collection} />
        ))}
      </div>
    </div>
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

Collections.Layout = MainLayout

export default Collections
