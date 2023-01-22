import Head from 'next/head';
import styles from '~/styles/components/PageAbout.module.scss';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export const PageAbout = () => {
  const router = useRouter();
  return (
    <motion.div
      key={router.asPath}
      initial={{ opacity: 0 }} // 初期状態
      animate={{ opacity: 1 }} // マウント時
      exit={{ opacity: 0 }} // アンマウント時
      transition={{ duration: 1 }}
    >
      <Head>
        <title>About | Next.js Template</title>
      </Head>
      <h1 className={styles.title}>About Page</h1>
      <p className={styles.desc}>
        This is a Template of Next.js for Developing WebSite.
      </p>
    </motion.div>
  );
};
