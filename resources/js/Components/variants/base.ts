import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export const contentVariants = cva("border-border focus-visible:outline-hidden border", {
	variants: {
		variant: {
			/**
			 * @prop default
			 * @note Used by: Drawer
			 */
			default: "bg-transparent",
			/**
			 * @prop modal
			 * @note Used by: Dialog
			 * @note Used with: `openAnimation`
			 */
			modal: "bg-modal fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 p-6 shadow-lg duration-200",
			/**
			 * @prop popover
			 * @note Used by: DropdownMenu, Popover, Select
			 * @note Used with: `openAnimation`, `sideAnimation`
			 */
			popover: "bg-popover z-50 rounded-md shadow-md",
			/**
			 * @prop tab
			 * @note Used by: Tabs
			 * @note Used with: `openAnimation`, `sideAnimation`
			 */
			tab: "bg-popover border-none",
			/**
			 * @prop tooltip
			 * @note Used by: Tooltip
			 * @note Used with: `openAnimation`, `sideAnimation`
			 */
			tooltip: "animate-in bg-tooltip text-tooltip-primary fade-in-0 zoom-in-95 relative z-50 overflow-hidden border-none font-medium shadow-md backdrop-filter-none",
		},
		openAnimation: {
			true: [
				"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
				"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
			],
		},
		sideAnimation: {
			true: "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
		},
	},
	defaultVariants: { variant: "default", openAnimation: true },
});
export type ContentVariants = VariantProps<typeof contentVariants>;
