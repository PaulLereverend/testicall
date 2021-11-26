import { IResolvers } from "apollo-server-express";
import { GraphQLResolveInfo } from "graphql";
import games from "../../game-themes.json";
import { IFullContext } from "../context";

export const themeResolvers: IResolvers = {
  Query: {
    getThemes: async (
      parent: any,
      args: any,
      context: IFullContext,
      info: GraphQLResolveInfo
    ) => {
      const themes = games.themes.map((game) => {
        return game.theme;
      });

      return themes;
    },
  },
};
