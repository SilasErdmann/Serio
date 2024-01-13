/*

Die main.ts Datei ist die Einstiegsdatei der Anwendung. Hier wird die NestFactory-Klasse verwendet, um eine Instanz der Nest-Anwendung zu erstellen.
Die NestFactory-Klasse bietet verschiedene statische Methoden an, um Anwendungen für verschiedene Plattformen wie Express oder Fastify zu erstellen.
Die create() Methode gibt ein Anwendungsobjekt zurück, das das INestApplication Interface erfüllt.

*/

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './users/guards/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(jwtService, reflector));

  await app.listen(3000);
}

bootstrap();
