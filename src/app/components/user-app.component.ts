import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { FormUserComponent } from './form-user/form-user.component';

@Component({
  selector: 'user-app',
  imports: [UserComponent, FormUserComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent {

  title: string = 'Listado de usuarios';

  users: User[] = [];

  constructor(private service: UserService) {
    this.service.findAll().subscribe( users => this.users = users);
  }

  addUser(user: User) {
    this.users = [... this.users, {... user, id: new Date().getTime() % 1000 }];
  }

}
