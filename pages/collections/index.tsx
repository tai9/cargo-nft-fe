import { useNFTCollection } from '@thirdweb-dev/react'
import CollectionCard from 'components/collection/CollectionCard'
import { SkeletonCard } from 'components/common'
import { MainLayout } from 'components/layout'
import { client } from 'lib/sanityClient'
import { NextPageWithLayout } from 'models'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

const Collections: NextPageWithLayout = () => {
  const nftCollection = useNFTCollection()
  const [collections, setCollections] = useState<any>([])
  const [loadingCollection, setLoadingCollection] = useState(false)

  useEffect(() => {
    fetchCollectionData()
    getNFTCollection()
  }, [])
  const getNFTCollection = async () => {
    if (!nftCollection) return
    try {
      const nfts = await nftCollection.getAll()
    } catch (err) {
      console.error(err)
      alert('Error fetching nfts')
    }
  }

  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "marketItems"] {
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      volumeTraded,
      createdBy,
      contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description
    }`

    try {
      setLoadingCollection(true)
      const collectionData = await sanityClient.fetch(query)
      setLoadingCollection(false)

      // the query returns 1 object inside of an array
      setCollections(collectionData)
    } catch (error) {
      setLoadingCollection(false)
      console.log(error)
    }
  }

  return (
    <div className="overflow-hidden">
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src="https://lh3.googleusercontent.com/g6IAEmQm0J8J2ZoG0wLS04HEkVC7OvxNON5TvBZ4UR0Jm6LfIH4QwJNLWSnJsnabTnvarLUhpfRw_l-lMSBu6R0ymspZXNnT11YtXw=h600"
          alt="banner"
        />
      </div>
      <div className="my-20 max-w-7xl mx-auto">
        <div className={style.midRow}>
          <div className="text-5xl font-bold mb-12">All Collections</div>
        </div>
        <div className="border-darkBlue border-t-[0.1px]"></div>
      </div>
      <div className="grid grid-cols-2 gap-10 max-w-7xl mx-auto">
        {loadingCollection ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            {collections.map((collection: any, index: number) => (
              <CollectionCard key={index} data={collection} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

Collections.Layout = MainLayout

export default Collections
