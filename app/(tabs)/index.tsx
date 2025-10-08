import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import { HelloWave } from "@/components/hello-wave";

import { useAuth } from "../../contexts/AuthContext";

import { useColors } from "../../hooks/useColors";

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const colorScheme = useColorScheme();
  const colors = useColors();

  const handleSignOut = () => {
    Alert.alert("Quit", "Are you sure you want to quit?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Quit",
        style: "destructive",
        onPress: signOut,
      },
    ]);
  };

  return (
    <>
      <SafeAreaView
        style={[
          styles.safeArea,
          { backgroundColor: colors.background.surface },
        ]}
      >
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text.primary }]}>
              Welcome!
            </Text>
            <HelloWave />
          </View>

          {user && (
            <View
              style={[
                styles.userContainer,
                { backgroundColor: colors.background.surfaceVariant },
              ]}
            >
              <Text style={[styles.title, { color: colors.text.primary }]}>
                Hello, {user.email}!
              </Text>
              <TouchableOpacity
                style={[
                  styles.signOutButton,
                  { backgroundColor: colors.error[500] },
                ]}
                onPress={handleSignOut}
              >
                <Text
                  style={[styles.signOutText, { color: colors.text.primary }]}
                >
                  Quit
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  userContainer: {
    gap: 8,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  signOutButton: {
    padding: 12,
    marginTop: 16,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  signOutText: {
    color: "#fff",
    fontWeight: "600",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
