import {
  OverviewField,
  MetaTitleField,
  MetaImageField,
  MetaDescriptionField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { CollectionConfig } from 'payload'

const Products: CollectionConfig = {
  slug: 'products',
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'productType',
      type: 'radio',
      required: true,
      defaultValue: 'simple',
      options: [
        {
          label: 'Produit Simple',
          value: 'simple',
        },
        {
          label: 'Produit Variable',
          value: 'variable',
        },
      ],
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        condition: (data) => data.productType === 'simple',
        description: 'Prix pour un produit simple',
      },
    },
    {
      name: 'variations',
      type: 'array',
      label: 'Variantes du produit',
      admin: {
        condition: (data) => data.productType === 'variable',
        description: 'Ajoutez les différentes variantes du produit',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nom de la variante',
          admin: {
            description: 'Ex: 1g, 3g, 5g, etc.',
          },
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
          label: 'Prix de la variante',
        },
      ],
    },
    { name: 'images', type: 'relationship', relationTo: 'media', required: true, hasMany: true },
    { name: 'categories', type: 'relationship', relationTo: 'categories', hasMany: true },
    {
      name: 'availability',
      type: 'select',
      options: ['in-stock', 'out-of-stock', 'pre-order'],
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
}

export default Products
