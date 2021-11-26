import { GraphbackContext, GraphbackCRUDService } from "graphback";
import { Game } from "./generated-types";

/**
 * Overriding context to add GraphQL-Code-Generator typings to Graphback services
 */
export interface GraphQLContext extends GraphbackContext {
  graphback: {
    Game: GraphbackCRUDService<Game>;
  };
}
