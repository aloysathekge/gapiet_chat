import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AppScreenContainer } from "@/components/AppScreenContainer";
import { ScreenContent } from "@/components/ScreenContent";
import { theme } from "@/constants/theme";
import AppHeader from "@/components/AppHeader";
import { useGetUser, useUpdateUser } from "@/hooks/queries";
import { useRouter } from "expo-router";
import { useSupabase } from "@/providers/supabase-provider";
import useGetUserImage, { uploadFile } from "../utils/getUserImage";
import Icon from "@/assets/icons";
import { hp } from "@/helpers/common";
import { userType } from "@/lib/types";
import AppTextInput from "@/components/AppTextInput";
import { AppButton } from "@/components/AppButton";
import * as ImagePicker from "expo-image-picker";

export default function EditProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
  const { userProfile: currentUser } = useSupabase();
  const getUserImage = useGetUserImage();
  const [user, setUser] = useState<userType>(currentUser as userType);
  const { updateUser, isLoading } = useUpdateUser();
  useEffect(() => {
    if (currentUser) {
      setUser(currentUser as userType);
    }
  }, [currentUser]);

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log("Selected image URI:", result.assets[0].uri);
      console.log("Image state after setting:", image);
      setUser({ ...user, image: result.assets[0].uri });
    }
  };

  const handleUpdateUser = async () => {
    try {
      let imageUrl = user.image;

      // If there's a new image selected, upload it first
      if (image && image !== currentUser?.image) {
        const { data: uploadData } = await uploadFile(
          "pictures",
          { uri: image },
          true
        );

        imageUrl = uploadData;
      }
      const { data, error } = await updateUser(user.id, {
        name: user.name,
        bio: user.bio,
        phone: user.phone,
        address: user.address,
        image: imageUrl,
      });
      if (error) throw error;
      // Show success message
      Alert.alert("Success", "Profile updated successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
      console.error("Error updating profile:", error);
    }
  };
  const hasChanges = JSON.stringify(user) !== JSON.stringify(currentUser);
  let imageSource = image ? { uri: image } : getUserImage();
  console.log("Current imageSource:", imageSource);
  return (
    <AppScreenContainer>
      <AppHeader
        title="Edit Profile"
        mB={30}
        showBackButton
        containerStyle={{}}
      />
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
          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image source={imageSource} style={styles.avatar} />
              <Pressable style={styles.icon} onPress={onPickImage}>
                <Icon name="camera" strokeWidth={2.5} />
              </Pressable>
            </View>
            <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
              Please fill your profile details
            </Text>
            <AppTextInput
              icon={<Icon name="user" size={26} strokeWidth={1.6} />}
              value={user?.name ?? ""}
              placeholder="Name"
              onChangeText={(value) => {
                setUser((prev) => ({ ...prev, name: value }));
              }}
              returnKeyType="next"
            />
            <AppTextInput
              icon={<Icon name="call" size={26} strokeWidth={1.6} />}
              value={user.phone ?? ""}
              placeholder="Phone Number"
              onChangeText={(value) =>
                setUser((prev) => ({ ...prev, phone: value }))
              }
              returnKeyType="next"
            />

            <AppTextInput
              icon={<Icon name="location" size={26} strokeWidth={1.6} />}
              value={user.address ?? ""}
              placeholder="Address"
              onChangeText={(value) =>
                setUser((prev) => ({ ...prev, address: value }))
              }
              returnKeyType="next"
            />
            <AppTextInput
              value={user.bio ?? ""}
              placeholder="bio"
              onChangeText={(value) =>
                setUser((prev) => ({ ...prev, bio: value }))
              }
              returnKeyType="next"
              multiline
              containerStyle={styles.bioInput}
            />
          </View>
          <AppButton
            label="Save"
            onPress={handleUpdateUser}
            disabled={!hasChanges}
            loading={isLoading}
            containerStyle={{ marginTop: 12 }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </AppScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 18,
    marginTop: 20,
  },
  avatarContainer: {
    height: hp(14),
    width: hp(14),
    alignSelf: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: theme.radius.xxl * 1.8,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: theme.colors.darkLight,
  },
  icon: {
    position: "absolute",
    bottom: 0,
    right: -10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#fff",
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  inputContainer: {
    width: "100%",
    gap: 16,
    marginTop: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.text,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: theme.colors.text,
  },
  bioInput: {
    flexDirection: "row",
    height: hp(15),
    alignItems: "flex-start",
    paddingVertical: 15,
  },
});
