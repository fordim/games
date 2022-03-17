import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacToeMainComponent } from './tic-tac-toe-main.component';

describe('TicTacToeMainComponent', () => {
  let component: TicTacToeMainComponent;
  let fixture: ComponentFixture<TicTacToeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicTacToeMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicTacToeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
