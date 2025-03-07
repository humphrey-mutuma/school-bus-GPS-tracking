export interface ApiResponse<T> {
  message: string;
  data: T;
}
export interface ApiResponsePaginated<T> {
  message: string;
  data: {
    totalRecords: number;
    items: T;
  };
}
