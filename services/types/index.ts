export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  watchHistory: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IVideo {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
  owner: Pick<IUser, "_id" | "username" | "fullName" | "avatar">;
  createdAt: string;
  updatedAt: string;
}
