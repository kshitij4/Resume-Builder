import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css'],
})
export class ResetPassComponent implements OnInit {
  email: any;
  success: any;
  err: any;
  constructor(
    public usersService: UsersService,
    private active: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.active.data.subscribe(
      (res) => {
        this.email = res.userEmail;
      },
      (err) => {
        this.err = err.error;
        console.log(err.message);
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.err = 'Form not valid';
      return;
    }
    if (form.value.pass !== form.value.cpass) {
      this.err = 'Passwords do not match';
      return;
    }
    this.err = null;
    this.usersService
      .updatePass(
        this.active.snapshot.paramMap.get('id'),
        this.active.snapshot.paramMap.get('token'),
        { pass: form.value.pass }
      )
      .subscribe(
        (res) => {
          this.success = res;
          form.resetForm();
        },
        (err) => {
          console.log(err);
          this.err = 'Server Error';
        }
      );
  }
}
