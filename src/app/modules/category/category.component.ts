// * Base
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

// * RxJS
import { Subscription } from 'rxjs';

// * Components
import PaginatorComponent from '../../components/paginator/paginator.component';

// * Service
import DataExchangeService from '../../service/data-exchange.service';
import CategoryService from './category.service';

// * Types
import { IDateFilter } from 'src/app/types/data-filter.types';
import { TItem } from '../../types/item.types';

@Component({
  standalone: true,
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CategoryService],
  imports: [NgFor, NgIf, PaginatorComponent],
})
export default class CategoryComponent implements OnInit, OnDestroy {
  // * Injects
  private readonly dataExchangeService = inject(DataExchangeService);
  private readonly categoryService = inject(CategoryService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly route = inject(ActivatedRoute);
  // * Local
  private routeSubscription!: Subscription;
  protected currentPageItems: TItem[] = [];
  private itemsPerPage: number = 10;
  protected currentPage: number = 1;
  protected totalPages: number = 1;
  protected category: string = '';
  protected list: TItem[] = [];

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.dataExchangeService.showNavigation.next(params['category']);
      this.currentPage = 1;
      this.submit();
    });
    this.dataExchangeService.nameFilter.subscribe((nameFilter) => {
      this.applyFilters(nameFilter);
    });
    this.dataExchangeService.dateFilter.subscribe((dateFilter) => {
      this.applyFilters(dateFilter);
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.dataExchangeService.showNavigation.next('');
    this.dataExchangeService.dateFilter.unsubscribe();
    this.dataExchangeService.nameFilter.unsubscribe();
  }

  protected submit() {
    if (this.category) {
      this.categoryService.getItems(this.category).subscribe({
        next: (response) => {
          this.list = response;
          this.totalPages = Math.ceil(response.length / this.itemsPerPage);
          this.updateList();
          this.update();
        },
        error: (errorResponse) => {
          console.log('errorResponse: ', errorResponse);
        },
      });
    }
  }

  protected onPageChange(page: number) {
    this.currentPage = page;
    this.updateList();
  }

  private updateList() {
    this.currentPageItems = this.list.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      Math.min(
        (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage,
        this.list.length
      )
    );
    this.update();
  }

  private applyFilters(filter: string | IDateFilter) {
    const originalList = [...this.list];
    if (typeof filter === 'string') {
      this.list = this.list.filter((element) =>
        element.title.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      const { startYear, endYear } = filter;
      this.list = this.list.filter(
        (element) =>
          element.releaseYear >= startYear && element.releaseYear <= endYear
      );
    }
    this.totalPages = Math.ceil(this.list.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updateList();
    this.list = originalList;
    this.update();
  }

  private update() {
    this.cdr.detectChanges();
  }
}
