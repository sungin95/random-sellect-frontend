export interface IUser {
  pk: number;
  username: string;
  email: string;
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
