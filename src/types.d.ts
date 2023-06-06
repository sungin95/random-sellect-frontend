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
  count: number;
}

export interface IListMyChoice {
  pk: number;
  description: string;
  importance: number;
}

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}

export interface IUserSignUpVariables {
  username: string;
  password: string;
}

export interface IUploadQuestion {
  description: string;
}

export interface IUploadQuestionCheck {
  pk: number;
  description: string;
  authon: string;
}

export interface IPageNation {
  total: number;
}
