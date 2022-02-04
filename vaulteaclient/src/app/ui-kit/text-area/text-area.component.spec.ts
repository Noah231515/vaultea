import { TextFieldModule } from "@angular/cdk/text-field";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl } from "@angular/forms";

import { TextAreaComponent } from "./text-area.component";

describe("TextAreaComponent", () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAreaComponent ],
      imports: [ TextFieldModule ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    const textAreaData = {
      label: "Test",
      formControl: new FormControl(),
    };

    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    component.textAreaData = textAreaData;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
