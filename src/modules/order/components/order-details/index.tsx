import { Order } from "@medusajs/medusa"
import { Button, Heading, Text } from "@medusajs/ui"
import clsx from "clsx"
import { MoveRight } from "lucide-react"
import Link from "next/link"

type OrderDetailsProps = {
  order: Order
  showStatus?: boolean
  showDetails: boolean
}

const OrderDetails = ({
  order,
  showStatus,
  showDetails,
}: OrderDetailsProps) => {
  const items = order.items.reduce((acc, i) => acc + i.quantity, 0)

  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div>
      <Text
        className={clsx("mt-4", {
          hidden: showDetails,
        })}
      >
        We have sent the order confirmation details to{" "}
        <span className="text-ui-fg-medium-plus font-semibold">
          {order.email}
        </span>
        .
      </Text>
      <Text className="mt-2">
        Order date: {new Date(order.created_at).toDateString()}
      </Text>
      <Text className="mt-2 text-ui-fg-interactive">
        Order number: {order.display_id}
      </Text>

      <div className="flex items-center text-compact-small gap-x-4 mt-4">
        {showStatus && (
          <>
            <Text>
              Order status:{" "}
              <span className={clsx("text-ui-fg-subtle")}>
                {order.status === "completed" ? formatStatus(order.status) : formatStatus(order.fulfillment_status)}
              </span>
            </Text>
            <Text>
              Payment status:{" "}
              <span className="text-ui-fg-subtle ">
                {formatStatus(order.payment_status)}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
