import { QueryFilter } from "graphback";
import { GameFilter } from "../generated-types";
import { IResolvers } from "apollo-server-express";
import { GraphQLResolveInfo } from "graphql";
import { GraphQLContext } from "../customContext";

interface IArgs {
  userId: String;
}

export const gameResolvers: IResolvers = {
  Query: {
    getUserGames: async (
      parent: any,
      args: IArgs,
      context: GraphQLContext,
      info: GraphQLResolveInfo
    ) => {
      const filter: QueryFilter<GameFilter> = {
        userId: {
          eq: args.userId,
        },
      };

      const results = await context.graphback.Game.findBy(
        { filter },
        context,
        info
      );

      return results.items;
    },
  },
};
