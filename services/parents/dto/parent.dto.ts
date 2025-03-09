export interface CreateParentDto {
  email: string;
  name: string;
  phoneNumber: string;

  students?: string[];
}

export interface ParentResDto {
  id: string;

  name: string;

  email?: string;

  phoneNumber?: string;
}
