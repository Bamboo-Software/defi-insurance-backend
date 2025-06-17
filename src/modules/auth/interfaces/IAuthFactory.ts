import { IUser } from './IUser';

export interface IAuthFactory {
  getUserInfo(...args: any[]): Promise<IUser>;
}
