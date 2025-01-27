import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'user-app',
  imports: [UserComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent {

  title: string = 'Listado de usuarios';

  users: User[] = [];

  constructor(private service: UserService) {
    this.service.findAll().subscribe( users => this.users = users);
  }

}
