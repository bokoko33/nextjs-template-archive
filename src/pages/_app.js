import 'destyle.css';
import '~/styles/app.scss';
import { OverlayContextProvider } from '~/context/OverlayContext';
import { LayoutDefault } from '~/components/LayoutDefault';

function MyApp({ Component, pageProps }) {
  return (
    <OverlayContextProvider>
      <LayoutDefault>
        <Component {...pageProps} />
      </LayoutDefault>
    </OverlayContextProvider>
  );
}

export default MyApp;
