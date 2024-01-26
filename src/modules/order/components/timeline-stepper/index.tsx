import { Order } from "@medusajs/medusa"
import React, { useEffect, useState } from "react"
import "./index.css"
import clsx from "clsx"
import { Check } from "lucide-react"

type Props = {
  order: Order
}

const TimelineStepper = ({ order }: Props) => {
  const steps = ["Payment Confirmed", "Order Confirmed", "Shipped", "Delivered"]
  const [finishedSteps, setFinishedSteps] = useState([
    false,
    false,
    false,
    false,
  ])

  useEffect(() => {
    if (order.payment_status === "captured") {
      setFinishedSteps((prevFinishedSteps) => {
        const updatedFinishedSteps = [...prevFinishedSteps]
        updatedFinishedSteps[0] = true
        return updatedFinishedSteps
      })
    }

    /**
     * The admin fulfillment flow ensures that the order cannot be
     * shipped before updating the order's fulfullment status to be fulfilled
     */
    if (order.fulfillment_status === "fulfilled") {
      setFinishedSteps((prevFinishedSteps) => {
        const updatedFinishedSteps = [...prevFinishedSteps]
        updatedFinishedSteps[1] = true
        return updatedFinishedSteps
      })
    }

    if (order.fulfillment_status === "shipped") {
      setFinishedSteps((prevFinishedSteps) => {
        const updatedFinishedSteps = [...prevFinishedSteps]
        for (let i = 0; i < 2; i++) {
          updatedFinishedSteps[i] = true
        }
        updatedFinishedSteps[2] = true
        return updatedFinishedSteps
      })
    }

    if (order.status === "completed") {
      setFinishedSteps((prevFinishedSteps) => {
        const updateFinishedSteps = [...prevFinishedSteps]
        for (let i = 0; i < updateFinishedSteps.length; i++) {
          updateFinishedSteps[i] = true
        }
        return updateFinishedSteps
      })
    }
  }, [order.fulfillment_status, order.payment_status, order.status])

  return (
    <>
      {/*  Mid & Large Screens */}
      <div className="hidden sm:flex flex-row my-10 justify-center items-center">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={clsx("step-item flex flex-col gap-2 w-48", {
              completed: finishedSteps[idx],
            })}
          >
            <div className="w-7 h-7 z-10 flex justify-center items-center step rounded-full shadow-2xl  bg-gray-300">
              {finishedSteps[idx] && <Check className="w-5 h-5 text-white" />}
            </div>
            <div className="text-sm">{step}</div>
          </div>
        ))}
      </div>
      {/* Small Screens */}
      <div className="sm:hidden flex my-10 flex-col justify-center  w-screen items-center">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={clsx("flex step-item-mobile flex-row h-28 w-48 gap-3", {
              completed: finishedSteps[idx] === true,
            })}
          >
            <div className="flex justify-center items-center w-6 h-6 z-10 step rounded-full  bg-gray-300">
              {finishedSteps[idx] && <Check className="w-4 h-4 text-white" />}
            </div>
            <div className="text-sm">{step}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default TimelineStepper
