import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import openseaLogo from 'assets/opensea.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsGrid3X3 } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { MdLogout, MdOutlineAccountBalanceWallet } from 'react-icons/md'
import { toast } from 'react-toastify'

const style = {
  wrapper: `bg-darkBlue w-screen px-[1.2rem] py-[0.8rem] flex `,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-darkGrey rounded-[0.8rem] hover:bg-lightGrey`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: ` flex items-center justify-end`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
}

export const Header = () => {
  const connectWithMetamask = useMetamask()
  const disconnect = useDisconnect()
  const addressConnected = useAddress()
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleOpenMenu = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!addressConnected) {
      const res: any = await connectWithMetamask()
      if (res.data) {
        router.push(`/${res.data.account}`)
        return
      }
      return
    }
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDisconnectWallet = () => {
    disconnect()
    handleClose()
    toast.success('Logout successful!')
  }

  const handleNavigateCreateNft = async () => {
    if (addressConnected) {
      router.push('/assets/create')
      return
    }

    const data = await connectWithMetamask()
    if (data.error) {
      toast.error('Cannot connect to your wallet.')
      return
    }

    router.push('/assets/create')
  }

  return (
    <div className="sticky top-0 z-40 w-full min-h-fit">
      <div className={style.wrapper}>
        <Link href="/">
          <div className={style.logoContainer}>
            <Image src={openseaLogo} height={40} width={40} alt="" />
            <div className={style.logoText}>Cargo</div>
          </div>
        </Link>
        <div className={style.searchBar}>
          <div className={style.searchIcon}>
            <AiOutlineSearch />
          </div>
          <input
            className={style.searchInput}
            placeholder="Search items, collections, and accounts"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                router.push(`/${search}`)
              }
            }}
          />
        </div>
        <div className={style.headerItems}>
          <Link href="/collections" passHref>
            <div className={style.headerItem}> Collections </div>
          </Link>
          <div className={style.headerItem}> Activity </div>
          <a
            href="https://support.opensea.io/hc/en-us"
            target="_blank"
            rel="noreferrer"
            className={style.headerItem}
          >
            Resources
          </a>
          <div className={style.headerItem} onClick={handleNavigateCreateNft}>
            Create
          </div>
          <button className={style.headerIcon} onClick={handleOpenMenu}>
            <CgProfile />
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <CgProfile fontSize={20} />
              </ListItemIcon>
              <ListItemText>
                <Link href={`/${addressConnected}`}>
                  <a>Profile</a>
                </Link>
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <BsGrid3X3 fontSize={20} />
              </ListItemIcon>
              <ListItemText>
                <Link href="/my-collections">
                  <a>My Collections</a>
                </Link>
              </ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleDisconnectWallet}>
              <ListItemIcon>
                <MdLogout fontSize={20} />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
          <div className={style.headerIcon}>
            <MdOutlineAccountBalanceWallet />
          </div>
        </div>
      </div>
    </div>
  )
}
