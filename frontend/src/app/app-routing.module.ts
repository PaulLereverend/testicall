import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './component/game/game.component';
import { HomeComponent } from './component/home/home.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { 
  //   path: 'user', 
  //   children: [
  //     {path: 'profile', component: ProfileComponent}
  //   ],
  //   canActivate: [AuthGuard] 
  // },
  { path: 'user/profile', component: ProfileComponent },
  { path: 'game', component: GameComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
