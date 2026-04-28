export type UserRole = "CUSTOMER" | "ADMIN" | "PROVIDER";

export interface AppUser {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}