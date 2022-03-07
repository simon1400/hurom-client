import '../styles/main.scss'
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import TagManager from 'react-gtm-module';
import { DataProvider } from '../context/dataStateContext'
import { useEffect } from 'react';
// loads the Icon plugin
UIkit.use(Icons);

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-WJJLLH9' });
  }, []);
  return <DataProvider><Component {...pageProps} /></DataProvider>
}

export default App
