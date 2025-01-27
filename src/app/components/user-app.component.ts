import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { FormUserComponent } from './form-user/form-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  imports: [UserComponent, FormUserComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent {

  title: string = 'Listado de usuarios';

  users: User[] = [];

  userSlected: User;

  open: boolean = false;

  constructor(private service: UserService) {
    this.service.findAll().subscribe( users => this.users = users);
    this.userSlected = new User();
  }

  addUser(user: User) {
    if(user.id > 0){
      this.users = this.users.map( u => (u.id == user.id)? { ...user } : u);
    } else {
      this.users = [... this.users, {... user, id: new Date().getTime() % 1000 }];
    }

    Swal.fire({
      title: "Guardado!",
      text: "Usuario guardado con exito!",
      icon: "success"
    });
    this.open = false;
    this.userSlected = new User();
  }

  removeUser(id: number): void {
    Swal.fire({
      title: "¿Seguro que quiere eliminar este usuario?",
      text: "Cuidado el usuario sera eliminado del sistema",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter(user => user.id != id);
        Swal.fire({
          title: "Eliminado!",
          text: "El usuario ha sido eliminadio con exito.",
          icon: "success"
        });
      }
    });

  }

  setSelectedUser(user: User): void {
    this.userSlected = {... user};
    this.open = true;
  }

  setOpen(): void {
    this.open = !this.open;
  }

}
