import { Footer, Header } from 'components/common'
import { LayoutProps } from 'models'

export const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex flex-col grow min-h-screen">
      <Header />

      <main className="grow mb-12">{children}</main>

      <Footer />
    </div>
  )
}