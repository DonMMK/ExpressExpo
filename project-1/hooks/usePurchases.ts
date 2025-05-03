import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import {
  checkSubscriptionStatus,
  getCustomerInfo,
  getOfferings,
} from '@/lib/revenuecat';
import { CustomerInfo, Offering } from 'react-native-purchases';
import { usePostHog } from './usePostHog';

interface UsePurchasesReturn {
  subscriptionStatus: 'active' | 'inactive' | 'unknown';
  offerings: Offering | null;
  customerInfo: CustomerInfo | null;
  isLoading: boolean;
  refreshPurchases: () => Promise<void>;
}

export function usePurchases(): UsePurchasesReturn {
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    'active' | 'inactive' | 'unknown'
  >('unknown');
  const [offerings, setOfferings] = useState<Offering | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { capture } = usePostHog();

  const loadPurchasesInfo = async () => {
    try {
      setIsLoading(true);

      // Get subscription status
      const status = await checkSubscriptionStatus();
      setSubscriptionStatus(status as 'active' | 'inactive' | 'unknown');

      // Get customer info
      const info = await getCustomerInfo();
      setCustomerInfo(info);

      // Get offerings
      const availableOfferings = await getOfferings();
      setOfferings(availableOfferings);

      // Track subscription status in PostHog
      capture('subscription_status_checked', { status });
    } catch (error) {
      console.error('Error loading purchases info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load purchases info on mount and when user changes
  useEffect(() => {
    if (user) {
      loadPurchasesInfo();
    }
  }, [user]);

  // Function to manually refresh purchases
  const refreshPurchases = async () => {
    await loadPurchasesInfo();
  };

  return {
    subscriptionStatus,
    offerings,
    customerInfo,
    isLoading,
    refreshPurchases,
  };
}
