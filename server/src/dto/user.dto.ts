import {IsString, IsNotEmpty, IsEmail} from "class-validator";
import {IsNotEqualTo} from "../validator/IsNotEqualTo.validator";
import {IsEqualTo} from "../validator/IsEqualTo.validator";

export class UserDTO {
    @IsString()
    @IsNotEmpty()
    username?: String;

    @IsEmail()
    @IsNotEmpty()
    email?: String;
}

export class UserPasswordDTO {
    @IsNotEmpty()
    currentPassword?: String;

    @IsNotEmpty()
    @IsNotEqualTo('currentPassword')
    newPassword?: String;

    @IsNotEmpty()
    @IsEqualTo('newPassword')
    confirmNewPassword?: String;
}