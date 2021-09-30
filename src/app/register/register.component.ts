import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  success: any;
  err: any;
  constructor(private router: Router, private usersService: UsersService) {}
  ngOnInit(): void {}

  onRegister(form: NgForm) {
    if (form.invalid) {
      window.scrollTo(0, 0);
      this.err = 'Please fill the required details correctly';
      return;
    }
    if (form.value.pass !== form.value.cpass) {
      this.err = 'Passwords do not match';
    }
    this.usersService.register(JSON.stringify(form.value)).subscribe(
      (data) => {
        window.scrollTo(0, 0);
        this.err = null;
        form.resetForm();
        this.success = data;
      },
      (err) => {
        window.scrollTo(0, 0);
        console.log(err.error);
        this.success = null;
        this.err = 'Something went wrong';
      }
    );
  }
}
