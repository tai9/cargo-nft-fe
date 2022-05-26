import { MainLayout } from 'components/layout'
import { ethers } from 'ethers'
import { NextPageWithLayout } from 'models'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import GeneralDetails from 'components/nft/GeneralDetails'
import ItemActivity from 'components/nft/ItemActivity'
import NFTImage from 'components/nft/NFTImage'
import Purchase from 'components/nft/Purchase'
import { useMarketplace, useNFTCollection } from '@thirdweb-dev/react'
import { Collapse } from 'components/common'
import {
  MdTimeline,
  MdSubject,
  MdVerticalSplit,
  MdBallot,
  MdViewModule,
} from 'react-icons/md'
import { BsTagFill } from 'react-icons/bs'
import { AiOutlineBars } from 'react-icons/ai'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
  hoverPrimaryText: `text-primary cursor-pointer hover:text-greyBlue`,
}

const Nft: NextPageWithLayout = () => {
  const [selectedNft, setSelectedNft] = useState<any>()
  const [listings, setListings] = useState<any>([])
  const router = useRouter()

  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  )
  const nftCollection = useNFTCollection(
    '0x4f98e821CcE773AE69439B0ED0F4a55e63F7bDaC'
  )

  useEffect(() => {
    ;(async () => {
      if (router.query.nftId) {
        const data = await nftCollection?.get(+router.query.nftId)
        setSelectedNft(data)
      }

      if (router.query.isListed === 'true') {
        const data = await marketplace?.getActiveListings()
        setListings(data)
        console.log(data)
      }
    })()
  }, [marketplace, nftCollection, router.query.isListed, router.query.nftId])

  return (
    <div>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
              <div className="flex flex-col mt-6">
                <Collapse
                  isToggled={false}
                  icon={<MdSubject />}
                  title="Description"
                  className="rounded-b-none"
                >
                  <p>
                    Created by{' '}
                    <span className={style.hoverPrimaryText}>abc</span>
                  </p>
                  <p className="mt-1">
                    5,000 animated Invisible Friends hiding in the metaverse. A
                    collection by Markus Magnusson & Random Character
                    Collective.
                  </p>
                  <div className="opacity-50 text-center space-y-1">
                    <img
                      className="m-auto"
                      src="https://opensea.io/static/images/empty-asks.svg"
                      alt=""
                    />
                    <div>No listings yet</div>
                  </div>
                </Collapse>
                <Collapse
                  icon={<MdVerticalSplit />}
                  title="About Collection"
                  className="rounded-none border-y-0"
                  defaultOpen={false}
                >
                  <div className="opacity-50 text-center space-y-1">
                    <img
                      className="m-auto"
                      src="https://opensea.io/static/images/empty-asks.svg"
                      alt=""
                    />
                    <div>No listings yet</div>
                  </div>
                </Collapse>
                <Collapse
                  icon={<MdBallot />}
                  title="Details"
                  className="rounded-t-none"
                  defaultOpen={false}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div>Contract Address</div>
                      <div className={style.hoverPrimaryText}>0x59...0e022</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Token ID</div>
                      <div className={style.hoverPrimaryText}>2708</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Token Standard</div>
                      <div className="text-grey1">ERC-721</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Blockchain</div>
                      <div className="text-grey1">Ethereum</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Creator Fees</div>
                      <div className="text-grey1">5%</div>
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
              <Purchase
                isListed={router.query.isListed}
                selectedNft={selectedNft}
                listings={listings}
              />
              <div className="flex flex-col gap-6 mt-6">
                <Collapse icon={<MdTimeline />} title="Price History">
                  <div className="opacity-50 text-center space-y-1">
                    <img
                      className="m-auto"
                      src="https://opensea.io/static/images/empty-asks.svg"
                      alt=""
                    />
                    <div>No listings yet</div>
                  </div>
                </Collapse>
                <Collapse icon={<BsTagFill />} title="Listings">
                  <div className="opacity-50 text-center space-y-1">
                    <img
                      className="m-auto"
                      src="https://opensea.io/static/images/empty-asks.svg"
                      alt=""
                    />
                    <div>No listings yet</div>
                  </div>
                </Collapse>
                <Collapse icon={<AiOutlineBars />} title="Offers">
                  <div className="opacity-50 text-center space-y-1">
                    <img
                      className="m-auto"
                      src="https://opensea.io/static/images/empty-asks.svg"
                      alt=""
                    />
                    <div>No listings yet</div>
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
          <ItemActivity />
          <Collapse
            icon={<MdViewModule />}
            title="More From This Collection"
            className="mt-6"
          >
            <div className="opacity-50 text-center space-y-1">
              <img
                className="m-auto"
                src="https://opensea.io/static/images/empty-asks.svg"
                alt=""
              />
              <div>No listings yet</div>
              <button className="p-3 border border-darkBlue bg-grey1 rounded-lg font-bold">
                View collection
              </button>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  )
}

Nft.Layout = MainLayout

export default Nft
