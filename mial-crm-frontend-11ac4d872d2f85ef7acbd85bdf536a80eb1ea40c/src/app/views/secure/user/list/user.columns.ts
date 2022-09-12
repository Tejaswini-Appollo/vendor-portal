import { GridColumns } from '@shared/models/shared.model';

export const UserColumnDefs: GridColumns[] = [
  { field: 'vendor', headerName: 'Vendor' },
  { field: 'name', headerName: 'Name' },
  { field: 'house_no', headerName: 'House No' },
  { field: 'street', headerName: 'Street' },
  { field: 'city', headerName: 'City' },
  { field: 'district', headerName: 'District' },
  { field: 'postal_code', headerName: 'Postal code' },
  { field: 'telephone_no', headerName: 'Telephone number' },
  { field: 'email', headerName: 'Email Id' },
  {
    headerName: 'Actions',
    cellRenderer: 'actionRenderer',
    pinned: 'right',
  },
];
