import '../../styles/globals.css'
import '../../styles/darkTheme.css'
import { CookiesProvider } from "react-cookie";
import {Provider} from "react-redux";
import { useStore } from '../redux/store'

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  return(
    <CookiesProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>  
  </CookiesProvider>
  )
}

export default MyApp
