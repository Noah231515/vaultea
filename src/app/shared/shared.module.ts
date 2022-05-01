import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FolderModule } from "@folder";

import { PasswordModule } from "../password/password.module";
import { UiKitModule } from "../ui-kit/ui-kit.module";
import { CreateItemSelectComponent } from "./components/create-item-select/create-item-select.component";

@NgModule({
  declarations: [
    CreateItemSelectComponent
  ],
  exports: [
    CreateItemSelectComponent
  ],
  imports: [
    CommonModule,
    FolderModule,
    PasswordModule,
    UiKitModule
  ],
})
export class SharedModule { }
