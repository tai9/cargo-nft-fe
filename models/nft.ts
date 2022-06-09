import { NFTMetadata } from '@thirdweb-dev/sdk'
import { Collection } from 'models'
import { User } from './user'

export type NFTItem = {
  _id: string
  _createdAt: string
  _updatedAt: string
  metadata: NFTMetadata
  collection?: Collection
  owner?: User
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

export const getNFTsByCollectionIdQuery = (
  contractAddress: string
) => `*[_type == "nfts" && collection->contractAddress == "${contractAddress}" ] {
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
    "owner":owner->
 }`

export const getAllNFTQuery = `*[_type == "nfts" ] {
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
