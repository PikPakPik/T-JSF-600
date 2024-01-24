import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

export default function SideBarChat() {
  return (
    <div
      key="1"
      className="flex flex-col w-64 h-full bg-gray-100 dark:bg-gray-800"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10">
            <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
            <AvatarFallback className="dark:text-white">JP</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold dark:text-white">John Doe</h2>
        </div>
        <Button size="icon" variant="outline" className="dark:text-white">
          <SettingsIcon className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
            Channels
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <span className="block w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                General
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="block w-2 h-2 bg-gray-500 rounded-full"></span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Random
              </span>
            </li>
          </ul>
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
            Users
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
                <AvatarFallback className="dark:text-white">JP</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                John Doe
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
                <AvatarFallback className="dark:text-white">JP</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Jane Doe
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function SettingsIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
