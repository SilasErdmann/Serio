/* 

Die CreateUser.dto.ts-Datei wird verwendet, um Daten zwischen der users.controller.ts-Datei und der users.service.ts-Datei zu übertragen. 
Sie dient als Datenübertragungsobjekt und stellt sicher, dass nur gültige Daten an den Service weitergegeben werden, der sie dann in der Datenbank speichert.

In diesem Fall definiert die CreateUserDto-Klasse die Eigenschaften "username", "email" und "password". 
Diese Eigenschaften repräsentieren die erforderlichen Daten, um einen neuen Benutzer zu erstellen. 
Indem wir diese Eigenschaften in der CreateUserDto definieren, stellen wir sicher, dass nur gültige und vollständige Daten übergeben werden, 
um inkonsistente oder ungültige Benutzerdaten zu vermeiden.

Die Verwendung eines Datenübertragungsobjekts wie CreateUserDto verbessert die Codequalität, 
da es die Trennung von Verantwortlichkeiten fördert und die Datenvalidierung an einer zentralen Stelle ermöglicht.

*/

import { Matches, MinLength, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {

    @IsString({ message: 'Der Benutzername muss aus Buchstaben und Zeichen bestehen.'})
    username: string;

    @IsEmail({}, { message: 'Die E-Mail-Adresse ist ungültig.' })
    @IsString({ message: 'Die E-Mail-Adresse muss aus Buchstaben und Zeichen bestehen.'})
    email: string;

    @MinLength(8, { message: 'Das Passwort muss mindestens 8 Zeichen lang sein.'})
    @Matches(/[a-z]/, { message: 'Das Passwort muss mindestens einen Kleinbuchstaben enthalten.' })
    @Matches(/[A-Z]/, { message: 'Das Passwort muss mindestens einen Großbuchstaben enthalten.' })
    @Matches(/[0-9]/, { message: 'Das Passwort muss mindestens eine Zahl enthalten.' })
    @Matches(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Das Passwort muss mindestens ein Sonderzeichen enthalten.' })
    @IsString({ message: 'Das Passwort muss aus Buchstaben und Zeichen bestehen.'})
    password: string;

}