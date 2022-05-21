import { useEffect, useState } from 'react'

import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'
import { ethers } from 'ethers'
import { useMarketplace } from '@thirdweb-dev/react'
const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
}

const MakeOffer = ({
  isListed,
  selectedNft,
  listings,
  marketPlaceModule,
}: any) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState<any>()
  const [enableButton, setEnableButton] = useState(true)
  const marketplace = useMarketplace(
    '0x2FF80519C079980f458309d9f9c213AbE06a5069'
  )

  console.log(selectedNft)

  // useEffect(() => {
  //   if (!listings || isListed === 'false') return
  //   ;(async () => {
  //     setSelectedMarketNft(
  //       listings.find((marketNft) => marketNft.asset?.id === selectedNft.id)
  //     )
  //   })()
  // }, [selectedNft, listings, isListed])

  // useEffect(() => {
  //   if (!selectedMarketNft || !selectedNft) return

  //   setEnableButton(true)
  // }, [selectedMarketNft, selectedNft])

  const confirmPurchase = (toastHandler = toast) =>
    toastHandler.success(`Purchase successful!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })

  const buyItem = async (listingId: any, quantityDesired = 1) => {
    console.log(selectedNft?.id, listings, quantityDesired, module, 'david')

    // The listing ID of the asset you want to buy
    const listingId2 = 0
    // Quantity of the asset you want to buy
    const quantityDesired2 = 1

    if (!marketplace) return
    try {
      await marketplace.buyoutListing(selectedNft?.id, 1)
      // console.log(data, '🔫')
    } catch (error) {
      console.log(error)
    }

    // const response = await fetch('/api/buy-nft', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     listingId: selectedNft?.asset?.id,
    //   }),
    // })
    // const data = await response.json()
    // console.log(data.data)
    // yo RAZA lets goooo!!!
    //yo Qazi, ok
    // sure okay about to run it...
    // just clicked buy now...
    // still error
    // where can i see the contract address of the marketplace module
    // in [nftId.js]
    // await module
    //   .buyoutDirectListing({
    //     listingId: listingId,
    //     quantityDesired: quantityDesired,
    //   })
    //   .catch((error) => console.error(error))

    // confirmPurchase()
  }

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
      {isListed === 'true' ? (
        <>
          <div>
            Current price:{' '}
            {selectedNft?.buyoutCurrencyValuePerToken?.displayValue}{' '}
            {selectedNft?.buyoutCurrencyValuePerToken?.symbol}
          </div>
          <div
            onClick={() => {
              enableButton ? buyItem(selectedMarketNft?.id, 1) : null
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
          </div>
          <div
            className={`${style.button} border border-[#151c22]  bg-darkGrey hover:bg-lightGrey`}
          >
            <HiTag className={style.buttonIcon} />
            <div className={style.buttonText}>Make Offer</div>
          </div>
        </>
      ) : (
        <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
          <IoMdWallet className={style.buttonIcon} />
          <div className={style.buttonText}>List Item</div>
        </div>
      )}
    </div>
  )
}

export default MakeOffer
