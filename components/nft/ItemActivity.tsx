import { CgArrowsExchangeV } from 'react-icons/cg'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { useState } from 'react'
import { dummyEvents } from '../../static/dummyEvents'
import EventItem from './itemActivity/EventItem'
import { Transaction } from 'models'

const style = {
  wrapper: `w-full mt-8 border border-[#151b22] rounded-xl bg-[#303339] overflow-hidden`,
  title: `bg-[#262b2f] px-6 py-4 flex items-center cursor-pointer`,
  titleLeft: `flex-1 flex items-center text-xl font-bold`,
  titleIcon: `text-3xl mr-2`,
  titleRight: `text-xl`,
  filter: `flex items-center border border-[#151b22] mx-4 my-6 px-3 py-4 rounded-xl bg-darkGrey`,
  filterTitle: `flex-1`,
  tableHeader: `flex w-full bg-[#262b2f] border-y border-[#151b22] mt-8 px-4 py-1`,
  eventItem: `flex px-4`,
  ethLogo: `h-5 mr-2`,
  accent: `text-[#2081e2]`,
  activityTable: ``,
  filterIcon: ``,
  tableHeaderElement: ``,
}

type Props = {
  transactions?: Transaction[]
}

const ItemActivity = ({ transactions = [] }: Props) => {
  const [toggle, setToggle] = useState(true)
  return (
    <div className={style.wrapper}>
      <div className={style.title} onClick={() => setToggle(!toggle)}>
        <div className={style.titleLeft}>
          <span className={style.titleIcon}>
            <CgArrowsExchangeV />
          </span>
          Item Activity
        </div>
        <div className={style.titleRight}>
          {toggle ? (
            <BiChevronUp fontSize={24} />
          ) : (
            <BiChevronDown fontSize={24} />
          )}
        </div>
      </div>
      {toggle && (
        <div className={style.activityTable}>
          <div className={style.filter}>
            <div className={style.filterTitle}>Filter</div>
            <div className={style.filterIcon}>
              {' '}
              <BiChevronDown fontSize={24} />{' '}
            </div>
          </div>
          <div className={style.tableHeader}>
            <div className={`${style.tableHeaderElement} flex-[2]`}>Event</div>
            <div className={`${style.tableHeaderElement} flex-[2]`}>Price</div>
            <div className={`${style.tableHeaderElement} flex-[3]`}>From</div>
            <div className={`${style.tableHeaderElement} flex-[3]`}>To</div>
            <div className={`${style.tableHeaderElement} flex-[2]`}>Date</div>
          </div>
          {transactions.length > 0 ? (
            transactions.map((event) => (
              <EventItem key={event._id} event={event} />
            ))
          ) : (
            <div className="opacity-50 text-center space-y-1 my-4">
              <img
                className="m-auto"
                src="https://opensea.io/static/images/empty-asks.svg"
                alt=""
              />
              <div>No transactions yet</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ItemActivity
