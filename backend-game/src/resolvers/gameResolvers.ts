import { QueryFilter } from "graphback";
import { IResolvers } from "apollo-server-express";
import { GraphQLResolveInfo } from "graphql";
import { v4 } from "uuid";
import { GameFilter } from "../generated-types";
import games from "../../game-themes.json";
import { IFullContext } from "../context";
import { shuffle } from "../utils";

interface IGenerateGameArgs {
  theme: string;
  difficulty?: number;
}

interface ISetGetScoreArgs {
  id: string;
  score: number;
}

export const gameResolvers: IResolvers = {
  Query: {
    getUserGames: async (
      parent: any,
      args: any,
      context: IFullContext,
      info: GraphQLResolveInfo
    ) => {
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
      const shuffledGame = {
        theme: gameData?.theme,
        data: shuffle(gameData?.data),
      };
      if (args.difficulty && args.difficulty < shuffledGame.data.length) {
        shuffledGame.data = shuffledGame.data.slice(0, args.difficulty);
      }
      const result = await context.graphback.Game.create({
        id,
        userId: context.userId,
        isFinished: false,
        theme: args.theme,
        difficulty: args.difficulty,
      });
      return { id, gameData: shuffledGame };
    },
    setGameScore: async (
      parent: any,
      args: ISetGetScoreArgs,
      context: IFullContext,
      info: GraphQLResolveInfo
    ) => {
      try {
        const results = await context.graphback.Game.update({
          id: args.id,
          userId: context.userId,
          score: args.score,
          isFinished: true,
        });
        return true;
      } catch (error) {
        throw error;
      }
    },
  },
};
