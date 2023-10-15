export interface ApiResponse<T> {
  errorMessage: string | null;
  statusCode: number;
  response: T | null;
}
