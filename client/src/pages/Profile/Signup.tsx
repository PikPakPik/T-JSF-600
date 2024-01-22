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

export function Signup() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Créer mon compte </CardTitle>
          <CardDescription>
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="text-blue-500">
              Connectez-vous
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Nom d'utilisateur</Label>
            <Input id="username" type="text" placeholder="John Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" placeholder="********" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Créer mon compte</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
