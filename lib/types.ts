
import { UriProps } from "react-native-svg";
import { Database } from "./database.types";

export type userType = Database["public"]["Tables"]["users"]["Row"];
export type postType = Database["public"]["Tables"]["posts"]["Row"];
export type commentsType = Database["public"]["Tables"]["comments"]["Row"];


export type CreateLike = {
  userId: string;
  postId: number;
};

export type CreateComment= {
  postId: number;
  userId: string;
  text:string
};
export type postLikeType = Database["public"]["Tables"]["postLikes"]["Row"];

export interface PostWithUser extends postType {
  user: userType;
  postLikes:postLikeType[]
  comments:commentsType[]
}



export type fileType={
    folderName: string,
  fileUri: UriProps,
  isImage: boolean
}