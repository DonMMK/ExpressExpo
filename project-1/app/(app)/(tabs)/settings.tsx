import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Moon, Sun, ChevronRight, LogOut } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { usePostHog } from '@/hooks/usePostHog';
import HeaderBar from '@/components/common/Header';
import { colors } from '@/constants/colors';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  const { capture, reset } = usePostHog();
  const router = useRouter();

  React.useEffect(() => {
    capture('screen_view', { screen: 'Settings' });
  }, []);

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: async () => {
            capture('user_signed_out');
            await signOut();
            reset();
            router.replace('/(auth)/sign-in');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <HeaderBar title="Settings" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Appearance
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              {theme.dark ? (
                <Moon size={20} color={theme.colors.text} style={styles.settingIcon} />
              ) : (
                <Sun size={20} color={theme.colors.text} style={styles.settingIcon} />
              )}
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={theme.dark}
              onValueChange={() => {
                toggleTheme();
                capture('theme_changed', { isDark: !theme.dark });
              }}
              trackColor={{ false: colors.gray, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Notifications
          </Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Push Notifications
            </Text>
            <Switch
              value={true}
              onValueChange={() => {
                capture('notification_setting_changed', { type: 'push' });
              }}
              trackColor={{ false: colors.gray, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Email Notifications
            </Text>
            <Switch
              value={false}
              onValueChange={() => {
                capture('notification_setting_changed', { type: 'email' });
              }}
              trackColor={{ false: colors.gray, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            About
          </Text>
          
          <TouchableOpacity 
            style={styles.settingItemWithArrow}
            onPress={() => capture('about_item_pressed', { item: 'privacy_policy' })}
          >
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Privacy Policy
            </Text>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItemWithArrow}
            onPress={() => capture('about_item_pressed', { item: 'terms_of_service' })}
          >
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Terms of Service
            </Text>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItemWithArrow}
            onPress={() => capture('about_item_pressed', { item: 'app_version' })}
          >
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              App Version
            </Text>
            <Text style={[styles.versionText, { color: theme.colors.textSecondary }]}>
              1.0.0
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.signOutButton, { backgroundColor: colors.error + '10' }]} 
          onPress={handleSignOut}
        >
          <LogOut size={20} color={colors.error} style={styles.signOutIcon} />
          <Text style={[styles.signOutText, { color: colors.error }]}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 16,
  },
  section: {
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.1)',
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  settingItemWithArrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.1)',
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  signOutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginVertical: 8,
  },
  signOutIcon: {
    marginRight: 8,
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});