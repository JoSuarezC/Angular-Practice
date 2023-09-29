import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN: string = 'LOGIN';
export const LOGIN_START: string = 'LOGIN_START';
export const LOGIN_FAIL: string = 'LOGIN_FAIL';
export const LOGOUT: string = 'LOGOUT';
export const SIGN_UP_START: string = 'SIGN_UP_START';
export const AUTO_LOGIN: string = 'AUTO_LOGIN';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: {
    user: User,
    redirectTo: boolean
  }) {}
};

export class Logout implements Action {
  readonly type = LOGOUT;
  payload?;
};

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: {
    email: string,
    password: string
  }) {}
};

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: string) {}
};

export class SignUpStart implements Action {
  readonly type = SIGN_UP_START;

  constructor(public payload: {
    email: string,
    password: string
  }) {}
};

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
  payload?;
};

export type AuthActions =
| AutoLogin
| Login
| Logout
| LoginStart
| LoginFail
| SignUpStart;
