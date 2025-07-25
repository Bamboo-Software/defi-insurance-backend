import { ClsServiceManager } from 'nestjs-cls';
import type { User } from '../modules/database';

export class ContextProvider {
  private static readonly namespace = 'request';
  private static readonly authUserKey = 'user_key';

  private static get<T>(key: string) {
    const store = ClsServiceManager.getClsService();
    return store.get<T>(ContextProvider.getKeyWithNamespace(key));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static set(key: string, value: any): void {
    const store = ClsServiceManager.getClsService();
    store.set(ContextProvider.getKeyWithNamespace(key), value);
  }

  private static getKeyWithNamespace(key: string): string {
    return `${ContextProvider.namespace}.${key}`;
  }

  static setAuthUser(user: User): void {
    ContextProvider.set(ContextProvider.authUserKey, user);
  }

  static getAuthUser(): User | undefined {
    return ContextProvider.get<User>(ContextProvider.authUserKey);
  }
}
