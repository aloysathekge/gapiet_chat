import { AppScreenContainer } from "@/components/AppScreenContainer";
import { ScreenContent } from "@/components/ScreenContent";
import { useRouter } from "expo-router";
import { ActivityIndicator, Button, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <AppScreenContainer>
      <ScreenContent>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      </ScreenContent>
    </AppScreenContainer>
  );
}
