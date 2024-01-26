import {IsString, IsNotEmpty, IsEmail, IsAlphanumeric} from "class-validator";

export class RegisterDTO {
    @IsString({ message: 'validation.is_string' })
    @IsNotEmpty({ message: 'validation.is_no_empty' })
    @IsAlphanumeric("fr-FR", { message: 'validation.is_alphanumeric' })
    username?: String;

    @IsString({ message: 'validation.is_string' })
    @IsNotEmpty({ message: 'validation.is_no_empty' })
    password?: String;

    @IsEmail({}, { message: 'validation.is_email' })
    @IsNotEmpty({ message: 'validation.is_no_empty' })
    email?: String;
}