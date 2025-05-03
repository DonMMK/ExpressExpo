import React, { createContext, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import { PostHog } from 'posthog-react-native';
import Constants from 'expo-constants';

// Create PostHog client
const postHog = new PostHog(
  'YOUR_POSTHOG_API_KEY', // Replace with your PostHog API key
  {
    host: 'https://app.posthog.com', // Your PostHog instance URL
    captureDeviceInfo: true,
    captureApplicationLifecycleEvents: true,
    sendFeatureFlags: true,
  },
);

// Create context
export const PostHogContext = createContext(postHog);

// Provider component
export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize PostHog with device info
    const initPostHog = async () => {
      // Set user properties
      await postHog.identify(null, {
        $os: Platform.OS,
        $os_version: Platform.Version.toString(),
        $app_version: Constants.manifest?.version || '1.0.0',
        $app_build: Constants.manifest?.extra?.buildNumber || '1',
        model: Device.modelName || 'Unknown',
        deviceType: Device.deviceType || 'Unknown',
        brand: Device.brand || 'Unknown',
      });

      // Enable feature flags (if you use them)
      await postHog.reloadFeatureFlags();
    };

    initPostHog();

    return () => {
      // Clean up if needed
    };
  }, []);

  return (
    <PostHogContext.Provider value={postHog}>
      {children}
    </PostHogContext.Provider>
  );
}
