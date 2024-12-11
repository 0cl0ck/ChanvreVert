import React from 'react'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import ProductCategoryCard from 'src/components/ProductCategoryCard'

const CategoriesProduitsPage = async () => {
  const payload = await getPayload({ config: payloadConfig })
  const categories = await payload.find({
    collection: 'categories',
    where: {
      type: {
        equals: 'product',
      },
    },
  })

  return (
    <div>
      <h1>Catégories de Produits</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.docs.map((category) => (
          <ProductCategoryCard key={category.id} title={category.title} image={category.image} />
        ))}
      </div>
    </div>
  )
}

export default CategoriesProduitsPage
