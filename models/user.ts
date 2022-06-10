export type User = {
  _id: string
  _createdAt: string
  _updatedAt: string
  userName: string
  walletAddress: string
  createdAt: string
  bannerImage?: string
  igHandle?: string
  profileImage?: string
}

export const getUserQuery = (walletAddress?: string) => `*[_type == "users" ${
  walletAddress ? `&& walletAddress == "${walletAddress}` : ''
}"] {
  _id,
  _createdAt,
  _updatedAt,
  userName,
  walletAddress,
  profileImage,
  bannerImage,
  igHandle,
  createdAt
}`
