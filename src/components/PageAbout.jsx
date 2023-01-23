import Head from 'next/head';
import styles from '~/styles/components/PageAbout.module.scss';

export const PageAbout = () => {
  return (
    <div>
      <Head>
        <title>About | Next.js Template</title>
      </Head>
      <h1 className={styles.title}>About Page</h1>
      {[...Array(20)].map((_, i) => (
        <p className={styles.desc} key={i}>
          This is a Template of Next.js for Developing WebSite.
        </p>
      ))}
    </div>
  );
};
