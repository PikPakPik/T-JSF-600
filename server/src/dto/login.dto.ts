import { IsString, IsNotEmpty } from "class-validator";

export class LoginDTO {
    @IsString({ message: 'validation.is_string' })
    @IsNotEmpty({ message: 'validation.is_no_empty' })
    username?: String;

    @IsString({ message: 'validation.is_string' })
    @IsNotEmpty({ message: 'validation.is_no_empty' })
    password?: String;
}