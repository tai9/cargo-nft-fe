import { useMarketplace, useNFTCollection } from '@thirdweb-dev/react'
import { MainLayout } from 'components/layout'
import { Collection, NextPageWithLayout } from 'models'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineSearch,
} from 'react-icons/ai'
import { CgWebsite } from 'react-icons/cg'
import { HiDotsVertical } from 'react-icons/hi'
import { BiFilter } from 'react-icons/bi'
import { RiLayoutGridLine } from 'react-icons/ri'
import { GrGrid } from 'react-icons/gr'
import NFTCard from 'components/NFTCard'
import { client } from 'lib/sanityClient'
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem] z-10`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2 cursor-pointer`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl max-w-3xl flex-wrap mt-4 text-center`,

  searchBar: `flex flex-1 w-max-[520px] items-center bg-grey2 rounded-[0.8rem] hover:bg-darkGrey border border-darkLine`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `w-full border-0 bg-transparent outline-0 ring-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
}

interface TabPanelProps {
  children?: React.ReactNode
  index: TabType
  value: TabType
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  )
}

function a11yProps(index: TabType) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    value: index,
  }
}

type TabType = 'items' | 'activity'

const Collection: NextPageWithLayout = () => {
  const router = useRouter()

  const { collectionId } = router.query
  const [collection, setCollection] = useState<Collection>()
  const [nfts, setNfts] = useState<any>([])
  const [listings, setListings] = useState<any>([])
  const [tabValue, setTabValue] = useState<TabType>('items')

  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  )
  const nftCollection = useNFTCollection(collectionId as string)

  useEffect(() => {
    getListings()
    getNFTCollection()
  }, [])

  const getListings = async () => {
    if (!marketplace) return
    try {
      const list = await marketplace.getActiveListings()
      setListings(list)
    } catch (err) {
      console.error(err)
      alert('Error fetching listings')
    }
  }

  const getNFTCollection = async () => {
    if (!nftCollection) return
    try {
      const nfts = await nftCollection.getAll()
      setNfts(nfts)
    } catch (err) {
      console.error(err)
      alert('Error fetching nfts')
    }
  }

  const fetchCollectionData = useCallback(
    async (sanityClient = client) => {
      const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
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

      try {
        const collectionData: Collection[] = await sanityClient.fetch(query)
        setCollection(collectionData[0])
      } catch (error) {
        console.log(error)
      }
    },
    [collectionId]
  )

  useEffect(() => {
    fetchCollectionData()
  }, [collectionId, fetchCollectionData])

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabType) => {
    setTabValue(newValue)
  }

  return (
    <div className="overflow-hidden">
      <div className={style.bannerImageContainer}>
        {collection?.bannerImageUrl ? (
          <img
            className={style.bannerImage}
            src={collection?.bannerImageUrl}
            alt="banner"
          />
        ) : (
          <div className="shadow rounded-md p-4 h-full w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-72 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          {collection?.imageUrl ? (
            <img
              className={style.profileImg}
              src={collection?.imageUrl}
              alt="profile image"
            />
          ) : (
            <div className="animate-pulse rounded-full border-2 border-[#202225] mt-[-4rem]">
              <div className="h-40 w-40 bg-slate-700 rounded-full"></div>
            </div>
          )}
        </div>
        <div className={style.endRow}>
          <div className={style.socialIconsContainer}>
            <div className={style.socialIconsWrapper}>
              <div className={style.socialIconsContent}>
                <div className={style.socialIcon}>
                  <CgWebsite />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineInstagram />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineTwitter />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <HiDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.title}>{collection?.title}</div>
        </div>
        <div className={style.midRow}>
          <div className={style.createdBy}>
            Created by{' '}
            <span className="text-[#2081e2]">{collection?.creator}</span>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{nfts.length}</div>
              <div className={style.statName}>items</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {collection?.allOwners ? collection.allOwners.length : ''}
              </div>
              <div className={style.statName}>owners</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.floorPrice}
              </div>
              <div className={style.statName}>floor price</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.volumeTraded}.5K
              </div>
              <div className={style.statName}>volume traded</div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.description}>{collection?.description}</div>
        </div>
      </div>
      <div className="px-10">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Items" disableRipple {...a11yProps('items')} />
            <Tab label="Activity" disableRipple {...a11yProps('activity')} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index="items">
          <div className="flex gap-4 mt-6">
            <IconButton>
              <BiFilter fontSize={28} color="white" />
            </IconButton>
            <div className={style.searchBar}>
              <div className={style.searchIcon}>
                <AiOutlineSearch />
              </div>
              <input
                className={style.searchInput}
                placeholder="Search by name"
              />
            </div>
            <FormControl>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={10}
                sx={{
                  background: '#303339',
                  color: 'white',
                  fontWeight: 'bold',
                  height: '100%',
                  borderColor: '#151c22',
                }}
              >
                <MenuItem value={10}>Price: Low to High</MenuItem>
                <MenuItem value={20}>Price: High to Low</MenuItem>
                <MenuItem value={30}>Recently Listed</MenuItem>
                <MenuItem value={40}>Recently Created</MenuItem>
              </Select>
            </FormControl>
            <ButtonGroup
              disableRipple
              variant="outlined"
              aria-label="outlined button group"
              sx={{
                background: '#303339',
                borderColor: 'white',
              }}
            >
              <Button>
                <RiLayoutGridLine fontSize={24} color="white" />
              </Button>
              <Button>
                <GrGrid fontSize={20} color="white" />
              </Button>
            </ButtonGroup>
          </div>
          <div className="flex flex-wrap">
            {nfts.map((nftItem: any, id: number) => (
              <NFTCard
                key={id}
                nftItem={nftItem}
                title={collection?.title || ''}
                listings={listings}
                collectionId={collectionId as string}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel value={tabValue} index="activity">
          No item to display
        </TabPanel>
      </div>
    </div>
  )
}

Collection.Layout = MainLayout

export default Collection
