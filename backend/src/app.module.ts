/*

Ein Modul ist eine organisatorische Einheit, die verwandte Komponenten wie Controller, Services, Entitäten und andere Module zusammenfasst.
Es ermöglicht die Zerlegung der Anwendung in kleinere und überschaubarere Teile, die jeweils eine spezifische Funktion oder ein bestimmtes Feature erfüllen.
Module können auch von anderen Modulen importiert oder exportiert werden, um Abhängigkeiten und Wiederverwendbarkeit zu ermöglichen.

Die Datei app.module.ts ist die Hauptmodul-Datei der Anwendung.
Sie bringt alle anderen Module zusammen und definiert die Struktur der Anwendung.
app.module.ts dient als Ausgangspunkt für Nest, um den Anwendungsgraphen zu erstellen.
Der Anwendungsgraph ist die interne Datenstruktur, die Nest verwendet, um Modul- und Provider-Beziehungen und -Abhängigkeiten aufzulösen.
Die app.module.ts Datei muss mindestens einen @Module-Dekorator haben, der Metadaten für das Modul bereitstellt.
Diese Metadaten enthalten Informationen über die importierten Module, die bereitgestellten Services, die verwendeten Controller und andere Konfigurationen.

*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Media_Contributor } from 'src/typeorm/entities/Media_Contributor';
import { Genre } from 'src/typeorm/entities/Genre';
import { Season } from 'src/typeorm/entities/Season';
import { Rating } from 'src/typeorm/entities/Rating';
import { Media } from 'src/typeorm/entities/Media';
import { Media_Genre } from 'src/typeorm/entities/Media_Genre';
import { Episode } from 'src/typeorm/entities/Episode';
import { Contributor } from 'src/typeorm/entities/Contributor';
import { Comment } from 'src/typeorm/entities/Comment';
import { MediaModule } from './media/media.module';
import { CommentsModule } from './comments/comments.module';
import { RatingsModule } from './ratings/ratings.module';
import { ContributorsModule } from './contributors/contributors.module';
import { SeasonsModule } from './seasons/seasons.module';
import { EpisodesModule } from './episodes/episodes.module';
import { WatchlistsModule } from './watchlists/watchlists.module';
import { Watchlist } from 'src/typeorm/entities/Watchlist';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3307,
      username: 'root',
      password: 'NextLevels',
      database: 'serio_db',
      entities: [
        User,
        Season,
        Rating,
        Media,
        Media_Genre,
        Media_Contributor,
        Genre,
        Episode,
        Contributor,
        Comment,
        Watchlist,
      ],
      synchronize: true,
    }),
    UsersModule,
    MediaModule,
    CommentsModule,
    RatingsModule,
    ContributorsModule,
    SeasonsModule,
    EpisodesModule,
    WatchlistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Konsolenbefehle zum starten des backends:
//npm run start