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
  isNull:any;
  resumes: any;
  success: any;
  err: any;
  constructor(public usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.usersService.getUserResumes().subscribe(
      (data) => {
        this.isNull = Object.keys(data).length === 0 ;  
        this.resumes = data;        
      },
      (err) => {
        console.log(err);        
        this.err = 'No resumes found';
      }
    );
  }

  onResumeClick(username: any) {
    try {
      this.router.navigate(['/template', username]);
    } catch (err: any) {
      if (err.status == 401) {
        this.err = 'Not authorised to access resume';
      } else {
        this.err = 'Resume does not exist';
      }
    }
  }

  profToNum(prof: any) {
    if (prof === 'Beginner') {
      return 25;
    } else if (prof === 'Intermediate') {
      return 50;
    } else if (prof === 'Proficient') {
      return 75;
    } else {
      return 100;
    }
  }
}
