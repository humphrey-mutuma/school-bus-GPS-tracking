export interface CreateSchoolDto {
  name: string;

  address?: string;
}

export interface SchoolResDto {
  id: string;

  name: string;

  address: string;

  admin: string;
}
