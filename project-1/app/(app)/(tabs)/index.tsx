import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { usePostHog } from '@/hooks/usePostHog';
import HeaderBar from '@/components/common/HeaderBar';
import Card from '@/components/common/Card';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { capture } = usePostHog();

  React.useEffect(() => {
    capture('screen_view', { screen: 'Home' });
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <HeaderBar title="ExpressExpo" subtitle="Welcome back!" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeText, { color: theme.colors.text }]}>
            Hello, {user?.isAnonymous ? 'Guest' : 'User'}!
          </Text>
          <Text style={[styles.welcomeSubtext, { color: theme.colors.textSecondary }]}>
            Here's what's new today
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          <Animated.View entering={FadeInUp.delay(100).duration(400)}>
            <Card 
              title="Quick Start Guide"
              description="Learn the basics of ExpressExpo and get started in minutes."
              image="https://images.pexels.com/photos/7439094/pexels-photo-7439094.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              onPress={() => {}}
            />
          </Animated.View>
          
          <Animated.View entering={FadeInUp.delay(200).duration(400)}>
            <Card 
              title="Premium Features"
              description="Unlock all premium features with a subscription plan."
              image="https://images.pexels.com/photos/5605061/pexels-photo-5605061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              onPress={() => {}}
            />
          </Animated.View>
          
          <Animated.View entering={FadeInUp.delay(300).duration(400)}>
            <Card 
              title="Community Updates"
              description="See what's happening in the ExpressExpo community."
              image="https://images.pexels.com/photos/2422294/pexels-photo-2422294.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              onPress={() => {}}
            />
          </Animated.View>
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
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  welcomeSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  cardsContainer: {
    gap: 16,
  },
});