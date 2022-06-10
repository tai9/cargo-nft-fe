import React from 'react'
import { IoMdClose } from 'react-icons/io'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  icon?: any
  errorMessage?: string
}

export const Input = ({ icon, errorMessage, ...props }: Props) => {
  return (
    <>
      <div className="flex flex-1 h-full w-max-[520px] items-center bg-darkGrey rounded-lg hover:bg-lightGrey border border-darkLine">
        {icon && (
          <div className="text-[#8a939b] mx-3 font-bold text-lg">{icon}</div>
        )}
        <input
          {...props}
          className={`w-full border-0 bg-transparent outline-0 ring-0 px-3 text-[#e6e8eb] placeholder:text-[#8a939b] ${props.className}`}
        />
      </div>
      {errorMessage && (
        <div className="text-red-500 font-medium text-xs flex gap-1 items-center">
          <IoMdClose />
          <span>{errorMessage}</span>
        </div>
      )}
    </>
  )
}
