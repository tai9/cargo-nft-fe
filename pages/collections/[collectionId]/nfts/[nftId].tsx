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
import { Collapse, Modal } from 'components/common'
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
  const router = useRouter()
  const { collectionId, nftId, isListed } = router.query

  const [selectedNft, setSelectedNft] = useState<any>()
  const [listings, setListings] = useState<any>([])
  const [openModal, setOpenModal] = useState(false)

  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  )
  const nftCollection = useNFTCollection(collectionId as string)

  useEffect(() => {
    ;(async () => {
      if (nftId) {
        const data = await nftCollection?.get(+nftId)
        setSelectedNft(data)
        console.log(data)
      }

      if (isListed === 'true') {
        const data = await marketplace?.getActiveListings()
        setListings(data)
        console.log(data)
      }
    })()
  }, [marketplace, nftCollection, isListed, nftId])

  const handleBuyNFT = async (listingId: any, quantityDesired = 1) => {
    // if (!marketplace) return
    // try {
    //   await marketplace.buyoutListing(listingId, quantityDesired)
    // } catch (error) {
    //   console.log(error)
    // }
    setOpenModal(true)
  }

  const handleListNFT = () => {
    setOpenModal(true)
  }

  const handleConfirmCheckout = async () => {
    console.log('handleConfirmCheckout')
  }

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
                isListed={isListed}
                selectedNft={selectedNft}
                listings={listings}
                handleBuyNFT={handleBuyNFT}
                handleListNFT={handleListNFT}
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

      <Modal
        title="Complete checkout"
        submitText="Confirm checkout"
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handleSubmit={handleConfirmCheckout}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between font-bold border-b-[1px] border-darkLine p-1">
            <div>Item</div>
            <div>Subtotal</div>
          </div>
          <div className="flex justify-between items-center font-bold border-b-[1px] border-darkLine p-1 pb-4">
            <div className="flex gap-3">
              <img
                className="object-cover w-20 rounded-md"
                src={selectedNft?.metadata.image}
                alt=""
              />
              <div className="flex flex-col">
                <div className="text-primary font-normal">Collection</div>
                <div className="">{selectedNft?.metadata.name}</div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-primary flex">
                <img
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className="h-5 mr-2"
                />
                9.99
              </div>
              <div className="text-sm font-normal">$17,6584</div>
            </div>
          </div>
          <div className="flex justify-between items-center font-bold border-b-[1px] border-darkLine p-1">
            <div>Total</div>
            <div className="space-y-1">
              <div className="text-primary flex">
                <img
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className="h-5 mr-2"
                />
                9.99
              </div>
              <div className="text-sm font-normal">$17,6584</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

Nft.Layout = MainLayout

export default Nft
