import { BsFillCartFill } from 'react-icons/bs'
import { MdOutlineOpenInNew } from 'react-icons/md'

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

const EventItem = ({ event }: any) => {
  return (
    <div className={style.eventItem}>
      <div className={`${style.event} flex-[2]`}>
        <div className={style.eventIcon}>
          <BsFillCartFill />
        </div>
        <div className={style.eventName}>Sale</div>
      </div>
      <div className={`${style.eventPrice} flex-[2]`}>
        <img
          src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
          alt="eth"
          className={style.ethLogo}
        />
        <div className={style.eventPriceValue}>{event.price}</div>
      </div>
      <div className={`${style.accent} flex-[3]`}>{event.from}</div>
      <div className={`${style.accent} flex-[3]`}>{event.to}</div>
      <div className={`${style.accent} flex-[2] flex items-center gap-1`}>
        {event.date} <MdOutlineOpenInNew fontSize={24} />
      </div>
    </div>
  )
}

export default EventItem
