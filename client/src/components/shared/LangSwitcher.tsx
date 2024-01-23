import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const LangSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="icon" className="border-indigo-600">
          <span className="text-gray-500 dark:text-gray-400">
            <img
              src={"https://flagcdn.com/w20/" + i18n.language + ".png"}
              alt={i18n.language}
            />
          </span>
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-0" align="center">
        <>
          <DropdownMenuItem onClick={() => changeLanguage("fr")}>
            <img src="https://flagcdn.com/w20/fr.png" alt="fr" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage("gb")}>
            <img src="https://flagcdn.com/w20/gb.png" alt="gb" />
          </DropdownMenuItem>
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangSwitcher;
