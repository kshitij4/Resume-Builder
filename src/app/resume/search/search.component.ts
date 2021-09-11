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
  // resumes : [Object];
  constructor(public usersService: UsersService, private router: Router) {}

  ngOnInit(): void {}

  onSearch(form: NgForm) {
    if (form.invalid) {
      console.log('form not valid!!');
      return;
    }
    try {
      this.router.navigate(['/template', form.value.username]);
    } catch (err: any) {
      if (err.status == 401) {
        alert(err);
      } else {
        alert('Resume does not exist!!');
      }
    }
  }
}
