import { QueryFilter } from "graphback";
import { IResolvers } from "apollo-server-express";
import { GraphQLResolveInfo } from "graphql";
import { v4 } from "uuid";
import { GameFilter } from "../generated-types";
import { GraphQLContext } from "../customContext";
import games from "../../game-themes.json";

interface IGetUserGamesArgs {
  userId: string;
}
interface IGenerateGameArgs {
  userId: string;
  theme: string;
  difficulty?: number;
}

export const gameResolvers: IResolvers = {
  Query: {
    getUserGames: async (
      parent: any,
      args: IGetUserGamesArgs,
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
  Mutation: {
    generateGame: async (
      parent: any,
      args: IGenerateGameArgs,
      context: GraphQLContext,
      info: GraphQLResolveInfo
    ) => {
      if (!args.theme || !args.userId) throw new Error("invalid arguments");
      const id = v4();
      const gameData = games.themes.find((game) => {
        return game.theme === args.theme;
      });
      if (!gameData) throw new Error("no matching theme found");
      const result = await context.graphback.Game.create({
        id,
        userId: args.userId,
        isFinished: false,
      });
      console.log({ id, gameData });
      console.log({ ...gameData });
      return { id, gameData };
    },
  },
};
