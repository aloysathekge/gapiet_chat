import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import Icon from "@/assets/icons";
import { hp, wp } from "@/helpers/common";
import { useRouter } from "expo-router";
import BackButton from "./BackButton";
import { theme } from "@/constants/theme";

type AppHeaderProps = {
  title: string;
  showBackButton: boolean;
  mB: number;
  containerStyle?: StyleProp<ViewStyle>;
};
export default function AppHeader({
  title,
  showBackButton,
  mB,
}: AppHeaderProps) {
  const router = useRouter();
  return (
    <View style={[styles.container, { marginBottom: mB }]}>
      <View style={styles.showBackButton}>
        {showBackButton && <Icon name="arrowLeft" onPress={router.back} />}
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 5,
  },
  showBackButton: {
    position: "absolute",
    left: 0,
  },
  title: {
    fontSize: hp(2.7),
    fontWeight: "600",
    color: theme.colors.dark,
  },
});
