import React from 'react'
import ETHToken from 'assets/ETH.svg'
import Image from 'next/image'
import { MdMoreVert } from 'react-icons/md'
import { numberFormatter, sliceAddress } from 'utils'
import { ETH_TOKEN_PRICE } from 'constants/token'

type Props = {
  walletAddress?: string
  totalBalance?: number
}

export const WalletDrawer = ({ walletAddress, totalBalance = 0 }: Props) => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
      <div className="menu p-4 overflow-y-auto w-96 text-base-content bg-grey2">
        <div className="flex justify-between">
          <div className="font-bold text-lg text-white">My wallet</div>
          <div className="text-sm text-textGrey">
            {sliceAddress(walletAddress)}
          </div>
        </div>

        <div className="divider"></div>

        <div className="border border-darkLine rounded-lg flex flex-col items-center gap-2">
          <div className="flex flex-col justify-center items-center gap-1 my-3">
            <div className="text-textGrey text-sm font-bold">Total balance</div>
            <div className="text-xl font-bold text-white">
              {numberFormatter.format(ETH_TOKEN_PRICE * totalBalance)} USD
            </div>
          </div>
          <div className="bg-primary w-full text-center p-4 text-white font-bold rounded-b-lg cursor-pointer">
            Add Funds
          </div>
        </div>

        <div className="border border-darkLine rounded-lg flex flex-col items-center gap-2 p-4 mt-6">
          <div className="flex justify-between w-full">
            <div className="flex gap-1 justify-center items-center">
              <Image
                src={ETHToken}
                alt="eth"
                layout="fixed"
                width={24}
                height={24}
              />
              <div>
                <div className="text-sm text-white font-bold">ETH</div>
                <div className="text-xs font-semibold">Rinkeby</div>
              </div>
            </div>

            <div className="flex gap-1 justify-center items-center text-right">
              <div>
                <div className="text-sm text-white font-bold">
                  {totalBalance.toFixed(4)}
                </div>
                <div className="text-xs font-semibold">
                  {numberFormatter.format(ETH_TOKEN_PRICE * totalBalance)} USD
                </div>
              </div>
              <div className="text-white text-2xl font-bold cursor-pointer">
                <MdMoreVert />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
