import {
  Box,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tab,
  Tabs,
  Tooltip,
} from '@mui/material'
import CoverImg from 'assets/cover.jpeg'
import { CollapseOutline } from 'components/common'
import { NormalLayout } from 'components/layout'
import NFTCard from 'components/NFTCard'
import { client } from 'lib/sanityClient'
import {
  getListingQuery,
  getOwnNFTsQuery,
  getUserQuery,
  Listing,
  NextPageWithLayout,
  NFTItem,
  User,
} from 'models'
import moment from 'moment'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { AiOutlineCheck, AiOutlineSearch, AiTwotoneEdit } from 'react-icons/ai'
import { BiFilter } from 'react-icons/bi'
import { BsFillShareFill } from 'react-icons/bs'
import { FiMoreHorizontal } from 'react-icons/fi'
import { MdOutlineGridOn } from 'react-icons/md'
import { RiLayoutGridLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { sliceAddress } from 'utils'

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

const AccountPage: NextPageWithLayout = ({ user }: any) => {
  const router = useRouter()
  const { walletAddress } = router.query

  const [tabValue, setTabValue] = useState<TabType>('items')
  const [isLoadingNFTs, setIsLoadingNFTs] = useState(false)
  const [editingUsername, setEditingUsername] = useState(false)
  const [newUsername, setNewUsername] = useState((user as User).userName)
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

  const [nfts, setNfts] = useState<NFTItem[]>([])
  const [listings, setListings] = useState<Listing[]>([])

  const onUsernameChange = (e: any) => {
    setNewUsername(e.target.value)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabType) => {
    setTabValue(newValue)
  }

  const handleUpdateUsername = async () => {
    if (!walletAddress) return
    setIsUpdatingProfile(true)
    client
      .patch((walletAddress as string) || '')
      .set({ userName: newUsername })
      .commit()
      .then(() => {
        toast.success('Update your profile successful!')
        setIsUpdatingProfile(false)
        setEditingUsername(!editingUsername)
      })
      .catch((err) => {
        console.log(err)
        toast.error('Something went wrong')
        setIsUpdatingProfile(false)
      })
  }

  const fetchListingsData = useCallback(async () => {
    try {
      const listingData = await client.fetch(getListingQuery())
      setListings(listingData)
    } catch (err) {
      console.error(err)
    }
  }, [])

  const fetchOwnNFTs = useCallback(
    async (walletAddress: string, sanityClient = client) => {
      const query = getOwnNFTsQuery(walletAddress)

      try {
        setIsLoadingNFTs(true)
        const data: NFTItem[] = await sanityClient.fetch(query)
        setNfts(data)
        setIsLoadingNFTs(false)
      } catch (error) {
        setIsLoadingNFTs(false)
        console.log(error)
      }
    },
    []
  )

  useEffect(() => {
    fetchListingsData()
    fetchOwnNFTs(walletAddress as string)
  }, [fetchListingsData, fetchOwnNFTs, walletAddress])

  return (
    <div className="relative">
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
            user?.profileImage ||
            'https://storage.googleapis.com/opensea-static/opensea-profile/22.png'
          }
          alt=""
        />
      </div>
      <div className="mx-16 my-[2rem] text-white space-y-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="cursor-pointer">
              {isUpdatingProfile ? (
                <CircularProgress size={24} color="inherit" />
              ) : editingUsername ? (
                <AiOutlineCheck fontSize={24} onClick={handleUpdateUsername} />
              ) : (
                <AiTwotoneEdit
                  fontSize={24}
                  onClick={() => setEditingUsername(!editingUsername)}
                />
              )}
            </div>
            {editingUsername ? (
              <input
                className="bg-transparent font-bold text-2xl w-fit outline-none"
                value={newUsername || ''}
                onChange={onUsernameChange}
              />
            ) : (
              <div className="text-2xl font-bold">{newUsername}</div>
            )}
          </div>
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
              {sliceAddress(walletAddress as string)}
            </div>
          </Tooltip>
          <div className="text-grey1">
            Joined {moment(user?.createdAt).format('MMM Do YYYY')}
          </div>
        </div>

        <div>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
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
              <div className="flex flex-1 w-max-[520px] items-center bg-grey2 rounded-[0.8rem] hover:bg-darkGrey border border-darkLine">
                <div className="text-[#8a939b] mx-3 font-bold text-lg">
                  <AiOutlineSearch />
                </div>
                <input
                  className="w-full border-0 bg-transparent outline-0 ring-0 text-[#e6e8eb] placeholder:text-[#8a939b]"
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
                    borderRadius: '0.8rem',
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

            <Grid container spacing={4}>
              <Grid
                item
                xs={2}
                sx={{
                  marginTop: 3,
                }}
              >
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
              </Grid>

              <Grid item>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4">
                  {isLoadingNFTs
                    ? [1, 2, 3, 4].map((x) => <NFTCardSkeleton key={x} />)
                    : (nfts as NFTItem[]).map((nftItem, id: number) => (
                        <NFTCard
                          key={id}
                          nftItem={nftItem}
                          title={nftItem.collection?.title || ''}
                          listing={listings.find(
                            (l) => l.nft?._id === nftItem._id
                          )}
                          collectionId={nftItem.collection?.contractAddress}
                        />
                      ))}
                </div>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index="activity">
            No item to display
          </TabPanel>
        </div>
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

AccountPage.Layout = NormalLayout

export default AccountPage

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const address = context.params?.walletAddress as string
  const query = getUserQuery(address)
  const users: User[] = await client.fetch(query)

  if (users.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: users[0],
    },
  }
}
