import { Component, Input, OnInit } from '@angular/core';
import { TicTacToeService } from "../../services/tic-tac-toe.service";
import { TicTacToeMainComponent } from "../tic-tac-toe-main/tic-tac-toe-main.component";

@Component({
  selector: 'app-tic-tac-toe-modal',
  templateUrl: './tic-tac-toe-modal.component.html',
  styleUrls: ['./tic-tac-toe-modal.component.css']
})
export class TicTacToeModalComponent implements OnInit {
  @Input() contentText: string = '';
  @Input() buttonText: string = '';

  public error: boolean = false;

  constructor(private service: TicTacToeService, private mainComponent: TicTacToeMainComponent) { }

  ngOnInit(): void {
  }

  resetGameModal() {
    this.service.error$.subscribe(data => this.error = data);

    if (!this.error) {
      this.service.resetAndDrawBoard();
    }

    this.service.closeModal();
    this.mainComponent.modal$ = this.service.modal$;
  }
}
