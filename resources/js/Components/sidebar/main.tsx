import * as React from "react";

import { Actions } from "@/components/sidebar/actions";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";

import Header from "./header";

const data = {
	navMain: [
		// {
		// 	icon: ({ className, stops, rotateGradient, pathProps }: IIconPropsExtended) => (
		// 		<HouseGradientIcon
		// 			hasGradient
		// 			sourceSvgWidth={170}
		// 			sourceSvgHeight={180}
		// 			rotateGradient={rotateGradient ?? 130}
		// 			stops={stops}
		// 			pathProps={pathProps}
		// 			className={className}
		// 		/>
		// 	),
		// 	title: "Home",
		// 	url: "/",
		// },
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" variant="inset" {...props}>
			<SidebarHeader>
				<Header />
			</SidebarHeader>
			<SidebarContent>
				<Actions items={data.navMain} />
			</SidebarContent>
		</Sidebar>
	);
}
