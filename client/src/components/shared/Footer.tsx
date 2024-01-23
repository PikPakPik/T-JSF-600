export function Footer() {
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2 px-8 py-4 bg-white border-t-4 border-indigo-600 md:flex-row dark:bg-background md:gap-0">
        <div className="flex items-center gap-5">
          <span className="mx-2 text-sm font-semibold dark:text-gray-400">
            ©️ IRC Chat All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-5">
          <div className="relative">
            <span className="mx-2 text-sm font-semibold dark:text-gray-400">
              Made with ❤️ by <a href="">Valentin</a> and <a href="">Alex</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
