import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as AppleAuthentication from 'expo-apple-authentication';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/context/ThemeContext';
import { usePostHog } from '@/hooks/usePostHog';
import Button from '@/components/common/Button';
import { colors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignInScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const { signInWithGoogle, signInWithApple, signInAnonymously } = useAuth();
  const { capture } = usePostHog();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      capture('sign_in_attempt', { method: 'google' });
      await signInWithGoogle();
      router.replace('/(app)/(tabs)');
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setIsLoading(true);
      capture('sign_in_attempt', { method: 'apple' });
      await signInWithApple();
      router.replace('/(app)/(tabs)');
    } catch (error) {
      console.error('Apple sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    try {
      setIsLoading(true);
      capture('sign_in_attempt', { method: 'anonymous' });
      await signInAnonymously();
      router.replace('/(app)/(tabs)');
    } catch (error) {
      console.error('Anonymous sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.headerBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.content}>
        <Animated.View
          entering={FadeIn.duration(800)}
          style={styles.logoContainer}
        >
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            }}
            style={styles.logo}
          />
        </Animated.View>

        <Animated.View
          entering={FadeIn.delay(300).duration(800)}
          style={styles.textContainer}
        >
          <Text style={[styles.title, { color: theme.colors.text }]}>
            ExpressExpo
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.textSecondary }]}
          >
            Sign in to continue to your account
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeIn.delay(600).duration(800)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            style={[
              styles.socialButton,
              { backgroundColor: theme.colors.card },
            ]}
            onPress={handleGoogleSignIn}
            disabled={isLoading}
          >
            <Feather name="chrome" size={24} color="#4285F4" />
            <Text
              style={[styles.socialButtonText, { color: theme.colors.text }]}
            >
              Continue with Google
            </Text>
          </TouchableOpacity>

          {Platform.OS === 'ios' && (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              cornerRadius={8}
              style={styles.appleButton}
              onPress={handleAppleSignIn}
            />
          )}

          <Button
            title="Continue as Guest"
            onPress={handleGuestSignIn}
            style={styles.guestButton}
            variant="outline"
            isLoading={isLoading}
          />
        </Animated.View>

        <Text style={[styles.termsText, { color: theme.colors.textTertiary }]}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 8,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  socialButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  appleButton: {
    width: '100%',
    height: 50,
    marginBottom: 16,
  },
  guestButton: {
    marginTop: 8,
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    marginTop: 20,
    paddingHorizontal: 40,
  },
});
