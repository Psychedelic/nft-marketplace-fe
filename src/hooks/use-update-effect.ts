import { useEffect, useState } from 'react';

export const useUpdateEffect = (
  effect: React.EffectCallback,
  deps?: React.DependencyList | undefined,
) => {
  const [shouldTrigger, setShouldTrigger] = useState(false);

  useEffect(() => {
    if (shouldTrigger) {
      return effect();
    }

    setShouldTrigger(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
