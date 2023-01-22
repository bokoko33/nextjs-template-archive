import 'destyle.css';
import '~/styles/app.scss';
import { OverlayContextProvider } from '~/context/OverlayContext';
import { LayoutDefault } from '~/components/LayoutDefault';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps, router }) {
  return (
    <OverlayContextProvider>
      <LayoutDefault>
        <Component {...pageProps} />
      </LayoutDefault>
    </OverlayContextProvider>
  );
}

export default MyApp;
