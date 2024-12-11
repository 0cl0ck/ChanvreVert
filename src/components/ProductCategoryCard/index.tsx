import React from 'react'
import { cn } from 'src/utilities/cn'
import { Media } from 'src/components/Media'

type ProductCategoryCardProps = {
  title: string
  image: string
}

const ProductCategoryCard: React.FC<ProductCategoryCardProps> = ({ title, image }) => {
  return (
    <div className={cn('relative', 'rounded-lg', 'overflow-hidden', 'shadow-lg')}>
      <Media resource={image} className={cn('absolute', 'inset-0', 'w-full', 'h-full', 'object-cover')} />
      <div className={cn('relative', 'bg-black', 'bg-opacity-50', 'text-white', 'p-4')}>
        <h2 className={cn('text-xl', 'font-bold')}>{title}</h2>
      </div>
    </div>
  )
}

export default ProductCategoryCard
