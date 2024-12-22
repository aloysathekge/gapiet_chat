
import { UriProps } from "react-native-svg";
import { Database } from "./database.types";

export type userType = Database["public"]["Tables"]["users"]["Row"];
export type postType = Database["public"]["Tables"]["posts"]["Row"];
export interface PostWithUser extends postType {
  user: userType;
}



export type fileType={
    folderName: string,
  fileUri: UriProps,
  isImage: boolean
}