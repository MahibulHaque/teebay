import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
} from 'lucide-react';

import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  useLoggedInUserInfoQuery,
  useLogoutUserMutation,
} from '@/core/store/api/userApi';
import {ILoggedInUserInfo} from '@/core/interfaces/auth.interface';
import {toast} from 'sonner';
import {useEffect} from 'react';
import {useNavigate} from 'react-router';
import {useAppDispatch} from '@/core/store/store';
import {updateIsUserLoggedIn} from '@/core/store/slices/auth.slice';

export function NavUser() {
  const {data: user, isLoading} = useLoggedInUserInfoQuery();
  const [logoutUser, { isSuccess: isLogoutSuccess}] =
    useLogoutUserMutation();
  const {isMobile} = useSidebar();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLogoutSuccess) {
      dispatch(updateIsUserLoggedIn(false));
      navigate('/signin');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogoutSuccess]);

  const getAvatarName = (loggedInUserInfo: ILoggedInUserInfo) => {
    return `${loggedInUserInfo.firstName[0]}${loggedInUserInfo.lastName[0]}`;
  };

  const getFullName = (loggedInUserInfo: ILoggedInUserInfo) => {
    return loggedInUserInfo.firstName + ' ' + loggedInUserInfo.lastName;
  };

  const handleLogoutUser = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
      toast('Failed to logout user');
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {user && !isLoading && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg uppercase">
                    {getAvatarName(user.data.loggedInUserInfo)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {getFullName(user.data.loggedInUserInfo)}
                  </span>
                  <span className="truncate text-xs">
                    {user.data.loggedInUserInfo.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {getAvatarName(user.data.loggedInUserInfo)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {getFullName(user.data.loggedInUserInfo)}
                    </span>
                    <span className="truncate text-xs">
                      {user.data.loggedInUserInfo.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogoutUser}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
