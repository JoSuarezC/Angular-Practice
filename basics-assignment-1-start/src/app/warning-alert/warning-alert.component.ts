import { Component } from "@angular/core";

@Component({
  selector: 'app-warning-alert',
  templateUrl: './warning-alert.component.html',
  styles: [`
    .warning-container {
      padding: 20px;
      border: 5px solid orange;
    }
  `]
})
export class WarningAlertComponent {
  text = 'Warning: There may be a issue';

  constructor() {

  }
};