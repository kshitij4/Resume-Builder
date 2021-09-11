import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public router : Router, public userService: UsersService) {}

  ngOnInit(): void {}

  onLogout() {
    this.userService.clearToken();
    this.router.navigate(["/login"]);
  }
}
