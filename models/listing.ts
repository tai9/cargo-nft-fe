import { NFTItem } from './nft'
import { User } from './user'

export type Listing = {
  _id: string
  _createdAt: string
  _updatedAt: string
  assetContractAddress: string
  buyoutPricePerToken: string
  currencyContractAddress: string
  listingDurationInSeconds: number
  quantity: string
  startTimestamp: string
  listingId: string
  nft?: NFTItem
  owner?: User
}

export const getListingQuery = (
  nftId?: string
) => `*[_type == "listings" && active == true ${
  nftId ? `&& nft._ref == "${nftId}"` : ''
} ] {
  _createdAt,
  _id,
  _updatedAt,
  assetContractAddress,
  buyoutPricePerToken,
  currencyContractAddress,
  listingDurationInSeconds,
  quantity,
  startTimestamp,
  listingId,
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
  },
  "owner":owner->
}`
