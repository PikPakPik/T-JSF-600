import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const LangSwitcher = () => {
  const [langs] = useState(["fr", "gb", "de", "es"]);
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
          {langs.map((lang) => (
            <DropdownMenuItem key={lang} onClick={() => changeLanguage(lang)}>
              <img src={`https://flagcdn.com/w20/${lang}.png`} alt={lang} />
            </DropdownMenuItem>
          ))}
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangSwitcher;
