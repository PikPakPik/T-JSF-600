import chat from "@/assets/chat.png";
import { Link } from "react-router-dom";
import LangSwitcher from "./LangSwitcher";
import ProfileMenu from "./ProfileMenu";
import { ModeToggle } from "./ThemeSwitcher";

export function Header() {
  return (
    <>
      <div className="flex items-center justify-between px-8 py-4 bg-white border-b-4 border-indigo-600 dark:bg-background">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img alt="IRC Chat Logo" className="w-12 h-12" src={chat} />
            <span className="mx-2 text-2xl font-semibold dark:text-gray-100">
              IRC Chat
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <ModeToggle />
          <LangSwitcher />
          <ProfileMenu />
        </div>
      </div>
    </>
  );
}
