import {
  FilePlus,
  LayoutDashboard,
  MessageSquareMore,
  Newspaper,
  User,
  ChevronUp,
  Feather,
} from "lucide-react";
import { Link } from "react-router-dom";

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
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useLogoutMutation } from "@/queries/auth.query";
import type { Action, Subjects } from "@/lib/security/ability";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "New Article",
    url: "/new-article",
    icon: FilePlus,
    action: "create",
    subject: "Article",
  },
  {
    title: "Articles",
    url: "/articles",
    icon: Newspaper,
  },

  {
    title: "Comments",
    url: "/comments",
    icon: MessageSquareMore,
  },
];

function AppSidebar() {
  const { ability } = useAuthStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const { mutate: logoutMutation } = useLogoutMutation();

  const handleSignOut = () => {
    logoutMutation();
    logout();
    navigate("/");
  };

  const header = {
    title: "The Editorium",
    url: "#",
    icon: Feather,
  };

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/dashboard">
                <header.icon />
                <span className="font-medium">{header.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    disabled={
                      item.action && item.subject
                        ? !ability?.can(
                            item.action as Action,
                            item.subject as Subjects
                          )
                        : false
                    }
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User className="h-5 w-5" />
                  <span>{user?.username}</span>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={handleSignOut}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
