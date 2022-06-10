import { MainLayout } from 'components/layout'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
import {
  Collection,
  ETransactionEvent,
  getCollectinByIdQuery,
  getListingQuery,
  getNFTsByCollectionIdQuery,
  getTransactionQuery,
  Listing,
  NextPageWithLayout,
  NFTItem,
  Transaction,
  User,
} from 'models'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import GeneralDetails from 'components/nft/GeneralDetails'
import ItemActivity from 'components/nft/ItemActivity'
import NFTImage from 'components/nft/NFTImage'
import Purchase from 'components/nft/Purchase'
import {
  useAddress,
  useMarketplace,
  useNetwork,
  useNetworkMismatch,
  useNFTCollection,
} from '@thirdweb-dev/react'
import { Collapse, IconBox, Input, Modal } from 'components/common'
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
  NATIVE_TOKEN_ADDRESS,
  NFTMetadataOwner,
} from '@thirdweb-dev/sdk'
import NFTCard from 'components/NFTCard'
import Link from 'next/link'
import { Divider, FormControl, Grid, MenuItem, Select } from '@mui/material'
import { sliceAddress } from 'utils'
import ListingForm, { ListingData } from 'components/nft/ListingForm'
import { CargoContext, CargoContextType } from 'context/cargoContext'
import moment from 'moment'

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
  const address = useAddress()
  const { collectionId, nftId, isListed } = router.query

  const { handleConfetti } = useContext(CargoContext) as CargoContextType

  const [collection, setCollection] = useState<Partial<Collection>>({})
  const [userData, setUserData] = useState<User[]>([])
  const [transactions, setTransactions] = useState<any>()

  // NFT states
  const [nfts, setNfts] = useState<NFTItem[]>([])
  const [nftItem, setNftItem] = useState<NFTItem>()

  // listing states
  const [isListing, setIsListing] = useState(false)
  const [listings, setListings] = useState<Listing[]>([])
  const [nftListing, setNftListing] = useState<Listing>()

  // modal states
  const [openModal, setOpenModal] = useState(false)
  const [openListingModal, setOpenListingModal] = useState(false)

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
        const nftData: NFTItem[] = await sanityClient.fetch(
          getNFTsByCollectionIdQuery(collectionId)
        )
        setNfts(nftData)
        setNftItem(nftData.find((n) => n._id === nftId))
        console.log(nftData.find((n) => n._id === nftId))
      } catch (error) {
        console.log(error)
      }
    },
    []
  )

  const fetchListingData = useCallback(
    async (nftId: string, sanityClient = client) => {
      try {
        const listingData: Listing[] = await sanityClient.fetch(
          getListingQuery()
        )
        setListings(listingData)
        setNftListing(listingData.find((n) => n.nft?._id === nftId))
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
    fetchListingData(nftId as string)
  }, [
    collectionId,
    nftId,
    fetchNFTsData,
    fetchTransactionsData,
    fetchListingData,
  ])

  useEffect(() => {
    // fetchDetailCollectionData()
    // fetchUserData()
    // getNFTCollection()
  }, [fetchDetailCollectionData, fetchUserData, getNFTCollection])

  useEffect(() => {
    ;(async () => {
      // if (nftId) {
      // const nfts = await nftCollection?.getAll()

      // if (isListed === 'true') {
      const data = await marketplace?.getActiveListings()
      const s = data as DirectListing[]

      console.log(
        data,
        s[0].startTimeInSeconds.toString(),
        s[0].secondsUntilEnd.toString(),
        s[0].buyoutPrice.toString(),
        '🔫'
      )

      //   setListings(data)

      //   if (data && nft) {
      //     const listing = data?.find(
      //       (x) =>
      //         +ethers.utils.formatEther(x.tokenId) ===
      //         +ethers.utils.formatEther(nft?.metadata.id)
      //     )
      //     setNftListing(listing)
      //   }
      // }
      // }
    })()
  }, [marketplace, nftCollection])

  const handleBuyNFT = async (listingId: string, quantityDesired: number) => {
    if (!marketplace || !address) return
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

  const handleListingNFT = async (data?: ListingData) => {
    if (!marketplace || !address) return

    try {
      setIsListing(true)

      const listing = {
        assetContractAddress: nftItem?.collection?.contractAddress || '',
        tokenId: nftItem?.metadata.id.toString() || '',
        startTimestamp: new Date(),
        listingDurationInSeconds: 86400 * (data?.duration || 30),
        quantity: 1,
        currencyContractAddress: NATIVE_TOKEN_ADDRESS || '',
        buyoutPricePerToken: data?.amount?.toString() || '',
      }
      console.log({ data, listing })

      const tx = await marketplace.direct.createListing(listing)

      const listingId = tx.id.toString() // the id of the newly created listing

      // create a listing
      const listingDoc = {
        _type: 'listings',
        owner: {
          _type: 'reference',
          _ref: address,
        },
        nft: {
          _type: 'reference',
          _ref: nftItem?._id,
        },
        listingId: listingId,
        startTimestamp: new Date().toISOString(),
        listingDurationInSeconds: moment()
          .add(data?.duration || 30, 'days')
          .toDate()
          .getTime(),
        quantity: 1,
        currencyContractAddress: NATIVE_TOKEN_ADDRESS || '',
        buyoutPricePerToken: data?.amount?.toString() || '',
        assetContractAddress: nftItem?.collection?.contractAddress || '',
      }
      await client.create(listingDoc)

      // create a transaction
      const transDoc = {
        _type: 'transactions',
        owner: {
          _type: 'reference',
          _ref: address,
        },
        nft: {
          _type: 'reference',
          _ref: nftItem?._id,
        },
        id: tx.id.toString(),
        confirmations: tx.receipt.confirmations,
        contractAddress: tx.receipt.contractAddress || '',
        from: tx.receipt.from,
        to: tx.receipt.to,
        gasUsed: tx.receipt.gasUsed.toString(),
        status: tx.receipt.status,
        transactionHash: tx.receipt.transactionHash,
        type: tx.receipt.type,
        price: 0,
        eventType: ETransactionEvent.LIST,
      }
      await client.create(transDoc)

      // And on the buyers side:
      // Quantity of the asset you want to buy
      const quantityDesired = 1
      // const result = await marketplace.direct.buyoutListing(
      //   listingId,
      //   quantityDesired
      // )
      // console.log({ tx, result })
      setIsListing(false)
      handleConfetti(true)
      setOpenListingModal(false)
      toast.success(`Listed ${nftItem?.metadata.name} successfully`)
    } catch (err) {
      setIsListing(false)
      toast.error('Cannot listing this NFT.')
      console.log(err)
    }
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
                        {sliceAddress(nftItem?.collection?.contractAddress)}
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <div>Token ID</div>
                      <div className={style.hoverPrimaryText}>
                        {nftItem?.metadata.id?.toString()}
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
                address={address}
                nftListing={nftListing}
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
                <div className="grid grid-cols-4 gap-0 text-left">
                  {nfts.map(
                    (nft, index: number) =>
                      index < 4 && (
                        <NFTCard
                          key={index}
                          nftItem={nft}
                          title={collection?.title || ''}
                          listing={listings.find((l) => l.nft?._id === nft._id)}
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
                src={nftItem?.metadata.image || ''}
                alt=""
              />
              <div className="flex flex-col">
                <div className="text-primary font-normal">Collection</div>
                <div className="">{nftItem?.metadata.name}</div>
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
        <ListingForm loading={isListing} handleSubmit={handleListingNFT} />
      </Modal>
    </div>
  )
}

Nft.Layout = MainLayout

export default Nft
