import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "@/assets/icons";
import { Router } from "expo-router";
import { theme } from "@/constants/theme";
type BackButtonProps = {
  router: Router;
};
export default function BackButton({ router }: BackButtonProps) {
  return (
    <View
      style={{
        paddingHorizontal: theme.Units.small,
        paddingVertical: theme.Units.small,
        backgroundColor: "#fff",
      }}
    >
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Icon name="arrowLeft" strokeWidth={2.9} size={26} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: "rgba(0,0,0,0.07)",
  },
});
