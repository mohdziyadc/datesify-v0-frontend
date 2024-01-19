"use client"
import { Heading } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import { Github } from "@medusajs/icons"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@lib/utils"

const Hero = () => {
  const images = [
    {
      url: "https://res.cloudinary.com/dfqogbg0s/image/upload/v1704480445/roebv2xqwfqxkuqcmvk6.png",
      mobile:
        "https://res.cloudinary.com/dfqogbg0s/image/upload/v1704481900/nyyutltrqtz3zzsmoe8l.png",
    },
    {
      url: "https://images.unsplash.com/photo-1663505305557-53be07c5b810?q=80&w=2811&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      mobile: "https://images.unsplash.com/photo-1663505305557-53be07c5b810?q=80&w=2811&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      url: "https://images.unsplash.com/photo-1655438809467-5bb97320cf10?q=80&w=2819&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      mobile:"https://images.unsplash.com/photo-1655438809467-5bb97320cf10?q=80&w=2819&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    },
  ]
  return (
    <div className="w-full overflow-hidden m-auto bg-gradient-to-br from-black to-orange-700  relative ">
      <div className=" max-w-8xl  m-auto py-8 flex  h-full items-center justify-center">
        <Carousel
          className="flex md:w-[85%] lg:w-[90%] sm:w-[70%] w-[95%] h-full items-center justify-center"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent >
            {images.map((img, index) => (
              <CarouselItem key={index} className="w-[64rem]">
                <div>
                  <Card className="rounded-md">
                    <CardContent className="relative flex items-center justify-center w-full h-[70vh] p-0 overflow-hidden ">
                      <div className="w-full h-full hidden sm:block">
                        <Image
                          src={img.url}
                          alt="dates"
                          className=" xl:object-cover object-fill rounded-md"
                          fill
                          // style={{objectFit:'cover'}}
                        />
                      </div>
                      <div className="w-full h-full block sm:hidden">
                        <Image
                          src={img.mobile}
                          alt="dates"
                          className=" object-fill  rounded-lg"
                          fill
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:grid" />
          <CarouselNext className="hidden sm:grid" />
        </Carousel>
      </div>
    </div>
  )
}

export default Hero
