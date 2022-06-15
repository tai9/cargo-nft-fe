import { User } from './user'

export type Collection = {
  allOwners: User[]
  bannerImageUrl: string
  bannerImageId?: string
  profileImageId?: string
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

export const getAllcollectionQuery = `*[_type == "marketItems"] | order(_updatedAt desc) {
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

export const getCollectionByIdQuery = (
  contractAddress: string
) => `*[_type == "marketItems" && contractAddress == "${contractAddress}" ] | order(_updatedAt desc) {
  "profileImageId": profileImage.asset->_id,
  "imageUrl": profileImage.asset->url,
  "bannerImageId": bannerImage.asset->_id,
  "bannerImageUrl": bannerImage.asset->url,
  volumeTraded,
  createdBy,
  contractAddress,
  "creator": createdBy->userName,
  title, floorPrice,
  "allOwners": owners[]->,
  description,
  _id,
  _createdAt,
  _updatedAt
}`
