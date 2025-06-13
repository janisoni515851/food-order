import { Component, Input } from '@angular/core';
import { DUMMY_TECHS } from '../dummy-users';

@Component({
  selector: 'app-task-info-card',
  templateUrl: './task-info-card.component.html',
  styleUrls: ['./task-info-card.component.css'],
})
export class TaskInfoCardComponent {
  @Input() userSelected: any = {};
  techs = DUMMY_TECHS;
  editCase = false;

  getTechName(id: any) {
    const techObj = this.techs.find((tech) => tech.id === id);
    if (techObj) {
      return techObj.name;
    } else {
      return 'No Matching Tech';
    }
  }

  userUpdated(event: any) {
    console.log('event', event);
    this.userSelected = event;
  }
}
