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
import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Se connecter</CardTitle>
          <CardDescription>
            Vous n'avez pas de compte ?{" "}
            <Link to="/signup" className="text-blue-500">
              Créer un compte
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email ou nom d'utilisateur</Label>
            <Input id="email" type="email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" placeholder="********" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Me connecter</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
