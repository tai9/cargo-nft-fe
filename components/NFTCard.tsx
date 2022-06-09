import { useEffect, useState } from 'react'
import Router from 'next/router'
import { ethers } from 'ethers'
import { NFTItem } from 'models'

const style = {
  wrapper: `bg-[#303339] flex-auto my-6 mx-5 rounded-2xl overflow-hidden cursor-pointer border border-darkLine`,
  imgContainer: `h-2/3 w-full overflow-hidden flex justify-center items-center`,
  nftImg: `w-full h-full object-cover`,
  details: `p-3 h-1/3`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm text-[#8a939b]`,
  assetName: `font-bold text-lg mt-2`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm text-[#8a939b]`,
  priceValue: `flex items-center text-xl font-bold mt-2`,
  ethLogo: `h-5 mr-2`,
}

type Props = {
  nftItem: NFTItem
  title: string
  listings?: any
  collectionId?: string
}

const NFTCard = ({ nftItem, title, listings, collectionId }: Props) => {
  const [isListed, setIsListed] = useState(false)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    if (!listings) return

    const listing = listings.find(
      (listing: any) =>
        ethers.utils.formatEther(listing.asset.id) ===
        ethers.utils.formatEther(nftItem.metadata.id)
    )

    if (Boolean(listing)) {
      setIsListed(true)
      setPrice(listing.buyoutCurrencyValuePerToken.displayValue)
    }
  }, [listings, nftItem])

  return (
    <>
      <div
        className={`${style.wrapper} max-w-[280px] min-h-[450px] `}
        onClick={() => {
          Router.push({
            pathname: `/collections/${collectionId}/nfts/${nftItem._id}`,
            query: { isListed: isListed },
          })
        }}
      >
        <div className={style.imgContainer}>
          <img
            src={nftItem.metadata.image || ''}
            alt={nftItem.metadata.name}
            className={style.nftImg}
          />
        </div>
        <div className={style.details}>
          <div className={style.info}>
            <div className={style.infoLeft}>
              <div className={style.collectionName}>{title}</div>
              <div className={style.assetName}>{nftItem.metadata.name}</div>
            </div>
            {isListed && (
              <div className={style.infoRight}>
                <div className={style.priceTag}>Price</div>
                <div className={style.priceValue}>
                  <img
                    src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                    alt="eth"
                    className={style.ethLogo}
                  />
                  {price}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default NFTCard
