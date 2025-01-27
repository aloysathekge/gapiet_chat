import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { commentsType, commentWithUser } from "@/lib/types";
import { formatTime, hp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Avatar from "./Avatar";
import { getImageFromUser } from "@/app/utils/getUserImage";
import Icon from "@/assets/icons";
type commentItemProp = {
  item: commentWithUser;
  canDelete: boolean;
  onDelete: (item: commentWithUser) => void;
  deleting: boolean;
  highlight: boolean;
};
export default function CommentItem({
  item,
  canDelete,
  onDelete,
  deleting,
  highlight,
}: commentItemProp) {
  const handleDeleteComment = () => {
    Alert.alert("Confirm", "are you sure you want to delete comment?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancelled to delete comment");
        },
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          onDelete(item);
        },
        style: "destructive",
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <Avatar
        uri={getImageFromUser(item.user)}
        rounded={theme.radius.sm}
        size={hp(4.3)}
        style={{ borderWidth: 2 }}
      />
      <View style={[styles.content, highlight && styles.highlight]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.nameContainer}>
            <Text style={styles.text}>{item.user.name}</Text>
            <Text style={[styles.text, { color: theme.colors.textLight }]}>
              {formatTime(item.created_at, false)}
            </Text>
          </View>
          {canDelete && (
            <TouchableOpacity onPress={handleDeleteComment}>
              {deleting ? (
                <ActivityIndicator />
              ) : (
                <Icon name="delete" color={theme.colors.rose} size={20} />
              )}
            </TouchableOpacity>
          )}
        </View>
        <Text>{item.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: hp(1.6),
    fontWeight: "600",
    color: theme.colors.textDark,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  highlight: {
    borderWidth: 0.2,
    backgroundColor: "#fff",
    borderColor: theme.colors.textDark,
    shadowColor: theme.colors.textDark,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.06)",
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 7,
  },
});
