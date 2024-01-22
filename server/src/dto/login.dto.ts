import { IsString, IsNotEmpty } from "class-validator";

export class LoginDTO {
    @IsString()
    @IsNotEmpty()
    username?: String = "";

    @IsString()
    @IsNotEmpty()
    password?: String = "";
}