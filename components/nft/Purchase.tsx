import Button from '@mui/material/Button'
import { ETH_TOKEN_PRICE } from 'constants/token'
import { Listing } from 'models'
import moment from 'moment'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import { TiCancel } from 'react-icons/ti'
import { numberFormatter } from 'utils'

const style = {
  button: `flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
}

type Props = {
  address?: string
  nftListing?: Listing
  handleBuyNFT: (listingId: string, quantityDesired: number) => void
  handleListNFT?: () => void
  handleCancelListing?: () => void
  handleMakeOffer?: () => void
}

const Purchase = ({
  address,
  nftListing,
  handleBuyNFT,
  handleListNFT,
  handleCancelListing,
  handleMakeOffer,
}: Props) => {
  return (
    <>
      <div className="w-full items-center rounded-lg border border-darkLine bg-[#303339] p-4">
        {nftListing ? (
          <div className="">
            <div className="bg-[#262b2f] flex gap-2 items-center px-4 py-3 text-grey1 rounded-t-lg">
              <AiOutlineClockCircle className={style.buttonIcon} />
              <span>Sale ends</span>
              <div>
                {moment(nftListing.listingDurationInSeconds).format(
                  'MMMM Do YYYY, h:mm:ss a'
                )}
              </div>
            </div>
            <div className="flex flex-col px-4 py-4 gap-3">
              <div className="space-y-1">
                <p className="text-sm text-grey1">Current price:</p>
                <div className="flex gap-2 items-center">
                  <img
                    src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                    alt=""
                    width={16}
                  />
                  <span className="text-3xl font-bold">
                    {nftListing.buyoutPricePerToken}
                  </span>
                  <span className="text-sm text-grey1">
                    (
                    {numberFormatter.format(
                      ETH_TOKEN_PRICE * +nftListing.buyoutPricePerToken
                    )}
                    )
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  disableRipple
                  variant="contained"
                  sx={{
                    paddingX: '3rem',
                  }}
                  onClick={() => handleBuyNFT(nftListing.listingId, 1)}
                  disabled={address === nftListing.owner?.walletAddress}
                >
                  <IoMdWallet className={style.buttonIcon} />
                  <div className={style.buttonText}>Buy Now</div>
                </Button>
                {address !== nftListing.owner?.walletAddress && (
                  <button
                    className={`${style.button} border border-darkLine  bg-darkGrey hover:bg-lightGrey disabled:cursor-default disabled:hover:bg-darkGrey`}
                    onClick={handleMakeOffer}
                  >
                    <HiTag className={style.buttonIcon} />
                    <div className={style.buttonText}>Make Offer</div>
                  </button>
                )}

                {address === nftListing.owner?.walletAddress && (
                  <button
                    className={`${style.button} border border-darkLine  bg-darkGrey hover:bg-lightGrey disabled:cursor-default disabled:hover:bg-darkGrey`}
                    onClick={handleCancelListing}
                  >
                    <TiCancel className={style.buttonIcon} />
                    <div className={style.buttonText}>Cancel listing</div>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Button
            disableRipple
            variant="contained"
            sx={{
              paddingX: '3rem',
            }}
            onClick={handleListNFT}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>List Item</div>
          </Button>
        )}
      </div>
    </>
  )
}

export default Purchase
