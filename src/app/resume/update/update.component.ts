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

    this.active.data.subscribe(
      (res) => {
        this.setValues(res.resumeData);
      },
      (err) => {
        console.error(err.error);
        this.router.navigate(['/search']);
      }
    );
  }

  setValues(data: any) {
    this.myForm.patchValue({
      username: data.username,
      firstname: data.firstname,
      lastname: data.lastname,
      profession: data.profession,
      email: data.email,
      phone: data.phone,
      address: data.address,
      intro: data.intro,
      hobbies: data.hobbies,
      experience: data.experience,
      education: data.education,
      skills: data.skills,
      projects: data.projects,
      languages: data.languages,
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.err = 'Please fill the required details correctly';
      return;
    }
    console.log(this.myForm.value);
    this.router.navigate([
      '/template',
      this.active.snapshot.paramMap.get('username'),
    ]);
    // this.usersService
    //   .updateResume(
    //     this.active.snapshot.paramMap.get('username'),
    //     JSON.stringify(this.myForm.value)
    //   )
    //   .subscribe(
    //     (data) => {
    //       this.success = data;
    //       this.myForm.reset();
    //       this.router.navigate([
    //         '/template',
    //         this.active.snapshot.paramMap.get('username'),
    //       ]);
    //     },
    //     (err) => {
    //       console.error(err.error);
    //       this.err = 'Internal server error';
    //     }
    //   );
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
