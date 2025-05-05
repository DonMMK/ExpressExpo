import { useEffect } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

export default function Index() {
  const { isAuthenticated, isLoading, hasCompletedOnboarding } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Redirect based on authentication and onboarding status
  if (isAuthenticated) {
    return <Redirect href="/(app)/(tabs)" />;
  } else if (!hasCompletedOnboarding) {
    return <Redirect href="/(auth)/onboarding" />;
  } else {
    return <Redirect href="/(auth)/sign-in" />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});
