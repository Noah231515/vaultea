import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vaultea-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() public disabled: boolean = false;
  @Input() public text: string = '';
  @Input() public color: string = 'primary';
  @Input() public buttonTypeClass: string = 'mat-button';

  constructor() { }

  ngOnInit(): void {
  }

}
