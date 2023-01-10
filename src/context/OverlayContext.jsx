import { createContext, useContext, useRef } from 'react';

const OverlayContext = createContext(null);

export const useOverlayContext = () => {
  const value = useContext(OverlayContext);
  if (!value) throw new Error('NonConsumerError');
  return value;
};

export const OverlayContextProvider = ({ children }) => {
  const overlayRef = useRef(null);
  return (
    <OverlayContext.Provider value={{ overlayRef }}>
      {children}
    </OverlayContext.Provider>
  );
};
