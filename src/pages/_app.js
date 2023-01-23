import 'destyle.css';
import '~/styles/app.scss';
// import { useEffect } from 'react';
import { OverlayContextProvider } from '~/context/OverlayContext';
import { LayoutDefault } from '~/components/LayoutDefault';

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   router.beforePopState((state) => {
  //     history.scrollRestoration = 'manual'; // お祈りで入れてます
  //     state.options.scroll = false;
  //     return true;
  //   });
  // }, [router]);

  return (
    <OverlayContextProvider>
      <LayoutDefault>
        <Component {...pageProps} />
      </LayoutDefault>
    </OverlayContextProvider>
  );
}

export default MyApp;
