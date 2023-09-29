import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  incrementalNumbers: number[] = []

  onIncretalDone(newNumber: number): void {
    this.incrementalNumbers.push(newNumber);
  }
}
