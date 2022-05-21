import { Header } from 'components/common'
import { LayoutProps } from 'models'

export const EmptyLayout = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex flex-col grow min-h-screen bg-[#FFFEF9]">
      <main className="grow">{children}</main>
    </div>
  )
}
