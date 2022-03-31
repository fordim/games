import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryMainComponent } from './memory-main.component';

describe('MemoryMainComponent', () => {
  let component: MemoryMainComponent;
  let fixture: ComponentFixture<MemoryMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
