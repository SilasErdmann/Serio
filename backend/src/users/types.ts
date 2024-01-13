/* 

Die types.ts-Datei enthält benutzerdefinierte Typen für TypeScript. 
TypeScript ist eine Erweiterung von JavaScript, die statische Typisierung ermöglicht. 
Durch die Verwendung von Typen wird jeder Variablen ein bestimmter Datentyp zugewiesen, der bei der Kompilierung überprüft wird. 
Dadurch können Fehler vermieden und der Code lesbarer gemacht werden.

In diesem Fall definiert die types.ts-Datei zwei Typen:

1. CreateUserParams: Dieser Typ enthält Eigenschaften wie "username", "email" und "password". 
Diese Typen werden verwendet, um die Parameter zu beschreiben, die benötigt werden, um einen neuen Benutzer zu erstellen.

2. UpdateUserParams: Dieser Typ enthält ebenfalls Eigenschaften wie "username", "email" und "password". 
Diese Typen werden verwendet, um die Parameter zu beschreiben, die benötigt werden, um einen vorhandenen Benutzer zu aktualisieren.

Durch die Verwendung benutzerdefinierter Typen können wir sicherstellen, dass die richtigen Datenstrukturen verwendet werden und mögliche Fehler frühzeitig erkannt werden.

*/

export type CreateUserParams = {
    username: string;
    email: string;
    password: string; 
}

export type UpdateUserParams = {
    username: string;
    email: string;
    password: string;
}