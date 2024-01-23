import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const { t } = useTranslation();
  const loggedIn = false;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="flex text-sm transition duration-150 ease-in-out border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300">
          <img
            className="w-8 h-8 rounded-full"
            src={
              loggedIn
                ? "https://placekitten.com/200/200"
                : "https://avatars.githubusercontent.com/u/29652829?v=4"
            }
            alt="avatar"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {!loggedIn ? (
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
            <DropdownMenuLabel>{"{username}"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {t("profile_dropdown.connected.profile")}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {t("profile_dropdown.connected.settings")}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {t("profile_dropdown.connected.logout")}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
