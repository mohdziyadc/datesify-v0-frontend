import { ProductCollection } from "@medusajs/medusa"
import ProductRail from "./product-rail"

const FeaturedProducts = ({
  collections,
}: {
  collections: ProductCollection[]
}) => {
  return (
      <ul className="flex  flex-col ">
        {collections.map((collection) => (
          <li key={collection.id}>
            <ProductRail collection={collection} />
          </li>
        ))}
      </ul>
  
  )
}

export default FeaturedProducts
