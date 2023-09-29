import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinner } from "./loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [
    DropdownDirective,
    LoadingSpinner
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective,
    LoadingSpinner,
    CommonModule
  ]
})
export class SharedModule {}