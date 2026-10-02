import { useState, useEffect } from 'react';
import { getFeatureFlag } from '../lib/featureFlags';
import type { FeatureFlags } from '../lib/featureFlags';

export const useFeatureFlag = <K extends keyof FeatureFlags>(flag: K): FeatureFlags[K] => {
  const [value, setValue] = useState<FeatureFlags[K]>(() => getFeatureFlag(flag));

  useEffect(() => {
    setValue(getFeatureFlag(flag));
  }, [flag]);

  return value;
};
