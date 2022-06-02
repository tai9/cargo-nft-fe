import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import Head from 'next/head'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { AppPropsWithLayout } from 'models'
import { EmptyLayout } from 'components/layout'
import { ToastContainer } from 'react-toastify'

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
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </ThirdwebProvider>
  )
}

export default MyApp
