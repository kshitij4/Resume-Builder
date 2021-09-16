import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { UsersService } from 'src/app/services/users.service';

interface userData {
  username: string;
  firstname: string;
  lastname?: string;
  profession: string;
  email: string;
  phone?: number;
  address?: string;
  intro?: string;
  skills: [{ skill?: string; SProficiency?: string }];
  education?: [
    {
      school?: string;
      year?: string;
      degree?: string;
    }
  ];
  experience?: [
    {
      job?: string;
      time?: string;
      company?: string;
      role?: string;
    }
  ];
  projects?: [
    {
      title?: string;
      work?: string;
      duration?: string;
    }
  ];
  languages?: [{ lang?: string; LProficiency?: string }];
  hobbies?: [{ hobbie?: string }];
}

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  data: userData;
  constructor(
    public usersService: UsersService,
    private router: Router,
    private active: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.active.data.subscribe(
      (res) => {
        this.data = res.templateData;
      },
      (err) => {
        console.error(err);
        this.router.navigate(['/search']);
      }
    );
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

  onUpdate() {
    try {
      const username = this.active.snapshot.paramMap.get('username');
      this.router.navigate(['/template/update', username]);
    } catch (err) {
      console.log(err);
    }
  }

  @ViewChild('contentToConvert', { static: false })
  contentToConvert!: ElementRef;
  public downloadPdf() {
    let filename = this.data.firstname;
    const doc = new jsPDF('p', 'mm', 'a4');
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    const node = this.contentToConvert.nativeElement;
    html2canvas(node).then(function (canvas) {
      doc.internal.scaleFactor = 4;
      var img = canvas.toDataURL('image/png');
      doc.addImage(img, 'PNG', 0, 0.1, width, height);
      doc.save(`${filename}_Resume.pdf`);
    });
  }
}
