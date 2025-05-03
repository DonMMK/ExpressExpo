import { Platform } from 'react-native';
import Purchases, { PurchasesConfiguration } from 'react-native-purchases';
import Constants from 'expo-constants';

// Initialize RevenueCat with your API keys
export const initializePurchases = (userId?: string) => {
  const apiKey = Platform.select({
    ios: Constants.expoConfig?.extra?.revenuecatApiKeyIos || 'YOUR_IOS_API_KEY',
    android:
      Constants.expoConfig?.extra?.revenuecatApiKeyAndroid ||
      'YOUR_ANDROID_API_KEY',
  }) as string;

  if (!apiKey) {
    console.warn('RevenueCat API key not configured for this platform');
    return;
  }

  const configuration: PurchasesConfiguration = {
    apiKey,
    // Optional configuration
    observerMode: false,
    userDefaultsSuiteName: 'expressexpo',
  };

  try {
    // Initialize RevenueCat SDK
    Purchases.configure(configuration);

    // Log in user if we have a userId
    if (userId) {
      Purchases.logIn(userId).catch((error) => {
        console.error('RevenueCat login error:', error);
      });
    }
  } catch (error) {
    console.error('RevenueCat initialization error:', error);
  }
};

// Get offerings (available products)
export const getOfferings = async () => {
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current;
  } catch (error) {
    console.error('Error fetching offerings:', error);
    return null;
  }
};

// Purchase a package
export const purchasePackage = async (packageToPurchase) => {
  try {
    const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
    return customerInfo;
  } catch (error) {
    console.error('Error purchasing package:', error);
    throw error;
  }
};

// Restore purchases
export const restorePurchases = async () => {
  try {
    const customerInfo = await Purchases.restorePurchases();
    return customerInfo;
  } catch (error) {
    console.error('Error restoring purchases:', error);
    throw error;
  }
};

// Check subscription status
export const checkSubscriptionStatus = async () => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    const entitlements = customerInfo.entitlements.active;
    // Check if user has 'premium' entitlement
    return entitlements.premium ? 'active' : 'inactive';
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return 'unknown';
  }
};

// Get customer info
export const getCustomerInfo = async () => {
  try {
    return await Purchases.getCustomerInfo();
  } catch (error) {
    console.error('Error getting customer info:', error);
    return null;
  }
};
