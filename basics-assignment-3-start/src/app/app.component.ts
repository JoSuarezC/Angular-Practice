import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showDetail: boolean = false;
  clicksLogged: Array<Date> = [];

  onDisplayDetails(): void {
    this.showDetail = !this.showDetail;
    this.clicksLogged.push(new Date());
  }
}
