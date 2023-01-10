import styles from '~/styles/components/LayoutDefault.module.scss';
import { GlobalHeader } from '~/components/GlobalHeader';

export const LayoutDefault = ({ children }) => {
  return (
    <>
      <GlobalHeader />

      <main className={styles.root}>{children}</main>
    </>
  );
};
