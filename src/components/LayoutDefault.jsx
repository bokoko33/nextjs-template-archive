import styles from '~/styles/components/LayoutDefault.module.scss';
import { GlobalHeader } from '~/components/GlobalHeader';
import { Overlay } from '~/components/Overlay';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { gsap } from 'gsap';
import { SwitchTransition, Transition } from 'react-transition-group';
import { useOverlayContext } from '~/context/OverlayContext';
import { fixTimeoutTransition } from '~/hooks/TransitionTimeoutFix';

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

  // exitの瞬間にscroll位置がtopにジャンプするのでそれをハック
  useEffect(() => {
    const scrollFix = (url) => {
      if (url === router.asPath) return;

      console.log('change start');
      nodeRef.current.style.top = -1 * window.scrollY + 'px';
      nodeRef.current.style.position = 'fixed';
    };

    router.events.on('routeChangeStart', scrollFix);

    return () => {
      router.events.off('routeChangeStart', scrollFix);
    };
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
            console.log('exit', window.scrollY);
            onExit();
          }}
          onExiting={() => {
            console.log('exiting', window.scrollY);
          }}
          onExited={() => {
            console.log('exited', window.scrollY);
          }}
          onEnter={() => {
            console.log('enter');
            onEnter();
          }}
          onEntering={() => {
            console.log('entering');
          }}
          onEntered={() => {
            console.log('entered');
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
