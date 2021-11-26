// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import http from "http";
import { buildGraphbackAPI } from "graphback";
import { loadDBConfig, connectDB } from "./db";
import { migrateDB, removeNonSafeOperationsFilter } from "graphql-migrations";
import { createKnexDbProvider } from "@graphback/runtime-knex";
import { gameResolvers } from "./resolvers/gameResolvers";
import { loadConfigSync } from "graphql-config";
import { getAuthenticatedContext } from "./context";

const app = express();

app.use(cors());

const graphbackExtension = "graphback";
const config = loadConfigSync({
  extensions: [
    () => ({
      name: graphbackExtension,
    }),
  ],
});

const projectConfig = config.getDefault();
const graphbackConfig = projectConfig.extension(graphbackExtension);
const modelDefs = projectConfig.loadSchemaSync(graphbackConfig.model);

const db = connectDB();
const dbConfig = loadDBConfig();

const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
  dataProviderCreator: createKnexDbProvider(db),
  crud: {
    create: false,
    delete: false,
    update: false,
  },
});

migrateDB(dbConfig, typeDefs, {
  operationFilter: removeNonSafeOperationsFilter,
}).then(() => {
  console.log("Migrated database");
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: [resolvers, gameResolvers],
  context: async (context: any) => {
    if (!context.req) throw Error("req undefined");

    const authenticatedContext = await getAuthenticatedContext(
      context.req,
      contextCreator
    );
    return {
      ...contextCreator(context),
      ...authenticatedContext,
    };
  },
});
apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at http://localhost:4000/graphql`);
});
