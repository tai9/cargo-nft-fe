import { useEffect, useState } from 'react'

import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import { AiOutlineClockCircle } from 'react-icons/ai'

import toast, { Toaster } from 'react-hot-toast'
import { ethers } from 'ethers'
import { useMarketplace } from '@thirdweb-dev/react'
const style = {
  button: `flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
}

const Purchase = ({
  isListed,
  selectedNft,
  listings,
  handleBuyNFT,
  handleListNFT,
}: any) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState<any>()
  const [enableButton, setEnableButton] = useState(true)
  const marketplace = useMarketplace(
    '0x2FF80519C079980f458309d9f9c213AbE06a5069'
  )

  useEffect(() => {
    if (!listings || isListed === 'false') return
    ;(async () => {
      setSelectedMarketNft(
        listings.find(
          (marketNft: any) =>
            ethers.utils.formatEther(marketNft.asset.id) ===
            ethers.utils.formatEther(selectedNft.metadata.id)
        )
      )
    })()
  }, [selectedNft, listings, isListed])

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return
    setEnableButton(true)
    console.log(selectedMarketNft)
  }, [selectedMarketNft, selectedNft])

  const confirmPurchase = (toastHandler = toast) =>
    toastHandler.success(`Purchase successful!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })

  const buyItem = async (listingId: any, quantityDesired = 1) => {
    // The listing ID of the asset you want to buy
    const listingId2 = 0
    // Quantity of the asset you want to buy
    const quantityDesired2 = 1

    if (!marketplace) return
    try {
      await marketplace.buyoutListing(selectedMarketNft?.id, 1)
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
    <div className="w-full items-center rounded-lg border border-darkLine bg-[#303339] p-4">
      <Toaster position="bottom-left" reverseOrder={false} />
      {isListed === 'true' ? (
        <div className="">
          <div className="bg-[#262b2f] flex gap-2 items-center px-4 py-3 text-grey1 rounded-t-lg">
            <AiOutlineClockCircle className={style.buttonIcon} />
            <div>Sale ends June 26, 2022 at 2:26pm GMT+7</div>
          </div>
          <div className="flex flex-col px-4 py-4 gap-3">
            <div className="space-y-1">
              <p className="text-sm text-grey1">Current price:</p>
              <div className="flex gap-2 items-center">
                <span>
                  {selectedMarketNft?.buyoutCurrencyValuePerToken?.symbol}
                </span>
                <span className="text-3xl font-bold">
                  {selectedMarketNft?.buyoutCurrencyValuePerToken?.displayValue}
                </span>
                <span className="text-sm text-grey1">($137.95)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div
                onClick={() => {
                  enableButton ? handleBuyNFT(selectedMarketNft?.id, 1) : null
                }}
                className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
              >
                <IoMdWallet className={style.buttonIcon} />
                <div className={style.buttonText}>Buy Now</div>
              </div>
              <div
                className={`${style.button} border border-darkLine  bg-darkGrey hover:bg-lightGrey`}
              >
                <HiTag className={style.buttonIcon} />
                <div className={style.buttonText}>Make Offer</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          onClick={handleListNFT}
        >
          <IoMdWallet className={style.buttonIcon} />
          <div className={style.buttonText}>List Item</div>
        </button>
      )}
    </div>
  )
}

export default Purchase
