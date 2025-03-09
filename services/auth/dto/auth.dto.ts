import { Roles } from "@/enums";

export interface LoginDto {
  email: string;
  password: string;
}
export interface FindByEmailResDto {
  email: string;
  hasPassword: boolean;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: string;

  schoolName: string;
  schoolAddress: string;
}

export interface LoginResDto {
  accessToken: string;
  refreshToken: string;
  id: string;
  name: string;
  email: string;
  role: Roles;

  school: { id: string; name: string; address: string } | null;
}

export interface RefreshAccessTokenResDto {
  accessToken: string;
  refreshToken: string;
}

export interface CreatePasswordDto {
  email: string;
  password: string;
}
