import { ETransactionEvent, Transaction } from 'models'
import React from 'react'
import Router from 'next/router'
import { getEventIcon, sliceAddress } from 'utils'
import { NULL_ADDRESS } from 'constants/wallet'
import { MdOutlineOpenInNew } from 'react-icons/md'
import moment from 'moment'

type Props = {
  transactions: Transaction[]
  isLoading?: boolean
}

const ActivityTable = ({ isLoading, transactions }: Props) => {
  return (
    <table className="table-auto text-white w-full text-center">
      <thead className="border-b-[1px] border-grey2 h-[56px]">
        <tr>
          <th></th>
          <th className="text-left">Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>From</th>
          <th>To</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {isLoading
          ? [1, 2, 3, 4, 5].map((x) => (
              <tr key={x} className="h-[80px]">
                <td colSpan={7}>
                  <div className="shadow p-4 w-full mx-auto">
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-6 py-1">
                        <div className="h-[28px] bg-slate-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          : transactions.map((transaction) => (
              <>
                <tr
                  key={transaction._id}
                  className="h-[80px] cursor-pointer hover:bg-grey2 duration-200"
                  onClick={() =>
                    Router.push(
                      `/collections/${transaction.collection?.contractAddress}/nfts/${transaction.nft?._id}`
                    )
                  }
                >
                  <td className="font-bold">
                    <div className="flex items-center gap-2 ml-6">
                      <div className="mr-2 text-xl">
                        {getEventIcon(
                          transaction.eventType as ETransactionEvent
                        )}
                      </div>
                      <div className="text-lg font-semibold">
                        {transaction.eventType}
                      </div>
                    </div>
                  </td>
                  <td className="font-bold text-left">
                    {transaction.nft?.metadata.name}
                  </td>
                  <td className="font-bold">{transaction.price || '-'}</td>
                  <td>1</td>
                  <td className="text-primary">
                    {transaction.eventType === ETransactionEvent.MINTED
                      ? NULL_ADDRESS
                      : sliceAddress(transaction.from)}
                  </td>
                  <td className="text-primary">
                    {sliceAddress(transaction.to)}
                  </td>
                  <td className="text-primary">
                    <div className="flex items-center gap-2 justify-center">
                      {moment(transaction._createdAt)
                        .startOf('second')
                        .fromNow()}
                      <MdOutlineOpenInNew fontSize={24} />
                    </div>
                  </td>
                </tr>
              </>
            ))}
      </tbody>
    </table>
  )
}

export default ActivityTable
