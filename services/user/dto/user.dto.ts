export interface CreateUserDto {
  email: string;
  passHash: string;
  location?: string;
  name: string;
  image?: string;
  phoneNumber?: string;
}

export interface UpdateUserDto {
  location?: string;
  name?: string;
  image?: string;
  phoneNumber?: string;
}
export interface UserProfileResDto {
  email: string;
  location: string;
  name: string;
  image: string;
  phoneNumber: string;
  isVerified: boolean;
}

export interface ListedRentalsResDto {
  id: string;
  paymentPlan: "DAILY" | "MONTHLY";
  isVerified: boolean;
  rentalCounty: string;
  rentalName: string;
  rentalTown: string;
}
