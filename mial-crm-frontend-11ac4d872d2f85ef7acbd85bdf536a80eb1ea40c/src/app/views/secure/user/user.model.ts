import { Pagination, Role } from '@shared/models/shared.model';

export interface UserForm {
  name: string;
  role_id: Role;
  email: string;
  mobile_no: string;
  employee_number: string;
  agent_code: string;
}

export interface UserResponse {
  id: number;
  name: string;
  role: Role;
  email: string;
  mobile_no: string;
  employee_number: string;
  agent_code: string;
  created_at: string;
  updated_at: string;
}

export interface GetUser extends UserResponse {
  park_name: string;
}
export interface UserState {
  pagination: Pagination;
  globalSearch: string;
}

export interface UserList {
  park_users: UserResponse[];
  pagination: Pagination;
}
export interface RolesList {
  id: number;
  name: string;
}
