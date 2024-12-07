import { AppScreenContainer } from "@/components/AppScreenContainer";
import { ScreenContent } from "@/components/ScreenContent";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <AppScreenContainer>
      <ScreenContent>
        <View style={{ padding: 10 }}>
          <Text>Hey welcome to Gapiet chats</Text>
          <Button
            title="go to welcome"
            onPress={() => router.push("./welcomeScreen")}
          />
        </View>
      </ScreenContent>
    </AppScreenContainer>
  );
}
