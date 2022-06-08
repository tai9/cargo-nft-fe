import { NFTMetadata } from '@thirdweb-dev/sdk'
import { Collection } from 'models'

export type NFTItem = {
  _id: string
  _createdAt: string
  _updatedAt: string
  metadata: NFTMetadata
  collection?: Collection
}

export const getOwnNFTsQuery = (
  walletAddress: string
) => `*[_type == "nfts" && owner._ref == "${walletAddress}" ] {
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

 }`
