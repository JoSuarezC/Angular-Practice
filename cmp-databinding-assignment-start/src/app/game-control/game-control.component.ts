import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  incremental: number = 0;
  intervalID: number = 0;
  @Output() onIncremental = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onStartGame():void {
    this.intervalID = window.setInterval(
      () => { 
        this.onIncremental.emit(this.incremental++);
      }, 
      1000);
  }

  onStopGame():void {
    clearInterval(this.intervalID);
  }

}
