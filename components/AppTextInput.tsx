import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { hp } from "@/helpers/common";
import { theme } from "@/constants/theme";

type appTextInputProps = TextInputProps & {
  containerStyle?: ViewStyle;
  icon?: React.ReactNode; // this uses the SVG, We can change it later to use icons
  inputRef?: React.RefObject<TextInput>;
};

export default function AppTextInput({
  containerStyle,
  icon,
  inputRef,
  ...props
}: appTextInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon && icon}
      <TextInput
        style={{ flex: 1 }}
        placeholderTextColor={theme.colors.textLight}
        ref={inputRef}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: hp(7.2),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.sm,
    borderCurve: "continuous",
    paddingHorizontal: 18,
    gap: 12,
  },
});
