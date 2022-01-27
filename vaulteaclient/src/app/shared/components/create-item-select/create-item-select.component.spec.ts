import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemSelectComponent } from './create-item-select.component';

describe('CreateItemSelectComponent', () => {
  let component: CreateItemSelectComponent;
  let fixture: ComponentFixture<CreateItemSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateItemSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItemSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
