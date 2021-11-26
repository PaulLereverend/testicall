import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from "@angular/material/radio";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './component/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticateComponent } from './component/authenticate/authenticate.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './interceptor/request.interceptor';
import { GraphQLModule } from './graphql.module';
import { GameComponent } from './component/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    AuthenticateComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    GraphQLModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
