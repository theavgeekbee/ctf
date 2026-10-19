'use client';

import {LayoutDashboardIcon} from "lucide-react";
import React from "react";
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail} from "@/components/ui/sidebar";
import {NavMain} from "@/components/nav-main";
import Image from "next/image";
import logo from '../public/logo.png'
import {NavUser} from "@/components/nav-user";

type DashSidebarProps = React.ComponentProps<typeof Sidebar> & {
    email: string,
    onClick: () => void
};

export default function DashSidebar({email, onClick, ...props}: DashSidebarProps) {
    const nav = [
        {
            title: "Dashboard",
            url: "#",
            icon: <LayoutDashboardIcon />,
            active: true,
            items: [
                {
                    title: "Overview",
                    url: "/dash#"
                }
            ]
        }
    ];
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <Image src={logo} alt={"Logo"} placeholder="blur" />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={nav}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{
                    email: email,
                    onClick: onClick
                }}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}