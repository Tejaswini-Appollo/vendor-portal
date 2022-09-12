import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AG_GRID_DEFAULT_COLUMN_DEFS } from '@shared/constants/ag-grid.constants';
import {
  AgGridContext,
  DeleteModelContent,
  FloatingFilterSearchData,
} from '@shared/models/shared.model';
import { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { AgGridActionsComponent, CustomButton } from '../ag-grid-actions/ag-grid-actions.component';
import { AgGridLoadingOverlayComponent } from '../ag-grid-loading-overlay/ag-grid-loading-overlay.component';
import { AgGridNoRowsOverlayComponent } from '../ag-grid-no-rows-overlay/ag-grid-no-rows-overlay.component';
import { NoRowsOverlayComponentParams } from '../ag-grid-no-rows-overlay/ag-grid-no-rows-overlay.model';
import { AgGridDateTooltipComponent } from '../ag-grid-tooltip-date/ag-grid-tooltip-date.component';
import { DeleteComponent } from '../delete/delete.component';
import { FloatingFilterComponent } from '../floating-filter/floating-filter.component';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
})
export class AgGridComponent implements OnInit, OnDestroy {
  @Input() rowData: any[] | Observable<any[]>;
  @Input() getRowClass: string;
  @Input() columnDefs: ColDef[];
  @Input() defaultColumnDefs: ColDef;
  @Input() noRowsOverlayComponentParams: NoRowsOverlayComponentParams;
  @Input() deleteModelContent: DeleteModelContent;
  @Input() hasDetails: boolean = true;
  @Input() hasInvite: boolean = false;
  @Input() hasEdit: boolean = true;
  @Input() hasDelete: boolean = true;
  @Input() hasBillPaid: boolean = false;
  @Input() canView: string;
  @Input() canEdit: string;
  @Input() canDelete: string;
  @Input() canMarkBillStatus: string;
  @Input() stateName: string;
  @Input() customButtonOptions: CustomButton;

  @Output() gridReady = new EventEmitter<GridReadyEvent>();
  @Output() editRow = new EventEmitter<ICellRendererParams>();
  @Output() deleteRow = new EventEmitter<ICellRendererParams>();
  @Output() view = new EventEmitter<ICellRendererParams>();
  @Output() invite = new EventEmitter<ICellRendererParams>();
  @Output() billPaid = new EventEmitter<ICellRendererParams>();
  @Output() floatingFilter = new EventEmitter<FloatingFilterSearchData>();
  @Output() customButtonClick = new EventEmitter<ICellRendererParams>();

  private agGrid: GridReadyEvent;
  loadingOverlayComponent: string;
  noRowsOverlayComponent: string;
  context: AgGridContext;
  defaultColDef: ColDef;
  frameworkComponents: {
    actionRenderer: typeof AgGridActionsComponent;
    noRowsOverlayComponent: typeof AgGridNoRowsOverlayComponent;
    loadingOverlayComponent: typeof AgGridLoadingOverlayComponent;
    floatingFilterComponent: typeof FloatingFilterComponent;
    dateTooltipComponent: typeof AgGridDateTooltipComponent;
  };
  bsModalRef: BsModalRef;
  private subscriptions = new Subscription();
  isAutoSize: boolean;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
    this.context = {
      componentParent: this,
      stateName: this.stateName,
      hasInvite: this.hasInvite,
      hasDetails: this.hasDetails,
      hasEdit: this.hasEdit,
      hasDelete: this.hasDelete,
      hasBillPaid: this.hasBillPaid,
      canView: this.canView,
      canEdit: this.canEdit,
      canDelete: this.canDelete,
      canMarkBillStatus: this.canMarkBillStatus,
      customButton: this.customButtonOptions,
    };
    this.frameworkComponents = {
      actionRenderer: AgGridActionsComponent,
      noRowsOverlayComponent: AgGridNoRowsOverlayComponent,
      loadingOverlayComponent: AgGridLoadingOverlayComponent,
      floatingFilterComponent: FloatingFilterComponent,
      dateTooltipComponent: AgGridDateTooltipComponent,
    };
    this.loadingOverlayComponent = 'loadingOverlayComponent';
    this.noRowsOverlayComponent = 'noRowsOverlayComponent';
    this.defaultColDef = { ...AG_GRID_DEFAULT_COLUMN_DEFS, ...this.defaultColumnDefs };
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onGridReady(params: GridReadyEvent): void {
    this.agGrid = params;
    this.gridReady.emit(params);
  }

  onFirstDataRendered(): void {
    this.sizeToFit();
  }

  onDelete(params: ICellRendererParams): void {
    const modelOptions: ModalOptions = {
      animated: true,
    };
    this.bsModalRef = this.modalService.show(DeleteComponent, modelOptions);
    this.bsModalRef.content.deleteModelContent = this.deleteModelContent;
    const observer = this.bsModalRef.content.delete.subscribe(() =>
      this.deleteRow.emit(params.data)
    );
    this.subscriptions.add(observer);
  }

  onFilterChange(params: FloatingFilterSearchData): void {
    this.floatingFilter.emit(params);
  }

  sizeToFit(): void {
    this.agGrid.api.sizeColumnsToFit();
    this.isAutoSize = false;
  }

  autoSizeAll(): void {
    this.agGrid.columnApi.autoSizeAllColumns();
    this.isAutoSize = true;
  }
}
