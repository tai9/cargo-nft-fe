import { MainLayout } from 'components/layout'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
import {
  Collection,
  getCollectinByIdQuery,
  getNFTsByCollectionIdQuery,
  getTransactionQuery,
  NextPageWithLayout,
  NFTItem,
  Transaction,
  User,
} from 'models'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import GeneralDetails from 'components/nft/GeneralDetails'
import ItemActivity from 'components/nft/ItemActivity'
import NFTImage from 'components/nft/NFTImage'
import Purchase from 'components/nft/Purchase'
import { useMarketplace, useNFTCollection } from '@thirdweb-dev/react'
import { Collapse, Input, Modal } from 'components/common'
import {
  MdTimeline,
  MdSubject,
  MdVerticalSplit,
  MdBallot,
  MdViewModule,
  MdAttachMoney,
  MdTimelapse,
  MdCalendarToday,
} from 'react-icons/md'
import { BsTagFill } from 'react-icons/bs'
import { AiOutlineBars, AiOutlineInfoCircle } from 'react-icons/ai'
import { client } from 'lib/sanityClient'
import {
  AuctionListing,
  DirectListing,
  NFTMetadataOwner,
} from '@thirdweb-dev/sdk'
import NFTCard from 'components/NFTCard'
import Link from 'next/link'
import { Divider, FormControl, Grid, MenuItem, Select } from '@mui/material'
import { sliceAddress } from 'utils'
import ListingForm, { ListingData } from 'components/nft/ListingForm'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
  hoverPrimaryText: `text-primary cursor-pointer hover:text-greyBlue`,
}

type Listing = AuctionListing | DirectListing

