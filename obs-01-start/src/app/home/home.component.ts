import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private observable: Subscription = null;

  constructor() { }

  ngOnInit():void {
    /*this.observable = interval(1000).subscribe(count => {
      console.log(count);
    });*/

    const customInterval = new Observable(subscriber => {
      let count:number = 0;
      setInterval(() => {
        subscriber.next(count++);
        count === 2 && subscriber.complete();
        count > 3 && subscriber.error(new Error('Count is greater than 3!'));
      }, 1000);
    });

    this.observable = customInterval.pipe(
      filter((data: number) => (data > 0)),
      map((data: number) => ('Round: ' + (data + 1))
    )).subscribe((data: any) => {
      console.log(data);
    }, error => {
      console.log(error);
    }, () => {
      console.log('Completed!');
    });
  }

  ngOnDestroy(): void {
    this.observable.unsubscribe();
  }

  

}
