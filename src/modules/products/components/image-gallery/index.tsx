import { Image as MedusaImage } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import Image from "next/image"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {

  const fetchImageDataUrl = async(imageUrl: string) => {
    const response = await fetch(imageUrl, {
      mode:'no-cors',
      method:'get',
      headers:{
        "Content-Type": "application/json"
      }
    })
    const data = await response.blob()
    return URL.createObjectURL(data)
  }

  const {data, isLoading} = useQuery({
    queryKey:['product_img', images[0].url],
    queryFn: async () => {
      const res = await fetchImageDataUrl(images[0].url)
      return res
    }
  })
  console.log("Query data: " + data)


  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
              id={image.id}
            >
              {isLoading && (
                <div className="h-full flex justify-center items-center ">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}
              {data && ((<Image
                src={image.url}
                priority={index <= 2 ? true : false}
                className="absolute inset-0 rounded-rounded"
                alt={`Product image ${index + 1}`}
                fill
                sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                style={{
                  objectFit: "cover",
                }}
              />))} 
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
