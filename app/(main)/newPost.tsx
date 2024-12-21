import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { AppScreenContainer } from "@/components/AppScreenContainer";
import AppHeader from "@/components/AppHeader";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Avatar from "@/components/Avatar";
import { useSupabase } from "@/providers/supabase-provider";
import useGetUserImage, { getSupabaseFileUrl } from "../utils/getUserImage";
import RichTextEditor from "@/components/RichTextEditor";
import { useRouter } from "expo-router";
import { RichEditor } from "react-native-pell-rich-editor";
import Icon from "@/assets/icons";
import { AppButton } from "@/components/AppButton";
import * as ImagePicker from "expo-image-picker";
import { Video, ResizeMode } from "expo-av";

type MediaFile = ImagePicker.ImagePickerAsset | string;

export default function NewPost() {
  const { userProfile: user } = useSupabase();
  const getUserImage = useGetUserImage();

  //Post media
  const [image, setImage] = useState<string | null>(null);

  const bodyRef = useRef("");
  const editorRef = useRef<RichEditor>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const onPick = async (isImage: boolean) => {
    let mediaConfig = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3] as [number, number],
      quality: 0.7,
    };
    if (!isImage) {
      mediaConfig = {
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      };
    }
    let result = await ImagePicker.launchImageLibraryAsync(mediaConfig);

    console.log(result);

    if (!result.canceled) {
      setFile(result.assets[0]);
      console.log("Selected image URI:", result.assets[0].type);
      console.log("Image state after setting:", image);

      //Set a Post
      //setUser({ ...user, image: result.assets[0].uri });
    }
  };

  const onSubmit = async () => {
    //submit Post
  };
  const getFileUri = (file: MediaFile): string | undefined => {
    if (isLocal(file)) {
      return file.uri;
    }
    // If it's already a string URI, return it directly

    return getSupabaseFileUrl(file).uri;
  };
  const isLocal = (file: MediaFile): file is ImagePicker.ImagePickerAsset => {
    return typeof file === "object" && file !== null;
  };
  const getFileType = (file: MediaFile) => {
    if (isLocal(file)) {
      return (file as ImagePicker.ImagePickerAsset).type;
    }
    if (typeof file === "string" && file.includes("postImage")) {
      return "image";
    }
  };
  return (
    <AppScreenContainer>
      <AppHeader title="Create Post" mB={30} showBackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: theme.Units.medium,
            gap: 20,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Avatar */}
          <View style={styles.header}>
            <Avatar
              uri={getUserImage()}
              rounded={theme.radius.xl}
              size={hp(6.5)}
            />
            <View style={{ gap: 2 }}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.public}>public</Text>
            </View>
          </View>

          <View style={styles.textEditor}>
            <RichTextEditor
              editorRef={editorRef}
              onChange={(body) => (bodyRef.current = body)}
            />
          </View>
          {file && (
            <View style={styles.files}>
              {getFileType(file) == "video" ? (
                <Video
                  style={{ flex: 1 }}
                  source={{ uri: getFileUri(file) ?? "" }}
                  resizeMode="cover"
                  isLooping
                  useNativeControls
                />
              ) : (
                <>
                  <Image
                    resizeMode="cover"
                    source={{ uri: getFileUri(file) }}
                    style={{ flex: 1 }}
                  />
                </>
              )}
              <Pressable style={styles.closeIcon} onPress={() => setFile(null)}>
                <Icon name="delete" size={22} color={"white"} />
              </Pressable>
            </View>
          )}
          <View style={styles.media}>
            <Text style={styles.addImageText}>Add media</Text>
            <View style={styles.mediaIcons}>
              <TouchableOpacity onPress={() => onPick(true)}>
                <Icon name="image" size={30} color={theme.colors.dark} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPick(false)}>
                <Icon name="video" size={30} color={theme.colors.dark} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <AppButton
          label="Post"
          onPress={() => {
            onSubmit;
          }}
          disabled
          loading={false}
          containerStyle={{ margin: theme.Units.medium }}
        />
      </KeyboardAvoidingView>
    </AppScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15,
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: "600",
    color: theme.colors.text,
    textAlign: "center",
  },
  public: {
    fontSize: hp(1.7),
    fontWeight: "600",
    color: theme.colors.text,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: hp(2.2),
    fontWeight: "700",
    color: theme.colors.textLight,
  },
  textEditor: {},
  media: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    borderColor: theme.colors.gray,
    gap: 0,
  },
  mediaIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  addImageText: {
    fontSize: hp(1.9),
    fontWeight: "600",
    color: theme.colors.text,
  },
  files: {
    height: hp(40),
    width: "100%",
    borderRadius: theme.radius.xl,
    position: "relative", // Add this
    overflow: "hidden",
    borderCurve: "continuous",
  },
  image: {
    height: hp(14),
    width: hp(14),
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },

  closeIcon: {
    position: "absolute",
    top: 10,
    right: 0,
    marginRight: 6,
    borderRadius: 50,
    padding: 5,
    backgroundColor: "rgba(255,0,0,0.6)",
    color: "#fff",
  },
});
