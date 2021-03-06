import {
  Container,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import CreateIcon from '@mui/icons-material/Create'

import { Dropzone, IconBox, Input, Modal } from 'components/common'
import { NormalLayout } from 'components/layout'
import {
  Collection,
  ETransactionEvent,
  getAllcollectionQuery,
  NextPageWithLayout,
} from 'models'
import React, {
  FormEvent,
  SyntheticEvent,
  useCallback,
  useContext,
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
import { CargoContext, CargoContextType } from 'context/cargoContext'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'

type NFTCreate = {
  id?: string
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

  const { handleConfetti } = useContext(CargoContext) as CargoContextType

  const [collections, setCollections] = useState<Collection[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [nftData, setNftData] = useState<Partial<NFTCreate>>({
    supply: 1,
    blockchain: 'rinkeby',
  })

  // loading states
  const [loadingCollection, setLoadingCollection] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const address = useAddress()
  const marketplace = useNFTCollection(nftData.collectionId)

  useEffect(() => {
    if (!address) {
      router.replace('/')
    }
  }, [address, router])

  const fetchCollectionData = useCallback(async (sanityClient = client) => {
    try {
      setLoadingCollection(true)
      const collectionData: Collection[] = await sanityClient.fetch(
        getAllcollectionQuery
      )
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

  const handleUploadFile = (files: any) => {
    files?.length > 0 &&
      setNftData({
        ...nftData,
        image: files[0],
      })
  }

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    const handleCreateNft = new Promise(async (resolve, reject) => {
      if (!marketplace) return

      try {
        setIsCreating(true)

        console.time('response in 1')
        console.time('response in 2')
        console.time('response in 3')
        console.time('response in 4')
        console.time('response in 5')
        // mint an NFT
        const signatureGenerated = await marketplace.signature.generate({
          metadata: {
            name: nftData.name || '',
            description: nftData.description || '',
            image: nftData.image,
          },
        })
        const tx = await marketplace.signature.mint(signatureGenerated)
        console.timeEnd('response in 1')

        // create an NFT
        const imageAsset = await client.assets.upload('image', nftData.image)
        console.timeEnd('response in 2')

        const createDoc = {
          _type: 'nfts',
          owner: {
            _type: 'reference',
            _ref: address,
          },
          createdBy: {
            _type: 'reference',
            _ref: address,
          },
          collection: {
            _type: 'reference',
            _ref: collections.find(
              (c) => c.contractAddress === nftData.collectionId
            )?._id,
          },
          metadata: {
            id: tx.id.toString(),
            name: nftData.name,
            description: nftData.description,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageAsset._id,
              },
            },
          },
        }
        const nftResult = await client.create(createDoc)
        console.timeEnd('response in 3')

        // create a transaction
        const transDoc = {
          _type: 'transactions',
          owner: {
            _type: 'reference',
            _ref: address,
          },
          nft: {
            _type: 'reference',
            _ref: nftResult._id,
          },
          collection: {
            _type: 'reference',
            _ref: collections.find(
              (c) => c.contractAddress === nftData.collectionId
            )?._id,
          },
          id: tx.id.toString(),
          confirmations: tx.receipt.confirmations,
          contractAddress: tx.receipt.contractAddress || '',
          from: tx.receipt.from,
          to: tx.receipt.to,
          gasUsed: tx.receipt.gasUsed.toString(),
          status: tx.receipt.status,
          transactionHash: tx.receipt.transactionHash,
          type: tx.receipt.type,
          price: 0,
          eventType: ETransactionEvent.MINTED,
        }
        await client.create(transDoc)
        console.timeEnd('response in 4')

        setNftData({
          ...nftData,
          preview: imageAsset.url,
          id: nftResult._id,
        })

        setIsCreating(false)
        handleConfetti(true)
        setOpenModal(true)
        resolve(true)
        console.timeEnd('response in 5')
      } catch (error) {
        setIsCreating(false)
        reject(true)
        console.log(error)
      }
    })

    toast.promise(handleCreateNft, {
      pending: 'Creating your NFT.',
      error: 'Cannot create your NFT.',
    })
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleViewNFT = () => {
    router.push(`/collections/${nftData.collectionId}/nfts/${nftData.id}`)
  }

  return (
    <>
      <Container maxWidth="md">
        <form
          className="flex flex-col gap-6 text-white my-12"
          onSubmit={onSubmit}
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
              className="h-10"
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
              className="h-10"
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
            <Input className="h-10" value={1} disabled />
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
              className="h-10"
              value="To freeze your metadata, you must create your item first."
              disabled
            />
          </div>

          <Divider
            sx={{
              marginY: 2,
            }}
          />

          <LoadingButton
            type="submit"
            sx={{
              width: 'fit-content',
              fontWeight: 'bold',
              my: 2,
            }}
            variant="contained"
            loading={isCreating}
            loadingPosition="start"
            startIcon={<CreateIcon />}
            size="large"
          >
            Create
          </LoadingButton>
        </form>
      </Container>
      <Modal
        id="created-nft-modal"
        className="max-w-lg"
        title={`You created ${nftData.name}!`}
        open={openModal}
        handleClose={handleCloseModal}
      >
        <div className="flex flex-col gap-6 justify-center text-center items-center">
          <div className="font-semibold text-grey1">
            You just created {nftData.name}.
          </div>
          <img
            className="object-cover rounded-xl h-[200px]"
            src={nftData.preview}
            alt=""
            width={200}
          />
          <div className="flex flex-col gap-4 w-full">
            <div className="w-fit mx-auto mb-4">
              <label
                className="btn btn-primary px-12 normal-case"
                onClick={handleViewNFT}
              >
                View NFT
              </label>
            </div>
            <div className="border-t-[1px] border-darkLine"></div>
            <div className="font-semibold text-grey1">SHARE</div>
            <div className="flex gap-3 w-full items-center justify-center">
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
