import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenNames: string[] = ['Christian', 'Anna'];

  ngOnInit():void {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.isForbiddenName.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], [this.isForbiddenEmail])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit():void {
    console.log(this.signUpForm);
  }

  onAddHobby(): void {
    const newControl = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(newControl);
  }

  get controls() {
    console.log((this.signUpForm.get('hobbies') as FormArray).controls);
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }

  isForbiddenName(control: FormControl): {[key: string]: boolean} {
    return (this.forbiddenNames.indexOf(control.value) !== -1)
      ? {'nameIsForbidden': true}
      : null;
  }

  isForbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        (control.value === 'josuarezcam@gmail.com')
        ? resolve({emailIsForbidden: true})
        : resolve(null)
      }, 1500);
    });
  }
}
