import { TextFieldModule } from "@angular/cdk/text-field";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";

import { TextAreaComponent } from "./text-area.component";

describe("TextAreaComponent", () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAreaComponent ],
      imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        TextFieldModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    const textAreaData = {
      label: "Test",
      formControl: new FormControl(""),
    };

    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    component.textAreaData = textAreaData;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
