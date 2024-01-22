export function Footer() {
  return (
    <>
      <div className="flex justify-between items-center py-4 px-8 bg-white border-t-4 border-indigo-600 dark:bg-background">
        <div className="flex items-center gap-5">
          <span className="dark:text-gray-400 font-semibold text-sm mx-2">
            ©️ IRC Chat All rights reserved.
          </span>
          <div className="flex items-center gap-5"></div>
        </div>
        <div className="flex items-center gap-5">
          <div className="relative">
            <span className="dark:text-gray-400 font-semibold text-sm mx-2">
              Made with ❤️ by <a href="">Valentin</a> and <a href="">Alex</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
