import { CookieOptions } from 'express';

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const cookieOptions: CookieOptions = {
  httpOnly: false,
  secure: false,
  maxAge: 3600000,
  path: '/',
};
