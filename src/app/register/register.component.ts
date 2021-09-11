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
  constructor(private router: Router, private usersService: UsersService) {}
  ngOnInit(): void {}

  onRegister(form: NgForm) {
    if (form.invalid || form.value.pass !== form.value.cpass) {
      alert('Invalid Credentials');
      return;
    }
    this.usersService.register(JSON.stringify(form.value)).subscribe(
      (data) => {
        form.resetForm(),
        alert('Registered Successfully!'),
        this.router.navigate(['/login'])
      },
      (err) => {
        console.log(err), alert(err.error);
      }
    );
  }
}
