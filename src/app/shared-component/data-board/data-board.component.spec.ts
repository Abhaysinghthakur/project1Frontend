import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBoardComponent } from './data-board.component';

describe('DataBoardComponent', () => {
  let component: DataBoardComponent;
  let fixture: ComponentFixture<DataBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
