import { useSupabase } from "@/providers/supabase-provider";
import { UriProps } from "react-native-svg";
import * as FileSystem from "expo-file-system";

export const useGetUserImage = () => {
  const { userProfile } = useSupabase();

  const getUserImage = () => {
    if (userProfile?.image && userProfile.image !== "") {
      return { uri: userProfile.image };
    } else {
      return require("@/assets/images/defaultUser.png");
    }
  };

  return getUserImage;
};

export default useGetUserImage;

export const uploadFile = async (
  folderName: string,
  fileUri: UriProps,
  isImage: boolean
) => {
  try {
    let fileName = getFilePath(folderName, isImage);
  } catch (error) {}
};
export const getFilePath = (folderName: string, isImage: boolean) => {
  return `/${folderName}/${new Date().getTime()}${isImage ? ".png" : ".mp4"}`;
};
