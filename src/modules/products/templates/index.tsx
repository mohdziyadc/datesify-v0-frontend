"use client"

import React, { useEffect, useRef, useState } from "react"
import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import ProductInfo from "@modules/products/templates/product-info"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ImageGallery from "@modules/products/components/image-gallery"
import MobileActions from "@modules/products/components/mobile-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import ProductActions from "../components/product-actions"
import { useProducts } from "medusa-react"
import { Loader2 } from "lucide-react"

type ProductTemplateProps = {
  handle: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ handle }) => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false)

  const { products, isLoading, isError } = useProducts({ handle: handle })

  const infoRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(infoRef, "0px")

  useEffect(() => {
    const onboarding = window.sessionStorage.getItem("onboarding")
    setIsOnboarding(onboarding === "true")
  }, [])

  return products ? (
    <ProductProvider product={products[0]}>
      <div className="content-container flex flex-col small:flex-row small:items-start py-6 px-6 relative">
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
          <ProductInfo product={products[0]} />
          <ProductTabs product={products[0]} />
        </div>
        <div className="block w-full relative">
          <ImageGallery images={products[0]?.images || []} />
        </div>
        <div
          className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12"
          ref={infoRef}
        >
          {isOnboarding && <ProductOnboardingCta />}
          <ProductActions product={products[0]} />
        </div>
      </div>
      <div className="content-container   px-6 pb-16 small:px-8 ">
        <RelatedProducts product={products[0]} />
      </div>
      <MobileActions product={products[0]} show={!inView} />
    </ProductProvider>
  ) : (
    <div>
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}

      {!isError && (
        <div className="flex justify-center items-center h-screen">
          <p className="text-white">
            An error occured while fetching the product. Please try again
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductTemplate
