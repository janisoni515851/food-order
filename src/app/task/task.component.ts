import { Component } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { DUMMY_TECHS } from '../dummy-users';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  users = DUMMY_USERS;
  selectedUserId?: string;
  selectedUser?: any;

  getSelectedUser(id: any) {
    return this.users.find((user) => user.id === id);
  }

  onUserSelect(id: any) {
    this.selectedUser = this.getSelectedUser(id);
    console.log(this.selectedUser);
  }
}
