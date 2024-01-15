import { ProductCollection } from "@medusajs/medusa"
import ProductRail from "./product-rail"

const FeaturedProducts = ({
  collections,
}: {
  collections: ProductCollection[]
}) => {
  return (
    <div className="bg-gradient-to-tr from-black to-orange-700 ">
      <ul className="flex  flex-col ">
        {collections.map((collection) => (
          <li key={collection.id}>
            <ProductRail collection={collection} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FeaturedProducts
