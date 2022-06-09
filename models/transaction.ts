import { NFTItem } from './nft'
import { User } from './user'

export enum ETransactionEvent {
  MINTED = 'Minted',
  LIST = 'List',
  TRANSAFER = 'Transfer',
}

export type Transaction = {
  _id: string
  _createdAt: string
  _updatedAt: string
  confirmations: number
  price: number
  status: number
  type: number
  contractAddress: string
  eventType: string
  from: string
  id: string
  to: string
  transactionHash: string
  nft?: NFTItem
  owner?: User
}

export const getTransactionQuery = (
  nftId?: string
) => `*[_type == "transactions" ${nftId ? `&& nft._ref == "${nftId}"` : ''} ] {
  _createdAt,
  _id,
  _updatedAt,
  confirmations,
  contractAddress,
  eventType,
  from,
  to,
  id,
  price,
  status,
  transactionHash,
  type,
  "nft":nft->{
     _id,
   _createdAt,
   _updatedAt,
   "metadata":metadata{
        description,
        name,
        uri,
        id,
        "image":image.asset->url
   },
   "collection": collection->{
        _id,
        _createdAt,
        _updatedAt,
        "imageUrl": profileImage.asset->url,
        "bannerImageUrl": bannerImage.asset->url,
        volumeTraded,
        createdBy,
        contractAddress,
        "creator": createdBy->userName,
        title, floorPrice,
        "allOwners": owners[]->,
        description
    },
  },
  "owner":owner->
}`
