import '../styles/globals.css'
import Head from 'next/head'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { AppPropsWithLayout } from 'models'
import { EmptyLayout } from 'components/layout'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout
  const title = Component.Title ?? 'Cargo'
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <Layout>
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          {/* <link rel="icon" href="/logo-icon.png" /> */}
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ThirdwebProvider>
  )
}

export default MyApp
