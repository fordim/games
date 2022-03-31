import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './main/layout/layout.component';
import { TicTacToeMainComponent } from './tic-tac-toe/components/tic-tac-toe-main/tic-tac-toe-main.component';
import { HomeComponent } from './main/home/home.component';
import { TicTacToeModalComponent } from './tic-tac-toe/components/tic-tac-toe-modal/tic-tac-toe-modal.component';
import { MemoryMainComponent } from './memory/components/memory-main/memory-main.component';
import { MemoryLevelModalComponent } from "./memory/components/memory-level-modal/memory-level-modal.component";
import { MemoryEndgameModalComponent } from './memory/components/memory-endgame-modal/memory-endgame-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    TicTacToeMainComponent,
    HomeComponent,
    TicTacToeModalComponent,
    MemoryMainComponent,
    MemoryLevelModalComponent,
    MemoryEndgameModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
