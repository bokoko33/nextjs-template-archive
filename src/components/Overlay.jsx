import styles from '~/styles/components/Overlay.module.scss';
import { useOverlayContext } from '~/context/OverlayContext';

export const Overlay = () => {
  const { overlayRef } = useOverlayContext();

  return (
    <div ref={overlayRef} className={styles.root}>
      {[...Array(4)].map((_, i) => (
        <span key={i}></span>
      ))}
    </div>
  );
};
