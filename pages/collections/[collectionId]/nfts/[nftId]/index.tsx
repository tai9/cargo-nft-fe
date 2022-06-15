import { Button, Divider } from '@mui/material'
import { useAddress, useMarketplace } from '@thirdweb-dev/react'
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk'
import { Collapse, Modal } from 'components/common'
import { MainLayout } from 'components/layout'
import GeneralDetails from 'components/nft/GeneralDetails'
import ItemActivity from 'components/nft/ItemActivity'
import ListingForm, { ListingData } from 'components/nft/ListingForm'
import NFTImage from 'components/nft/NFTImage'
import Purchase from 'components/nft/Purchase'
import NFTCard from 'components/NFTCard'
import { ETH_TOKEN_PRICE } from 'constants/token'
import { CargoContext, CargoContextType } from 'context/cargoContext'
import { client } from 'lib/sanityClient'
import {
  ETransactionEvent,
  getListingQuery,
  getNFTsByCollectionIdQuery,
  getTransactionQuery,
  Listing,
  NextPageWithLayout,
  NFTItem,
  Transaction,
} from 'models'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AiOutlineBars } from 'react-icons/ai'
import { BsTagFill } from 'react-icons/bs'
import {
  MdBallot,
  MdSubject,
  MdTimeline,
  MdVerticalSplit,
  MdViewModule,
} from 'react-icons/md'
import { toast } from 'react-toastify'
import { numberFormatter, sliceAddress } from 'utils'
import LoadingButton from '@mui/lab/LoadingButton'
import OfferForm from 'components/nft/OfferForm'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
  hoverPrimaryText: `text-primary cursor-pointer hover:text-greyBlue`,
}

