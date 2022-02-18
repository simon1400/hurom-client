import '../styles/main.scss'
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
// loads the Icon plugin
UIkit.use(Icons);

import { DataProvider } from '../context/dataStateContext'
import { useEffect } from 'react';
import { GTMPageView } from '../functions/gtm';
import { Router } from 'next/router';

const App = ({ Component, pageProps }) => {

  // Initiate GTM
  useEffect(() => {
    const handleRouteChange = (url) => GTMPageView(url);
    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return <DataProvider><Component {...pageProps} /></DataProvider>
}


export default App
