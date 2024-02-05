import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const { login: authLogin } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const username = document.getElementById("login") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    authLogin(
      {
        username: username.value,
        password: password.value,
      },
      () => {
        console.error("Error");
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t("signin.h1_title")}</CardTitle>
          <CardDescription>
            {t("signin.no_account")}{" "}
            <Link to="/signup" className="text-blue-500">
              {t("signin.signup")}
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="login">{t("signin.email_username")}</Label>
            <Input id="login" type="email" onKeyDown={handleKeyPress} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t("signin.password")}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                onKeyDown={handleKeyPress}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <EyeOffIcon className="w-4 h-4" aria-hidden="true" />
                )}
                <span className="sr-only">{"Show password"}</span>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>
            {t("signin.h1_title")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
