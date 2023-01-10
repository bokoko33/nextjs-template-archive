import styles from '~/styles/components/LayoutDefault.module.scss';
import { GlobalHeader } from '~/components/GlobalHeader';
import { Overlay } from '~/components/Overlay';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { gsap } from 'gsap';
import { SwitchTransition, Transition } from 'react-transition-group';
import { useOverlayContext } from '~/context/OverlayContext';

export const LayoutDefault = ({ children }) => {
  const nodeRef = useRef(null);
  const duration = 0.5;
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

  return (
    <>
      <GlobalHeader />

      <Overlay />
      <SwitchTransition>
        <Transition
          nodeRef={nodeRef}
          key={router.asPath}
          onExit={onExit}
          onEnter={onEnter}
          timeout={duration * 1000} // 遷移を待機する。gsapアニメーションの長さに合わせるのが良さそう
          // in={true}
          // mountOnEnter={true}
          // unmountOnExit={true}
        >
          {/* nodeRefに渡すrefは差し替え対象のdomにするっぽい */}
          <main ref={nodeRef} className={styles.root}>
            {children}
          </main>
        </Transition>
      </SwitchTransition>
    </>
  );
};
