import { useEffect, useState } from 'react';

import {
  getWindowDimensions,
  WindowDimensions,
} from 'utils/getWindowDimensions';

export default function useGetWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
