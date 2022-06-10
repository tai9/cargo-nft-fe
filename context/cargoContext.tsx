import React, { createContext, useState } from 'react'

export type CargoContextType = {
  confetti: boolean
  handleConfetti: (value: boolean) => void
}

export const CargoContext = createContext<CargoContextType | null>(null)

type Props = {
  children?: React.ReactNode
}

export const CargoProvider: React.FC<Props> = ({ children }) => {
  const [confetti, setConfetti] = useState(false)

  const handleConfetti = (value: boolean) => {
    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth',
    // })
    setConfetti(value)
  }

  return (
    <CargoContext.Provider
      value={{
        confetti,
        handleConfetti,
      }}
    >
      {children}
    </CargoContext.Provider>
  )
}
