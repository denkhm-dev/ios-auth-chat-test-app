import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { ActivityIndicator, StyleSheet, View } from "react-native";

import Auth from "../components/Auth";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useColors } from "@/hooks/useColors";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

function AuthWrapper() {
  const { user, loading } = useAuth();
  const colorScheme = useColorScheme();
  const colors = useColors();
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
