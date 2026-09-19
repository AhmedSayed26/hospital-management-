import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
  Users,
  BedDouble,
  ClipboardList,
  User,
  Hospital,
  LogOut,
} from "lucide-react";
import { useAuth, ROLE_LABELS } from "@/contexts/AuthContext/AuthContext";
import { getNavItemsForRole } from "@/config/nav.config";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const ICONS = {
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
  Users,
  BedDouble,
  ClipboardList,
  User,
};

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const navItems = getNavItemsForRole(user?.role ?? "");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border/60 pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link to="/app/dashboard" />}
              className="hover:bg-sidebar-accent/60 transition-colors"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/30">
                <Hospital className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold tracking-tight text-sidebar-foreground">
                  Hospital MS
                </span>
                <span className="truncate text-[11px] font-medium text-sidebar-foreground/50">
                  {ROLE_LABELS[user?.role] ?? "Portal"}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = ICONS[item.icon];
                const isActive = location.pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      render={<Link to={item.href} />}
                      className={[
                        "relative my-1 rounded-lg border-l-2 border-l-transparent transition-all duration-150",
                        "data-[active=true]:border-l-primary",
                        isActive
                          ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                      ].join(" ")}
                    >
                      {Icon ? (
                        <Icon
                          className={[
                            "size-4 shrink-0 transition-colors",
                            isActive
                              ? "text-primary"
                              : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground",
                          ].join(" ")}
                        />
                      ) : null}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/60 pt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Log out"
              onClick={handleLogout}
              className="rounded-lg text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="size-4" />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
