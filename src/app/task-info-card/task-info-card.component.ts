import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DUMMY_TECHS } from '../dummy-users';

@Component({
  selector: 'app-task-info-card',
  templateUrl: './task-info-card.component.html',
  styleUrls: ['./task-info-card.component.css'],
})
export class TaskInfoCardComponent {
  @Input() userSelected: any = {};
  @Output() onUpdation = new EventEmitter<any>();
  techs = DUMMY_TECHS;
  editCase = false;
  userSelectedCopy: any = {};

  ngOnChanges(changes: SimpleChanges): void {
    this.userSelectedCopy = { ...this.userSelected };
  }

  getTechName(id: any) {
    const techObj = this.techs.find((tech) => tech.id === id);
    if (techObj) {
      return techObj.name;
    } else {
      return 'No Matching Tech';
    }
  }
  userUpdated(event: any) {
    this.userSelectedCopy = event;
    this.onUpdation.emit(this.userSelectedCopy);
  }
}
