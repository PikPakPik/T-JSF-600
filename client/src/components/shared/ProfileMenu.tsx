import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const ProfileMenu = () => {
  const loggedIn = true;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
            <img
              className="h-8 w-8 rounded-full"
              src="https://placehold.it/64x64"
              alt="avatar"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {!loggedIn ? (
            <DropdownMenuItem>
              <a>Login</a>
            </DropdownMenuItem>
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
