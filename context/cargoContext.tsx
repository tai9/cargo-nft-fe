import React, { createContext, useState } from 'react'

export type CargoContextType = {
  confetti: boolean
  addressBalance: number
  handleConfetti: (value: boolean) => void
  handleAddressBalance: (value: number) => void
}

export const CargoContext = createContext<CargoContextType | null>(null)

type Props = {
  children?: React.ReactNode
}

export const CargoProvider: React.FC<Props> = ({ children }) => {
  const [confetti, setConfetti] = useState(false)
  const [addressBalance, setAddressBalance] = useState(0)

  const handleConfetti = (value: boolean) => {
    setConfetti(value)
  }

  const handleAddressBalance = (balance: number) => {
    setAddressBalance(balance)
  }

  return (
    <CargoContext.Provider
      value={{
        confetti,
        addressBalance,
        handleConfetti,
        handleAddressBalance,
      }}
    >
      {children}
    </CargoContext.Provider>
  )
}
