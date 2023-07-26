// * Base
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-logo',
  template: ` <div>
    <a routerLink="/">
      <img src="assets/images/logo.png" alt="logo" />
    </a>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LogoComponent {}
