import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicTacToeMainComponent } from "./tic-tac-toe/components/tic-tac-toe-main/tic-tac-toe-main.component";
import { HomeComponent } from "./main/home/home.component";
import { MemoryMainComponent } from "./memory/components/memory-main/memory-main.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tic-tac-toe', component: TicTacToeMainComponent},
  { path: 'memory', component: MemoryMainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
