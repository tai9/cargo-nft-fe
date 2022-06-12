import { Button, Container } from '@mui/material'
import Hero from 'components/Hero'
import Image from 'next/image'
import WalletIcon from 'assets/wallet.svg'
import CollectionIcon from 'assets/collection.svg'
import NFTIcon from 'assets/nft.svg'
import SaleIcon from 'assets/sale.svg'
import ResourceIcon1 from 'assets/img1.webp'
import ResourceIcon2 from 'assets/img2.webp'
import ResourceIcon3 from 'assets/img3.webp'
import CateIcon1 from 'assets/cate1.png'
import CateIcon2 from 'assets/cate2.png'
import CateIcon3 from 'assets/cate3.png'
import CateIcon4 from 'assets/cate4.png'
import CateIcon5 from 'assets/cate5.png'
import CateIcon6 from 'assets/cate6.png'
import CateIcon7 from 'assets/cate7.png'
import CateIcon8 from 'assets/cate8.png'
import CateIcon9 from 'assets/cate9.png'

const Home = () => {
  return (
    <div>
      <Hero />

      <Container maxWidth="xl">
        <div className="space-y-32">
          <div className="bg-[url('../assets/home-banner.webp')] bg-no-repeat bg-cover rounded-xl flex items-center justify-between py-12 px-12 mx-12 mt-32">
            <div className="text-2xl font-bold">Solana is in beta on Cargo</div>
            <Button disableRipple variant="contained" size="large">
              Explore
            </Button>
          </div>

          <div className="text-white text-center space-y-12 mx-12">
            <div className="text-2xl font-bold">Create and sell your NFTs</div>
            <div className="grid grid-cols-4 gap-8">
              <div className="flex flex-col items-center justify-center gap-3">
                <Image src={WalletIcon} alt="" width={40} height={40} />
                <div className="font-bold text-lg">Set up your wallet</div>
                <div className="font-medium">
                  Once you&#39;ve set up your wallet of choice, connect it to
                  OpenSea by clicking the wallet icon in the top right corner.
                  Learn about the wallets we support.
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3">
                <Image src={CollectionIcon} alt="" width={40} height={40} />
                <div className="font-bold text-lg">Create your collection</div>
                <div className="font-medium">
                  Click My Collections and set up your collection. Add social
                  links, a description, profile & banner images, and set a
                  secondary sales fee.
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3">
                <Image src={NFTIcon} alt="" width={40} height={40} />
                <div className="font-bold text-lg">Add your NFTs</div>
                <div className="font-medium">
                  Upload your work (image, video, audio, or 3D art), add a title
                  and description, and customize your NFTs with properties,
                  stats, and unlockable content.
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3">
                <Image src={SaleIcon} alt="" width={40} height={40} />
                <div className="font-bold text-lg">List them for sale</div>
                <div className="font-medium">
                  Choose between auctions, fixed-price listings, and
                  declining-price listings. You choose how you want to sell your
                  NFTs, and we help you sell them!
                </div>
              </div>
            </div>
          </div>

          <div className="text-white space-y-12 mx-12">
            <div className="text-2xl font-bold text-center">
              Resources for getting started
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center gap-3 bg-grey2 rounded-xl">
                <div className="h-full w-full">
                  <Image
                    src={ResourceIcon1}
                    alt=""
                    layout="responsive"
                    className="rounded-t-xl"
                  />
                </div>
                <div className="font-bold text-lg px-6 pb-16 pt-2 w-full">
                  How to Easily Setup a MetaMask Wallet
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 bg-grey2 rounded-xl">
                <div className="h-full w-full">
                  <Image
                    src={ResourceIcon2}
                    alt=""
                    layout="responsive"
                    className="rounded-t-xl"
                  />
                </div>
                <div className="font-bold text-lg px-6 pb-16 pt-2 w-full">
                  How to Fund MetaMask with ETH
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 bg-grey2 rounded-xl">
                <div className="h-full w-full">
                  <Image
                    src={ResourceIcon3}
                    alt=""
                    layout="responsive"
                    className="rounded-t-xl"
                  />
                </div>
                <div className="font-bold text-lg px-6 pb-16 pt-2 w-full">
                  How to Find an NFT You Love
                </div>
              </div>
            </div>
          </div>

          <div className="text-white space-y-12 mx-12 text-center px-16">
            <div className="text-2xl font-bold">Browse by category</div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center gap-3 bg-grey2 rounded-xl">
                <div className="h-full w-full">
                  <Image
                    src={CateIcon1}
                    alt=""
                    layout="responsive"
                    className="rounded-t-xl"
                  />
                </div>
                <div className="font-bold text-xl px-6 pb-6 pt-2 w-full">
                  Art
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 bg-grey2 rounded-xl">
                <div className="h-full w-full">
                  <Image
                    src={CateIcon2}
                    alt=""
                    layout="responsive"
                    className="rounded-t-xl"
                  />
                </div>
                <div className="font-bold text-xl px-6 pb-6 pt-2 w-full">
                  Collectibles
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 bg-grey2 rounded-xl">
                <div className="h-full w-full">
                  <Image
                    src={CateIcon3}
                    alt=""
                    layout="responsive"
                    className="rounded-t-xl"
                  />
                </div>
                <div className="font-bold text-xl px-6 pb-6 pt-2 w-full">
                  Domain Names
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 bg-grey2 rounded-xl">
                <div className="h-full w-full">
                  <Image
                    src={CateIcon4}
                    alt=""
                    layout="responsive"
                    className="rounded-t-xl"
                  />
                </div>
                <div className="font-bold text-xl px-6 pb-6 pt-2 w-full">
                  Music
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 bg-grey2 rounded-xl">
                <div className="h-full w-full">
                  <Image
                    src={CateIcon7}
                    alt=""
                    layout="responsive"
                    className="rounded-t-xl"
                  />
                </div>
                <div className="font-bold text-xl px-6 pb-6 pt-2 w-full">
                  Photography
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 bg-grey2 rounded-xl">
                <div className="h-full w-full">
                  <Image
                    src={CateIcon9}
                    alt=""
                    layout="responsive"
                    className="rounded-t-xl"
                  />
                </div>
                <div className="font-bold text-xl px-6 pb-6 pt-2 w-full">
                  Sports
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 bg-grey2 rounded-xl">
                <div className="h-full w-full">
                  <Image
                    src={CateIcon8}
                    alt=""
                    layout="responsive"
                    className="rounded-t-xl"
                  />
                </div>
                <div className="font-bold text-xl px-6 pb-6 pt-2 w-full">
                  Trading Cards
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 bg-grey2 rounded-xl">
                <div className="h-full w-full">
                  <Image
                    src={CateIcon5}
                    alt=""
                    layout="responsive"
                    className="rounded-t-xl"
                  />
                </div>
                <div className="font-bold text-xl px-6 pb-6 pt-2 w-full">
                  Utility
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 bg-grey2 rounded-xl">
                <div className="h-full w-full">
                  <Image
                    src={CateIcon6}
                    alt=""
                    layout="responsive"
                    className="rounded-t-xl"
                  />
                </div>
                <div className="font-bold text-xl px-6 pb-6 pt-2 w-full">
                  Virtual Worlds
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="bg-[#262b2f] text-center w-full text-white py-16">
        <Container className="space-y-20">
          <div className="space-y-6">
            <div className="text-4xl font-bold">Meet Cargo</div>
            <div>The NFT marketplace with everything for everyone</div>
          </div>
          <div className="bg-[url(../assets/video-background.svg)] bg-no-repeat bg-cover px-10 space-y-4">
            <iframe
              className="w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              // frameborder="0"
              height="615"
              sandbox="allow-same-origin allow-scripts allow-presentation"
              src="https://www.youtube.com/embed/gfGuPd1CELo?playlist=gfGuPd1CELo&amp;autoplay=0&amp;controls=1&amp;loop=1&amp;modestbranding=1&amp;rel=0"
              title="Meet OpenSea"
              // width="560"
            ></iframe>
            <div className="text-textGrey text-sm font-medium">
              Fiat on-ramp and profile customization is coming soon.
            </div>
          </div>

          <Button
            disableRipple
            variant="contained"
            size="large"
            sx={{ paddingY: 2, fontWeight: 700, marginBottom: 10 }}
          >
            Explore the marketplace
          </Button>
        </Container>
      </div>
    </div>
  )
}

export default Home
