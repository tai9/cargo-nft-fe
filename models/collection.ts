import { User } from './user'

export type Collection = {
  allOwners: User[]
  bannerImageUrl: string
  contractAddress: string
  creator: string
  description: string
  floorPrice: number
  imageUrl: string
  title: string
  volumeTraded: number
  _id: string
  _createdAt: string
  _updatedAt: string
}

export const getAllcollectionQuery = `*[_type == "marketItems"] {
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
}`
