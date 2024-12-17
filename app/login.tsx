import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AppScreenContainer } from "@/components/AppScreenContainer";
import { ScreenContent } from "@/components/ScreenContent";
import BackButton from "@/components/BackButton";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import AppTextInput from "@/components/AppTextInput";
import Icon from "@/assets/icons";
import { AppButton } from "@/components/AppButton";
import { useSupabase } from "@/providers/supabase-provider";

export default function login() {
  const router = useRouter();
  const { signInWithPassword } = useSupabase();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    //
    if (!email || !password) {
      Alert.alert("Login Error", "please fill all Inputs");
    }

    setLoading(true);
    try {
      await signInWithPassword(email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error here", error);
    }
  };

  return (
    <AppScreenContainer>
      <BackButton router={router} />
      <ScreenContent style={{ padding: theme.Units.medium }}>
        <ThemedText type="title">Hey, </ThemedText>
        <ThemedText type="title">Welcome Back </ThemedText>
        {/* Form */}
        <View style={styles.form}>
          <ThemedText type="default">Please login to continue</ThemedText>

          <AppTextInput
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder="Please enter your email"
            onChangeText={(value) => {
              setEmail(value);
            }}
          />
          <AppTextInput
            icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
            placeholder="Please enter your password"
            secureTextEntry
            onChangeText={(value) => {
              setPassword(value);
            }}
          />
          <ThemedText
            type="defaultSemiBold"
            style={{ textAlign: "right", color: theme.colors.text }}
          >
            forgot password?
          </ThemedText>
          <AppButton label="Login" onPress={handleLogin} loading={loading} />

          <View style={styles.footer}>
            <ThemedText type="default"> Don't have an account? </ThemedText>
            <Pressable onPress={() => router.push("/signup")}>
              <ThemedText type="link">Sign Up </ThemedText>
            </Pressable>
          </View>
        </View>
      </ScreenContent>
    </AppScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: hp(1.6),
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
