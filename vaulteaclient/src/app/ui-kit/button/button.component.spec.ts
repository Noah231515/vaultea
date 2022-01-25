import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material/button";

import { ButtonComponent } from "./button.component";
import { ButtonInterface } from '..';

describe("ButtonComponent", () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonData: ButtonInterface = {
    buttonTypeClass: "",
    color: "primary",
    ariaLabel: "test"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ButtonComponent
      ],
      imports: [
        CommonModule,
        MatButtonModule
      ],
      providers: [
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.buttonData = buttonData;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
