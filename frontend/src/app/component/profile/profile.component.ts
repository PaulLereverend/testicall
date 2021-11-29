import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/model/game';
import { GameService } from 'src/app/service/game/game.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  games: Game[] = [];
  scoreAverage: number = -1;
  isAuthenticated: boolean = false;
  displayedColumns: string[] = ["id", "theme", "score"]
  private querySubscription: Subscription = new Subscription;

  constructor(private userService: UserService, private gameService: GameService) { }

  ngOnInit(): void {
    this.userService.authUserSub.subscribe( user => {
      if (user) {
        this.isAuthenticated = true;
      }else{
        this.isAuthenticated = false;
      }
    })
    this.userService.tryAutoConnect();

    this.querySubscription = this.gameService.getGames().valueChanges.subscribe( ({data}) => {      
      let temp = Object.assign([], data.getUserGames);
      this.games = temp.reverse();
      let cumulativeScore: number = 0;
      let cumulativeDifficulty: number = 0;
      this.games.forEach( (game: Game) => {
        cumulativeScore += game.score;
        cumulativeDifficulty += game.difficulty;
      })
      this.scoreAverage = Math.trunc(cumulativeScore/cumulativeDifficulty*100);
    })
    
  }

  ngOnDestroy(){
    this.querySubscription.unsubscribe();
  }

}
