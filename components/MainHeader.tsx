import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Icon from "@/assets/icons";
import { useRouter } from "expo-router";

export default function MainHeader() {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Gapiet</Text>
      <View style={styles.icons}>
        <Pressable onPress={() => router.push("/notifications")}>
          <Icon
            name="heart"
            size={hp(3.2)}
            strokeWidth={2}
            color={theme.colors.text}
          />
        </Pressable>
        <Pressable>
          <Icon
            name="plus"
            size={hp(3.2)}
            strokeWidth={2}
            color={theme.colors.text}
          />
        </Pressable>
        <Pressable onPress={() => router.push("/profile")}>
          <Icon
            name="user"
            size={hp(3.2)}
            strokeWidth={2}
            color={theme.colors.text}
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
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderColor: theme.colors.gray,
    borderWidth: 3,
    borderCurve: "continuous",
  },
  icons: {
    flexDirection: "row",
    gap: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
