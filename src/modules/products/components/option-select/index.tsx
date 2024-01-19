import { onlyUnique } from "@lib/util/only-unique"
import { ProductOption } from "@medusajs/medusa"
import { Button } from "@modules/home/components/hero/ui/button"
import clsx from "clsx"
import React from "react"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm text-secondary">Select {title}</span>
      <div className="flex flex-wrap justify-between ">
        {filteredOptions.map((v) => {
          return (
            // <button
            //   onClick={() => updateOption({ [option.id]: v })}
            //   key={v}
            //   className={clsx(
            //     " bg-ui-bg-subtle  text-small-regular h-10 rounded-rounded p-2 flex-1 ",
            //     {
            //       "border-ui-border-interactive focus:border-black ": v === current,
            //       "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
            //         v !== current,
            //     }
            //   )}
            // >
            //   {v}
            // </button>
            <Button className={clsx("px-6 py-4 bg-secondary  active:opacity-100 outline outline-2 outline-transparent text-primary hover:bg-secondary",
              {
                "outline-2  bg-white transition-transform scale-110 opacity-100 outline-slate-950": v === current
              })}
              key={v}
              onClick={() => updateOption({ [option.id]: v }
              )}
            >
              {v}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
