import { Footer, Header, WalletDrawer } from 'components/common'
import { LayoutProps } from 'models'

import Confetti from 'react-confetti'
import { useContext, useEffect } from 'react'
import { CargoContext, CargoContextType } from 'context/cargoContext'
import { useAddress } from '@thirdweb-dev/react'

export const MainLayout = ({ children }: LayoutProps) => {
  const walletAddress = useAddress()
  const { confetti, addressBalance, handleConfetti } = useContext(
    CargoContext
  ) as CargoContextType

  useEffect(() => {
    const timer = setTimeout(() => {
      handleConfetti(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [handleConfetti])

  return (
    <div className="relative flex flex-col grow min-h-screen">
      {confetti && <Confetti run={confetti} />}
      <Header />

      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <main className="grow">{children}</main>
          <Footer />
        </div>
        <WalletDrawer
          walletAddress={walletAddress}
          totalBalance={addressBalance}
        />
      </div>
    </div>
  )
}
