import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DUMMY_TECHS } from '../dummy-users';

@Component({
  selector: 'app-task-update-modal',
  templateUrl: './task-update-modal.component.html',
  styleUrls: ['./task-update-modal.component.css'],
})
export class TaskUpdateModalComponent implements OnChanges {
  @Input() selectedInfo: any = {};
  techs = DUMMY_TECHS;
  techId: number | null = null;

  constructor(){
    // this.techId = this.selectedInfo.techId;
    console.log(this.selectedInfo, this.techId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.techId = this.selectedInfo.techId;
    // console.log(this.selectedInfo, this.techId);
  }
}
