import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CreateGameResponse } from 'src/app/model/createGameResponse';
import { GetAllThemesResponse } from 'src/app/model/getAllThemesResponse';
import { GetGamesResponse } from 'src/app/model/getGamesResponse';
import { SetGameScoreResponse } from 'src/app/model/setGameScoreResponse';

const GET_THEMES = gql`
  query {
    getThemes
  }
`;

const GENERATE_GAME = gql`
  mutation GenerateGame($theme: String!, $difficulty: Int!) { 
    generateGame(theme: $theme, difficulty: $difficulty) {
      id, 
      gameData { 
        theme, 
        data { 
          question answers correctAnswer
        }
      }
    }
  }
`;

const SET_GAME_SCORE = gql`
  mutation SetGameScore($gameId: String!, $score: Int!) {
    setGameScore(id : $gameId, score: $score)
  }
`;

const GET_GAMES = gql`
  query {
    getUserGames{
      id userId isFinished score theme difficulty
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private apollo: Apollo) { }

  getAllThemes() {
    return this.apollo.query<GetAllThemesResponse>({
      query: GET_THEMES
    });
  }

  newGame(theme: string, difficulty: number) {
    return this.apollo.mutate<CreateGameResponse>({
      mutation: GENERATE_GAME,
      variables: {
        theme,
        difficulty
      }
    });
  }

  getGames(){
    return this.apollo.query<GetGamesResponse>({
      query: GET_GAMES
    });
  }

  setGameScore(gameId: string, score: number){
    return this.apollo.mutate<SetGameScoreResponse>({
      mutation: SET_GAME_SCORE,
      variables: {
        gameId,
        score
      }
    });
  }

}
