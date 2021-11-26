import jwt from "jsonwebtoken";
import { GraphQLContext } from "./customContext";

export interface IFullContext extends GraphQLContext, IContext {}
interface IAuthToken {
  sub: string;
  exp: number;
}

interface IRequestHeader {
  authorization?: string;
}

interface IContext {
  userId: string;
  secret: string;
  tokenExpiration: number;
}

export const getAuthenticatedContext = async (
  req: any,
  contextCreator: any
) => {
  const { authorization = "" }: IRequestHeader = req?.headers ?? {};
  if (!authorization) throw new Error("Unauthenticated");

  const { sub, exp } = (await verifyToken(authorization)) as IAuthToken;
  if (!sub) throw Error(`Sub undefined with token: ${authorization}`);

  return {
    userId: sub,
    secret: process.env.SECRET,
    tokenExpiration: exp,
  } as IContext;
};

export const verifyToken = async (authorization: string) => {
  const splitAuthorization = authorization.split(" ");
  if (splitAuthorization.length <= 1)
    throw Error(`AuthToken incomplete ${authorization}`);

  const token = splitAuthorization[1];
  const tokenData = jwt.verify(token, process.env.SECRET || "");
  if (typeof tokenData !== "object")
    throw Error(`Invalid token ${authorization}`);

  return tokenData;
};
