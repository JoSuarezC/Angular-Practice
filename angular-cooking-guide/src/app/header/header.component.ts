import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  isAuthenticated: boolean = false;
  private userSub: Subscription = null;

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user: User) => {
      this.isAuthenticated = user ? true : false;
      console.log("this.isAuthenticated", this.isAuthenticated);
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  
  onSaveData(): void {
    this.dataStorage.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorage.fetchRecipes().subscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }
};