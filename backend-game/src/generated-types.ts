export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BooleanInput = {
  ne?: InputMaybe<Scalars["Boolean"]>;
  eq?: InputMaybe<Scalars["Boolean"]>;
};

export type CreateGameInput = {
  id: Scalars["String"];
  userId: Scalars["String"];
  isFinished: Scalars["Boolean"];
  score?: InputMaybe<Scalars["Int"]>;
  theme?: InputMaybe<Scalars["String"]>;
  difficulty?: InputMaybe<Scalars["Int"]>;
};

export type FullGameData = {
  __typename?: "FullGameData";
  theme: Scalars["String"];
  data: Array<GameData>;
};

/** @model */
export type Game = {
  __typename?: "Game";
  /** @id */
  id: Scalars["String"];
  userId: Scalars["String"];
  isFinished: Scalars["Boolean"];
  score?: Maybe<Scalars["Int"]>;
  theme?: Maybe<Scalars["String"]>;
  difficulty?: Maybe<Scalars["Int"]>;
};

export type GameData = {
  __typename?: "GameData";
  question: Scalars["String"];
  answers: Array<Scalars["String"]>;
  correctAnswer: Scalars["Int"];
};

export type GameFilter = {
  id?: InputMaybe<StringInput>;
  userId?: InputMaybe<StringInput>;
  isFinished?: InputMaybe<BooleanInput>;
  score?: InputMaybe<IntInput>;
  theme?: InputMaybe<StringInput>;
  difficulty?: InputMaybe<IntInput>;
  and?: InputMaybe<Array<GameFilter>>;
  or?: InputMaybe<Array<GameFilter>>;
  not?: InputMaybe<GameFilter>;
};

export type GameResultList = {
  __typename?: "GameResultList";
  items: Array<Maybe<Game>>;
  offset?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  count?: Maybe<Scalars["Int"]>;
};

export type GameSubscriptionFilter = {
  and?: InputMaybe<Array<GameSubscriptionFilter>>;
  or?: InputMaybe<Array<GameSubscriptionFilter>>;
  not?: InputMaybe<GameSubscriptionFilter>;
  id?: InputMaybe<StringInput>;
  userId?: InputMaybe<StringInput>;
  isFinished?: InputMaybe<BooleanInput>;
  score?: InputMaybe<IntInput>;
  theme?: InputMaybe<StringInput>;
  difficulty?: InputMaybe<IntInput>;
};

export type GeneratedGame = {
  __typename?: "GeneratedGame";
  id: Scalars["String"];
  gameData: FullGameData;
};

export type IntInput = {
  ne?: InputMaybe<Scalars["Int"]>;
  eq?: InputMaybe<Scalars["Int"]>;
  le?: InputMaybe<Scalars["Int"]>;
  lt?: InputMaybe<Scalars["Int"]>;
  ge?: InputMaybe<Scalars["Int"]>;
  gt?: InputMaybe<Scalars["Int"]>;
  in?: InputMaybe<Array<Scalars["Int"]>>;
  between?: InputMaybe<Array<Scalars["Int"]>>;
};

export type MutateGameInput = {
  id: Scalars["String"];
  userId?: InputMaybe<Scalars["String"]>;
  isFinished?: InputMaybe<Scalars["Boolean"]>;
  score?: InputMaybe<Scalars["Int"]>;
  theme?: InputMaybe<Scalars["String"]>;
  difficulty?: InputMaybe<Scalars["Int"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  generateGame?: Maybe<GeneratedGame>;
  createGame?: Maybe<Game>;
  updateGame?: Maybe<Game>;
  deleteGame?: Maybe<Game>;
};

export type MutationGenerateGameArgs = {
  theme: Scalars["String"];
  difficulty?: InputMaybe<Scalars["Int"]>;
};

export type MutationCreateGameArgs = {
  input: CreateGameInput;
};

export type MutationUpdateGameArgs = {
  input: MutateGameInput;
};

export type MutationDeleteGameArgs = {
  input: MutateGameInput;
};

export type OrderByInput = {
  field: Scalars["String"];
  order?: InputMaybe<SortDirectionEnum>;
};

export type PageRequest = {
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type Query = {
  __typename?: "Query";
  getUserGames?: Maybe<Array<Maybe<Game>>>;
  getGame?: Maybe<Game>;
  findGames: GameResultList;
};

export type QueryGetGameArgs = {
  id: Scalars["String"];
};

export type QueryFindGamesArgs = {
  filter?: InputMaybe<GameFilter>;
  page?: InputMaybe<PageRequest>;
  orderBy?: InputMaybe<OrderByInput>;
};

export enum SortDirectionEnum {
  Desc = "DESC",
  Asc = "ASC",
}

export type StringInput = {
  ne?: InputMaybe<Scalars["String"]>;
  eq?: InputMaybe<Scalars["String"]>;
  le?: InputMaybe<Scalars["String"]>;
  lt?: InputMaybe<Scalars["String"]>;
  ge?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<Scalars["String"]>>;
  contains?: InputMaybe<Scalars["String"]>;
  startsWith?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  newGame: Game;
  updatedGame: Game;
  deletedGame: Game;
};

export type SubscriptionNewGameArgs = {
  filter?: InputMaybe<GameSubscriptionFilter>;
};

export type SubscriptionUpdatedGameArgs = {
  filter?: InputMaybe<GameSubscriptionFilter>;
};

export type SubscriptionDeletedGameArgs = {
  filter?: InputMaybe<GameSubscriptionFilter>;
};
