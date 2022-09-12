import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { NgxPermissionsModule } from 'ngx-permissions';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchComponent } from './components/search/search.component';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [LoadingButtonComponent, PaginationComponent, SearchComponent, TruncatePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    NgxPermissionsModule.forChild(),
    DigitOnlyModule,
  ],
  exports: [
    ReactiveFormsModule,
    LoadingButtonComponent,
    PaginationComponent,
    SearchComponent,
    NgxPermissionsModule,
    NgSelectModule,
    DigitOnlyModule,
  ],
})
export class SharedModule {}
