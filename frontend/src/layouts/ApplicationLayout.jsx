import { Navigate, Outlet } from "react-router-dom";

import { useAuth, ROLE_LABELS } from "@/contexts/AuthContext/AuthContext";

import AppSidebar from "@/components/app/AppSidebar";

import ThemePicker from "@/components/app/ThemePicker";

import {

  SidebarInset,

  SidebarProvider,

  SidebarTrigger,

} from "@/components/ui/sidebar";

import { TooltipProvider } from "@/components/ui/tooltip";

import { Skeleton } from "@/components/ui/skeleton";



export default function ApplicationLayout() {

  const { user, isLoading } = useAuth();



  if (isLoading) {

    return (

      <div className="flex min-h-svh items-center justify-center bg-background p-8">

        <div className="w-full max-w-md space-y-4">

          <Skeleton className="h-8 w-48 rounded-full" />

          <Skeleton className="h-4 w-full rounded-full" />

          <Skeleton className="h-4 w-3/4 rounded-full" />

        </div>

      </div>

    );

  }



  if (!user) {

    return <Navigate to="/login" replace />;

  }



  const initials = user.email ? user.email.slice(0, 2).toUpperCase() : "HM";



  return (

    <TooltipProvider>

      <SidebarProvider>

        <AppSidebar />

        <SidebarInset>

          <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-sm">

            <SidebarTrigger className="-ml-1 text-primary hover:bg-primary/10 transition-colors" />



            <div className="h-5 w-px bg-border" />



            <div className="flex flex-1 items-center justify-between gap-3">

              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/20">

                <span className="size-1.5 rounded-full bg-primary opacity-70" />

                {ROLE_LABELS[user.role]} Portal

              </span>



              <div className="flex items-center gap-2">

                <ThemePicker />



                <div className="flex items-center gap-2 px-2.5 py-1">

                  <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">

                    {initials}

                  </span>

                  <span className="hidden text-xs font-medium text-foreground/80 sm:inline">

                    {user.email.split("@")[0]}

                  </span>

                </div>

              </div>

            </div>

          </header>



          <main className="flex-1 bg-background p-6">

            <Outlet />

          </main>

        </SidebarInset>

      </SidebarProvider>

    </TooltipProvider>

  );

}

