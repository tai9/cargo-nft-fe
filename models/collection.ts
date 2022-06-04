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
}
