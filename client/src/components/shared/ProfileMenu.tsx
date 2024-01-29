import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useSocket } from "@/hooks/useSocket";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const { t } = useTranslation();
  const { user, logout: logoutUser } = useAuth();
  const socket = useSocket();

  const handleLogout = () => {
    socket?.emit("disconnect");
    logoutUser();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="flex text-sm transition duration-150 ease-in-out border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300">
          <img
            className="w-8 h-8 rounded-full"
            src={
              user
                ? "https://placekitten.com/200/200"
                : "https://avatars.githubusercontent.com/u/29652829?v=4"
            }
            alt="avatar"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {!user ? (
          <>
            <Link to="/login">
              <DropdownMenuItem>
                {t("profile_dropdown.not_connected.signin")}
              </DropdownMenuItem>
            </Link>
            <Link to="/signup">
              <DropdownMenuItem>
                {t("profile_dropdown.not_connected.signup")}
              </DropdownMenuItem>
            </Link>
          </>
        ) : (
          <>
            <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {t("profile_dropdown.connected.profile")}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {t("profile_dropdown.connected.settings")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              {t("profile_dropdown.connected.logout")}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
