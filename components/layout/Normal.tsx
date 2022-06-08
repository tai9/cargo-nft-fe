import { Header } from 'components/common'
import { LayoutProps } from 'models'

import Confetti from 'react-confetti'
import { useContext, useEffect } from 'react'
import { CargoContext, CargoContextType } from 'context/cargoContext'

export const NormalLayout = ({ children }: LayoutProps) => {
  const { confetti, handleConfetti } = useContext(
    CargoContext
  ) as CargoContextType

  useEffect(() => {
    const timer = setTimeout(() => {
      handleConfetti(false)
    }, 10000)
    return () => clearTimeout(timer)
  }, [handleConfetti])

  return (
    <div className="relative flex flex-col grow min-h-screen bg-[#202225]">
      {confetti && (
        <Confetti
          style={{
            zIndex: 60,
          }}
          run={confetti}
        />
      )}
      <Header />

      <main className="grow">{children}</main>
    </div>
  )
}
