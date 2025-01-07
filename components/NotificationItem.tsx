import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";
import { formatTime, hp } from "@/helpers/common";
import { Router } from "expo-router";
import { NotificationType } from "@/lib/types";
import Avatar from "./Avatar";
import { getImageFromUser } from "@/app/utils/getUserImage";
import { useGetUser } from "@/hooks/queries";
type notificationItemProps = {
  router: Router;
  item: NotificationType;
};
export default function NotificationItem({
  router,
  item,
}: notificationItemProps) {
  const handleNotification = () => {
    let { postId, commentId } = JSON.parse(item?.data);
    router.push({
      pathname: "/PostDetailsScreen",
      params: { postId, commentId },
    });
  };
  const { data: senderDetails } = useGetUser(item.senderId);
  console.log("Notification item Sender", senderDetails?.name);
  return (
    <TouchableOpacity style={styles.container} onPress={handleNotification}>
      <Avatar uri={getImageFromUser(senderDetails ?? null)} size={hp(5)} />
      <View style={styles.nameTitle}>
        <Text style={styles.text}>{senderDetails?.name}</Text>
        <Text style={[styles.text, { color: theme.colors.textDark }]}>
          {item.title}
        </Text>
      </View>
      <Text style={[styles.text, { color: theme.colors.textLight }]}>
        {formatTime(item.created_at ?? "")}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: theme.colors.darkLight,
    padding: 15,
    borderRadius: theme.radius.xxl,
    borderCurve: "continuous",
  },
  nameTitle: {
    flex: 1,
    gap: 2,
  },
  text: {
    fontSize: hp(1.6),
    fontWeight: "600",
    color: theme.colors.text,
  },
});
