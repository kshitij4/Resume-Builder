import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css'],
})
export class ForgotPassComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log('form not valid!!');
      return;
    }
    try {
      console.log('Email: ' + form.value.email);
      this.usersService.forgetPass({ email: form.value.email }).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err: any) {}
  }
}
