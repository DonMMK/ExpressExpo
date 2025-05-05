import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { usePostHog } from '@/hooks/usePostHog';
import Button from '@/components/common/Button';
import { colors } from '@/constants/colors';

export default function ProfileSettingsScreen() {
  const { theme } = useTheme();
  const { user, updateUserProfile, deleteAccount } = useAuth();
  const { capture } = usePostHog();
  const router = useRouter();

  const [name, setName] = useState('User Name');
  const [email, setEmail] = useState('user@example.com');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    capture('screen_view', { screen: 'ProfileSettings' });
  }, []);

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      capture('profile_updated');
      await updateUserProfile({ displayName: name });
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              setIsLoading(true);
              capture('account_deleted');
              await deleteAccount();
              router.replace('/(auth)/sign-in');
            } catch (error) {
              console.error('Error deleting account:', error);
              Alert.alert('Error', 'Failed to delete account');
              setIsLoading(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Profile Information
          </Text>
          <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>
            Update your personal information
          </Text>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Name</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.card,
                  color: theme.colors.text,
                  borderColor: theme.colors.border
                }
              ]}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={theme.colors.textTertiary}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.card,
                  color: theme.colors.text,
                  borderColor: theme.colors.border
                }
              ]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={theme.colors.textTertiary}
              keyboardType="email-address"
              editable={!user?.isAnonymous}
            />
            {user?.isAnonymous && (
              <Text style={[styles.helperText, { color: theme.colors.textTertiary }]}>
                Sign in with a provider to set an email address
              </Text>
            )}
          </View>

          <Button
            title="Save Changes"
            onPress={handleSaveChanges}
            style={styles.saveButton}
            isLoading={isLoading}
            disabled={user?.isAnonymous}
          />
        </View>

        <View style={[styles.dangerSection, { backgroundColor: colors.error + '10' }]}>
          <Text style={[styles.dangerTitle, { color: colors.error }]}>
            Delete Account
          </Text>
          <Text style={[styles.dangerDescription, { color: theme.colors.textSecondary }]}>
            This action will permanently delete your account and all associated data. This cannot be undone.
          </Text>

          <TouchableOpacity
            style={[styles.deleteButton, { borderColor: colors.error }]}
            onPress={handleDeleteAccount}
            disabled={isLoading}
          >
            <Text style={[styles.deleteButtonText, { color: colors.error }]}>
              Delete Account
            </Text>
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    gap: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  helperText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  saveButton: {
    marginTop: 16,
  },
  dangerSection: {
    padding: 16,
    borderRadius: 16,
  },
  dangerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  dangerDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
    lineHeight: 20,
  },
  deleteButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});