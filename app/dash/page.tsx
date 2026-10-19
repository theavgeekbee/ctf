import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    CreditCard,
    DollarSign, LayoutDashboardIcon,
    Users,
} from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
    SidebarInset,
    SidebarProvider, SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import * as React from "react";
import {NavMain} from "@/components/nav-main";
import {NavProjects} from "@/components/nav-projects";
import DashSidebar from "@/components/nav-sidebar";
import {redirect} from "next/navigation";
import {createClient} from "@/lib/supabase/server";
import {signOut} from "@/app/auth/actions";
import {connection} from "next/server";

const metrics = [
    {
        title: "Total revenue",
        value: "$48,294",
        change: "+12.8%",
        positive: true,
        icon: DollarSign,
        description: "vs. previous month",
    },
    {
        title: "Subscriptions",
        value: "2,420",
        change: "+8.2%",
        positive: true,
        icon: Users,
        description: "vs. previous month",
    },
    {
        title: "Sales",
        value: "1,204",
        change: "-2.4%",
        positive: false,
        icon: CreditCard,
        description: "vs. previous month",
    },
    {
        title: "Active now",
        value: "573",
        change: "+4.6%",
        positive: true,
        icon: Activity,
        description: "vs. previous month",
    },
];

const revenue = [
    { month: "Jan", value: 28 },
    { month: "Feb", value: 36 },
    { month: "Mar", value: 31 },
    { month: "Apr", value: 48 },
    { month: "May", value: 43 },
    { month: "Jun", value: 62 },
    { month: "Jul", value: 53 },
    { month: "Aug", value: 72 },
    { month: "Sep", value: 64 },
    { month: "Oct", value: 82 },
    { month: "Nov", value: 75 },
    { month: "Dec", value: 94 },
];

const transactions = [
    {
        id: "INV-1001",
        customer: "Olivia Martin",
        email: "olivia@example.com",
        amount: "$1,999.00",
        status: "Paid",
    },
    {
        id: "INV-1002",
        customer: "Jackson Lee",
        email: "jackson@example.com",
        amount: "$399.00",
        status: "Pending",
    },
    {
        id: "INV-1003",
        customer: "Isabella Nguyen",
        email: "isabella@example.com",
        amount: "$899.00",
        status: "Paid",
    },
    {
        id: "INV-1004",
        customer: "William Kim",
        email: "william@example.com",
        amount: "$249.00",
        status: "Failed",
    },
    {
        id: "INV-1005",
        customer: "Sofia Davis",
        email: "sofia@example.com",
        amount: "$1,499.00",
        status: "Paid",
    },
];

function RevenueChart() {
    const points = revenue
        .map((item, index) => {
            const x = 12 + index * (576 / (revenue.length - 1));
            const y = 190 - item.value * 1.7;
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <div className="w-full">
            <svg
                viewBox="0 0 600 220"
                role="img"
                aria-label="Revenue trend from January to December"
                className="h-[240px] w-full overflow-visible"
                preserveAspectRatio="none"
            >
                {[30, 75, 120, 165, 210].map((y) => (
                    <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="600"
                        y2={y}
                        stroke="currentColor"
                        strokeOpacity="0.12"
                        strokeDasharray="4 4"
                    />
                ))}

                <polyline
                    points={points}
                    fill="none"
                    stroke="var(--chart-1)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                />

                {revenue.map((item, index) => {
                    const x = 12 + index * (576 / (revenue.length - 1));
                    const y = 190 - item.value * 1.7;

                    return (
                        <circle
                            key={item.month}
                            cx={x}
                            cy={y}
                            r="3.5"
                            fill="var(--chart-1)"
                        />
                    );
                })}
            </svg>

            <div className="mt-2 grid grid-cols-6 gap-2 text-center text-xs text-muted-foreground sm:grid-cols-12">
                {revenue.map((item) => (
                    <span key={item.month}>{item.month}</span>
                ))}
            </div>
        </div>
    );
}

export const instant = false

export default async function DashboardPage() {
    await connection();
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getClaims()

    if (error || !data?.claims?.sub) {
        redirect('/error?You%20are%20not%20logged%20in%21')
    }

    const user = data.claims

    return (
        <SidebarProvider>
            <DashSidebar email={user.email!} onClick={signOut} />

            <SidebarInset>
                <header className="flex h-14 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />

                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dash">
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Overview</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
                    <section className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Dashboard
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Put more stuff here (todo)
                            </p>
                        </div>
                    </section>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
