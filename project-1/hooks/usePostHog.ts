import { useContext } from 'react';
import { PostHogContext } from '@/context/PostHogProvider';

export function usePostHog() {
  const postHog = useContext(PostHogContext);

  if (!postHog) {
    throw new Error('usePostHog must be used within a PostHogProvider');
  }

  return {
    capture: (eventName: string, properties?: Record<string, any>) => {
      postHog.capture(eventName, properties);
    },
    identify: (userId: string, properties?: Record<string, any>) => {
      postHog.identify(userId, properties);
    },
    reset: () => {
      postHog.reset();
    },
    featureFlags: {
      getFeatureFlag: async (key: string) => {
        return await postHog.getFeatureFlag(key);
      },
      getAllFeatureFlags: async () => {
        return await postHog.getAllFeatureFlags();
      },
      reloadFeatureFlags: async () => {
        return await postHog.reloadFeatureFlags();
      },
    },
  };
}
