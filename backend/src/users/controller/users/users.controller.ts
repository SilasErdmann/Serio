/*

Die users.controller.ts-Datei definiert eine Klasse, die mit dem @Controller()-Dekorator annotiert ist. Der @Controller()-Dekorator kennzeichnet diese Klasse als einen Controller, der für die Verarbeitung eingehender Anfragen und die Rückgabe von Antworten an den Client verantwortlich ist.

Ein Controller enthält in der Regel mehrere Routen, die verschiedene Aktionen ausführen können. Diese Routen werden mithilfe von Methoden-Dekoratoren wie @Get(), @Post(), @Put(), @Delete() usw. definiert, die den HTTP-Anfragemethoden entsprechen.

Der @Get()-Dekorator beispielsweise definiert eine GET-Route und kann optional einen Pfad angeben, der zum Controller-Pfad hinzugefügt wird. Zum Beispiel würde @Get('profile') eine GET-Anfrage an /users/profile behandeln, wenn der Controller-Pfad 'users' ist.

Es gibt vier Routen in diesem Controller:

    1. Eine GET-Route ('/:username/:password'), die die Methode getUsers aufruft und die Benutzeranmeldung überprüft.
    2. Eine POST-Route ('/'), die die Methode createUser aufruft und einen neuen Benutzer erstellt.
    3. Eine PUT-Route ('/:id'), die die Methode updateUserById aufruft und einen vorhandenen Benutzer anhand der ID aktualisiert.
    4. Eine DELETE-Route ('/:id'), die die Methode deleteUserById aufruft und einen Benutzer anhand der ID löscht.

Die Methoden im Controller verwenden Parameter-Dekoratoren wie @Param() und @Body(), um die Anfrage- und Körperdaten zu extrahieren und sie für die Verarbeitung zu verwenden.

Insgesamt ist dieser Code ein Beispiel für die Verwendung von NestJS zur Erstellung eines Controllers mit Routen, um verschiedene Aktionen im Zusammenhang mit Benutzern auszuführen.

*/

import { Body, Controller, Delete, Request, Post, Put, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { Public } from 'src/public.decorator';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Public()
  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() response: Response,
  ) {
    // Verwende den UserService, um einen Benutzer zu authentifizieren und einen Token zurückzugeben
    const loginResponse = await this.userService.login(username, password);

    // Setze den Statuscode im Header
    response.status(loginResponse.statusCode);

    // Gib den Token und die restlichen Daten im Body zurück
    return response.json(loginResponse);
  }

  @Public()
  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    const loginResponse = await this.userService.createUser(createUserDto);

    response.status(loginResponse.statusCode);

    return response.json(loginResponse);
  }

  @Put()
  @UsePipes(new ValidationPipe())
  async updateUserById(
    @Request() request: any,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    const userId = request.userId;
    const loginResponse = await this.userService.updateUser(userId, updateUserDto);

    response.status(loginResponse.statusCode);

    return response.json(loginResponse);
  }

  @Delete()
  async deleteUserById(@Request() request: any) {
    const userId = request.userId; // Extrahiere die Benutzer-ID aus dem request.user-Objekt
    await this.userService.deleteUser(userId);
  }
}