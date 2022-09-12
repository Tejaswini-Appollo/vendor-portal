import { Component } from '@angular/core';
import { PERMISSION_LIST } from '@shared/constants/constants';
import { AgGridContext } from '@shared/models/shared.model';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface CustomButton {
  btnClass: string;
  btnTitle: string;
  iconClass: string;
}

@Component({
  templateUrl: './ag-grid-actions.component.html',
})
export class AgGridActionsComponent implements AgRendererComponent {
  params: ICellRendererParams;
  context: AgGridContext;
  hasInvite: boolean;
  hasDetails: boolean;
  hasEdit: boolean;
  hasDelete: boolean;
  hasBillPaid: boolean;
  canView: string;
  canEdit: string;
  canDelete: string;
  canMarkBillStatus: string;
  billPaid = 'Paid';
  customButton: CustomButton;
  permissionList: typeof PERMISSION_LIST;
  disableDelete: string;

  agInit(params: ICellRendererParams): void {
    this.context = params.context;
    this.hasInvite = this.context.hasInvite;
    this.hasDetails = this.context.hasDetails;

    this.hasBillPaid = this.context.hasBillPaid;
    this.hasEdit = this.context.hasEdit;
    this.canView = this.context.canView;
    this.canEdit = this.context.canEdit;
    this.canDelete = this.context.canDelete;
    this.customButton = this.context.customButton;
    this.canMarkBillStatus = this.context.canMarkBillStatus;
    this.params = params;
    this.hasDelete = this.context.hasDelete;
    if (
      this.context.canDelete === 'canDeletePark' ||
      this.context.canDelete === 'canDeleteStorage' ||
      this.context.canDelete === 'canDeleteOrganization'
    ) {
      this.disableDelete = 'yes';
    }
  }

  refresh(): boolean {
    return false;
  }

  onInvite(): void {
    this.context.componentParent.invite.emit(this.params);
  }

  onView(): void {
    this.context.componentParent.view.emit(this.params);
  }

  onEdit(): void {
    this.context.componentParent.editRow.emit(this.params);
  }

  onDelete(): void {
    this.context.componentParent.onDelete(this.params);
  }

  onBillPaid(): void {
    this.context.componentParent.billPaid.emit(this.params);
  }

  onCustomButtonClick(): void {
    this.context.componentParent.customButtonClick.emit(this.params);
  }
}
