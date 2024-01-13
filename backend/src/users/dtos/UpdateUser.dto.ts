import { Matches, MinLength, IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {

    @IsString({ message: 'Der Benutzername muss aus Buchstaben und Zeichen bestehen.' })
    @IsOptional()
    username: string;

    @IsEmail({}, { message: 'Die E-Mail-Adresse ist ungültig.' })
    @IsString({ message: 'Eine E-Mail-Adresse muss aus Buchstaben und Zeichen bestehen.' })
    @IsOptional()
    email: string;

    @MinLength(8, { message: 'Das Passwort muss mindestens 8 Zeichen lang sein.' })
    @Matches(/[a-z]/, { message: 'Das Passwort muss mindestens einen Kleinbuchstaben enthalten.' })
    @Matches(/[A-Z]/, { message: 'Das Passwort muss mindestens einen Großbuchstaben enthalten.' })
    @Matches(/[0-9]/, { message: 'Das Passwort muss mindestens eine Zahl enthalten.' })
    @Matches(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Das Passwort muss mindestens ein Sonderzeichen enthalten.' })
    @IsString({ message: 'Das Passwort muss aus Buchstaben und Zeichen bestehen.' })
    @IsOptional()
    password: string;

}