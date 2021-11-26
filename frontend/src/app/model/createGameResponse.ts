import { Question } from "./question";

export interface CreateGameResponse {
  generateGame: {
    id: string,
    gameData: {
      theme: string,
      data: Question[]
    }
  }
}