import { Header } from 'components/common'
import { LayoutProps } from 'models'

export const NormalLayout = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex flex-col grow min-h-screen bg-[#202225]">
      <Header />

      <main className="grow">{children}</main>
    </div>
  )
}
