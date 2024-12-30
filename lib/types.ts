
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

export interface commentWithUser extends commentsType{
  user:userType
}


export type fileType={
    folderName: string,
  fileUri: UriProps,
  isImage: boolean
}

export interface NotificationType {
  id: string;
  senderId: string;
  receiverId: string;
  title: string;
  data: string;
  created_at?: string;
  user:userType
 
}