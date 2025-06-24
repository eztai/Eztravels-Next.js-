'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  MapPin, 
  Calendar, 
  User, 
  DollarSign,
  Compass,
  Route,
  Settings
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navigationItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    description: "Explore & Chat Assistant"
  },
  {
    title: "My Trips",
    url: "/trips",
    icon: MapPin,
    description: "Current & Future Trips"
  },
  {
    title: "Itinerary",
    url: "/itinerary",
    icon: Route,
    description: "Current Trip Details"
  },
  {
    title: "Budget",
    url: "/budget",
    icon: DollarSign,
    description: "Expenses & Splitting"
  },
];

const secondaryItems = [
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary rounded-lg p-2">
            <Compass className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EzTravels
            </h1>
            <p className="text-xs text-muted-foreground">AI Travel Assistant</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-auto py-3" isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <div className="flex items-center gap-3 w-full">
                        <item.icon className="h-5 w-5 shrink-0" />
                        <div className="flex flex-col items-start flex-1 min-w-0">
                          <span className="font-medium text-sm">{item.title}</span>
                          <span className="text-xs text-muted-foreground leading-tight">
                            {item.description}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider px-2 mb-2">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10" isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground">Premium Member</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
