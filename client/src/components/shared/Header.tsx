import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <>
      <div className="flex justify-between items-center py-4 px-8 bg-white border-b-4 border-indigo-600 dark:bg-background">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <svg className="h-8 w-8 dark:text-gray-100" viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M256 0C114.61 0 0 114.61 0 256s114.61 256 256 256 256-114.61 256-256S397.39 0 256 0zm0 480C132.48 480 32 379.52 32 256S132.48 32 256 32s224 100.48 224 224-100.48 224-224 224z"
              ></path>
              <path
                fill="currentColor"
                d="M256 96c-8.837 0-16 7.163-16 16v160c0 8.837 7.163 16 16 16s16-7.163 16-16V112c0-8.837-7.163-16-16-16z"
              ></path>
            </svg>
            <span className="dark:text-gray-100 font-semibold text-2xl mx-2">
              IRC Chat
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <ModeToggle />
          <div className="relative">
            <ProfileMenu />
          </div>
        </div>
      </div>
    </>
  );
}