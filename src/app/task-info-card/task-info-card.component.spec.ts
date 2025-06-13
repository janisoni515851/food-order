import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInfoCardComponent } from './task-info-card.component';

describe('TaskInfoCardComponent', () => {
  let component: TaskInfoCardComponent;
  let fixture: ComponentFixture<TaskInfoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskInfoCardComponent]
    });
    fixture = TestBed.createComponent(TaskInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
