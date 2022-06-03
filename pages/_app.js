import '../styles/globals.css'
import TrackerProvider from '../context/trackerContext'

function MyApp({ Component, pageProps }) {

  return <TrackerProvider>
        <Component {...pageProps} />
    </TrackerProvider>
}




export default MyApp