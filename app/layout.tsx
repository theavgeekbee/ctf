import {ThemeProvider} from "@/components/theme-provider"
import type {Metadata} from "next";
import "./globals.css";
import {cn} from "@/lib/utils";
import { JetBrains_Mono } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "CRHS CS CTF Hub",
    description: "CTF hub for CRHS",
};

export default function RootLayout({children}: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={cn("h-full", "antialiased", jetbrainsMono.variable, "font-mono")}
            suppressHydrationWarning={true}
        >
        <body className="min-h-full flex flex-col">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
