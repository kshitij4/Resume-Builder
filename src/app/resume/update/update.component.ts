import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  SelectControlValueAccessor,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  err: any;
  success: any;
  sproficiency = ['Beginner', 'Intermediate', 'Proficient', 'Expert'];
  lproficiency = ['Elementary', 'Professional', 'Native / Bilingual'];

  myForm: FormGroup;
  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private active: ActivatedRoute
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
      username: [{value: '',disabled: true }],
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

    this.active.data.subscribe(
      (res) => {
        // this.setValues(res.resumeData);
        const data = res.resumeData;
        console.log("data: ",data);
        
        const exps = this.myForm.get('experience') as FormArray;
        const edus = this.myForm.get('education') as FormArray;
        const skills = this.myForm.get('skills') as FormArray;
        const projects = this.myForm.get('projects') as FormArray;
        const langs = this.myForm.get('languages') as FormArray;
        const hobbies = this.myForm.get('hobbies') as FormArray;
        while (exps.length) {
          exps.removeAt(0);
        }
        while (edus.length) {
          edus.removeAt(0);
        }
        while (skills.length) {
          skills.removeAt(0);
        }
        while (projects.length) {
          projects.removeAt(0);
        }
        while (langs.length) {
          langs.removeAt(0);
        }
        while (hobbies.length) {
          hobbies.removeAt(0);
        }
        this.myForm.patchValue(data);

        data.experience.forEach( (val:any) => this.experience.push(this.fb.group(val)));
        data.education.forEach( (val:any) => this.education.push(this.fb.group(val)));
        data.skills.forEach( (val:any) => this.skills.push(this.fb.group(val)));
        data.projects.forEach( (val:any) => this.projects.push(this.fb.group(val)));
        data.languages.forEach( (val:any) => this.languages.push(this.fb.group(val)));
        data.hobbies.forEach( (val:any) => this.hobbies.push(this.fb.group(val)));
      },
      (err) => {
        console.error(err.error);
        this.router.navigate(['/search']);
      }
    );
  }

  onSubmit() {
    if (this.myForm.invalid) {
      window.scrollTo(0, 0);
      this.err = 'Please fill the required details correctly';
      return;
    }
    console.log(this.myForm.value);
    this.usersService
      .updateResume(
        this.active.snapshot.paramMap.get('username'),
        JSON.stringify(this.myForm.value)
      )
      .subscribe(
        (data) => {
          window.scrollTo(0, 0);
          this.err = null;
          this.success = data;
          setTimeout(() => this.success = 'You will be redirected to your resume now', 1000);
          setTimeout(() => {
            this.router.navigate([
              '/template',
              this.active.snapshot.paramMap.get('username'),
            ]);
          }, 2000);
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
