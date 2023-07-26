// * Base
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

// * Components
import FiltersComponent from '../../components/filters/filters.component';
import BurgerComponent from '../../components/burger/burger.component';
import LogoComponent from '../logo/logo.component';

const components = [LogoComponent, FiltersComponent, BurgerComponent];

@Component({
  standalone: true,
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, RouterLink, ...components],
})
export default class MobileHeaderComponent {
  // * Inputs
  @Input() MobileMode: boolean = false;
  // * Local
  protected isShowNavigation: boolean = false;
  protected isShowFilter: boolean = false;

  protected toggleNavigation() {
    this.isShowNavigation = !this.isShowNavigation;
  }

  protected toggleFilter() {
    this.isShowFilter = !this.isShowFilter;
    this.isShowNavigation = false;
  }

  protected closeNavigation() {
    this.isShowNavigation = false;
  }
}
