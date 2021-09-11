import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public router: Router, public userService: UsersService) {}

  ngOnInit() {
    if (this.userService.isLogged()) {
      this.router.navigate(['/resume']);
    }
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid Form');
      return;
    }
    this.userService.login(JSON.stringify(form.value)).subscribe(
      (data: any) => {
        localStorage.setItem('token', JSON.stringify(data)),
          form.resetForm(),
          this.router.navigate(['/resume']);
      },
      (err) => {
        {
          alert(err.error);
        }
      }
    );
  }
}
