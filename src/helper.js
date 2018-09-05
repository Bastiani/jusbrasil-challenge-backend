// @flow
import jwt from 'jsonwebtoken';

import { jwtSecret } from './config';

import * as UserLoader from './modules/user/UserLoader';
import type { Dataloaders } from './flow/Dataloaders';

/**
 * Return user and seller given a JWT token
 * @param token - jwt token with userId
 * @returns {*}
 */
export const getUser = async (dataloaders: Dataloaders, token: string) => {
  if (!token) {
    return { user: null };
  }

  try {
    const decodedToken = jwt.verify(token.replace('JWT', '').trim(), jwtSecret);
    const user = await UserLoader.load({ dataloaders }, decodedToken.id);

    if (!user) {
      return { user: null };
    }

    return { user };
  } catch (err) {
    return { user: null };
  }
};

// $FlowFixMe
export const getDataloaders = (loaders: Loaders): GraphQLDataloaders => Object.keys(loaders).reduce(
  (prev, loaderKey: string) => ({
    ...prev,
    [loaderKey]: loaders[loaderKey].getLoader ? loaders[loaderKey].getLoader() : undefined,
  }),
  {},
);

type UserType = {
  _id: string,
};

export function generateToken(user: UserType) {
  return `JWT ${jwt.sign({ id: user._id }, jwtSecret)}`;
}
