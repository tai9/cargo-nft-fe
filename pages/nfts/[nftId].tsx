import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'
import { ethers } from 'ethers'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {
  const [selectedNft, setSelectedNft] = useState<any>()
  const [listings, setListings] = useState<any>([])
  const router = useRouter()

  useEffect(() => {
    const listing = listings.find(
      (listing: any) =>
        ethers.utils.formatEther(listing.asset.id) === router.query.nftId
    )

    if (Boolean(listing)) {
      setSelectedNft(listing)
    }
  }, [listings, router.query])

  // get all NFTs in the collection
  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       const response = await fetch('/api/get-nfts', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //       const data = await response.json()

  //       // setNfts(data.data, router.query.nftId)
  //       console.log(data.data, router.query.nftId)
  //     } catch (error) {
  //       console.log(error, '🔫')
  //     }
  //   })()
  // }, [])

  // get all listings in the collection
  // useEffect(() => {
  //   ;(async () => {
  //     const response = await fetch('/api/get-marketplace', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     const data = await response.json()

  //     console.log({ listings: data.data })

  //     setListings(data.data)
  //   })()
  // }, [])

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
              <Purchase
                isListed={router.query.isListed}
                selectedNft={selectedNft}
                listings={listings}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  )
}

export default Nft
