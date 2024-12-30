import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { Router } from "expo-router";
import { NotificationType } from "@/lib/types";
import Avatar from "./Avatar";
import { getImageFromUser } from "@/app/utils/getUserImage";
type notificationItemProps = {
  router: Router;
  item: NotificationType;
};
export default function NotificationItem({
  router,
  item,
}: notificationItemProps) {
  const handleNotification = () => {
    router.push("/(main)/PostDetailsScreen");
  };
  console.log("Notification item", item.user);
  return (
    <TouchableOpacity style={styles.container} onPress={handleNotification}>
      <Avatar uri={getImageFromUser(item?.user)} size={hp(5)} />
      <Text>NotificationItem</Text>
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
