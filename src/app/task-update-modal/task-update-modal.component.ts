import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DUMMY_TECHS } from '../dummy-users';

@Component({
  selector: 'app-task-update-modal',
  templateUrl: './task-update-modal.component.html',
  styleUrls: ['./task-update-modal.component.css'],
})
export class TaskUpdateModalComponent implements OnChanges {
  @Input() selectedInfo: any = {};
  @Output() onUserUpdate = new EventEmitter<any>();
  selectedUser: any = {};
  techs = DUMMY_TECHS;
  techId: number | null = null;

  // constructor(){
  //   // this.techId = this.selectedInfo.techId;
  //   console.log(this.selectedInfo, this.techId);
  // }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedUser = {...this.selectedInfo};
  }

  updateUser(){
    console.log("selectedUser", this.selectedUser);
    if(typeof this.selectedUser.techId === 'string') {
      this.selectedUser.techId = parseInt(this.selectedUser.techId, 10);
    }
    this.onUserUpdate.emit(this.selectedUser);
  }
}