const Nft: NextPageWithLayout = () => {
  const router = useRouter()
  const { collectionId, nftId, isListed } = router.query

  const [collection, setCollection] = useState<Partial<Collection>>({})
  const [selectedNft, setSelectedNft] = useState<NFTMetadataOwner>()
  const [listings, setListings] = useState<any>([])
  const [openModal, setOpenModal] = useState(false)
  const [openListingModal, setOpenListingModal] = useState(false)
  const [userData, setUserData] = useState<User[]>([])
  const [nfts, setNfts] = useState<NFTItem[]>([])
  const [nftItem, setNftItem] = useState<NFTItem>()
  const [nftListing, setNftListing] = useState<Listing>()
  const [transactions, setTransactions] = useState<any>()

  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  )
  const nftCollection = useNFTCollection(collectionId as string)

  const fetchUserData = useCallback(async (sanityClient = client) => {
    const query = `*[_type == "users" ] {
          userName,
          walletAddress,
          profileImage,
          bannerImage,
          igHandle,
      }`

    try {
      const data: User[] = await sanityClient.fetch(query)
      setUserData(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const fetchDetailCollectionData = useCallback(
    async (sanityClient = client) => {
      try {
        const collectionData: Collection[] = await sanityClient.fetch(
          getCollectinByIdQuery(collectionId as string)
        )
        setCollection(collectionData[0])
      } catch (error) {
        console.log(error)
      }
    },
    [collectionId]
  )

  const fetchNFTsData = useCallback(
    async (collectionId: string, nftId: string, sanityClient = client) => {
      try {
        const collectionData: NFTItem[] = await sanityClient.fetch(
          getNFTsByCollectionIdQuery(collectionId)
        )
        setNfts(collectionData)
        setNftItem(collectionData.find((n) => n._id === nftId))
      } catch (error) {
        console.log(error)
      }
    },
    []
  )

  const fetchTransactionsData = useCallback(
    async (nftId: string, sanityClient = client) => {
      try {
        const transactionData: Transaction[] = await sanityClient.fetch(
          getTransactionQuery(nftId)
        )
        setTransactions(transactionData)
      } catch (error) {
        console.log(error)
      }
    },
    []
  )

  const getNFTCollection = useCallback(async () => {
    if (!nftCollection) return
    // try {
    //   const nfts = await nftCollection.getAll()
    //   setNfts(nfts)
    // } catch (err) {
    //   console.error(err)
    //   alert('Error fetching nfts')
    // }
  }, [nftCollection])

  useEffect(() => {
    fetchNFTsData(collectionId as string, nftId as string)
    fetchTransactionsData(nftId as string)
  }, [collectionId, nftId, fetchNFTsData, fetchTransactionsData])

  useEffect(() => {
    // fetchDetailCollectionData()
    // fetchUserData()
    // getNFTCollection()
  }, [fetchDetailCollectionData, fetchUserData, getNFTCollection])

  // useEffect(() => {
  //   ;(async () => {
  //     if (nftId) {
  //       const nft = await nftCollection?.get(+nftId)
  //       setSelectedNft(nft)

  //       if (isListed === 'true') {
  //         const data: Listing[] | undefined =
  //           await marketplace?.getActiveListings()

  //         setListings(data)

  //         if (data && nft) {
  //           const listing = data?.find(
  //             (x) =>
  //               +ethers.utils.formatEther(x.tokenId) ===
  //               +ethers.utils.formatEther(nft?.metadata.id)
  //           )
  //           setNftListing(listing)
  //         }
  //       }
  //     }
  //   })()
  // }, [marketplace, nftCollection, isListed, nftId, fetchUserData])

  const handleBuyNFT = async (
    listingId: ethers.BigNumberish,
    quantityDesired = 1
  ) => {
    if (!marketplace) return
    try {
      // toast.promise(
      //   marketplace.buyoutListing(listingId, quantityDesired),
      //   {
      //     loading: 'Processing. \n Please do not close this window.',
      //     success: 'Purchase successful!',
      //     error: 'You declined the action in your wallet.',
      //   },
      //   {
      //     style: {
      //       background: '#04111d',
      //       color: '#fff',
      //     },
      //   }
      // )
    } catch (error) {
      console.log(error)
    }
    setOpenModal(true)
  }

  const handleListNFT = () => {
    setOpenListingModal(true)
  }

  const handleConfirmCheckout = async () => {
    confirmPurchase()
  }

  const confirmPurchase = (toastHandler = toast) =>
    toast.success(`Purchase successful!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })

  const handleListingNFT = (data?: ListingData) => {
    console.log(data)
  }

  return (
    <div>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage nftItem={nftItem} />
              <div className="flex flex-col mt-6">
                <Collapse
                  isToggled={false}
                  icon={<MdSubject />}
                  title="Description"
                  className="rounded-b-none"
                >
                  <div className="p-4">
                    <p className=" text-[#8a939b]">
                      Created by{' '}
                      <span className={style.hoverPrimaryText}>
                        {nftItem?.owner?.userName}
                      </span>
                    </p>
                    <p className="mt-1">{nftItem?.metadata.description}</p>
                  </div>
                </Collapse>
                <Collapse
                  icon={<MdVerticalSplit />}
                  title={`About ${nftItem?.collection?.title}`}
                  className="rounded-none border-y-0"
                  defaultOpen={false}
                >
                  <div className="p-4">
                    {nftItem?.collection ? (
                      <p>{nftItem?.collection.description}</p>
                    ) : (
                      <div className="opacity-50 text-center space-y-1">
                        <img
                          className="m-auto"
                          src="https://opensea.io/static/images/empty-asks.svg"
                          alt=""
                        />
                        <div>No listings yet</div>
                      </div>
                    )}
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

                      <a
                        className={style.hoverPrimaryText}
                        href={`https://rinkeby.etherscan.io/address/${nftListing?.assetContractAddress}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {sliceAddress(nftListing?.assetContractAddress)}
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <div>Token ID</div>
                      <div className={style.hoverPrimaryText}>
                        {nftListing?.id}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>Token Standard</div>
                      <div className="text-grey1">ERC-721</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Blockchain</div>
                      <div className="text-grey1">Rinkeby</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Creator Fees</div>
                      <div className="text-grey1">0%</div>
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails nftItem={nftItem} />
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
          <ItemActivity transactions={transactions} />
          <Collapse
            icon={<MdViewModule />}
            title="More From This Collection"
            className="mt-6"
          >
            {nfts.length > 0 ? (
              <div className="text-center">
                <div className="grid grid-cols-4 gap-0">
                  {nfts.map(
                    (nftItem, index: number) =>
                      index < 4 && (
                        <NFTCard
                          key={index}
                          nftItem={nftItem}
                          title={collection?.title || ''}
                          listings={listings}
                          collectionId={collectionId as string}
                        />
                      )
                  )}
                </div>
                <Divider sx={{ mb: 3 }} />
                <Link passHref href={`/collections/${collectionId}`}>
                  <button className="p-3 border border-darkBlue rounded-lg font-bold">
                    View collection
                  </button>
                </Link>
              </div>
            ) : (
              <div className="opacity-50 text-center space-y-1">
                <img
                  className="m-auto"
                  src="https://opensea.io/static/images/empty-asks.svg"
                  alt=""
                />
                <div>No listings yet</div>
              </div>
            )}
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
                src={selectedNft?.metadata.image || ''}
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

      <Modal
        title={`Listing ${nftItem?.metadata.name}`}
        submitText="Complete listing"
        open={openListingModal}
        handleClose={() => setOpenListingModal(false)}
      >
        <ListingForm handleSubmit={handleListingNFT} />
      </Modal>
    </div>
  )
}

Nft.Layout = MainLayout

export default Nft
