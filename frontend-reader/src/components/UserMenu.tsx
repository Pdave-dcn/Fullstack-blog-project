import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface User {
  id: number;
  name: string;
  username: string;
  role: string;
}

const UserMenu = () => {
  const {
    user,
    logout,
    getInitials,
    getUserIdentifier,
    generateAvatarColor,
    generateAvatarUrl,
  } = useAuth();

  if (!user) {
    return null;
  }

  const avatarUrl = generateAvatarUrl(user);
  const avatarColor = generateAvatarColor(getUserIdentifier(user));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 ring-2 ring-blue-100 hover:ring-blue-200 transition-all">
            {avatarUrl && (
              <AvatarImage
                src={avatarUrl}
                alt={user.name || "User avatar"}
                className="object-cover"
              />
            )}
            <AvatarFallback
              className={`bg-gradient-to-br ${avatarColor} text-white font-semibold`}
            >
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-white/95 backdrop-blur-xl border border-white/20 shadow-xl"
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-gray-900">{user?.name}</p>
            <p className="w-[200px] truncate text-sm text-gray-600">
              @{user?.username}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer hover:bg-red-50 text-red-600"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
