import { MainLayout } from 'components/layout'
import {
  ETransactionEvent,
  getSingleNFTQuery,
  NextPageWithLayout,
  NFTItem,
} from 'models'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { client } from 'lib/sanityClient'
import { useRouter } from 'next/router'
import { Input } from 'components/common'
import { MdWarningAmber } from 'react-icons/md'
import LoadingButton from '@mui/lab/LoadingButton'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import { useAddress, useNFTCollection } from '@thirdweb-dev/react'

const TransferPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { nftId } = router.query

  const [nftItem, setNftItem] = useState<NFTItem>()
  const [transferAddress, setTransferAddress] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isTransfering, setIsTransfering] = useState(false)

  const address = useAddress()
  const nftContract = useNFTCollection(nftItem?.collection?.contractAddress)

  const fetchNFTsData = useCallback(async (nftId: string) => {
    try {
      const nftData: NFTItem[] = await client.fetch(getSingleNFTQuery(nftId))
      setNftItem(nftData[0])
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchNFTsData(nftId as string)
  }, [nftId, fetchNFTsData])

  useEffect(() => {
    if (transferAddress === nftItem?.owner?.walletAddress) {
      setErrorMessage('Cannot transfer to self')
      return
    }

    if (ethers.utils.isAddress(transferAddress) || transferAddress === '') {
      setErrorMessage('')
    } else {
      setErrorMessage('Invalid address.')
    }
  }, [transferAddress, nftItem])

  const handleTransfer = async (event: SyntheticEvent) => {
    event.preventDefault()
    if (
      !address ||
      !nftContract ||
      !nftItem ||
      !transferAddress ||
      errorMessage
    )
      return

    try {
      setIsTransfering(true)

      const tx = await nftContract.transfer(
        transferAddress,
        nftItem?.metadata.id
      )

      // create user if not exists
      const userDoc = {
        _type: 'users',
        _id: transferAddress,
        userName: 'Unnamed',
        walletAddress: address,
      }
      await client.createIfNotExists(userDoc)

      // update NFT owner
      client
        .patch(nftItem?._id || '')
        .set({
          owner: {
            _ref: transferAddress,
          },
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
          _ref: nftItem._id,
        },
        confirmations: tx.receipt.confirmations,
        contractAddress: tx.receipt.contractAddress || '',
        from: tx.receipt.from,
        to: tx.receipt.to,
        gasUsed: tx.receipt.gasUsed.toString(),
        status: tx.receipt.status,
        transactionHash: tx.receipt.transactionHash,
        type: tx.receipt.type,
        price: 0,
        eventType: ETransactionEvent.TRANSAFER,
      }
      await client.create(transDoc)

      toast.success(`Transfer ${nftItem?.metadata.name} successful!`)
      setIsTransfering(false)
      setTimeout(() => {
        router.back()
      }, 1000)
    } catch (error) {
      toast.error('Something went wrong')
      setIsTransfering(false)
      console.log(error)
    }
  }

  return (
    <form className="flex flex-col gap-14 text-white items-center justify-center h-full w-full max-w-2xl mx-auto mt-20">
      <div className="font-bold text-6xl">Transfer</div>
      <div className="border border-darkLine p-4 rounded-lg">
        {nftItem?.metadata.image ? (
          <img
            src={nftItem?.metadata.image}
            alt=""
            width={220}
            className="rounded-lg"
          />
        ) : (
          <ImageSkeleton />
        )}
      </div>
      <div className="w-full space-y-4 text-center">
        <div className="space-y-2 text-left">
          <div className="font-bold">
            Address<span className="text-red-500"> *</span>
          </div>
          <Input
            className="h-10 bg-[#4c505c] rounded-lg border border-darkLine"
            name="address"
            onChange={(e) => setTransferAddress(e.currentTarget.value)}
            placeholder="e.g. 0x1ed3... or destination.eth"
            required
            errorMessage={errorMessage}
          />
        </div>
        <div>
          <span className="font-bold">&#34;{nftItem?.metadata.name}&#34;</span>
          &nbsp; will be transferred to{' '}
          {transferAddress && errorMessage === '' ? transferAddress : '...'}
        </div>
        {transferAddress && errorMessage === '' && (
          <div className="flex items-center justify-center gap-2 text-textGrey font-medium text-xs">
            <MdWarningAmber fontSize={16} />
            Items sent to the wrong address cannot be recovered
          </div>
        )}
        <LoadingButton
          type="submit"
          sx={{
            width: 'fit-content',
            fontWeight: 'bold',
          }}
          disabled={!(transferAddress && errorMessage === '')}
          variant="contained"
          loading={isTransfering}
          size="large"
          onClick={handleTransfer}
        >
          Transfer
        </LoadingButton>
      </div>
    </form>
  )
}

const ImageSkeleton = () => (
  <div className="shadow rounded-lg w-[220px]">
    <div className="animate-pulse">
      <div className="flex-1 space-y-6">
        <div className="h-[220px] bg-slate-700 rounded-lg"></div>
      </div>
    </div>
  </div>
)

TransferPage.Layout = MainLayout

export default TransferPage
