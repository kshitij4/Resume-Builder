import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css'],
})
export class ForgotPassComponent {
  message: any;
  err: any;

  constructor(private usersService: UsersService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log('form not valid!!');
      return;
    }
    try {
      this.usersService.forgetPass({ email: form.value.email }).subscribe(
        (data) => {
          this.err =null;
          this.message = data;
        },
        (err) => {
          console.log(err);
          this.err = err.error;
        }
      );
    } catch (err: any) {
      console.log(err.error);
    }
  }
}
