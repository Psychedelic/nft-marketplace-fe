import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const [showMediaQuery, setShowMediaQuery] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== showMediaQuery) {
      setShowMediaQuery(media.matches);
    }
    const listener = () => setShowMediaQuery(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [showMediaQuery, query]);

  return showMediaQuery;
};

export default useMediaQuery;