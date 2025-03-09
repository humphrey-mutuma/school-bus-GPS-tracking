export interface CreateStudentDto {
  email?: string;
  name: string;
  parentId?: string;
}

export interface FindStudentDto {
  id: string;
  name: string;
  email?: string;
  parentName?: string;
}
