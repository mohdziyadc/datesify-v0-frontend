import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import { Text } from "@medusajs/ui"

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
  isFeatured,
}: ProductPreviewType) => (
  <Link href={`/products/${handle}`} className="group">
    <div>
      <Thumbnail thumbnail={thumbnail} size="full" isFeatured={isFeatured} />
      <div className="flex txt-compact-medium mt-4 justify-between">
        <Text className="text-primary-foreground font-bold">{title}</Text>
        <div className="flex items-center gap-x-2">
          {price ? (
            <>
              {price.price_type === "sale" && (
                <Text className="line-through text-ui-fg-muted">
                  {price.original_price}
                </Text>
              )}
              <Text
                className={clsx("text-secondary", {
                  "text-ui-fg-interactive": price.price_type === "sale",
                })}
              >
                {price.calculated_price}
              </Text>
            </>
          ) : (
            <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
          )}
        </div>
      </div>
    </div>
  </Link>
)

export default ProductPreview
