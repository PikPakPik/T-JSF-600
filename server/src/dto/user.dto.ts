import {IsString, IsNotEmpty, IsEmail, IsAlphanumeric} from "class-validator";
import {IsNotEqualTo} from "../validator/IsNotEqualTo.validator";
import {IsEqualTo} from "../validator/IsEqualTo.validator";

export class UserDTO {
    @IsString({ message: 'validation.is_string' })
    @IsNotEmpty({ message: 'validation.is_no_empty' })
    @IsAlphanumeric("fr-FR", { message: 'validation.is_alphanumeric' })
    username?: String;

    @IsEmail({}, { message: 'validation.is_email' })
    @IsNotEmpty({ message: 'validation.is_no_empty' })
    email?: String;
}

export class UserPasswordDTO {
    @IsNotEmpty({ message: 'validation.is_no_empty' })
    currentPassword?: String;

    @IsNotEmpty({ message: 'validation.is_no_empty' })
    @IsNotEqualTo('currentPassword', { message: 'validation.is_not_equal_to' })
    newPassword?: String;

    @IsNotEmpty({ message: 'validation.is_no_empty' })
    @IsEqualTo('newPassword', { message: 'validation.is_equal_to' })
    confirmNewPassword?: String;
}