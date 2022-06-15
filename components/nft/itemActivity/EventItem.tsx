import { NULL_ADDRESS } from 'constants/wallet'
import { ETransactionEvent, Transaction } from 'models'
import moment from 'moment'
import { MdOutlineOpenInNew } from 'react-icons/md'
import { getEventIcon, sliceAddress } from 'utils'

const style = {
  eventItem: `flex px-4 py-5 font-medium`,
  event: `flex items-center`,
  eventIcon: `mr-2 text-xl`,
  eventName: `text-lg font-semibold`,
  eventPrice: `flex items-center`,
  eventPriceValue: `text-lg`,
  ethLogo: `h-5 mr-2`,
  accent: `text-[#2081e2] cursor-pointer hover:text-greyBlue`,
}

type Props = {
  event?: Transaction
}

const EventItem = ({ event }: Props) => {
  return (
    <div className={style.eventItem}>
      <div className={`${style.event} flex-[2]`}>
        <div className={style.eventIcon}>
          {getEventIcon(event?.eventType as ETransactionEvent)}
        </div>
        <div className={style.eventName}>{event?.eventType}</div>
      </div>
      <div className={`${style.eventPrice} flex-[2]`}>
        {event?.price !== 0 && (
          <>
            <img
              src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
              alt="eth"
              className={style.ethLogo}
            />
            <div className={style.eventPriceValue}>{event?.price}</div>
          </>
        )}
      </div>
      <div className={`${style.accent} flex-[3]`}>
        {event?.eventType === ETransactionEvent.MINTED
          ? NULL_ADDRESS
          : sliceAddress(event?.from)}
      </div>
      <div className={`${style.accent} flex-[3]`}>
        {sliceAddress(event?.to)}
      </div>
      <a
        href={`https://rinkeby.etherscan.io/tx/${event?.transactionHash}`}
        target="_blank"
        rel="noreferrer"
        className={`${style.accent} flex-[2] flex items-center gap-1`}
      >
        {moment(event?._createdAt).startOf('second').fromNow()}{' '}
        <MdOutlineOpenInNew fontSize={24} />
      </a>
    </div>
  )
}

export default EventItem
