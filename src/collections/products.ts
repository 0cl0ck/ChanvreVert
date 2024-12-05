import { CollectionConfig } from 'payload'

const Products: CollectionConfig = {
  slug: 'products',
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'description',
      type: 'richText',
      required: true, // Ajouter si nécessaire
      admin: {
        // toolbar: ['bold', 'italic', 'underline', 'link', 'ul', 'ol'], // Spécifiez les outils du richText
      },
    },
    { name: 'price', type: 'number', required: true },
    { name: 'images', type: 'upload', relationTo: 'media', required: true },
    { name: 'categories', type: 'relationship', relationTo: 'categories', hasMany: true },
    {
      name: 'availability',
      type: 'select',
      options: ['in-stock', 'out-of-stock', 'pre-order'],
    },
  ],
}

export default Products
