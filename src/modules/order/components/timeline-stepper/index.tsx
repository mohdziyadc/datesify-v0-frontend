import { Order } from "@medusajs/medusa"
import React, { useEffect, useState } from "react"
import "./index.css"
import clsx from "clsx"

type Props = {
  order: Order
}

const TimelineStepper = ({ order }: Props) => {
  const steps = ["Confirmed", "Shipped", "Out for Delivery", "Delivered"]
  const [orderCompleted, setOrderCompleted] = useState<boolean>(false)

  useEffect(() => {
    if (order.status === "completed") {
      setOrderCompleted(true)
    }
  }, [order.status])

  return (
    <>
      {/*  Mid & Large Screens */}
      <div className="hidden sm:flex flex-row my-10 justify-center items-center">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={clsx("step-item flex flex-col gap-2 w-48", {
              completed: idx < 2,
            })}
          >
            <div className="w-6 h-6 z-10 step rounded-full shadow-2xl  bg-gray-300"></div>
            <div className="text-sm">{step}</div>
          </div>
        ))}
      </div>
      {/* Small Screens */}
      <div className="sm:hidden flex flex-col my-4 justify-start items-center">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={clsx("flex step-item-mobile flex-row h-28 w-36 gap-3", {
              completed: idx < 2,
            })}
          >
            <div className="w-6 h-6 z-10 step rounded-full  bg-gray-300"></div>
            <div className="text-sm">{step}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default TimelineStepper
