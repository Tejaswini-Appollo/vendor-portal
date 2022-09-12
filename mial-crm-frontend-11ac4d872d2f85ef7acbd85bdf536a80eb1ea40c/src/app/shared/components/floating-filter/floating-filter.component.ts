import { Component } from '@angular/core';
import { State } from '@ngrx/store';
import { GLOBAL_SEARCH_DELAY } from '@shared/constants/constants';
import { IFilterParams } from 'ag-grid-community';
import { debounce } from 'lodash';
import { AppState } from 'src/app/app.reducer';

export interface FilterParams extends IFilterParams {
  filterParams: { context: any; filterParams: FilterParams };
  stateName: string;
}

@Component({
  templateUrl: './floating-filter.component.html',
  styleUrls: ['./floating-filter.component.scss'],
})
export class FloatingFilterComponent {
  public currentValue: string;
  filterParams: FilterParams;

  onSearchChanged = debounce(function (params: string): void {
    const searchData = {
      [this.filterParams.column.getId()]: params,
    };
    this.filterParams.filterParams.context.componentParent.onFilterChange(searchData);
  }, GLOBAL_SEARCH_DELAY);

  constructor(private state: State<AppState>) {}

  agInit(params: FilterParams): void {
    this.filterParams = params;
    const stateName: string = params.filterParams.context.stateName;
    const filteredColumnName: string = params.column.getId();

    this.currentValue = this.state.value[stateName]?.columns[filteredColumnName] || '';
  }
}
