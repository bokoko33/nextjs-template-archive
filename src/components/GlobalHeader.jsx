import styles from '~/styles/components/GlobalHeader.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { URL_ABOUT, URL_INDEX } from '~/lib/constants';

export const GlobalHeader = () => {
  const router = useRouter();

  const LogoTag = router.pathname === '/' ? 'h1' : 'span';

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <LogoTag>
          <Link href={URL_INDEX} className={styles.logoLink} scroll={false}>
            ・NextTemplate
          </Link>
        </LogoTag>

        <Link href={URL_ABOUT} className={styles.link} scroll={false}>
          About
        </Link>
      </div>
    </header>
  );
};
