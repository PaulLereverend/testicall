import { Component, OnInit } from '@angular/core';
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
  isAuthenticated: boolean = false;

  constructor(private userService: UserService, private gameService: GameService) { }

  ngOnInit(): void {    
    this.userService.authUserSub.subscribe( user => {
      if (user) {
        this.isAuthenticated = true;
        this.getGames();
      }else{
        this.isAuthenticated = false;
      }
    })
    this.userService.tryAutoConnect()
  }

  getGames(){
    this.gameService.getGames().subscribe( ({data}) => {
      this.games = data.getUserGames;
    })
  }

}
