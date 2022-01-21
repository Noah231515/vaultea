import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UiKitModule } from "../ui-kit.module";
import { FormHeaderComponent } from "./form-header.component";

describe("FormHeaderComponent", () => {
  let component: FormHeaderComponent;
  let fixture: ComponentFixture<FormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormHeaderComponent ],
      imports: [ UiKitModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHeaderComponent);
    component = fixture.componentInstance;
    component.formHeaderData = {
      hLevel: "h2",
      headerText: "Hello World"
    }
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
