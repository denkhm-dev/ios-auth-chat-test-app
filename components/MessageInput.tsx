import React, { useState } from "react";

import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { useColors } from "../hooks/useColors";
import { supabase } from "../utils/supabase";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { user } = useAuth();
  const colors = useColors();

  const sendMessage = async () => {
    if (!message.trim() || !user) return;

    setSending(true);
    try {
      const { error } = await supabase.from("messages").insert({
        content: message.trim(),
        user_id: user.id,
        user_email: user.email,
      });

      if (error) {
        Alert.alert("Error", "Failed to send message");
        console.error("Error sending message:", error);
      } else {
        setMessage("");
        Keyboard.dismiss();
      }
    } catch (error) {
      Alert.alert("Error", "Failed to send message");
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background.surface }]}
    >
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.chat.inputBackground,
            borderColor: colors.chat.inputBorder,
            color: colors.text.primary,
          },
        ]}
        value={message}
        onChangeText={setMessage}
        placeholder="Enter message..."
        placeholderTextColor={colors.text.secondary}
        multiline
        maxLength={500}
        editable={!sending}
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          {
            backgroundColor:
              !message.trim() || sending
                ? colors.chat.sendButtonDisabled
                : colors.chat.sendButton,
          },
        ]}
        onPress={sendMessage}
        disabled={!message.trim() || sending}
      >
        <Text style={styles.sendButtonText}>{sending ? "..." : "➤"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    maxHeight: 100,
    minHeight: 44,
    fontSize: 16,
    textAlignVertical: "top",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
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
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
