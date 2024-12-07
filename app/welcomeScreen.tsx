import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AppScreenContainer } from "@/components/AppScreenContainer";
import { ScreenContent } from "@/components/ScreenContent";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { AppButton } from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";

export default function welcomeScreen() {
  const router = useRouter();
  return (
    <AppScreenContainer>
      <ScreenContent style={{ paddingHorizontal: wp(10) }}>
        <View style={styles.container}>
          <Image
            style={styles.welcomeImage}
            resizeMode="contain"
            source={require("../assets/images/welcome.png")}
          />

          {/* Title */}
          <View style={{ gap: 10, marginBottom: hp(4) }}>
            <Text style={styles.title}>Gapiet!</Text>
            <Text style={styles.punchline}>connecting people of Gapiet</Text>
          </View>
          <View style={styles.footer}>
            <AppButton
              label="Getting Started"
              onPress={() => router.push("/signup")}
            />
            <View style={styles.buttonLoginContainer}>
              <ThemedText>Have an Account already? </ThemedText>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <ThemedText type="link">Sign in</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScreenContent>
    </AppScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: wp(4),
    gap: 30,
  },
  welcomeImage: {
    height: hp(30),
    width: wp(100),
    alignSelf: "center",
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(4),
    textAlign: "center",
    fontWeight: "800",
  },
  punchline: {
    textAlign: "center",
    paddingHorizontal: wp(10),
    fontSize: hp(2),
    color: theme.colors.text,
  },
  footer: {
    gap: theme.Units.medium,
    width: "100%",
  },
  buttonLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
