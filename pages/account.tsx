import { Tooltip } from '@mui/material'
import { useAddress } from '@thirdweb-dev/react'
import CoverImg from 'assets/cover.jpeg'
import { MainLayout } from 'components/layout'
import { client } from 'lib/sanityClient'
import { NextPageWithLayout, User } from 'models'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { BsFillShareFill } from 'react-icons/bs'
import { FiMoreHorizontal } from 'react-icons/fi'
import { sliceAddress } from 'utils'
import moment from 'moment'

const AccountPage: NextPageWithLayout = () => {
  const address = useAddress()
  const [userInfo, setUserInfo] = useState<User>()
  const [isLoadingInfo, setIsLoadingInfo] = useState(false)

  const fetchUserData = useCallback(
    async (address: string, sanityClient = client) => {
      const query = `*[_type == "users" && walletAddress == "${address}"] {
        userName,
        walletAddress,
        profileImage,
        bannerImage,
        igHandle,
        createdAt
    }`

      try {
        setIsLoadingInfo(true)
        const data: User[] = await sanityClient.fetch(query)
        console.log(data)
        setUserInfo(data[0])
        setIsLoadingInfo(false)
      } catch (error) {
        setIsLoadingInfo(false)
        console.log(error)
      }
    },
    []
  )

  useEffect(() => {
    address && fetchUserData(address)
  }, [address, fetchUserData])

  return (
    <div>
      <Image
        src={CoverImg}
        alt=""
        layout="responsive"
        height={500}
        className="object-cover object-center"
      />
      <div className="absolute">
        <img
          className="rounded-full mt-[-8rem] mx-16"
          src={
            userInfo?.profileImage ||
            'https://storage.googleapis.com/opensea-static/opensea-profile/22.png'
          }
          alt=""
        />
      </div>
      <div className="mx-16 mt-[2rem] text-white space-y-1">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">{userInfo?.userName}</div>
          <div className="flex gap-4">
            <div>
              <BsFillShareFill />
            </div>
            <div>
              <FiMoreHorizontal />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Tooltip title="Copy" placement="top">
            <div className="flex cursor-pointer">
              <img
                src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                alt="eth"
                className="h-5 mr-2"
              />
              {sliceAddress(address)}
            </div>
          </Tooltip>
          <div className="text-grey1">
            Joined {moment(userInfo?.createdAt).format('MMM Do YYYY')}
          </div>
        </div>
      </div>
    </div>
  )
}

AccountPage.Layout = MainLayout

export default AccountPage
