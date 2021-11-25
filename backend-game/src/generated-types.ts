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
  userId: Scalars["ID"];
  isFinished: Scalars["Boolean"];
  score?: InputMaybe<Scalars["Int"]>;
};

/** @model */
export type Game = {
  __typename?: "Game";
  /** @id */
  id: Scalars["ID"];
  userId: Scalars["ID"];
  isFinished: Scalars["Boolean"];
  score?: Maybe<Scalars["Int"]>;
};

export type GameFilter = {
  id?: InputMaybe<IdInput>;
  userId?: InputMaybe<IdInput>;
  isFinished?: InputMaybe<BooleanInput>;
  score?: InputMaybe<IntInput>;
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
  id?: InputMaybe<IdInput>;
  userId?: InputMaybe<IdInput>;
  isFinished?: InputMaybe<BooleanInput>;
  score?: InputMaybe<IntInput>;
};

export type IdInput = {
  ne?: InputMaybe<Scalars["ID"]>;
  eq?: InputMaybe<Scalars["ID"]>;
  le?: InputMaybe<Scalars["ID"]>;
  lt?: InputMaybe<Scalars["ID"]>;
  ge?: InputMaybe<Scalars["ID"]>;
  gt?: InputMaybe<Scalars["ID"]>;
  in?: InputMaybe<Array<Scalars["ID"]>>;
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
  id: Scalars["ID"];
  userId?: InputMaybe<Scalars["ID"]>;
  isFinished?: InputMaybe<Scalars["Boolean"]>;
  score?: InputMaybe<Scalars["Int"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createGame?: Maybe<Game>;
  updateGame?: Maybe<Game>;
  deleteGame?: Maybe<Game>;
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
  id: Scalars["ID"];
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
