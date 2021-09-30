import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent implements OnInit {
  err: any;
  success: any;

  sproficiency = ['Beginner', 'Intermediate', 'Proficient', 'Expert'];
  lproficiency = ['Elementary', 'Professional', 'Native / Bilingual'];

  myForm: FormGroup;
  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  get education(): FormArray {
    return <FormArray>this.myForm.get('education');
  }
  get projects(): FormArray {
    return <FormArray>this.myForm.get('projects');
  }
  get experience(): FormArray {
    return <FormArray>this.myForm.get('experience');
  }
  get skills(): FormArray {
    return <FormArray>this.myForm.get('skills');
  }
  get languages(): FormArray {
    return <FormArray>this.myForm.get('languages');
  }
  get hobbies(): FormArray {
    return <FormArray>this.myForm.get('hobbies');
  }

  eduGrp(): FormGroup {
    return this.fb.group({
      school: '',
      year: '',
      degree: '',
    });
  }
  expGrp(): FormGroup {
    return this.fb.group({
      job: '',
      time: '',
      company: '',
      role: '',
    });
  }
  skillsGrp(): FormGroup {
    return this.fb.group({
      skill: '',
      SProficiency: '',
    });
  }
  proGrp(): FormGroup {
    return this.fb.group({
      title: '',
      work: '',
      duration: '',
    });
  }
  langGrp(): FormGroup {
    return this.fb.group({
      lang: '',
      LProficiency: '',
    });
  }
  hobbGrp(): FormGroup {
    return this.fb.group({
      hobbie: '',
    });
  }
  ngOnInit() {
    this.myForm = this.fb.group({
      username: '',
      firstname: '',
      lastname: '',
      profession: '',
      email: '',
      phone: '',
      address: '',
      intro: '',
      hobbies: this.fb.array([this.hobbGrp()]),
      experience: this.fb.array([this.expGrp()]),
      education: this.fb.array([this.eduGrp()]),
      skills: this.fb.array([this.skillsGrp()]),
      projects: this.fb.array([this.proGrp()]),
      languages: this.fb.array([this.langGrp()]),
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      window.scrollTo(0, 0);
      this.err = 'Please fill the required details correctly';
      return;
    }
    this.usersService.submitResume(JSON.stringify(this.myForm.value)).subscribe(
      (data) => {
        console.log('Form data: ' + JSON.stringify(this.myForm.value));
        window.scrollTo(0, 0);
        this.err = null;
        this.success = data;
        this.myForm.reset();
        this.router.navigate(['/search']);
      },
      (err) => {
        console.error(err.error);
        window.scrollTo(0, 0);
        this.success = null;
        this.err = 'Something went wrong';
      }
    );
  }

  onAddExp() {
    this.experience.push(this.expGrp());
  }

  onDelExp(i: number) {
    this.experience.removeAt(i);
  }

  onAddEdu() {
    this.education.push(this.eduGrp());
  }

  onDelEdu(i: number) {
    this.education.removeAt(i);
  }

  onAddSkills() {
    this.skills.push(this.skillsGrp());
  }

  onDelSkills(i: number) {
    this.skills.removeAt(i);
  }

  onAddPro() {
    this.projects.push(this.proGrp());
  }

  onDelPro(i: number) {
    this.projects.removeAt(i);
  }

  onAddLang() {
    this.languages.push(this.langGrp());
  }

  onDelLang(i: number) {
    this.languages.removeAt(i);
  }

  onAddHobbies() {
    this.hobbies.push(this.hobbGrp());
  }

  onDelHobbies(i: number) {
    this.hobbies.removeAt(i);
  }
}
