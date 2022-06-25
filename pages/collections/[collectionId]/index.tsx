import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tab,
  Tabs,
} from '@mui/material'
import ActivityTable from 'components/activity/ActivityTable'
import { CollapseOutline } from 'components/common'
import { MainLayout } from 'components/layout'
import NFTCard from 'components/NFTCard'
import { client } from 'lib/sanityClient'
import {
  Collection,
  getAllcollectionQuery,
  getCollectionByIdQuery,
  getCollectionTransactionQuery,
  getListingQuery,
  getNFTsByCollectionIdQuery,
  Listing,
  NextPageWithLayout,
  NFTItem,
  Transaction,
} from 'models'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import {
  AiOutlineInstagram,
  AiOutlineSearch,
  AiOutlineTwitter,
} from 'react-icons/ai'
import { BiFilter } from 'react-icons/bi'
import { CgWebsite } from 'react-icons/cg'
import { MdOutlineGridOn } from 'react-icons/md'
import { HiDotsVertical } from 'react-icons/hi'
import { RiLayoutGridLine } from 'react-icons/ri'
import { useDebounce } from 'use-debounce'

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
      {value === index && <div>{children}</div>}
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

const Collection: NextPageWithLayout = ({ collection }: any) => {
  const router = useRouter()

  const { collectionId } = router.query
  const [nfts, setNfts] = useState<NFTItem[]>([])
  const [listings, setListings] = useState<Listing[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [tabValue, setTabValue] = useState<TabType>('items')
  const [isLoadingNFTs, setIsLoadingNFTs] = useState(false)

  const [searchValue, setSearchValue] = useState('')
  const [searchDebounced] = useDebounce(searchValue, 1000)

  const fetchListingsData = useCallback(async () => {
    try {
      const listingData = await client.fetch(getListingQuery())
      setListings(listingData)
    } catch (err) {
      console.error(err)
    }
  }, [])

  const fetchTransactionData = useCallback(async (collectionId: string) => {
    try {
      const transactionData = await client.fetch(
        getCollectionTransactionQuery(collectionId)
      )
      setTransactions(transactionData)
    } catch (err) {
      console.error(err)
    }
  }, [])

  const fetchNFTsData = useCallback(
    async (collectionId: string) => {
      try {
        setIsLoadingNFTs(true)

        const nftData = await client.fetch(
          getNFTsByCollectionIdQuery(collectionId, searchDebounced)
        )
        setNfts(nftData)
        setIsLoadingNFTs(false)
      } catch (err) {
        console.error(err)
        setIsLoadingNFTs(false)
      }
    },
    [searchDebounced]
  )

  useEffect(() => {
    fetchNFTsData(collectionId as string)
    fetchListingsData()
    fetchTransactionData(collectionId as string)
  }, [collectionId, fetchNFTsData, fetchListingsData, fetchTransactionData])

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabType) => {
    setTabValue(newValue)
  }

  const handleSearchNfts = (e: any) => {
    setSearchValue(e.target.value)
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
            <Link href={`/${collection?.createdBy?._ref}`} passHref>
              <a className="text-[#2081e2]">{collection?.creator}</a>
            </Link>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{nfts.length}</div>
              <div className={style.statName}>items</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>1</div>
              <div className={style.statName}>owners</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {listings.length > 0 ? (
                  <>
                    <img
                      src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                      alt="eth"
                      className={style.ethLogo}
                    />
                    {Math.min(
                      ...listings.map((item) => +item.buyoutPricePerToken)
                    )}
                  </>
                ) : (
                  '---'
                )}
              </div>
              <div className={style.statName}>floor price</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {listings.length > 0 ? (
                  <>
                    <img
                      src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                      alt="eth"
                      className={style.ethLogo}
                    />
                    {listings.reduce(
                      (prev, current) => +prev + +current.buyoutPricePerToken,
                      +listings[0].buyoutPricePerToken
                    )}
                  </>
                ) : (
                  '---'
                )}
              </div>
              <div className={style.statName}>total volume</div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.description}>{collection?.description}</div>
        </div>
      </div>
      <div className="px-10 pb-10">
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
                onChange={handleSearchNfts}
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

            <div className="btn-group">
              <button className="btn border-2">
                <RiLayoutGridLine fontSize={24} color="white" />
              </button>
              <button className="btn border-2 border-l-0 opacity-60">
                <MdOutlineGridOn fontSize={22} color="white" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-6 mt-6">
            <div className="col-span-1">
              <CollapseOutline title="Status">
                <Stack>
                  <FormControl variant="standard" fullWidth>
                    <FormGroup>
                      <FormControlLabel
                        sx={{
                          justifyContent: 'space-between',
                          ml: 0,
                        }}
                        control={<Checkbox name="buynow" />}
                        label="Buy now"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        sx={{
                          justifyContent: 'space-between',
                          ml: 0,
                        }}
                        control={<Checkbox name="auction" />}
                        label="On Auction"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        sx={{
                          justifyContent: 'space-between',
                          ml: 0,
                        }}
                        control={<Checkbox name="buyWithCard" />}
                        label="Buy with Card"
                        labelPlacement="start"
                      />
                    </FormGroup>
                  </FormControl>
                </Stack>
              </CollapseOutline>
              <Divider
                sx={{
                  marginY: 2,
                  background: 'grey',
                }}
              />
              <CollapseOutline title="Item quantity">
                <Stack>
                  <FormControl variant="standard" fullWidth>
                    <RadioGroup defaultValue="singleItems">
                      <FormControlLabel
                        sx={{
                          justifyContent: 'space-between',
                          ml: 0,
                        }}
                        control={<Radio name="buynow" />}
                        label="All items"
                        labelPlacement="start"
                        value="allItems"
                      />
                      <FormControlLabel
                        sx={{
                          justifyContent: 'space-between',
                          ml: 0,
                        }}
                        control={<Radio name="auction" />}
                        label="Single items"
                        labelPlacement="start"
                        value="singleItems"
                      />
                      <FormControlLabel
                        sx={{
                          justifyContent: 'space-between',
                          ml: 0,
                        }}
                        control={<Radio name="buyWithCard" />}
                        label="Bundles"
                        labelPlacement="start"
                        value="bundles"
                      />
                    </RadioGroup>
                  </FormControl>
                </Stack>
              </CollapseOutline>
              <Divider
                sx={{
                  marginY: 2,
                  background: 'grey',
                }}
              />
              <CollapseOutline title="On sale in">
                <Stack>
                  <FormControl variant="standard" fullWidth>
                    <FormGroup>
                      <FormControlLabel
                        sx={{
                          justifyContent: 'space-between',
                          ml: 0,
                        }}
                        control={<Checkbox name="sale" defaultChecked />}
                        label="ETH"
                        labelPlacement="start"
                      />
                    </FormGroup>
                  </FormControl>
                </Stack>
              </CollapseOutline>
            </div>
            <div className="col-span-5">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4">
                {isLoadingNFTs ? (
                  [1, 2, 3, 4].map((x) => <NFTCardSkeleton key={x} />)
                ) : nfts.length > 0 ? (
                  nfts.map((nft) => {
                    return (
                      <NFTCard
                        key={nft._id}
                        nftItem={nft}
                        title={collection?.title || ''}
                        listing={listings.find((l) => l.nft?._id === nft._id)}
                        collectionId={collectionId as string}
                      />
                    )
                  })
                ) : (
                  <div className="text-textGrey text-lg mt-6 ml-8">
                    No NFTs yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel value={tabValue} index="activity">
          <div className="flex gap-4 mt-6 justify-between">
            <IconButton>
              <BiFilter fontSize={28} color="white" />
            </IconButton>

            <FormControl>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={50}
                sx={{
                  background: '#303339',
                  color: 'white',
                  fontWeight: 'bold',
                  height: '100%',
                  borderColor: '#151c22',
                }}
              >
                <MenuItem value={10}>Last 7 Days</MenuItem>
                <MenuItem value={20}>Last 14 Days</MenuItem>
                <MenuItem value={30}>Last 30 Days</MenuItem>
                <MenuItem value={40}>Last 60 Days</MenuItem>
                <MenuItem value={50}>Last 90 Days</MenuItem>
                <MenuItem value={60}>Last Year</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="grid grid-cols-6 gap-6 mt-6">
            <div className="col-span-1">
              <CollapseOutline title="Event Type">
                <Stack>
                  <FormControl variant="standard" fullWidth>
                    <FormGroup>
                      <FormControlLabel
                        sx={{
                          justifyContent: 'space-between',
                          ml: 0,
                        }}
                        control={<Checkbox name="buynow" />}
                        label="Sales"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        sx={{
                          justifyContent: 'space-between',
                          ml: 0,
                        }}
                        control={<Checkbox name="auction" />}
                        label="Listings"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        sx={{
                          justifyContent: 'space-between',
                          ml: 0,
                        }}
                        control={<Checkbox name="buyWithCard" />}
                        label="Offers"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        sx={{
                          justifyContent: 'space-between',
                          ml: 0,
                        }}
                        control={<Checkbox name="buyWithCard" />}
                        label="Transfers"
                        labelPlacement="start"
                      />
                    </FormGroup>
                  </FormControl>
                </Stack>
              </CollapseOutline>
            </div>
            <div className="col-span-5">
              <ActivityTable transactions={transactions} />
            </div>
          </div>
        </TabPanel>
      </div>
    </div>
  )
}

const NFTCardSkeleton = () => (
  <div className="border border-slate-600 shadow rounded-md w-[280px] h-[450px] mx-5 my-6">
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-3">
        <div className="h-72 bg-slate-700 rounded"></div>
        <div className="h-4 bg-slate-700 rounded"></div>
        <div className="h-5 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
)

export async function getStaticPaths() {
  const collectionData: Collection[] = await client.fetch(getAllcollectionQuery)
  const paths = collectionData.map((col) => ({
    params: { collectionId: col._id },
  }))
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any> = async (
  context: GetStaticPropsContext
) => {
  const collectionId = context.params?.collectionId as string
  if (!collectionId) {
    return {
      notFound: true,
    }
  }

  const query = getCollectionByIdQuery(collectionId)
  const collectionData: Collection[] = await client.fetch(query)
  if (collectionData.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection: collectionData[0],
    },
  }
}

Collection.Layout = MainLayout

export default Collection
