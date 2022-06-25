import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import Head from 'next/head'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { AppPropsWithLayout } from 'models'
import { EmptyLayout } from 'components/layout'
import { ToastContainer } from 'react-toastify'
import { createEmotionCache, theme } from 'utils'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CargoProvider } from 'context/cargoContext'
import NextNprogress from 'nextjs-progressbar'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout
  const title = Component.Title ?? 'Cargo'
  return (
    <CacheProvider value={emotionCache}>
      <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          {/* <link rel="icon" href="/logo-icon.png" /> */}
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <CargoProvider>
            <NextNprogress
              options={{ showSpinner: false }}
              color="#2181e2"
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
              showOnShallow={true}
            />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CargoProvider>
        </ThemeProvider>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            background: '#04111d',
            color: '#fff',
          }}
        />
      </ThirdwebProvider>
    </CacheProvider>
  )
}

export default MyApp
