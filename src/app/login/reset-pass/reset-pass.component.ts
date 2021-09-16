import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private active: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.usersService.isLogged()) {
      this.router.navigate(['/resume']);
      return;
    }
    this.active.data.subscribe(
      (res) => {
        this.email = res.userEmail;
      },
      (err) => {
        this.err = err.error;
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.err = 'Please fill the required details correctly';
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
          this.err = 'Internal Server Error';
        }
      );
  }
}
