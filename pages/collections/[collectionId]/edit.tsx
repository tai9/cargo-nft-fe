import CreateIcon from '@mui/icons-material/Create'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  Container,
  Divider,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material'
import { useAddress } from '@thirdweb-dev/react'
import ETHToken from 'assets/ETH.svg'
import { Dropzone, Input } from 'components/common'
import { NormalLayout } from 'components/layout'
import { client } from 'lib/sanityClient'
import { Collection, getCollectionByIdQuery, NextPageWithLayout } from 'models'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, {
  FormEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'

type ImageType = {
  bannerImage: any
  profileImage: any
}

const EditCollectionPage: NextPageWithLayout = () => {
  const router = useRouter()

  const [collection, setCollection] =
    useState<Partial<Collection & ImageType>>()

  // loading states
  const [isUpdating, setIsUpdating] = useState(false)

  const address = useAddress()

  useEffect(() => {
    if (!address) {
      router.replace('/')
    }
  }, [address, router])

  const fetchCollection = useCallback(async () => {
    const query = getCollectionByIdQuery(router.query?.collectionId as string)
    const collectionData: Collection[] = await client.fetch(query)
    setCollection(collectionData[0])
  }, [router.query?.collectionId])

  useEffect(() => {
    fetchCollection()
  }, [fetchCollection])

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    if (!collection) return

    const handleUpdateCollection = new Promise(async (resolve, reject) => {
      try {
        setIsUpdating(true)

        let bannerImage: any, profileImage: any
        if (collection.bannerImage) {
          bannerImage = await client.assets.upload(
            'image',
            collection.bannerImage
          )
        }
        if (collection.profileImage) {
          profileImage = await client.assets.upload(
            'image',
            collection.profileImage
          )
        }

        // update listing status
        await client
          .patch(collection._id || '')
          .set({
            title: collection.title,
            description: collection.description,
            profileImage: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: profileImage
                  ? profileImage._id
                  : collection.profileImageId,
              },
            },
            bannerImage: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: bannerImage ? bannerImage._id : collection.bannerImageId,
              },
            },
          })
          .commit()

        setIsUpdating(false)
        router.push('/my-collections')
        resolve(true)
      } catch (error) {
        setIsUpdating(false)
        reject(true)
        console.log(error)
      }
    })

    toast.promise(handleUpdateCollection, {
      pending: 'Updating your collection.',
      error: 'Cannot update your collection.',
      success: 'Updated your collection successfully.',
    })
  }

  const handleUploadFile = (name: string, files: any) => {
    files?.length > 0 &&
      setCollection({
        ...collection,
        [name]: files[0],
        imageUrl: name === 'profileImage' ? '' : collection?.imageUrl,
        bannerImageUrl:
          name === 'bannerImage' ? '' : collection?.bannerImageUrl,
      })
  }

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    setCollection({
      ...collection,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  return (
    <Container maxWidth="md">
      <form
        className="flex flex-col gap-6 text-white my-12"
        onSubmit={onSubmit}
      >
        <div className="text-4xl font-bold">Create a Collection</div>
        <div className="text-xs text-grey1">
          <span className="text-red-500">* </span>
          Required fields
        </div>

        <div className="space-y-2">
          <div className="font-bold">
            Logo image<span className="text-red-500"> *</span>
          </div>
          <div className="text-xs text-grey1">
            This image will also be used for navigation. 350 x 350 recommended.
          </div>
          <Dropzone
            defaultValue={collection?.imageUrl}
            onChange={(file) => handleUploadFile('profileImage', file)}
          />
        </div>

        <div className="space-y-2">
          <div className="font-bold">Featured image</div>
          <div className="text-xs text-grey1">
            This image will be used for featuring your collection on the
            homepage, category pages, or other promotional areas of OpenSea. 600
            x 400 recommended.
          </div>
          <Dropzone
            defaultValue={collection?.bannerImageUrl}
            onChange={(file) => handleUploadFile('bannerImage', file)}
          />
        </div>

        <div className="space-y-2">
          <div className="font-bold">
            Name<span className="text-red-500"> *</span>
          </div>
          <Input
            className="h-10"
            name="title"
            value={collection?.title || ''}
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
            value={collection?.description || ''}
            onChange={handleInputChange}
            placeholder="Provide a detailed description of your item."
          />
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
          <div className="font-bold">Payment tokens</div>
          <div className="text-xs text-grey1">
            These tokens can be used to buy and sell your items.
          </div>
          <div className="flex gap-2 items-center border border-gray-400 w-fit px-8 py-2 rounded-lg hover:border-gray-300 cursor-default">
            <Image
              src={ETHToken}
              alt="eth"
              layout="fixed"
              width={24}
              height={24}
            />
            <div>
              <div className="font-bold">ETH</div>
              <div className="text-xs text-grey1">Ethereum</div>
            </div>
          </div>
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
          loading={isUpdating}
          loadingPosition="start"
          startIcon={<CreateIcon />}
          size="large"
        >
          Update
        </LoadingButton>
      </form>
    </Container>
  )
}

EditCollectionPage.Layout = NormalLayout

export default EditCollectionPage
