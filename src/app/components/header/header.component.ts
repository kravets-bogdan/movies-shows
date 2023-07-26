// * Base
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

// * Components
import MobileHeaderComponent from '../mobile-header/mobile-header.component';
import FiltersComponent from '../../components/filters/filters.component';
import BurgerComponent from '../../components/burger/burger.component';
import LogoComponent from '../logo/logo.component';

const components = [
  MobileHeaderComponent,
  FiltersComponent,
  BurgerComponent,
  LogoComponent,
];

// * Service
import DataExchangeService from '../../service/data-exchange.service';
import CategoryService from '../../modules/category/category.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CategoryService],
  imports: [RouterLink, NgIf, ...components],
})
export default class HeaderComponent implements OnInit, OnDestroy {
  // * Injects
  private readonly dataExchangeService = inject(DataExchangeService);
  private readonly cdr = inject(ChangeDetectorRef);
  // * Local
  protected isShowNavigation: boolean = false;
  protected isMobileMode: boolean = false;
  protected isShowFilter: boolean = true;
  protected showNavigation: string = '';

  ngOnInit() {
    this.dataExchangeService.showNavigation.subscribe((data) => {
      this.showNavigation = data;
      this.cdr.detectChanges();
    });
    window.addEventListener('resize', () => this.resize());
    this.isMobileMode = window.innerWidth < 1024;
  }

  ngOnDestroy() {
    this.dataExchangeService.showNavigation.unsubscribe();
    window.removeEventListener('resize', this.resize);
  }

  private resize() {
    this.isMobileMode = window.innerWidth < 1024;
    this.cdr.detectChanges();
    if (!this.isMobileMode) {
      this.isShowNavigation = false;
    }
  }
}
