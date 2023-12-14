import { getConfig } from '../config/config';
import { generateJWT } from '../helpers/jwt-helper';
import User from './user.model';
export async function login({ email, password }) {
  // @ts-ignore
  const user = await User.checkCredential(email, password);
  const token = generateJWT(user, getConfig().JWT_KEY, {
    expiresIn: '24h',
  });
  return { user, token };
}
