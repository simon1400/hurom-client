import '../styles/main.scss'
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
// loads the Icon plugin
UIkit.use(Icons);

import { DataProvider } from '../context/dataStateContext'

const App = ({ Component, pageProps }) => {
  return <DataProvider><Component {...pageProps} /></DataProvider>
}


export default App
