import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ButtonInterface } from '..';

@Component({
  selector: 'vaultea-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() public primaryButton: ButtonInterface;
  @Input() public secondaryButton: ButtonInterface;
  @Input() public formTemplate: TemplateRef<any>;

  constructor() { }

  public ngOnInit(): void {
  }
}
