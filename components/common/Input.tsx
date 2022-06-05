import React from 'react'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  icon?: any
}

export const Input = ({ icon, ...props }: Props) => {
  return (
    <div className="flex flex-1 w-max-[520px] items-center bg-darkGrey rounded-[0.8rem] hover:bg-lightGrey border border-darkLine">
      {icon && (
        <div className="text-[#8a939b] mx-3 font-bold text-lg">{icon}</div>
      )}
      <input
        {...props}
        className="h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-3 text-[#e6e8eb] placeholder:text-[#8a939b]"
      />
    </div>
  )
}
