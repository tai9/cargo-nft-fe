import ActivityTable from 'components/activity/ActivityTable'
import { CollapseOutline } from 'components/common'
import { NormalLayout } from 'components/layout'
import { client } from 'lib/sanityClient'
import {
  getCollectionTransactionQuery,
  NextPageWithLayout,
  Transaction,
} from 'models'
import { useCallback, useEffect, useState } from 'react'
import { BiFilter } from 'react-icons/bi'

const ActivityPage: NextPageWithLayout = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchTransactionData = useCallback(async () => {
    try {
      setIsLoading(true)
      const transactionData = await client.fetch(
        getCollectionTransactionQuery()
      )
      setIsLoading(false)
      setTransactions(transactionData)
    } catch (err) {
      setIsLoading(false)
      console.error(err)
    }
  }, [])

  useEffect(() => {
    fetchTransactionData()
  }, [fetchTransactionData])

  return (
    <div className="container">
      <div className="flex gap-4 mt-6 justify-between items-center">
        <BiFilter fontSize={28} color="white" className="cursor-pointer" />
        <select
          defaultValue={90}
          className="select select-bordered w-full max-w-xs bg-transparent text-white font-bold border-2"
        >
          <option>Last 7 Days</option>
          <option>Last 14 Days</option>
          <option>Last 30 Days</option>
          <option>Last 60 Days</option>
          <option value={90}>Last 90 Days</option>
          <option>Last Year</option>
        </select>
      </div>
      <div className="grid grid-cols-6 gap-6 mt-6">
        <div className="col-span-1">
          <CollapseOutline title="Event Type">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-base">Sales</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary border-gray-400"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-base">Listings</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary border-gray-400"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-base">Offers</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary border-gray-400"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-base">Collection Offers</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary border-gray-400"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-base">Transfers</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary border-gray-400"
                />
              </label>
            </div>
          </CollapseOutline>

          <div className="divider" />
        </div>
        <div className="col-span-5">
          <ActivityTable isLoading={isLoading} transactions={transactions} />
        </div>
      </div>
    </div>
  )
}

ActivityPage.Layout = NormalLayout

export default ActivityPage