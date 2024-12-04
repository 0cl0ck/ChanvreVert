import { CollectionConfig } from 'payload/types';

const Orders: CollectionConfig = {
  slug: 'orders',
  fields: [
    { name: 'client', type: 'relationship', relationTo: 'customers', required: true },
    { name: 'items', type: 'relationship', relationTo: 'products', hasMany: true, required: true },
    { name: 'total', type: 'number', required: true },
    { name: 'status', type: 'select', options: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], required: true },
  ],
};

export default Orders;
