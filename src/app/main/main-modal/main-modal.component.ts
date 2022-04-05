import { Component, Input, OnInit } from '@angular/core';
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-main-modal',
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.css']
})
export class MainModalComponent implements OnInit {
  @Input() contentText: string | null = '';
  @Input() buttonText: string | null = '';

  constructor(private homeComponent: HomeComponent) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.homeComponent.closeModal();
  }
}
