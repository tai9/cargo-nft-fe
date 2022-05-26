import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { ReactNode, useState } from 'react'

const style = {
  wrapper: `w-full border border-[#151b22] rounded-xl bg-[#303339] overflow-hidden`,
  title: `bg-[#262b2f] px-6 py-4 flex items-center cursor-pointer`,
  titleLeft: `flex-1 flex items-center text-xl font-bold`,
  titleIcon: `text-3xl mr-2`,
  titleRight: `text-xl`,
  filter: `flex items-center border border-[#151b22] mx-4 my-6 px-3 py-4 rounded-xl bg-darkGrey`,
  filterTitle: `flex-1`,
  tableHeader: `flex w-full bg-[#262b2f] border-y border-[#151b22] mt-8 px-4 py-1`,
  eventItem: `flex px-4`,
  ethLogo: `h-5 mr-2`,
  accent: `text-[#2081e2]`,
  activityTable: `px-6 py-4`,
  filterIcon: ``,
  tableHeaderElement: ``,
}

type Props = {
  className?: string
  icon: any
  title: string
  children: ReactNode
  isToggled?: boolean
  defaultOpen?: boolean
}

export const Collapse = ({
  className,
  isToggled = true,
  defaultOpen = true,
  icon,
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
        <div className={style.titleLeft}>
          <span className={style.titleIcon}>{icon}</span>
          {title}
        </div>
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
