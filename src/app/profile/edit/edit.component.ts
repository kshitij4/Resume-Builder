import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { dataDisplay } from '../profile-model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  data: dataDisplay;
  myForm: FormGroup;
  constructor(
    public userService: UsersService,
    private router: Router,
    private active: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: { value: '', disabled: 'true' },
      firstname: '',
      lastname: '',
      gender: '',
      phone: '',
      age: '',
    });

    this.active.data.subscribe(
      (res) => {
        this.data = res.profileData;
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            this.router.navigate(['./logout']);
          }
        }
      }
    );

    this.myForm.setValue({
      email: this.data.email,
      firstname: this.data.firstname,
      lastname: this.data.lastname,
      gender: this.data.gender,
      phone: this.data.phone,
      age: this.data.age,
    });
  }

  onUpdate() {
    if (this.myForm.invalid) {
      console.log('Form not valid');
      return;
    }
    this.userService.updateProfile(this.myForm.value).subscribe(
      (res) => { alert(res);},
      (err) => { console.log(err)}
    );
  }
}
