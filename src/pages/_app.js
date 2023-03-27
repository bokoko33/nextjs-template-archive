import 'destyle.css';
import '~/styles/app.scss';
import { OverlayContextProvider } from '~/context/OverlayContext';
import { LayoutDefault } from '~/components/LayoutDefault';
import { useMyApp } from '~/hooks/MyApp';

function MyApp({ Component, pageProps }) {
  useMyApp();

  return (
    <OverlayContextProvider>
      <LayoutDefault>
        <Component {...pageProps} />
      </LayoutDefault>
    </OverlayContextProvider>
  );
}

export default MyApp;
