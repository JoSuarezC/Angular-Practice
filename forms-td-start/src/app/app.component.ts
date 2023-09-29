import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') signUpForm: NgForm;
  @ViewChild('note') note: ElementRef<HTMLParagraphElement>;
  @ViewChild('dataShown') dataShown: ElementRef<HTMLElement>;
  isNewsNoteShown: boolean = false;
  defaultQuestion: string = 'pet';
  answer: string = '';
  genders: string[] = ['Male', 'Female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted: boolean = false;
  isUsernameValidNoteShown: boolean = false;
  availabilityNote: string = '';

  validateUsername() {
    this.availabilityNote = 'Username is Valid!';
    this.isUsernameValidNoteShown = true;
    //setTimeout(() => this.note.nativeElement.focus(), 500);
  }

  selectNewsletter() {
    this.isNewsNoteShown = !this.isNewsNoteShown;
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) return;
    this.submitted = true;
    this.user.username = this.signUpForm.value.userData.username;
    this.user.email = this.signUpForm.value.userData.email;
    this.user.secretQuestion = this.signUpForm.value.secret;
    this.user.answer = this.signUpForm.value.questionAnswer;
    this.user.gender = this.signUpForm.value.gender;

    this.signUpForm.reset();

    this.dataShown.nativeElement.focus();
  }
}
