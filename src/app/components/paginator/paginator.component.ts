// * Base
import {
  ChangeDetectionStrategy,
  AfterContentChecked,
  EventEmitter,
  Component,
  Output,
  Input,
} from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor],
})
export default class PaginatorComponent implements AfterContentChecked {
  // * Inputs
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  // * Outputs
  @Output() pageChange = new EventEmitter<number>();
  // * Local
  protected pages: number[] = [];

  ngAfterContentChecked() {
    this.pages = Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );
  }

  protected onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
