import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { usePostHog } from '@/hooks/usePostHog';
import { usePurchases } from '@/hooks/usePurchases';
import Button from '@/components/common/Button';
import { colors } from '@/constants/colors';
import { IconSymbol } from '@/components/ui/IconSymbol'; // ✅ New import

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { user, signInWithGoogle, signInWithApple } = useAuth();
  const { capture } = usePostHog();
  const { subscriptionStatus } = usePurchases();
  const router = useRouter();

  React.useEffect(() => {
    capture('screen_view', { screen: 'Profile' });
  }, []);

  const handleUpgrade = () => {
    capture('subscription_upgrade_click');
    // Navigate to subscription page or show subscription modal
  };

  const handleLinkAccount = async (provider: 'google' | 'apple') => {
    try {
      if (provider === 'google') {
        await signInWithGoogle();
        capture('account_linked', { provider: 'google' });
      } else if (provider === 'apple') {
        await signInWithApple();
        capture('account_linked', { provider: 'apple' });
      }
    } catch (error) {
      console.error(`Error linking ${provider} account:`, error);
    }
  };

  const handleOpenSettings = () => {
    router.push('/profile-settings');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Profile</Text>
        <TouchableOpacity onPress={handleOpenSettings}>
          <IconSymbol name="pencil" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.profileCard, { backgroundColor: theme.colors.card }]}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.colors.text }]}>
              {user?.isAnonymous ? 'Guest User' : 'Registered User'}
            </Text>
            <Text style={[styles.profileEmail, { color: theme.colors.textSecondary }]}>
              {user?.isAnonymous ? 'Anonymous Account' : 'user@example.com'}
            </Text>
            <View style={[styles.badge, { backgroundColor: subscriptionStatus === 'active' ? colors.success + '20' : colors.warning + '20' }]}>
              <Text style={[styles.badgeText, {
                color: subscriptionStatus === 'active' ? colors.success : colors.warning
              }]}>
                {subscriptionStatus === 'active' ? 'Premium' : 'Free Plan'}
              </Text>
            </View>
          </View>
        </View>

        {user?.isAnonymous && (
          <View style={[styles.linkAccountSection, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Link Your Account
            </Text>
            <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>
              Sign in with a provider to save your data and access from multiple devices
            </Text>
            <View style={styles.linkButtonsContainer}>
              <Button
                title="Sign in with Google"
                onPress={() => handleLinkAccount('google')}
                style={styles.linkButton}
                variant="outline"
              />
              <Button
                title="Sign in with Apple"
                onPress={() => handleLinkAccount('apple')}
                style={styles.linkButton}
                variant="outline"
              />
            </View>
          </View>
        )}

        {subscriptionStatus !== 'active' && (
          <View style={[styles.subscriptionCard, { backgroundColor: theme.colors.card }]}>
            <View style={styles.subscriptionContent}>
              <Text style={[styles.subscriptionTitle, { color: theme.colors.text }]}>
                Upgrade to Premium
              </Text>
              <Text style={[styles.subscriptionDescription, { color: theme.colors.textSecondary }]}>
                Get access to all premium features and remove ads
              </Text>
            </View>
            <Button
              title="Upgrade"
              onPress={handleUpgrade}
              style={styles.upgradeButton}
            />
          </View>
        )}

        <View style={[styles.settingsSection, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Account Settings
          </Text>

          <TouchableOpacity
            style={styles.settingsItem}
            onPress={() => {
              capture('settings_item_pressed', { item: 'profile' });
            }}
          >
            <Text style={[styles.settingsItemText, { color: theme.colors.text }]}>
              Edit Profile
            </Text>
            <IconSymbol name="chevron.right" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsItem}
            onPress={() => {
              capture('settings_item_pressed', { item: 'notifications' });
            }}
          >
            <Text style={[styles.settingsItemText, { color: theme.colors.text }]}>
              Notification Preferences
            </Text>
            <IconSymbol name="chevron.right" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsItem}
            onPress={() => {
              capture('settings_item_pressed', { item: 'privacy' });
            }}
          >
            <Text style={[styles.settingsItemText, { color: theme.colors.text }]}>
              Privacy Settings
            </Text>
            <IconSymbol name="chevron.right" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  linkAccountSection: {
    padding: 16,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
    lineHeight: 20,
  },
  linkButtonsContainer: {
    gap: 8,
  },
  linkButton: {
    marginVertical: 4,
  },
  subscriptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  subscriptionContent: {
    flex: 1,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  subscriptionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  upgradeButton: {
    minWidth: 100,
  },
  settingsSection: {
    padding: 16,
    borderRadius: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.1)',
  },
  settingsItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});