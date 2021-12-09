import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { UiKitModule } from "../ui-kit/ui-kit.module";
import { FolderFormComponent } from "./form/folder-form.component";

@NgModule({
  declarations: [
    FolderFormComponent
  ],
  exports: [
    FolderFormComponent
  ],
  imports: [
    CommonModule,
    UiKitModule
  ]
})
export class FolderModule { }
