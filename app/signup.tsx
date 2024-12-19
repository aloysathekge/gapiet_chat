import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
} from "react-native";
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

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, session } = useSupabase();

  const handleConfirmPassword = () => {
    Keyboard.dismiss();
    if (confirmPassword !== password) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (password.length < 7) {
      setPasswordError("Requires 8 or more characters");
      return;
    }
    handleSignUp();
  };

  const handleSignUp = async () => {
    //
    if (!email || !password) {
      Alert.alert("SignUp Error", "please fill all Inputs");
    }
    setLoading(true);
    try {
      console.log("Session before signup:", session);

      await signUp(email, password, name);
      console.log("Session after signup:", session);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppScreenContainer containerStyle={{ backgroundColor: "#fff" }}>
      <BackButton router={router} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: theme.Units.medium,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <ThemedText type="title">Hey, </ThemedText>
          <ThemedText type="title">Welcome to Gapiet </ThemedText>

          <View style={styles.form}>
            <ThemedText type="default">
              Please fill in to create an Account
            </ThemedText>
            <AppTextInput
              icon={<Icon name="user" size={26} strokeWidth={1.6} />}
              placeholder="Please enter your name"
              onChangeText={setName}
              returnKeyType="next"
            />
            <AppTextInput
              icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
              placeholder="Please enter your email"
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
            <AppTextInput
              icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
              placeholder="Please enter your password"
              secureTextEntry
              onChangeText={setPassword}
              returnKeyType="done"
              onSubmitEditing={handleSignUp}
            />
            <AppTextInput
              icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
              placeholder="confirm your password"
              secureTextEntry
              onChangeText={setConfirmPassword}
              returnKeyType="done"
              onSubmitEditing={handleConfirmPassword}
            />
            <AppButton
              label="Signup"
              onPress={handleConfirmPassword}
              loading={loading}
            />
            <Text
              style={{
                alignSelf: "center",
                fontSize: 12,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {passwordError}
            </Text>
            <View style={styles.footer}>
              <ThemedText type="default">have an account already? </ThemedText>
              <Pressable onPress={() => router.push("/login")}>
                <ThemedText type="link">Login </ThemedText>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
