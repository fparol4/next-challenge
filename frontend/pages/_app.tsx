import type { AppProps } from 'next/app'
import { Styles } from '../styles/global.style'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Styles />
    <Component {...pageProps} />
  </>
}

export default MyApp
