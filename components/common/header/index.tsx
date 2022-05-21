import { useDisconnect } from '@thirdweb-dev/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import openseaLogo from 'assets/opensea.png'

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
  const disconnect = useDisconnect()
  return (
    <div className="sticky top-0 z-40 w-full min-h-fit">
      <div className={style.wrapper}>
        <Link href="/">
          <div className={style.logoContainer}>
            <Image src={openseaLogo} height={40} width={40} alt="" />
            <div className={style.logoText}>Opensea</div>
          </div>
        </Link>
        <div className={style.searchBar}>
          <div className={style.searchIcon}>
            <AiOutlineSearch />
          </div>
          <input
            className={style.searchInput}
            placeholder="Search items, collections, and accounts"
          />
        </div>
        <div className={style.headerItems}>
          <Link href="/collections/0x4f98e821CcE773AE69439B0ED0F4a55e63F7bDaC">
            <div className={style.headerItem}> Collections </div>
          </Link>
          <div className={style.headerItem}> Stats </div>
          <div className={style.headerItem}> Resources </div>
          <div className={style.headerItem}> Create </div>
          <div className={style.headerIcon} onClick={disconnect}>
            <CgProfile />
          </div>
          <div className={style.headerIcon}>
            <MdOutlineAccountBalanceWallet />
          </div>
        </div>
      </div>
    </div>
  )
}
