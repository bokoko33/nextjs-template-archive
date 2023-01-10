import 'destyle.css';
import '~/styles/app.scss';
import { SampleContextProvider } from '~/context/SampleContext';
import { LayoutDefault } from '~/components/LayoutDefault';

function MyApp({ Component, pageProps }) {
  return (
    <SampleContextProvider>
      <LayoutDefault>
        <Component {...pageProps} />
      </LayoutDefault>
    </SampleContextProvider>
  );
}

export default MyApp;
