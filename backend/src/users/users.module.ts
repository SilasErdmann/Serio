/*

Die users.module.ts-Datei ist ein Beispiel für ein Feature-Modul, das den Code organisiert, der für die Verwaltung von Benutzern relevant ist. Ein Feature-Modul ist eine Möglichkeit, den Code in einer Anwendung in logische Einheiten aufzuteilen und die Struktur zu verbessern.

Das Users-Modul enthält verschiedene Komponenten, die eng miteinander verbunden sind:

- Ein TypeORM-Modul wird mit der @nestjs/typeorm-Library importiert und konfiguriert, um das User-Entity zu verwenden und den Zugriff auf die Datenbank zu ermöglichen.

- Der UsersController ist ein Controller, der die verschiedenen Routen für die Benutzerverwaltung enthält.

- Der UsersService ist ein Service, der die Geschäftslogik für die Verwaltung von Benutzern enthält. Er kann Methoden enthalten, um Benutzer zu erstellen, zu suchen, zu aktualisieren oder zu löschen.

Das Feature-Modul UsersModule kann auch andere Module importieren oder exportieren, um auf deren Anbieter zuzugreifen oder sie anderen Modulen zur Verfügung zu stellen.

*/

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/User';
import { Rating } from '../typeorm/entities/Rating';
import { Comment } from '../typeorm/entities/Comment';
import { Watchlist } from '../typeorm/entities/Watchlist';
import { UsersController } from './controller/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [JwtModule.register({
      secret: 'NextLevels', // Geben Sie hier Ihren geheimen Schlüssel ein oder verwenden Sie eine Umgebungsvariable
      signOptions: { expiresIn: '12h' }, // Geben Sie hier die Gültigkeitsdauer für die Tokens ein oder verwenden Sie eine Umgebungsvariable
    }),TypeOrmModule.forFeature([User, Rating, Comment, Watchlist])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

// Konsolenbefehle zum Erstellen eines neuen Moduls namens "media":
//PS C:\Users\PC\Desktop\backend> nest g module media

// Konsolenbefehle zum Erstellen eines Controllers mit dem Pfad "media/controller/media" im Modul "media":
//PS C:\Users\PC\Desktop\backend> nest g controller media/controller/media

// Konsolenbefehle zum Erstellen eines Services mit dem Pfad "media/services/media" im Modul "media":
//PS C:\Users\PC\Desktop\backend> nest g service media/services/media
