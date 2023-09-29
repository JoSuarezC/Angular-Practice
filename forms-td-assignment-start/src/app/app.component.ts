import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') subscriptionForm: NgForm;
  defaultSubscription: string = 'Advanced';
  submitted: boolean = false;
  subscriptionData = {
    email: '',
    subscriptionType: '',
    password: ''
  };

  onSubmit(): void {
    this.submitted = true;
    this.subscriptionData.email = this.subscriptionForm.value.email;
    this.subscriptionData.subscriptionType = this.subscriptionForm.value.subscription;
    this.subscriptionData.password = this.subscriptionForm.value.password;
    this.subscriptionForm.reset();
  }
}
