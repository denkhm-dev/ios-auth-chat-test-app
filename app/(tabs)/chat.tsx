import React, { useEffect, useRef, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MessageBubble from "../../components/MessageBubble";
import MessageInput from "../../components/MessageInput";

import { useAuth } from "../../contexts/AuthContext";
import { useColors } from "../../hooks/useColors";
import { useMessages } from "../../hooks/useMessages";

export default function ChatScreen() {
  const { user } = useAuth();
  const { messages, loading, error, refreshMessages } = useMessages();
  const colors = useColors();
  const flatListRef = useRef<FlatList>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  useEffect(() => {
    if (messages.length > 0 && !loading) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  }, [messages.length, loading]);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
    setShowScrollToBottom(false);
  };

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const isNearBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height - 100;
    setShowScrollToBottom(!isNearBottom);
  };

  if (!user) {
    return (
      <View
        style={[
          styles.safeArea,
          { backgroundColor: colors.background.surface },
        ]}
      >
        <SafeAreaView style={styles.safeAreaTop} edges={["top"]}>
          <View style={styles.centerContainer}>
            <Text style={[styles.errorText, { color: colors.error[500] }]}>
              You need to login to the account
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (loading && messages.length === 0) {
    return (
      <View
        style={[
          styles.safeArea,
          { backgroundColor: colors.background.surface },
        ]}
      >
        <SafeAreaView style={styles.safeAreaTop} edges={["top"]}>
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.primary[500]} />
            <Text
              style={[styles.loadingText, { color: colors.text.secondary }]}
            >
              Loading messages...
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.safeArea,
          { backgroundColor: colors.background.surface },
        ]}
      >
        <SafeAreaView style={styles.safeAreaTop} edges={["top"]}>
          <View style={styles.centerContainer}>
            <Text style={[styles.errorText, { color: colors.error[500] }]}>
              {error}
            </Text>
            <Text
              style={[styles.retryText, { color: colors.primary[500] }]}
              onPress={refreshMessages}
            >
              Try again
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View
      style={[styles.safeArea, { backgroundColor: colors.background.surface }]}
    >
      <SafeAreaView style={styles.safeAreaTop} edges={["top"]}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <View style={styles.container}>
            <View
              style={[
                styles.header,
                { backgroundColor: colors.background.light },
              ]}
            >
              <Text
                style={[styles.headerTitle, { color: colors.text.primary }]}
              >
                Chat
              </Text>
              <Text
                style={[
                  styles.headerSubtitle,
                  { color: colors.text.secondary },
                ]}
              >
                {messages.length} messages
              </Text>
            </View>

            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MessageBubble message={item} />}
              style={styles.messagesList}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
              onRefresh={refreshMessages}
              refreshing={loading}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
              onScroll={handleScroll}
              scrollEventThrottle={16}
              maintainVisibleContentPosition={{
                minIndexForVisible: 0,
                autoscrollToTopThreshold: 10,
              }}
            />

            {showScrollToBottom && (
              <TouchableOpacity
                style={[
                  styles.scrollToBottomButton,
                  { backgroundColor: colors.primary[500] },
                ]}
                onPress={scrollToBottom}
              >
                <Text style={styles.scrollToBottomText}>↓</Text>
              </TouchableOpacity>
            )}

            <MessageInput />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  safeAreaTop: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 8,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
  },
  retryText: {
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  scrollToBottomButton: {
    position: "absolute",
    bottom: 85,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollToBottomText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
