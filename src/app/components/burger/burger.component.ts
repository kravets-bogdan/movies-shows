// * Base
import {
  ChangeDetectionStrategy,
  EventEmitter,
  Component,
  Output,
  Input,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-burger',
  template: `<button
    type="button"
    [class.open]="isOpen"
    (click)="toggle.emit()"
  >
    <span></span>
    <span></span>
    <span></span>
  </button> `,
  styleUrls: ['./burger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BurgerComponent {
  // * Inputs
  @Input() isOpen: boolean = false;
  // * Outpust
  @Output() toggle = new EventEmitter<boolean>();
}
