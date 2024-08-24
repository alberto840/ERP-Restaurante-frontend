export interface TransferInterfaceData {
  id: number;
  date: any;
  reference: string | number;
  product: string;
  quantity: number;
  fromWarehouse: string;
  toWarehouse: string;
  reason: string;
  status: string;
  authorized: string;
  action: any;
}
export const transferData: TransferInterfaceData[] = [
  {
    id: 1,
    date: '02/01/2024',
    reference: 'S-326564580711',
    product: 'Cotton Polo Shirt',
    quantity: 150,
    fromWarehouse: 'Warehouse 5',
    toWarehouse: 'Warehouse 2',
    reason: 'Stock Rebalancing',
    status: 'Completed',
    authorized: 'Emily Johnson',
    action: 'action',
  },
  {
    id: 2,
    date: '03/01/2024',
    reference: 'S-326564580712',
    product: 'Denim Jeans',
    quantity: 200,
    fromWarehouse: 'Warehouse 9',
    toWarehouse: 'Warehouse 4',
    reason: 'Inter-Store Transfers',
    status: 'Pending',
    authorized: 'Michael Brown',
    action: 'action',
  },
  {
    id: 3,
    date: '04/01/2024',
    reference: 'S-326564580713',
    product: 'Cotton Hoodie',
    quantity: 80,
    fromWarehouse: 'Warehouse 2',
    toWarehouse: 'Warehouse 7',
    reason: 'Store Restocking',
    status: 'Completed',
    authorized: 'Sarah Johnson',
    action: 'action',
  },
  {
    id: 4,
    date: '05/01/2024',
    reference: 'S-326564580714',
    product: 'Leather Jacket',
    quantity: 50,
    fromWarehouse: 'Warehouse 6',
    toWarehouse: 'Warehouse 1',
    reason: 'Warehouse Consolidation',
    status: 'Rejected',
    authorized: 'Daniel White',
    action: 'action',
  },
  {
    id: 5,
    date: '06/01/2024',
    reference: 'S-326564580715',
    product: 'Sport Shoes',
    quantity: 120,
    fromWarehouse: 'Warehouse 3',
    toWarehouse: 'Warehouse 8',
    reason: 'Return Merchandise Authorization',
    status: 'Pending',
    authorized: 'Jessica Martinez',
    action: 'action',
  },
  {
    id: 6,
    date: '07/01/2024',
    reference: 'S-326564580716',
    product: 'Cotton Skirt',
    quantity: 90,
    fromWarehouse: 'Warehouse 1',
    toWarehouse: 'Warehouse 6',
    reason: 'Seasonal Inventory Adjustment',
    status: 'Completed',
    authorized: 'Kevin Johnson',
    action: 'action',
  },
  {
    id: 7,
    date: '08/01/2024',
    reference: 'S-326564580717',
    product: 'Silk Scarf',
    quantity: 70,
    fromWarehouse: 'Warehouse 4',
    toWarehouse: 'Warehouse 9',
    reason: 'Product Recall',
    status: 'Pending',
    authorized: 'Rachel Taylor',
    action: 'action',
  },
  {
    id: 8,
    date: '09/01/2024',
    reference: 'S-326564580718',
    product: 'Leather Wallet',
    quantity: 30,
    fromWarehouse: 'Warehouse 7',
    toWarehouse: 'Warehouse 2',
    reason: 'New Store Openings',
    status: 'Rejected',
    authorized: 'Andrew Clark',
    action: 'action',
  },
  {
    id: 9,
    date: '10/01/2024',
    reference: 'S-326564580719',
    product: 'Denim Shorts',
    quantity: 110,
    fromWarehouse: 'Warehouse 8',
    toWarehouse: 'Warehouse 3',
    reason: 'Obsolete Inventory Disposal',
    status: 'Completed',
    authorized: 'Olivia Brown',
    action: 'action',
  },
  {
    id: 10,
    date: '11/01/2024',
    reference: 'S-326564580720',
    product: 'Cotton Dress',
    quantity: 180,
    fromWarehouse: 'Warehouse 5',
    toWarehouse: 'Warehouse 1',
    reason: 'Supply Chain Optimization',
    status: 'Rejected',
    authorized: 'Robert Martinez',
    action: 'action',
  },
  {
    id: 11,
    date: '12/01/2024',
    reference: 'S-326564580470',
    product: 'Denim Jeans',
    quantity: 220,
    fromWarehouse: 'Warehouse 3',
    toWarehouse: 'Warehouse 7',
    reason: 'Supply Chain Optimization',
    status: 'Completed',
    authorized: 'Robert Perera',
    action: 'action',
  },
];