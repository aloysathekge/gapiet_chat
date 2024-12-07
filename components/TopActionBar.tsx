import { theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export const ActionBarHeight = 52;
const itemsWidth = 106;

export type TopActionBarProps = {
  title: string;
  items?: React.ReactNode;
  showBackButton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  subTitle?: string;
  onBackPress?: () => void;
};

const TopActionBar = (props: TopActionBarProps) => {
  const { title, subTitle, items, containerStyle, onBackPress } = props;
  const { showBackButton = true } = props;
  const router = useRouter();
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }
    router.back();
  };

  return (
    <View style={{ ...styles.container, ...(containerStyle as ViewStyle) }}>
      <View style={{ width: itemsWidth }}>
        {(onBackPress || showBackButton) && (
          <TouchableOpacity
            onPress={handleBackPress}
            style={{ backgroundColor: "#fff" }}
          >
            <Ionicons
              name={"chevron-back"}
              size={28}
              color={theme.colors.primary}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.titlesContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subTitle && (
          <Text style={styles.subTitle} numberOfLines={1}>
            {subTitle}
          </Text>
        )}
      </View>

      <View style={styles.itemsContainer}>{items}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    display: "flex",
    paddingHorizontal: theme.Units.small,
    backgroundColor: "#fff",
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 100,
    height: ActionBarHeight,
  },
  backIcon: {
    marginRight: 16,
    marginLeft: -8,
  },
  titlesContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 12,
    color: "rgba(0,0,0,.6)",
  },
  itemsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    display: "flex",
    width: itemsWidth,
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
});

export default TopActionBar;
