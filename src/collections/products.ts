import { CollectionConfig } from 'payload/types';

const Products: CollectionConfig = {
  slug: 'products',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'richText', editor: 'lexical' },
    { name: 'price', type: 'number', required: true },
    { name: 'images', type: 'upload', relationTo: 'media', required: true },
    { name: 'categories', type: 'relationship', relationTo: 'categories', hasMany: true },
    { name: 'availability', type: 'select', options: ['in-stock', 'out-of-stock', 'pre-order'] },
  ],
};

export default Products;
