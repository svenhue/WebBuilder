import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword, isStrongPassword } from "class-validator";

export class RegisterUserDto {
    @ApiProperty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password: string;
}