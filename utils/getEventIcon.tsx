import { ETransactionEvent } from 'models'
import React from 'react'
import {
  MdChildFriendly,
  MdLocalOffer,
  MdOutlineTextsms,
  MdOutlineCancel,
} from 'react-icons/md'
import { BsFillCartFill } from 'react-icons/bs'
import { BiTransfer } from 'react-icons/bi'

export const getEventIcon = (eventType: ETransactionEvent) => {
  switch (eventType) {
    case ETransactionEvent.CANCEL:
      return <MdOutlineCancel />
    case ETransactionEvent.LIST:
      return <MdLocalOffer />
    case ETransactionEvent.MINTED:
      return <MdChildFriendly />
    case ETransactionEvent.OFFER:
      return <MdOutlineTextsms />
    case ETransactionEvent.SALE:
      return <BsFillCartFill />
    case ETransactionEvent.TRANSAFER:
      return <BiTransfer />

    default:
      return <MdOutlineCancel />
  }
}
