export interface IUser {
  pk: number;
  username: string;
}

interface IAuthon {
  pk: number;
  username: string;
}

export interface IList {
  pk: number;
  description: string;
  authon: IAuthon;
}

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}
