import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { ReactNode, useState } from 'react'

const style = {
  wrapper: `w-full rounded-xl overflow-hidden`,
  title: `flex items-center cursor-pointer text-white`,
  titleLeft: `flex-1 flex items-center text-base font-bold`,
  titleIcon: `text-3xl mr-2`,
  titleRight: `text-xl`,
  activityTable: `text-white`,
}

type Props = {
  className?: string
  title: string
  children: ReactNode
  isToggled?: boolean
  defaultOpen?: boolean
}

export const CollapseOutline = ({
  className,
  isToggled = true,
  defaultOpen = true,
  title,
  children,
}: Props) => {
  const [toggle, setToggle] = useState(defaultOpen)
  return (
    <div className={`${style.wrapper} ${className}`}>
      <div
        className={style.title}
        onClick={() => isToggled && setToggle(!toggle)}
      >
        <div className={style.titleLeft}>{title}</div>
        {isToggled && (
          <div className={style.titleRight}>
            {toggle ? (
              <BiChevronUp fontSize={24} />
            ) : (
              <BiChevronDown fontSize={24} />
            )}
          </div>
        )}
      </div>
      {toggle && <div className={style.activityTable}>{children}</div>}
    </div>
  )
}
