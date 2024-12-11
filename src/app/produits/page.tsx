import payloadConfig from '@payload-config'
import { getPayload } from 'payload'
import { PayloadLexicalReact } from '@zapal/payload-lexical-react'

import React from 'react'
import { ProductCategoryCard } from '@/components/ProductCategoryCard'

const ProductsPage = async () => {
  const payload = await getPayload({ config: payloadConfig })
  const products = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 10,
    select: {
      title: true,
      description: true,
      price: true,
      images: true,
      categories: true,
      availability: true,
    },
  })

  return (
    <div>
      <h1>Nos Produits</h1>
      <ul>
        {products.docs.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <PayloadLexicalReact content={product.description} />
            <p>Price: ${product.price}</p>
            <p>Availability: {product.availability}</p>
            <p>
              Categories:{' '}
              {product.categories
                ?.map((category) => (typeof category === 'string' ? category : category.title))
                .join(', ')}
            </p>
            <div>
              {Array.isArray(product.images) && product.images.length > 0 ? (
                product.images.map((image) => (
                  <ProductCategoryCard
                    key={typeof image === 'string' ? image : image.id}
                    name={product.title}
                    slug={product.id}
                    imageUrl={typeof image === 'string' ? `/media/${image}` : `/media/${image.filename}`}
                  />
                ))
              ) : (
                <p>Pas d`image disponible pour ce produit.</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductsPage
