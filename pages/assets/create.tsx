import {
  Button,
  Container,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { Dropzone, IconBox, Input, Modal } from 'components/common'
import { NormalLayout } from 'components/layout'
import { Collection, NextPageWithLayout } from 'models'
import React, {
  FormEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { client } from 'lib/sanityClient'
import axios from 'axios'
import { useAddress, useNFTCollection } from '@thirdweb-dev/react'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { FaInstagram, FaFacebookSquare, FaTwitter } from 'react-icons/fa'
import { IoLinkSharp } from 'react-icons/io5'
import Image from 'next/image'
import { createReadStream } from 'fs'
import { useRouter } from 'next/router'

type NFTCreate = {
  name: string
  image?: any
  description?: string
  collectionId: string
  supply: number
  blockchain?: string
  preview?: string
}

const CreatePage: NextPageWithLayout = () => {
  const router = useRouter()

  const [collections, setCollections] = useState<Collection[]>([])
  const [loadingCollection, setLoadingCollection] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [nftData, setNftData] = useState<Partial<NFTCreate>>({
    supply: 1,
    blockchain: 'rinkeby',
  })

  const address = useAddress()
  const marketplace = useNFTCollection(nftData.collectionId)

  useEffect(() => {
    if (!address) {
      router.replace('/')
    }
  }, [address, router])

  const fetchCollectionData = useCallback(async (sanityClient = client) => {
    const query = `*[_type == "marketItems"] {
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
      setLoadingCollection(true)
      const collectionData: Collection[] = await sanityClient.fetch(query)
      setLoadingCollection(false)
      setCollections(collectionData)
    } catch (error) {
      setLoadingCollection(false)
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchCollectionData()
  }, [fetchCollectionData])

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    setNftData({
      ...nftData,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleColectionChange = (event: SelectChangeEvent) => {
    setNftData({
      ...nftData,
      collectionId: event.target.value,
    })
  }

  const handleCreateNft = async (event: SyntheticEvent) => {
    event.preventDefault()
    console.log(nftData, address, '🔫')
    // if (!marketplace) return

    // try {
    //   const imageAsset = await client.assets.upload('image', nftData.image)
    //   console.log(imageAsset)
    //   setNftData({
    //     ...nftData,
    //     preview: imageAsset.url,
    //   })
    //   const userDoc = {
    //     _type: 'nfts',
    //     owner: {
    //       _type: 'reference',
    //       _ref: address,
    //     },
    //     // collection: {
    //     //   _type: 'reference',
    //     //   _ref: '0x4f98e821CcE773AE69439B0ED0F4a55e63F7bDaC',
    //     // },
    //     metadata: {
    //       name: nftData.name,
    //       description: nftData.description,
    //       image: {
    //         _type: 'image',
    //         asset: {
    //           _type: 'reference',
    //           _ref: imageAsset._id,
    //         },
    //       },
    //     },
    //   }

    //   const result = await client.create(userDoc)
    //   console.log(result)
    //   setOpenModal(true)
    // } catch (error) {
    //   console.log(error)
    // }

    // const signature = await marketplace.signature.generate({
    //   metadata: {
    //     name: nftData.name || '',
    //     description: nftData.description || '',
    //     image: nftData.image,
    //   },
    // })

    // const tx = await marketplace.signature.mint(signature)

    // const res = await axios.post('/api/generate', {
    //   name: nftData.name,
    //   description: nftData.description,
    //   contractAddress: nftData.collectionId,
    //   address: address,
    //   image:
    //     'https://lh3.googleusercontent.com/RX40rLZkK_eKK_F3IXkoStHR9tth47Q_3QhKGu_cizzesH0U_ELbJ3X8IoW7iJXPNRnvJVF5B4jLKSm81u38rYfsKLLVz6WSbczsoQ=s168',
    // })

    // const { signature, tx } = res.data
    // console.log(signature, tx)

    // const data= await collection.signature.mint(signature)

    // alert('NFT Minted successfully!')
  }

  const handleUploadFile = (files: any) => {
    files?.length > 0 &&
      setNftData({
        ...nftData,
        image: files[0],
      })
  }

  return (
    <>
      <Container maxWidth="md">
        <form
          className="flex flex-col gap-6 text-white my-12"
          onSubmit={handleCreateNft}
        >
          <div className="text-3xl font-bold">Create New Item</div>
          <div className="text-xs text-grey1">
            <span className="text-red-500">* </span>
            Required fields
          </div>

          <div className="space-y-2">
            <div className="font-bold">Image, Video, Audio, or 3D Model</div>
            <div className="text-xs text-grey1">
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
              OGG, GLB, GLTF. Max size: 100 MB
            </div>
            <Dropzone onChange={handleUploadFile} />
          </div>

          <div className="space-y-2">
            <div className="font-bold">
              Name<span className="text-red-500"> *</span>
            </div>
            <Input
              name="name"
              onChange={handleInputChange}
              placeholder="Item name"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="font-bold">Description</div>
            <div className="text-xs text-grey1">
              The description will be included on the item&#39;s detail page
              underneath its image. Markdown syntax is supported.
            </div>
            <Input
              name="description"
              onChange={handleInputChange}
              placeholder="Provide a detailed description of your item."
            />
          </div>

          <div className="space-y-2">
            <div className="font-bold">
              Collection<span className="text-red-500"> *</span>
            </div>
            <div className="text-xs text-grey1">
              This is the collection where your item will appear.
            </div>
            <FormControl fullWidth>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{
                  background: '#303339',
                  color: 'white',
                  fontWeight: 'bold',
                  height: '100%',
                  borderColor: '#151c22',
                  borderRadius: '0.8rem',
                }}
                disabled={loadingCollection}
                defaultValue=""
                onChange={handleColectionChange}
              >
                {collections.map((collection, idx) => (
                  <MenuItem key={idx} value={collection.contractAddress}>
                    <div className="flex gap-2 items-center">
                      <img
                        className="rounded-full"
                        src={collection.imageUrl}
                        alt=""
                        width={24}
                        height={24}
                      />
                      <div>{collection.title}</div>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="space-y-2">
            <div className="font-bold">Supply</div>
            <div className="text-xs text-grey1">
              The number of items that can be minted. No gas cost to you!
            </div>
            <Input value={1} disabled />
          </div>

          <div className="space-y-2">
            <div className="font-bold">Blockchain</div>
            <FormControl fullWidth>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={1}
                sx={{
                  background: '#303339',
                  color: 'white',
                  fontWeight: 'bold',
                  height: '100%',
                  borderColor: '#151c22',
                  borderRadius: '0.8rem',
                }}
              >
                <MenuItem value={1}>
                  <div className="flex gap-2 items-center">
                    <img
                      src="https://testnets.opensea.io/static/images/logos/ethereum.svg"
                      alt=""
                    />
                    <div>Rinkeby</div>
                  </div>
                </MenuItem>
                <MenuItem value={2}>
                  <div className="flex gap-2 items-center">
                    <img
                      src="https://testnets.opensea.io/static/images/logos/polygon.svg"
                      alt=""
                    />
                    <div>Mumbai</div>
                  </div>
                </MenuItem>
                <MenuItem value={3}>
                  <div className="flex gap-2 items-center">
                    <img
                      src="https://testnets.opensea.io/static/images/logos/klaytn.svg"
                      alt=""
                    />
                    <div>Baobab</div>
                  </div>
                </MenuItem>
                <MenuItem value={4}>
                  <div className="flex gap-2 items-center">
                    <img
                      className="rounded-full"
                      src="https://testnets.opensea.io/static/images/logos/bsc.png"
                      alt=""
                    />
                    <div>Bsc Testnet</div>
                  </div>
                </MenuItem>
                <MenuItem value={5}>
                  <div className="flex gap-2 items-center">
                    <img
                      src="https://testnets.opensea.io/static/images/logos/solana.svg"
                      alt=""
                    />
                    <div>Solana Devnet</div>
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="space-y-2">
            <div className="font-bold">Freeze metadata</div>
            <div className="text-xs text-grey1">
              Freezing your metadata will allow you to permanently lock and
              store all of this item&#39;s content in decentralized file
              storage.
            </div>
            <Input
              value="To freeze your metadata, you must create your item first."
              disabled
            />
          </div>

          <Divider
            sx={{
              marginY: 2,
            }}
          />

          <Button
            type="submit"
            sx={{
              width: 'fit-content',
              fontWeight: 'bold',
              my: 2,
            }}
            variant="contained"
          >
            Create
          </Button>
        </form>
      </Container>
      <Modal
        className="max-w-lg"
        title={`You created ${nftData.name}!`}
        open={openModal}
        handleClose={() => setOpenModal(false)}
      >
        <div className="flex flex-col gap-20 justify-center text-center items-center">
          <div className="font-semibold text-grey1">
            You just created {nftData.name}.
          </div>
          <img
            className="object-cover rounded-xl"
            src={nftData.preview}
            alt=""
            width={200}
          />
          <div className="flex flex-col gap-4">
            <div className="font-semibold text-grey1">SHARE</div>
            <div className="flex gap-3">
              <IconBox>
                <FaTwitter fontSize={22} />
              </IconBox>
              <IconBox>
                <FaInstagram fontSize={22} />
              </IconBox>
              <IconBox>
                <FaFacebookSquare fontSize={22} />
              </IconBox>
              <IconBox>
                <IoLinkSharp fontSize={22} />
              </IconBox>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

CreatePage.Layout = NormalLayout

export default CreatePage
