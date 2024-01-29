import { getProductByHandle } from "@lib/data"
import ProductTemplate from "@modules/products/templates"
import SkeletonProductPage from "@modules/skeletons/templates/skeleton-product-page"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: { handle: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getProductByHandle(params.handle)

  const product = data.products[0]

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | Medusa Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Medusa Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  // const { products } = await getProductByHandle(params.handle).catch((err) => {
  //   notFound()
  // })

  return (
    <>
      <div className="bg-gradient-to-br from-black to-orange-700">
        {/* {isLoading && <div className="flex justify-center items-center h-screen w-full"><Loader2 className="h-6 w-6 text-white animate-spin" /></div>} */}
        <ProductTemplate handle={params.handle} />
      </div>
    </>
  )
}
