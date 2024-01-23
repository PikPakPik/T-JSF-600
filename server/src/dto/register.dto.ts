import {IsString, IsNotEmpty, IsEmail} from "class-validator";

export class RegisterDTO {
    @IsString()
    @IsNotEmpty()
    username?: String;

    @IsString()
    @IsNotEmpty()
    password?: String;

    @IsEmail()
    @IsNotEmpty()
    email?: String;
}