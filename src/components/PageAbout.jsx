import Head from 'next/head';
import styles from '~/styles/components/PageAbout.module.scss';

export const PageAbout = () => {
  return (
    <div className={styles.root}>
      <Head>
        <title>About | Next.js Template</title>
      </Head>

      <h1 className={styles.title}>About Page</h1>
      <p className={styles.desc}>
        This is a Template of Next.js for Developing WebSite.
      </p>
    </div>
  );
};
