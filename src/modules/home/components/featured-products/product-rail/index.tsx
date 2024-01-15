"use client"

import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import { ProductCollection } from "@medusajs/medusa"
import ProductPreview from "@modules/products/components/product-preview"
import { Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import { Loader2 } from "lucide-react"
import { ScrollArea, ScrollBar } from "../ui/scrollarea"

const ProductRail = ({ collection }: { collection: ProductCollection }) => {
  const { data, isLoading } = useFeaturedProductsQuery(collection.id)
  return (
    <div className="small:py-6">
      <div className="content-container small:py-2 py-12 ">
        <div className="flex justify-between mb-8">
          <Text className="text-2xl font-semibold text-primary-foreground">
            {collection.title}
          </Text>
          <InteractiveLink href={`/collections/${collection.handle}`}>
            View all
          </InteractiveLink>
        </div>
        {isLoading && (
          <div className="flex justify-center p-2 items-center w-full ">
            <Loader2 className="h-8 w-8 animate-spin text-primary-foreground" />
          </div>
        )}
        <ul className="relative grid grid-flow-col auto-cols-[28rem] px-2 py-4 gap-4 overflow-x-auto ">
          {data &&
            data.map((product) => (
              <li key={product.id}>
                <ProductPreview isFeatured {...product} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default ProductRail
