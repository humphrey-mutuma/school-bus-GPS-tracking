export interface CreateDriverDto {
  name: string;

  email: string;

  phoneNumber?: string;

  carNumberPlate?: string;
}

export interface DriverResDto {
  id: string;

  name: string;

  email: string;

  phoneNumber: string;

  carNumberPlate: string;
}
