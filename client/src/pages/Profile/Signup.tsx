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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t("signup.h1_title")}</CardTitle>
          <CardDescription>
            {t("signup.already_account")}{" "}
            <Link to="/login" className="text-blue-500">
              {t("signup.signin")}
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">{t("signup.username")}</Label>
            <Input id="username" type="text" placeholder="John Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{t("signup.email")}</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t("signup.password")}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
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
          <Button className="w-full">{t("signup.h1_title")}</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
