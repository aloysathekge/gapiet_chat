import { useSupabase } from "@/providers/supabase-provider";
import { UriProps } from "react-native-svg";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/lib/supabase";
import { userType } from "@/lib/types";

export const useGetUserImage = () => {
  const { userProfile } = useSupabase();

  const getUserImage = () => {
    if (userProfile?.image && userProfile.image !== "") {
      return getSupabaseFileUrl(userProfile.image);
    } else {
      return require("@/assets/images/defaultUser.png");
    }
  };

  return getUserImage;
};
export const getImageFromUser = (user: userType | null) => {
  if (user?.image && user.image !== "") {
    return getSupabaseFileUrl(user.image);
  }
  return require("@/assets/images/defaultUser.png");
};
export const getSupabaseFileUrl = (filePath: string) => {
  return {
    uri: `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pictures/${filePath}`,
  };
};

export const uploadFile = async (
  folderName: string,
  fileUri: UriProps,
  isImage: boolean
) => {
  try {
    let fileName = getFilePath(folderName, isImage);

    if (!fileUri.uri) {
      throw new Error("File URI is null or undefined");
    }

    // Read the file content
    const fileContent = await FileSystem.readAsStringAsync(fileUri.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert base64 to ArrayBuffer
    const arrayBuffer = decode(fileContent);

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from("pictures")
      .upload(fileName, arrayBuffer, {
        contentType: isImage ? "image/*" : "video/*",
        upsert: true,
      });

    if (error) {
      throw error;
    }
    console.log("data storaged is", data);
    return { success: true, data: data.path };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const getFilePath = (folderName: string, isImage: boolean) => {
  return `/${folderName}/${new Date().getTime()}${isImage ? ".png" : ".mp4"}`;
};

export default useGetUserImage;
