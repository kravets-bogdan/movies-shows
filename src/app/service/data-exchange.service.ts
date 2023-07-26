// * Base
import { Injectable } from '@angular/core';

// * RxJS
import { Subject } from 'rxjs';

// * Types
import { IDateFilter } from '../types/data-filter.types';

@Injectable({
  providedIn: 'root',
})
export default class DataExchangeService {
  // * Local
  dateFilter = new Subject<IDateFilter>();
  showNavigation = new Subject<string>();
  nameFilter = new Subject<string>();
}
