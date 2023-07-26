// * Base
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

// * Service
import DataExchangeService from '../../service/data-exchange.service';

@Component({
  standalone: true,
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NgIf, NgFor],
})
export default class FiltersComponent implements OnInit {
  // * Injects
  private readonly dataExchangeService = inject(DataExchangeService);
  // * Local
  protected yearsList: number[] = [];
  protected startYear: number = 0;
  protected endYear: number = 0;
  protected name: string = '';

  ngOnInit() {
    this.getYears();
  }

  protected filterByName() {
    this.dataExchangeService.nameFilter.next(this.name);
  }

  protected filterByDate() {
    this.dataExchangeService.dateFilter.next({
      startYear: this.startYear,
      endYear: this.endYear,
    });
  }

  private getYears() {
    for (let i = 1920; i <= new Date().getFullYear(); i++) {
      this.yearsList.push(i);
    }
    this.startYear = this.yearsList[0];
    this.endYear = this.yearsList[this.yearsList.length - 1];
  }
}
