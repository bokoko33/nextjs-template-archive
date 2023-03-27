import styles from '~/styles/components/LayoutDefault.module.scss';
import { GlobalHeader } from '~/components/GlobalHeader';
import { Overlay } from '~/components/Overlay';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { gsap } from 'gsap';
import { SwitchTransition, Transition } from 'react-transition-group';
import { useOverlayContext } from '~/context/OverlayContext';
import { fixTimeoutTransition } from '~/lib/fixTimeoutTransition';
import { beforeScrollY, setBeforeScrollY } from '~/lib/scrollHistory';

const duration = 0.6;
fixTimeoutTransition(duration * 1000);

export const LayoutDefault = ({ children }) => {
  const nodeRef = useRef(null);
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

  const scrollAfterTransition = useRef(0);
  useEffect(() => {
    router.beforePopState((state) => {
      scrollAfterTransition.current = beforeScrollY;

      history.scrollRestoration = 'manual';
      state.options.scroll = false;
      return true;
    });
  }, [router]);

  return (
    <>
      <GlobalHeader />

      <Overlay />
      <SwitchTransition>
        <Transition
          nodeRef={nodeRef}
          key={router.asPath}
          onExit={() => {
            setBeforeScrollY(window.scrollY);
            onExit();
          }}
          onExited={() => {
            console.log('exited');
            window.scrollTo(0, scrollAfterTransition.current);
          }}
          onEnter={() => {
            console.log('enter');
            onEnter();
          }}
          onEntered={() => {
            console.log('entered');
            scrollAfterTransition.current = 0;
          }}
          timeout={duration * 1000} // 遷移を待機する。gsapアニメーションの長さに合わせるのが良さそう
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
