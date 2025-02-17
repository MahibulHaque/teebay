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
  status: 'success' | 'error';
  message: string;
  data?: unknown;
  error?: {
    code: number;
    details: string;
  };
}
