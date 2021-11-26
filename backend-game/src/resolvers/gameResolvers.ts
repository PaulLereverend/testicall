import { QueryFilter } from "graphback";
import { IResolvers } from "apollo-server-express";
import { GraphQLResolveInfo } from "graphql";
import { v4 } from "uuid";
import { GameFilter } from "../generated-types";
import games from "../../game-themes.json";
import { IFullContext } from "../context";

interface IGenerateGameArgs {
  theme: string;
  difficulty?: number;
}

export const gameResolvers: IResolvers = {
  Query: {
    getUserGames: async (
      parent: any,
      args: any,
      context: IFullContext,
      info: GraphQLResolveInfo
    ) => {
      const {} = context;
      const filter: QueryFilter<GameFilter> = {
        userId: {
          eq: context.userId,
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
      context: IFullContext,
      info: GraphQLResolveInfo
    ) => {
      if (!args.theme) throw new Error("invalid arguments");
      const id = v4();
      const gameData = games.themes.find((game) => {
        return game.theme === args.theme;
      });
      if (!gameData) throw new Error("no matching theme found");
      try {
        const result = await context.graphback.Game.create({
          id,
          userId: context.userId,
          isFinished: false,
        });
      } catch (error) {}
      return { id, gameData };
    },
  },
};
