import { getPayload } from 'payload';
import React from 'react';

const ProductsPage = async () => {
  const payload = await getPayload();
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
  });

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.docs.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Availability: {product.availability}</p>
            <p>Categories: {product.categories.map((category) => category.title).join(', ')}</p>
            <div>
              {product.images.map((image) => (
                <img key={image.id} src={image.url} alt={image.alt} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
