import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UiKitModule } from "../ui-kit/ui-kit.module";
import { CreateItemSelectComponent } from './components/create-item-select/create-item-select.component';

@NgModule({
  declarations: [
    CreateItemSelectComponent
  ],
  imports: [
    CommonModule,
    UiKitModule
  ],
  exports: [
    CreateItemSelectComponent
  ]
})
export class SharedModule { }
