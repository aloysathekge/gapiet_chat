import { StyleProp, View, ViewStyle } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

export const AppScreenContainer = ({
  children,
  containerStyle,
}: {
  children: any;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <>
      <StatusBar />
      <View
        style={[
          {
            paddingTop: Constants.statusBarHeight,
            flex: 1,
          },
          containerStyle,
        ]}
      >
        {children}
      </View>
    </>
  );
};
