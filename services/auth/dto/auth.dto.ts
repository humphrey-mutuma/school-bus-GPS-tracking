export interface AuthenticateDto {
  username: string;
  password: string;
}
export interface AuthenticateResDto {
  accessToken: string;
  refreshToken: string;
  userBookmarks: string[];
  id: string;
  image: string;
  isVerified: boolean;
}
 
export interface ResetUserPasswordDto {
  username: string;
  oldPassword: string;
  newPassword: string;
}

export interface VerifyUsernameDto {
  username: string;
}
export interface RefreshAccessTokenResDto {
  accessToken: string;
  refreshToken: string;
}
