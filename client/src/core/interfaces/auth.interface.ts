export interface ICreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

export interface ILoginUserPayload {
  email: string;
  password: string;
}

export interface IResponse {
  success: boolean;
}
