export interface CreateStudentDto {
  name: string;
  parentName: string;
  parentEmail: string;
}

export interface FindStudentDto {
  id: string;
  name: string;
  parentEmail?: string;
  parentName?: string;
}
