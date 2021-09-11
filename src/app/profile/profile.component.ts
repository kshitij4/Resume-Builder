import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { dataDisplay } from './profile-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  data: dataDisplay;

  constructor(
    public userService: UsersService,
    private router: Router,
    private active: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.active.data.subscribe(
      (res) => {
        this.data = res.profileData;
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            this.router.navigate(['./logout']);
          }
        } else {
          alert(err);
        }
      }
    );
  }
}
