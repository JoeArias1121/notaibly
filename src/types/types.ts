export type FormState = {
  success: boolean;
  error?: string;
}
export type User = {
  id: string;
  email: string;
  username: string;
}
export type UserResponse = {
  success: boolean;
  error?: string;
  user: User;
}
export type APIResponse = {
  success: boolean;
  error?: string;
}