const Nft: NextPageWithLayout = () => {
  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  )

  const address = useAddress()

  const router = useRouter()
  const { collectionId, nftId } = router.query

  const { handleConfetti } = useContext(CargoContext) as CargoContextType

  const [transactions, setTransactions] = useState<Transaction[]>()

  // NFT states
  const [nfts, setNfts] = useState<NFTItem[]>([])
  const [nftItem, setNftItem] = useState<NFTItem>()

  // listing states
  const [listings, setListings] = useState<Listing[]>([])
  const [nftListing, setNftListing] = useState<Listing>()

  // modal states
  const [openModal, setOpenModal] = useState(false)
  const [openListingModal, setOpenListingModal] = useState(false)
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [openOfferModal, setOpenOfferModal] = useState(false)

  // loading states
  const [isListing, setIsListing] = useState(false)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  const [isOffering, setIsOffering] = useState(false)

  const fetchNFTsData = useCallback(
    async (collectionId: string, nftId: string, sanityClient = client) => {
      try {
        const nftData: NFTItem[] = await sanityClient.fetch(
          getNFTsByCollectionIdQuery(collectionId)
        )
        setNfts(nftData)
        setNftItem(nftData.find((n) => n._id === nftId))
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

  const handleBuyNFT = () => {
    if (!marketplace || !address || !listings) return
    setOpenModal(true)
  }

  const handleMakeOffer = () => {
    if (!marketplace || !address) return
    setOpenOfferModal(true)
  }

  const handleListNFT = () => {
    setOpenListingModal(true)
  }

  const handleConfirmCheckout = async (
    listingId: string,
    quantityDesired: number
  ) => {
    if (!marketplace || !nftListing) return
    try {
      setIsPurchasing(true)
      const tx = await marketplace.direct.buyoutListing(
        listingId,
        quantityDesired
      )

      // update NFT owner
      await client
        .patch(nftItem?._id || '')
        .set({
          owner: {
            _ref: address,
          },
        })
        .commit()

      // update listing status
      await client
        .patch(nftListing?._id || '')
        .set({
          active: false,
        })
        .commit()

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
        confirmations: tx.receipt.confirmations,
        contractAddress: tx.receipt.contractAddress || '',
        from: tx.receipt.from,
        to: tx.receipt.to,
        gasUsed: tx.receipt.gasUsed.toString(),
        status: tx.receipt.status,
        transactionHash: tx.receipt.transactionHash,
        type: tx.receipt.type,
        price: +nftListing.buyoutPricePerToken,
        eventType: ETransactionEvent.SALE,
      }
      await client.create(transDoc)

      setIsPurchasing(false)
      setOpenModal(false)
      handleConfetti(true)
      toast.success(`Purchase successful!`)
    } catch (err) {
      setIsPurchasing(false)
      toast.error(`Purchase error!`)
      console.log(err)
    }
  }

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
        active: true,
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

      setIsListing(false)
      handleConfetti(true)
      setOpenListingModal(false)
      toast.success(`Listed ${nftItem?.metadata.name} successful`)
    } catch (err) {
      setIsListing(false)
      toast.error('Cannot listing this NFT.')
      console.log(err)
    }
  }

  const handleCancelListing = async () => {
    setIsCancelling(true)
    // update listing status
    client
      .patch(nftListing?._id || '')
      .set({
        active: false,
      })
      .commit()
      .then(async () => {
        await fetchListingData(nftId as string)
        setIsCancelling(false)
        toast.success(`Cancel listing successful`)
        handleCloseConfirmModal()
      })
      .catch((error) => {
        setIsCancelling(false)
        toast.error('Cannot cancel listing.')
        console.log(error)
      })
  }

  const handleMakeOfferNFT = async (data?: ListingData) => {
    console.log(data)
  }

  const handleCloseConfirmModal = () => setOpenConfirmModal(false)

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
                        {nftItem?.createdBy}
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
                        <div>No description yet</div>
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
              <GeneralDetails
                nftItem={nftItem}
                isTransfered={address === nftItem?.owner?.walletAddress}
              />
              <Purchase
                address={address}
                nftListing={nftListing}
                handleBuyNFT={handleBuyNFT}
                handleListNFT={handleListNFT}
                handleCancelListing={handleCancelListing}
                handleMakeOffer={handleMakeOffer}
              />
              <div className="flex flex-col gap-6 mt-6">
                <Collapse icon={<MdTimeline />} title="Price History">
                  <div className="opacity-50 text-center space-y-1">
                    <img
                      className="m-auto"
                      src="https://opensea.io/static/images/empty-asks.svg"
                      alt=""
                    />
                    <div>No activity yet</div>
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
                    <div>No offers yet</div>
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
                          title={nft.collection?.title || ''}
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
        loading={isPurchasing}
        handleClose={() => setOpenModal(false)}
        handleSubmit={() =>
          nftListing && handleConfirmCheckout(nftListing.listingId, 1)
        }
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
                <div className="text-primary font-normal">
                  {nftItem?.collection?.title}
                </div>
                <div className="">{nftItem?.metadata.name}</div>
              </div>
            </div>
            <div className="space-y-1 text-right">
              <div className="text-primary flex">
                <img
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className="h-5 mr-2"
                />
                {nftListing?.buyoutPricePerToken}
              </div>
              <div className="text-sm font-normal">
                {numberFormatter.format(
                  ETH_TOKEN_PRICE * +(nftListing?.buyoutPricePerToken || 0)
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center font-bold border-b-[1px] border-darkLine p-1">
            <div>Total</div>
            <div className="space-y-1 text-right">
              <div className="text-primary flex">
                <img
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className="h-5 mr-2"
                />
                {nftListing?.buyoutPricePerToken}
              </div>
              <div className="text-sm font-normal">
                {' '}
                {numberFormatter.format(
                  ETH_TOKEN_PRICE * +(nftListing?.buyoutPricePerToken || 0)
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Listing */}
      <Modal
        title={`Listing ${nftItem?.metadata.name}`}
        submitText="Complete listing"
        open={openListingModal}
        handleClose={() => setOpenListingModal(false)}
      >
        <ListingForm loading={isListing} handleSubmit={handleListingNFT} />
      </Modal>

      {/* Make offer */}
      <Modal
        title="Make an offer"
        open={openOfferModal}
        handleClose={() => setOpenOfferModal(false)}
      >
        <OfferForm loading={isOffering} handleSubmit={handleMakeOfferNFT} />
      </Modal>

      {/* Cancel listing */}
      <Modal open={openConfirmModal} handleClose={handleCloseConfirmModal}>
        <div className="text-center space-y-12">
          <div className="text-xl font-bold">
            Are you sure you want to cancel your listing?
          </div>
          <div className="text-left">
            Canceling your listing will unpublish this sale from Cargo and
            requires a transaction to make sure it will never be fulfillable.
          </div>
          <div className="space-x-4">
            <Button
              type="submit"
              sx={{
                width: 'fit-content',
                fontWeight: 'bold',
              }}
              variant="outlined"
              size="large"
              onClick={handleCloseConfirmModal}
            >
              Cancel listing
            </Button>
            <LoadingButton
              type="submit"
              sx={{
                width: 'fit-content',
                fontWeight: 'bold',
              }}
              variant="contained"
              loading={isCancelling}
              size="large"
              onClick={handleCancelListing}
            >
              Cancel listing
            </LoadingButton>
          </div>
        </div>
      </Modal>
    </div>
  )
}

Nft.Layout = MainLayout

export default Nft
