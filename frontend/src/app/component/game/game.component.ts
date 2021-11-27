import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateGameResponse } from 'src/app/model/createGameResponse';
import { GetAllThemesResponse } from 'src/app/model/getAllThemesResponse';
import { Question } from 'src/app/model/question';
import { GameService } from 'src/app/service/game/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameForm: FormGroup = new FormGroup({
    theme: new FormControl('', [Validators.required]),
    difficulty: new FormControl('', [Validators.required]),
  });

  themes: string[] = [];
  errorMessage: boolean = false;
  gameId: string = "";
  questions: Question[] = []
  response: number[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getAllThemes().subscribe( ({data}) => {
      this.themes = (data as GetAllThemesResponse).getThemes
    })
  }

  createGame(){
    if (this.gameForm.value.theme && this.gameForm.value.difficulty) {
      this.gameService.newGame(this.gameForm.value.theme, this.gameForm.value.difficulty).subscribe( ({data}) => {
        this.questions = (data as CreateGameResponse).generateGame.gameData.data
        this.gameId = (data as CreateGameResponse).generateGame.id
      }, err => {
        console.error(err);
      });
    }else{
      this.errorMessage = true;
    }
  }

  sendResult(){
    let score = 0;
    this.response.forEach( (indexResponse, indexQuestion) => {
      if (this.questions[indexQuestion].correctAnswer == indexResponse) {
        score++;
      }
    })

    this.gameService.setGameScore(this.gameId, score).subscribe( ({data}) => {
      console.log(data);
    }, err => {
      console.error(err);
    });
  }

  choose(index: number, event: any){
    this.response[index] = event.value
  }

}
