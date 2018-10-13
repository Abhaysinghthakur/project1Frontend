import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDataBoardComponent } from './single-data-board.component';

describe('SingleDataBoardComponent', () => {
  let component: SingleDataBoardComponent;
  let fixture: ComponentFixture<SingleDataBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDataBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDataBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
