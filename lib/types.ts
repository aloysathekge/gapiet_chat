
import { UriProps } from "react-native-svg";
import { Database } from "./database.types";

export type userType = Database["public"]["Tables"]["users"]["Row"];


export type fileType={
    folderName: string,
  fileUri: UriProps,
  isImage: boolean
}