import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Icon from "@/assets/icons";
import { useRouter } from "expo-router";
import Avatar from "./Avatar";
import { useGetUserImage } from "@/app/utils/getUserImage";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function MainHeader() {
  const router = useRouter();

  const getUserImage = useGetUserImage();
  const itemCount = 12;
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Gapiet</Text>
      <View style={styles.icons}>
        <Pressable onPress={() => router.push("/(main)/NotificationsScreen")}>
          <Ionicons
            name="notifications-outline"
            size={hp(3.2)}
            strokeWidth={2}
            color={theme.colors.text}
          />
          {/* {itemCount > 0 && (
            <View
              style={{
                position: "absolute",
                right: -6,
                top: -8,
                backgroundColor: "red",
                height: hp(5),
                borderRadius: 50,
                paddingHorizontal: 6,
                paddingVertical: 2,
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>{itemCount}</Text>
            </View>
          )} */}
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
});
