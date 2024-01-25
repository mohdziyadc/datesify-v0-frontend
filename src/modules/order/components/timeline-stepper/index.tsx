import { Order } from "@medusajs/medusa"
import React from "react"
import "./index.css"

type Props = {
  order: Order
}

const TimelineStepper = ({ order }: Props) => {
  const steps = ["Confirmed", "Shipped", "Out for Delivery", "Delivered"]
  return (
    <>
      {/*  Mid & Large Screens */}
      <div className="hidden sm:flex flex-row my-4 justify-center items-center">
        {steps.map((step, idx) => (
          <div key={idx} className="step-item flex flex-col gap-2 w-48">
            <div className="w-6 h-6 z-10 rounded-full shadow-2xl  bg-gray-300"></div>
            <div className="text-sm">{step}</div>
          </div>
        ))}
      </div>
      {/* Small Screens */}
      <div className="sm:hidden flex flex-col my-4 justify-start items-center">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex step-item-mobile flex-row h-28 w-36 gap-3"
          >
            <div className="w-6 h-6 z-10 rounded-full  bg-gray-300"></div>
            <div className="text-sm">{step}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default TimelineStepper
