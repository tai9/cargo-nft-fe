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
  createdBy?: string
}

export const getOwnNFTsQuery = (
  walletAddress: string
) => `*[_type == "nfts" && owner._ref == "${walletAddress}" ] {
    _id,
   _createdAt,
   _updatedAt,
   "createdBy":createdBy->userName,
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
  contractAddress?: string,
  search?: string
) => `*[_type == "nfts" ${search ? `&& metadata.name match "${search}*"` : ''}
${
  contractAddress
    ? ` && collection->contractAddress == "${contractAddress}"`
    : ''
}
] | order(_updatedAt desc) {
    _id,
   _createdAt,
   _updatedAt,
    "createdBy":createdBy->userName,
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

export const getAllNFTQuery = `*[_type == "nfts" ] | order(_updatedAt desc) {
    _id,
   _createdAt,
   _updatedAt,
   "createdBy":createdBy->userName,
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

export const getSingleNFTQuery = (
  nftId: string
) => `*[_type == "nfts" && _id == "${nftId}" ] {
    _id,
   _createdAt,
   _updatedAt,
    "createdBy":createdBy->userName,
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
