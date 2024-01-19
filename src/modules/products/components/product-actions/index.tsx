import {
  ProductProvider,
  useProductActions,
} from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Button } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/option-select"
import { useMutation } from "@tanstack/react-query"
import clsx from "clsx"
import { Loader2 } from "lucide-react"
import React, { useMemo, useState } from "react"

type ProductActionsProps = {
  product: PricedProduct
}

const ProductActionsInner: React.FC<ProductActionsProps> = ({ product }) => {
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()

  const price = useProductPrice({ id: product.id!, variantId: variant?.id })
  const [loading, setLoading] = useState(false)

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  /**
   * This is how u update state when a synchronous function needs to be run.
   * Here that synchronous function is addToCart()
   */
  const addProductToCart = async () => {

    try {
      setLoading(true)
      await new Promise<void>((resolve) => {
        //mahn this was hard to figure out
        addToCart()
        setTimeout(() => {
          resolve()
        }, 2500)
      })
    } catch (e) {
      console.log("Error: " + e)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className="flex flex-col gap-y-2">
      <div>
        {product.variants.length > 1 && (
          <div className="flex flex-col gap-y-4">
            {(product.options || []).map((option) => {
              return (
                <div key={option.id}>
                  <OptionSelect
                    option={option}
                    current={options[option.id]}
                    updateOption={updateOptions}
                    title={option.title}
                  />
                </div>
              )
            })}
            <Divider />
          </div>
        )}
      </div>

      {selectedPrice ? (
        <div className="flex flex-col text-secondary">
          <span
            className={clsx("text-xl-semi", {
              "text-ui-fg-interactive": selectedPrice.price_type === "sale",
            })}
          >
            {selectedPrice.calculated_price}
          </span>
          {selectedPrice.price_type === "sale" && (
            <>
              <p>
                <span className="text-ui-fg-subtle">Original: </span>
                <span className="line-through">
                  {selectedPrice.original_price}
                </span>
              </p>
              <span className="text-ui-fg-interactive">
                -{selectedPrice.percentage_diff}%
              </span>
            </>
          )}
        </div>
      ) : (
        <div></div>
      )}

      <Button
        onClick={addProductToCart}
        disabled={!inStock || !variant}
        variant="primary"
        className="w-full h-10 disabled:opacity-60 font-bold disabled:font-medium bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 text-black disabled:text-gray-800"
      >
        {!loading ? !inStock
          ? "Out of stock"
          : !variant
            ? "Select variant"
            : "Add to cart" : <Loader2 className="h-6 w-6 animate-spin" />}
      </Button>
    </div>
  )
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => (
  <ProductProvider product={product}>
    <ProductActionsInner product={product} />
  </ProductProvider>
)

export default ProductActions
