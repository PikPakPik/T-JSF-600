import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const loggedIn = false;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
            <img
              className="h-8 w-8 rounded-full"
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
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
              <Link to="/signup">
                <DropdownMenuItem>Signup</DropdownMenuItem>
              </Link>
            </>
          ) : (
            <>
              <DropdownMenuLabel>{"{username}"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileMenu;
