import "core-js/stable/atob";
import { jwtDecode } from 'jwt-decode';

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export class TokenInstance implements Token {
  accessToken: string = '';
  refreshToken: string = '';

  constructor(token?: Token) {
    this.accessToken = token?.accessToken ?? '';
    this.refreshToken = token?.refreshToken ?? '';
  }

  get isLoggedIn(): boolean {
    return this.accessToken !== '';
  }

  get groupId(): string | null {
    const decodedToken = jwtDecode(this.accessToken);
    if (!decodedToken) return null;
    const groupId = (decodedToken as any).groupId as string | null;
    return groupId;
  }
}