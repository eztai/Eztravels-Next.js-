import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Providers } from "@/components/Providers"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EzTravels - Travel Planning Made Easy',
  description: 'Plan your trips with AI assistance, manage budgets, and create detailed itineraries.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <Sonner />
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1 flex flex-col">
              <div className="flex items-center gap-2 p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <SidebarTrigger />
                <div className="flex-1" />
                {/* Profile section will go here */}
              </div>
              <div className="flex-1 overflow-auto">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
} 