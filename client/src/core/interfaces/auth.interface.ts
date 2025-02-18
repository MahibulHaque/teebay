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

export interface IBaseQueryResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T;
  error?: {
    code: number;
    details: string;
  };
}

export interface IBaseCommandResponse {
  status: 'success' | 'error';
  message: string;
  error?: {
    code: number;
    details: string;
  };
}

export interface ILoggedInUserInfo {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IGetLoggedInUser {
  loggedInUserInfo: ILoggedInUserInfo;
}
