import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateGameResponse } from 'src/app/model/createGameResponse';
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

  themes: string[] = [
    'series',
    'music',
    'videoGames'
  ];
  errorMessage: boolean = false;
  questions: Question[]= []
  response: number[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    
  }

  createGame(){
    if (this.gameForm.value.theme && this.gameForm.value.difficulty) {
      this.gameService.newGame(this.gameForm.value.theme, this.gameForm.value.difficulty).subscribe( ({data}) => {
        let createGameResponse = data as CreateGameResponse
        this.questions = createGameResponse.generateGame.gameData.data
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
    
  }

  choose(index: number, event: any){
    this.response[index] = event.value
  }

}
