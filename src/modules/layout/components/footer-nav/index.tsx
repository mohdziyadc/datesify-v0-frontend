"use client"

import clsx from "clsx"
import { useCollections, useProductCategories } from "medusa-react"
import { Text } from "@medusajs/ui"
import Link from "next/link"
import MedusaCTA from "../medusa-cta"
import Divider from "@modules/common/components/divider"

const FooterNav = () => {
  const { collections } = useCollections()
  const { product_categories } = useProductCategories()

  return (
    <>
      <div className="mt-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600 px-8 pb-8 border-ui-border-base w-screen">
        <div className="content-container flex flex-col">
          <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between pt-8 ">
            <div>
              <Link
                href="/"
                className="txt-compact-xlarge-plus text-black hover:text-ui-fg-base uppercase"
              >
                Datesify Store
              </Link>
            </div>
            <div className="text-small-regular grid grid-cols-3 gap-x-10 md:gap-x-16">
              {product_categories && (
                <div className="flex flex-col gap-y-2">
                  <span className="txt-small-plus font-bold txt-ui-fg-base">
                    Categories
                  </span>
                  <ul className="grid grid-cols-1 gap-2">
                    {product_categories?.slice(0, 6).map((c) => {
                      if (c.parent_category) {
                        return
                      }

                      const children =
                        c.category_children?.map((child) => ({
                          name: child.name,
                          handle: child.handle,
                          id: child.id,
                        })) || null

                      return (
                        <li
                          className="flex flex-col gap-2 text-primary/70 txt-small"
                          key={c.id}
                        >
                          <Link
                            className={clsx(
                              "hover:text-ui-fg-base",
                              children && "txt-small-plus"
                            )}
                            href={`/${c.handle}`}
                          >
                            {c.name}
                          </Link>
                          {children && (
                            <ul className="grid grid-cols-1 ml-3 gap-2">
                              {children &&
                                children.map((child) => (
                                  <li key={child.id}>
                                    <Link
                                      className="hover:text-ui-fg-base"
                                      href={`/${child.handle}`}
                                    >
                                      {child.name}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
              {collections && (
                <div className="flex flex-col gap-y-2">
                  <span className="txt-small-plus font-bold">Collections</span>
                  <ul
                    className={clsx(
                      "grid grid-cols-1 gap-2 text-primary/70 txt-small",
                      {
                        "grid-cols-2": (collections?.length || 0) > 3,
                      }
                    )}
                  >
                    {collections?.slice(0, 6).map((c) => (
                      <li key={c.id}>
                        <Link
                          className="hover:text-ui-fg-base"
                          href={`/collections/${c.handle}`}
                        >
                          {c.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Medusa Store. All rights reserved.
          </Text>
          <MedusaCTA />
        </div> */}
        </div>
        <div className="flex justify-center -mb-6 items-center">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Datesify Store. All rights reserved.
          </Text>
        </div>
      </div>
    </>
  )
}

export default FooterNav
