import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
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
  Typography,
} from '@mui/material'
import { useAddress } from '@thirdweb-dev/react'
import CoverImg from 'assets/cover.jpeg'
import { MainLayout } from 'components/layout'
import { client } from 'lib/sanityClient'
import { Collection, NextPageWithLayout, User } from 'models'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { BsFillShareFill } from 'react-icons/bs'
import { FiMoreHorizontal } from 'react-icons/fi'
import { sliceAddress } from 'utils'
import moment from 'moment'
import { BiFilter } from 'react-icons/bi'
import { GrGrid } from 'react-icons/gr'
import { RiLayoutGridLine } from 'react-icons/ri'
import { AiOutlineSearch } from 'react-icons/ai'
import { CollapseOutline } from 'components/common'
import NFTCard from 'components/NFTCard'

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

const AccountPage: NextPageWithLayout = () => {
  const address = useAddress()
  const [userInfo, setUserInfo] = useState<User>()
  const [isLoadingInfo, setIsLoadingInfo] = useState(false)
  const [tabValue, setTabValue] = useState<TabType>('items')
  const [isLoadingNFTs, setIsLoadingNFTs] = useState(false)
  const [collection, setCollection] = useState<Collection>()

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabType) => {
    setTabValue(newValue)
  }

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
              <ButtonGroup
                disableRipple
                variant="outlined"
                aria-label="outlined button group"
                sx={{
                  background: '#303339',
                  borderColor: 'white',
                  borderRadius: '0.8rem',
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
                <div className="flex flex-wrap">
                  {/* {isLoadingNFTs
                  ? [1, 2].map((x) => <NFTCardSkeleton key={x} />)
                  : nfts.map((nftItem: any, id: number) => (
                      <NFTCard
                        key={id}
                        nftItem={nftItem}
                        title={collection?.title || ''}
                        listings={listings}
                        collectionId={collectionId as string}
                      />
                    ))} */}
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
  <div className="border border-slate-600 shadow rounded-md w-[318px] h-[428px] mx-5 my-6">
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-3">
        <div className="h-72 bg-slate-700 rounded"></div>
        <div className="h-4 bg-slate-700 rounded"></div>
        <div className="h-5 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
)

AccountPage.Layout = MainLayout

export default AccountPage
