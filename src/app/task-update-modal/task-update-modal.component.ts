import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DUMMY_TECHS } from '../dummy-users';

@Component({
  selector: 'app-task-update-modal',
  templateUrl: './task-update-modal.component.html',
  styleUrls: ['./task-update-modal.component.css'],
})
export class TaskUpdateModalComponent implements OnChanges {
  @Input() selectedInfo: any = {};
  @Output() onUserUpdate = new EventEmitter<any>();
  techs = DUMMY_TECHS;
  techId: number | null = null;
  selectedUser: any = {};

  constructor() {
    // this.techId = this.selectedInfo.techId;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.techId = this.selectedInfo.techId;
    // console.log(this.selectedInfo, this.techId);
    this.selectedUser = { ...this.selectedInfo }; //here new object is create and it passes to the selectedUser
  }

  updateUser() {
    console.log('selectedinfo--------', this.selectedInfo);
    if (typeof this.selectedUser.techId === 'string') {
      this.selectedUser.techId = parseInt(this.selectedUser.techId);
    }
    this.onUserUpdate.emit(this.selectedUser);
  }
}
