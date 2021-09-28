import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/abstract';

import { ButtonInterface } from '..';

@Component({
  selector: 'vaultea-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss']
})
export class FormFooterComponent extends BaseComponent implements OnInit {
  @Input() public primaryButton: ButtonInterface = this.BUTTONS_CONSTANT.SUBMIT_BUTTON;
  @Input() public secondaryButton: ButtonInterface = this.BUTTONS_CONSTANT.CANCEL_BUTTON;

  constructor() { 
    super()  
  }

  public ngOnInit(): void {
  }
}
