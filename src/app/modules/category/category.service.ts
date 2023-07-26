// * Base
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// * RxJS
import { map } from 'rxjs';

// * Types
import { TItem } from '../../types/item.types';

type TGetItemsResonse = {
  entries: TItem[];
  total: number;
};

@Injectable()
export default class CategoryService {
  // * Inject
  private readonly http = inject(HttpClient);

  getItems(category: string) {
    return this.http
      .get<TGetItemsResonse>(
        `https://static.rviewer.io/challenges/datasets/dreadful-tomatoes/data.json`
      )
      .pipe(
        map((response) => {
          const filteredEntries = response.entries.filter(
            (element) => element.programType === category
          );

          const limitedEntries = filteredEntries.map((entry) => ({
            ...entry,
            description: this.limitWords(entry.description, 12),
          }));

          return limitedEntries;
        })
      );
  }

  private limitWords(text: string, wordLimit: number): string {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  }
}
