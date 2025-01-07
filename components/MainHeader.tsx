import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Icon from "@/assets/icons";
import { useRouter } from "expo-router";
import Avatar from "./Avatar";
import { useGetUserImage } from "@/app/utils/getUserImage";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
type mainHeaderProps = {
  notificationCount?: number;
};
export default function MainHeader({ notificationCount = 0 }: mainHeaderProps) {
  const router = useRouter();

  const getUserImage = useGetUserImage();
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Gapiet</Text>
      <View style={styles.icons}>
        <Pressable
          onPress={() => {
            if (notificationCount > 0) {
              notificationCount = 0;
            }
            router.push("/(main)/NotificationsScreen");
          }}
        >
          <Ionicons
            name="notifications-outline"
            size={hp(3.2)}
            strokeWidth={2}
            color={theme.colors.text}
          />
          {notificationCount > 0 && (
            <View style={styles.pill}>
              <Text style={styles.pillText}>{notificationCount}</Text>
            </View>
          )}
        </Pressable>

        <Pressable onPress={() => router.push("/newPost")}>
          <Icon
            name="plus"
            size={hp(3.2)}
            strokeWidth={2}
            color={theme.colors.text}
          />
        </Pressable>
        <Pressable onPress={() => router.push("/profile")}>
          <Avatar
            uri={getUserImage()}
            rounded={theme.radius.sm}
            size={hp(4.3)}
            style={{ borderWidth: 2 }}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: wp(4),
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: "bold",
  },
  icons: {
    flexDirection: "row",
    gap: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  pill: {
    position: "absolute",
    right: -7,
    top: -4,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: theme.colors.roseLight,
  },
  pillText: {
    color: "#fff",
    fontSize: hp(1.6),
    fontWeight: "bold",
  },
});
