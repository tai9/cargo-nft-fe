import { useEffect, useState } from 'react'
import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { ethers } from 'ethers'
import Button from '@mui/material/Button'

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
  }, [selectedMarketNft, selectedNft])

  return (
    <div className="w-full items-center rounded-lg border border-darkLine bg-[#303339] p-4">
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
              <Button
                disableRipple
                variant="contained"
                sx={{
                  paddingX: '3rem',
                }}
                onClick={() => {
                  enableButton ? handleBuyNFT(selectedMarketNft?.id, 1) : null
                }}
              >
                <IoMdWallet className={style.buttonIcon} />
                <div className={style.buttonText}>Buy Now</div>
              </Button>

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
