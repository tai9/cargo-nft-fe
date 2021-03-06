import { useAddress, useMetamask } from '@thirdweb-dev/react'
import Home from 'components/home'
import { MainLayout } from 'components/layout'
import { NextPageWithLayout } from 'models'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { client } from 'lib/sanityClient'

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-white`,
  details: `text-lg text-center text-white font-semibold mt-4`,
}

const HomePage: NextPageWithLayout = () => {
  const connectWithMetamask = useMetamask()
  const address = useAddress()

  const welcomeUser = (userName: string, toastHandler = toast) => {
    toastHandler.info(
      `Welcome back${userName !== 'Unnamed' ? ` ${userName}` : ''}!`
    )
  }

  useEffect(() => {
    if (!address) return
    ;(async () => {
      const userDoc = {
        _type: 'users',
        _id: address,
        userName: 'Unnamed',
        walletAddress: address,
      }

      const result = await client.createIfNotExists(userDoc)

      welcomeUser(result.userName)
    })()
  }, [address])

  return (
    <div className={style.wrapper}>
      {address ? (
        <Home />
      ) : (
        <div className={style.walletConnectWrapper}>
          <button className={style.button} onClick={connectWithMetamask}>
            Connect Wallet
          </button>
          <div className={style.details}>
            You need Chrome to be
            <br /> able to run this app.
          </div>
        </div>
      )}
    </div>
  )
}

HomePage.Layout = MainLayout

export default HomePage
