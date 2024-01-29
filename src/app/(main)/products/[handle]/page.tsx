import { getProductByHandle } from "@lib/data"
import ProductTemplate from "@modules/products/templates"
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
    title: `${product.title} | Datesify Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Datesify Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  return (
    <>
      <div className="bg-gradient-to-br from-black to-orange-700">
        <ProductTemplate handle={params.handle} />
      </div>
    </>
  )
}
