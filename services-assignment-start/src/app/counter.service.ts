import { Injectable } from "@angular/core";

@Injectable()
export class CounterService {
  inactiveToActive: number = 0;
  activeToInactive: number = 0;

  countInactiveToActive() {
    this.inactiveToActive++;
    console.log("inactive => active", this.inactiveToActive);
  }

  countActiveToInactive() {
    this.activeToInactive++;
    console.log("active => inactive", this.activeToInactive);
  }

}