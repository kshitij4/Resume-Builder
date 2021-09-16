import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css'],
})
export class ForgotPassComponent implements OnInit {
  success: any;
  err: any;

  constructor(private usersService: UsersService, private router: Router) {}
  ngOnInit(): void {
    if (this.usersService.isLogged()) {
      this.router.navigate(['/resume']);
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.err = 'Please fill the required details correctly';
      return;
    }
    try {
      this.usersService.forgetPass({ email: form.value.email }).subscribe(
        (data) => {
          this.err = null;
          this.success = data;
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
