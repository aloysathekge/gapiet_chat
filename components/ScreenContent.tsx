import { ActivityIndicator, StyleProp, ViewStyle, View } from "react-native";

export const ScreenContent = ({
  children,
  loading,
  style,
  canvas,
}: {
  children: any;
  loading?: boolean;
  canvas?: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: "#fff",
        },
        style,
      ]}
    >
      {loading && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ActivityIndicator size={18} />
        </View>
      )}
      {!loading && <>{children}</>}
    </View>
  );
};
