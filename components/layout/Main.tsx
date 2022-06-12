import { Footer, Header } from 'components/common'
import { LayoutProps } from 'models'

import Confetti from 'react-confetti'
import { useContext, useEffect } from 'react'
import { CargoContext, CargoContextType } from 'context/cargoContext'

export const MainLayout = ({ children }: LayoutProps) => {
  const { confetti, handleConfetti } = useContext(
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

      <main className="grow">{children}</main>

      <Footer />
    </div>
  )
}
