import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicTacToeMainComponent } from "./tic-tac-toe/components/tic-tac-toe-main/tic-tac-toe-main.component";
import { HomeComponent } from "./main/home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tic-tac-toe', component: TicTacToeMainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
