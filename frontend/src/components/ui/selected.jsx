import * as React from "react"

import { cn } from "@/lib/utils"

const SelectedItems = React.forwardRef(({ className, items, type, ...props }, ref) => {
    return (
        (<div
            type={type}
            className={cn(
                "flex flex-wrap gap-2 w-full rounded-md border border-input bg-transparent p-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}>
            {
                items.length !== 0 && items.map((item, id) => <span key={id} className=" rounded-lg bg-primary px-2 py-1 text-xs text-primary-foreground">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                </span>)
            }

        </div>)
    );
})
SelectedItems.displayName = "SelectedItems"

export { SelectedItems }