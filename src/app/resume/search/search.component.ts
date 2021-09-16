import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  success: any;
  err: any;
  constructor(public usersService: UsersService, private router: Router) {}

  ngOnInit(): void {}

  onSearch(form: NgForm) {
    if (form.invalid) {
      this.err = 'Please fill the required details correctly';
      return;
    }
    try {
      this.router.navigate(['/template', form.value.username]);
    } catch (err: any) {
      if (err.status == 401) {
        this.err = 'Not authorised to access resume';
      } else {
        this.err = 'Resume does not exist';
      }
    }
  }
}
