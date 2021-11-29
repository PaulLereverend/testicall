import { GameData } from "./gameData";

export interface CreateGameResponse {
  generateGame: {
    id: string,
    gameData: {
      theme: string,
      data: GameData[]
    }
  }
}