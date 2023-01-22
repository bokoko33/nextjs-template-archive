import styles from '~/styles/components/LayoutDefault.module.scss';
import { GlobalHeader } from '~/components/GlobalHeader';
import { Overlay } from '~/components/Overlay';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { gsap } from 'gsap';
import { SwitchTransition, Transition } from 'react-transition-group';
import { useOverlayContext } from '~/context/OverlayContext';
import { motion, AnimatePresence } from 'framer-motion';

export const LayoutDefault = ({ children }) => {
  const nodeRef = useRef(null);
  const duration = 1;
  const { overlayRef } = useOverlayContext();

  // ページ遷移
  const router = useRouter();
  const onExit = () => {
    gsap.fromTo(
      overlayRef.current.children,
      {
        translateY: '100%',
      },
      {
        translateY: 0,
        duration,
        stagger: 0.1,
        ease: 'power2.out',
      }
    );
  };

  const onEnter = () => {
    gsap.to(overlayRef.current.children, {
      delay: 0.2,
      translateY: '-100%',
      duration,
      stagger: 0.1,
      ease: 'power2.out',
    });
  };

  // exitの瞬間にscroll位置がtopにジャンプするのでそれをハック
  // useEffect(() => {
  //   const scrollFix = (url) => {
  //     if (url === router.asPath) return;

  //     console.log('change start');
  //     nodeRef.current.style.top = -1 * window.scrollY + 'px';
  //     nodeRef.current.style.position = 'fixed';
  //   };

  //   router.events.on('routeChangeStart', scrollFix);

  //   return () => {
  //     router.events.off('routeChangeStart', scrollFix);
  //   };
  // }, [router]);

  return (
    <>
      <GlobalHeader />

      <Overlay />

      {/* nodeRefに渡すrefは差し替え対象のdomにするっぽい */}
      <main ref={nodeRef} className={styles.root}>
        <AnimatePresence mode="wait" initial={false}>
          {children}
        </AnimatePresence>
      </main>
    </>
  );
};
