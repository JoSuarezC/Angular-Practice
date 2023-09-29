import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  projectStatusOptions: string[] = ['Stable', 'Critical', 'Finished'];
  forbiddenProjectNames: string[] = ['Test'];

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'project': new FormControl(null, [Validators.required], [this.isForbiddenProjectNameAsync.bind(this)]),
      'mail': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl(this.projectStatusOptions[0])
    });
  }

  onSubmit(): void {
    console.log('Project: ', this.projectForm.value.project);
    console.log('Mail: ', this.projectForm.value.mail);
    console.log('Project Status: ', this.projectForm.value.projectStatus);
  }

  isForbiddenProjectName(control: FormControl): {[key: string]: boolean} {
    return this.forbiddenProjectNames.indexOf(control.value) !== -1
    ? {'forbiddenProjectName': true}
    : null;
  }

  isForbiddenProjectNameAsync(control: FormControl): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        this.forbiddenProjectNames.indexOf(control.value) !== -1
        ? resolve({'forbiddenProjectName': true})
        : resolve(null);
      }, 1500);
    });
  }
}
