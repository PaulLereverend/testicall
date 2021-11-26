import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CreateGameResponse } from 'src/app/model/createGameResponse';

const GET_THEMES = gql`
  query getThemes {
    theme {
      title
    }
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

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private apollo: Apollo) { }

  getAllThemes() {
    return this.apollo.query({
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

}
