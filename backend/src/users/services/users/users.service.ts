/*

Die users.service.ts-Datei enthält eine Klasse, die die Geschäftslogik für die Verwaltung von Benutzern implementiert. Diese Klasse kann verschiedene Methoden enthalten, um Benutzer zu erstellen, zu suchen, zu aktualisieren oder zu löschen. Sie kann auch mit einer Datenbank interagieren, um Benutzerdaten zu speichern oder abzurufen. Die users.service.ts-Datei ist Teil des Users-Moduls.

Die users.service.ts-Datei ist mit dem @Injectable()-Dekorator markiert und wird im Users-Modul bereitgestellt. Dadurch kann sie in andere Module oder Dienste injiziert werden, die auf die Benutzerlogik zugreifen müssen.

Die Geschäftslogik repräsentiert den Teil eines Softwareprogramms, der die realen Geschäftsregeln kodiert, welche festlegen, wie Daten erstellt, gespeichert und geändert werden können.

Der bereitgestellte Code zeigt eine Implementierung des UsersService. In diesem Service sind folgende Methoden enthalten:

    1. Eine Methode login(username: string, password: string), die die Benutzeranmeldung überprüft und eine Abfrage an die Datenbank sendet, um einen Benutzer mit den angegebenen Anmeldeinformationen zu finden.

    2. Eine Methode createUser(userDetails: CreateUserParams), die einen neuen Benutzer erstellt. Die Methode erstellt ein neues Benutzerobjekt basierend auf den übergebenen Details und speichert es in der Datenbank.

    3. Eine Methode updateUser(id: number, updateUserDetails: UpdateUserParams), die einen vorhandenen Benutzer anhand der ID aktualisiert. Die Methode sucht den Benutzer in der Datenbank anhand der ID und aktualisiert seine Details basierend auf den übergebenen Aktualisierungsdetails.

    4. Eine Methode deleteUser(id: number), die einen Benutzer anhand der ID löscht. Die Methode sucht den Benutzer in der Datenbank anhand der ID und löscht ihn.

Die Methoden verwenden das UserRepository-Objekt, um mit der Datenbank zu interagieren und die entsprechenden Operationen auszuführen.

Insgesamt bietet dieser Code eine Service-Klasse mit Geschäftslogik zur Verwaltung von Benutzern in einer Anwendung.

*/

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../../typeorm/entities/User";
import { Comment } from "../../../typeorm/entities/Comment";
import { Rating } from "../../../typeorm/entities/Rating";
import { Watchlist } from "../../../typeorm/entities/Watchlist";
import { CreateUserParams, UpdateUserParams } from "../../types";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Rating) private ratingRepository: Repository<Rating>,
    @InjectRepository(Watchlist) private watchlistRepository: Repository<Watchlist>,
  ) {}

  async login(username: string, password: string) {
    try {
      // Finde den Benutzer mit dem gleichen Benutzernamen in der Datenbank
      const user = await this.userRepository.findOne({
        where: { username: username },
        select: ["id", "username", "password"],
      });
  
      if (!user) {
        // Wenn der Benutzer nicht existiert, wirf eine Exception
        throw new Error("Benutzername nicht gefunden");
      }
  
      const match = await bcrypt.compare(password, user.password);
  
      if (!match) {
        // Wenn das Passwort nicht übereinstimmt, wirf eine Exception
        throw new Error("Falsches Passwort");
      }
  
      // Erstelle einen Payload mit den Informationen, die Sie für die Guards benötigen
      const payload = { userId: user.id };
  
      // Erstelle einen Token mit dem Payload und dem geheimen Schlüssel
      const token = this.jwtService.sign(payload);
  
      // Gib den Token und username zurück
      return {
        statusCode: 200,
        message: 'Login erfolgreich',
        username: user.username,
        token,
      };
    } catch (error) {
      // Fehler abfangen und benutzerdefinierte Antwort senden
      return {
        statusCode: 401, // Unauthorized
        message: error.message,
      };
    }
  }

  async createUser(userDetails: CreateUserParams) {
    const { username, email, password } = userDetails;
  
    try {
      // Überprüfe, ob der Benutzername bereits existiert
      const existingUser = await this.userRepository.findOne({ where: { username: username } });
      if (existingUser) {
        throw new Error('Der Benutzername ist bereits vergeben.');
      }

      // Überprüfe, ob die E-Mail-Adresse bereits existiert
    const existingEmail = await this.userRepository.findOne({ where: { email: email } });
    if (existingEmail) {
      throw new Error('Die E-Mail-Adresse ist bereits registriert.');
    }

      // Hash das Passwort mit bcrypt
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);
  
      // Erstelle ein neues Benutzerobjekt mit dem gehashten Passwort
      const newUser = this.userRepository.create({
        ...userDetails,
        password: hashedPassword,
      });
  
      // Speichere den neuen Benutzer in der Datenbank
      const savedUser = await this.userRepository.save(newUser);
  
      // Gib die erfolgreiche Antwort zurück
      return {
        statusCode: 200,
        message: 'Benutzer erfolgreich erstellt.',
      };
    } catch (error) {
      // Fehler abfangen und benutzerdefinierte Antwort senden
      return {
        statusCode: 400,
        message: error.message,
      };
    }
  } 

  // Aktualisiert einen vorhandenen Benutzer basierend auf den übergebenen Aktualisierungsdetails
  async updateUser(id: number, updateUserDetails: UpdateUserParams) { //überarbeitungsbedarf bei den ifs

    try {

      if (updateUserDetails.username) {
        const existingUsername = await this.userRepository.findOne({ where: { username: updateUserDetails.username } });
        if (existingUsername) {
          throw new Error('Der Benutzername ist bereits vergeben.');
        }
      }

      if (updateUserDetails.email) {
        const existingEmail = await this.userRepository.findOne({ where: { email: updateUserDetails.email } });
        if (existingEmail) {
          throw new Error('Die E-Mail-Adresse ist bereits registriert.');
        }
      }

      if (updateUserDetails.password) {
        const hashedPassword = await bcrypt.hash(updateUserDetails.password, saltOrRounds);
        updateUserDetails.password = hashedPassword;
      }

      await this.userRepository.update({ id }, { ...updateUserDetails });

      return {
        statusCode: 200,
        message: 'Benutzer erfolgreich aktualisiert.',
      };

    } catch (error) {
      // Fehler abfangen und benutzerdefinierte Antwort senden
      return {
        statusCode: 400,
        message: error.message,
      };
    }
  }

  async deleteUser(id: number) {
    // Zuerst alle Ratings des Benutzers löschen
    await this.ratingRepository.delete({ userId: id });
  
    // Dann alle Kommentare des Benutzers löschen
    await this.commentRepository.delete({ userId: id });

    // Dann alle Einträge in der Watchlist des Benutzers löschen
    await this.watchlistRepository.delete({ userId: id });
  
    // Schließlich den Benutzer selbst löschen
    return this.userRepository.delete({ id });
  }
  
}