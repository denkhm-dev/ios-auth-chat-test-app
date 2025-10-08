import React from "react";

import { StyleSheet, Text, View } from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { useColors } from "../hooks/useColors";

import { Message } from "../types/chat";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const { user } = useAuth();
  const colors = useColors();
  const isOwnMessage = user?.id === message.user_id;

  return (
    <View
      style={[
        styles.messageContainer,
        isOwnMessage ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          {
            backgroundColor: isOwnMessage
              ? colors.chat.ownMessage
              : colors.chat.otherMessage,
          },
        ]}
      >
        {!isOwnMessage && (
          <Text style={[styles.senderName, { color: colors.text.secondary }]}>
            {message.user_email}
          </Text>
        )}
        <Text
          style={[
            styles.messageText,
            {
              color: isOwnMessage
                ? colors.chat.ownMessageText
                : colors.chat.otherMessageText,
            },
          ]}
        >
          {message.content}
        </Text>
        <Text
          style={[
            styles.timestamp,
            {
              color: isOwnMessage
                ? colors.chat.ownMessageText
                : colors.chat.timestamp,
              textAlign: isOwnMessage ? "right" : "left",
            },
          ]}
        >
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  ownMessage: {
    alignItems: "flex-end",
  },
  otherMessage: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  senderName: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.9,
  },
});
