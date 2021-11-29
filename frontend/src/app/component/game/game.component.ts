import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameData } from 'src/app/model/gameData';
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
  questions: GameData[] = []
  response: number[] = [];
  showResponse: boolean = false;
  score: number = 0;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getAllThemes().subscribe( ({data}) => {
      this.themes = data.getThemes
    })
  }

  createGame(){
    if (this.gameForm.value.theme && this.gameForm.value.difficulty) {
      this.gameService.newGame(this.gameForm.value.theme, this.gameForm.value.difficulty).subscribe( ({data}) => {
        if (data) {
          this.questions = data.generateGame.gameData.data
          console.log(this.questions);
          
          this.gameId = data.generateGame.id
        }
      }, err => {
        console.error(err);
      });
    }else{
      this.errorMessage = true;
    }
  }

  sendResult(){
    this.response.forEach( (indexResponse, indexQuestion) => {
      if (this.questions[indexQuestion].correctAnswer-1 == indexResponse) {
        this.score++;
      }
    })

    console.log(this.gameId, this.score);
    
    this.gameService.setGameScore(this.gameId, this.score).subscribe( ({data}) => {
      if (data?.setGameScore) {
        this.showResponse = true;
      }
    }, err => {
      console.error(err);
    });
  }

  choose(index: number, event: any){
    this.response[index] = event.value
  }

  replay(){
    this.errorMessage = false;
    this.gameId = "";
    this.questions = []
    this.response = [];
    this.showResponse = false;
    this.score = 0;
  }

}
