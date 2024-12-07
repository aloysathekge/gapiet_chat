import {
  Text,
  StyleSheet,
  StyleProp,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Pressable,
  ViewStyle,
} from "react-native";
import { ReactNode, useState } from "react";
import { theme } from "@/constants/theme";

export type AppButtonProps = {
  label: string;
  endIcon?: ReactNode;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "standard";
};

export const AppButton = (props: AppButtonProps) => {
  const [onMe, setOnMe] = useState(false);
  const {
    loading,
    label,
    onPress,
    containerStyle,
    variant,
    disabled,
    endIcon,
    size,
  } = props;

  const handlePress = () => {
    if (disabled) {
      return;
    }
    onPress();
  };

  if (variant === "text") {
    return (
      <Pressable
        style={[styles.textButtonContainer, containerStyle]}
        onPress={handlePress}
        onHoverIn={() => setOnMe(true)}
        onHoverOut={() => setOnMe(false)}
      >
        <Text
          style={[
            styles.label,
            styles.textButtonLabel,
            disabled ? styles.disabledLabelStyle : {},
            {
              color: onMe ? "#3a86f2" : theme.colors.primary,
              textDecorationLine: onMe ? "underline" : "none",
            },
          ]}
        >
          {label}
        </Text>
        {loading && <ActivityIndicator />}
      </Pressable>
    );
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        ...(variant === "outlined"
          ? {
              ...styles.baseContainer,
              backgroundColor: disabled ? "gray" : "#fff",
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: "#ccc",
            }
          : {
              ...styles.baseContainer,
              ...styles.containerShadow,
              backgroundColor: disabled ? "gray" : theme.colors.primary,
            }),

        //
        ...(size === "small"
          ? {
              paddingVertical: 0,
              height: 32,
              borderRadius: 8,
              paddingHorizontal: 8,
            }
          : {}),
        //
        ...(size === "medium"
          ? { paddingVertical: 0, height: 40, borderRadius: 8 }
          : {}),
        // @ts-ignore
        ...containerStyle,
      }}
      onPress={handlePress}
    >
      <Text
        style={[
          styles.label,
          { color: variant === "outlined" ? "#000" : "#fff" },
        ]}
      >
        {label}
      </Text>
      {!loading && endIcon && (
        <View
          style={{
            marginLeft:
              size === "small" ? theme.Units.extraSmall : theme.Units.small,
          }}
        >
          {endIcon}
        </View>
      )}
      {loading && (
        <ActivityIndicator
          style={{ paddingLeft: theme.Units.big }}
          color={"#fff"}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingHorizontal: theme.Units.small,
    height: 16 * 3,
  },
  containerShadow: {
    elevation: 1.4,
    shadowRadius: 1.62,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
  },
  textButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    display: "flex",
    paddingHorizontal: theme.Units.extraSmall,
    paddingVertical: theme.Units.small,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    flexWrap: "nowrap",
    flexShrink: 0,
  },
  textButtonLabel: {
    color: theme.colors.primary,
  },
  disabledLabelStyle: {
    color: "gray",
  },
});
