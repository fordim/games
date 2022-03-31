import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryLevelModalComponent } from './memory-level-modal.component';

describe('MemoryModalComponent', () => {
  let component: MemoryLevelModalComponent;
  let fixture: ComponentFixture<MemoryLevelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryLevelModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryLevelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
